import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Ticket } from '../interfaces/ticket.inferface';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  public ticket$: BehaviorSubject<Ticket[] | []> = new BehaviorSubject<
    Ticket[] | []
  >([]);
  constructor(private http: HttpClient) {}

  public getAllTickets(userId: number = 0) {
    return this.http.get<Ticket[]>('/api/ticket').pipe(
      map((ticket: Ticket[]) => {
        if (userId === 0) {
          this.ticket$.next(ticket);
        
          return ticket;
        } else {
     
          const newList: Ticket[] = [];
          for (let i = 0; i < ticket.length; i++) {
            for (let j = 0; j < ticket[i].ticketsContribution!.length; j++) {
              if (ticket[i].ticketsContribution![j].user.id == userId) {
                newList.push(ticket[i]);
              }
            }
          }
          this.ticket$.next(newList);
          return newList;
        }
      })
    );
  }

  public getTicketsByProject(index: number): Observable<any> {
    return this.http.get<Ticket[]>(`/api/ticket/project/${index}`);
  }

  public createTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>('api/ticket', ticket).pipe(
      tap((ticket: any) => {
        const allTicket = this.ticket$.value;
        this.ticket$.next([...allTicket, ticket]);
      })
    );
  }

  public deleteTicket(index: number): Observable<any> {
    return this.http.delete<Ticket>(`/api/ticket/${index}`).pipe(
      tap((deleteTicket: Ticket) => {
        const allTicket = this.ticket$.value;
        const newTicket = allTicket.filter((ticket) => {
          ticket.id !== deleteTicket.id;
        });
        this.ticket$.next([...newTicket]);
      })
    );
  }

  public updateTicket(id: number, ticket: Ticket) {
    return this.http.put<Ticket>('api/ticket/' + id, ticket).pipe(
      tap((updateTicket: Ticket) => {
        const allTicket = this.ticket$.value;

        const newTicket = allTicket.filter(
          (ticket) => ticket.id != updateTicket.id
        );

        this.ticket$.next([...newTicket, updateTicket]);
      })
    );
  }

  public postComment(id: number, comment: any) {
    return this.http
      .post(`api/ticket/comment/${id}`, comment)
      .pipe(tap((comment: any) => {}));
  }

  public getCommentByTicket(index: number): Observable<any> {
    return this.http
      .get<Comment[]>(`/api/ticket/comment/${index}`)
      .pipe(tap((comment: Comment[]) => {}));
  }

  public removeComment(commentId: any): Observable<any> {
    return this.http.delete(`/api/ticket/comment/${commentId}`);
  }
}
