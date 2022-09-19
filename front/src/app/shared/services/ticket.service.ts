import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Ticket } from '../interfaces/ticket.inferface';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  public ticket$: BehaviorSubject<Ticket[] | []> = new BehaviorSubject<
    Ticket[] | []
  >([]);
  constructor(private http: HttpClient) {}

  public getAllTickets() {
    return this.http.get<Ticket[]>('/api/ticket').pipe(
      tap((tickets: Ticket[]) => {
        this.ticket$.next(tickets);
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
        console.log(allTicket);
        const newTicket = allTicket.filter(
          (ticket) => ticket.id != updateTicket.id
        );

        this.ticket$.next([...newTicket, updateTicket]);
      })
    );
  }

  public postComment(id: number, comment: any) {
    return this.http.post(`api/ticket/comment/${id}`, comment).pipe(
      tap((comment: any) => {
        console.log(comment);
      })
    );
  }

  public getCommentByTicket(index: number): Observable<any> {
    return this.http.get<Comment[]>(`/api/ticket/comment/${index}`).pipe(
      tap((comment: Comment[]) => {
        console.log(comment);
      })
    );
  }

  public removeComment(commentId: any): Observable<any> {
    return this.http.delete(`/api/ticket/comment/${commentId}`);
  }
}
