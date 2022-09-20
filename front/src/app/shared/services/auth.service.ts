import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, tap } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //On garde quand même un valeur en mémoire mais pas besoin d'un valeur initiale
  public isLoggedin$: ReplaySubject<boolean> = new ReplaySubject(1);
  public auth$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(
    null
  );

  private access_token = '';
  private userId = '';
  private isAdmin!: boolean;

  constructor(private http: HttpClient) {}

  public register(user: User): Observable<any> {
    return this.http.post('/api/auth/signup', user);
  }

  public login(credential: any): Observable<any> {
    return this.http
      .post<{
        userId: string;
        access_token: string;
        user: User;
      }>('/api/auth/login', credential)
      .pipe(
        tap(({ userId, access_token, user }) => {
        
          if (user.roleId === 1) {
            this.isAdmin = true;
          } else {
            this.isAdmin = false;
          }
          this.userId = userId;
          this.access_token = access_token;
          this.isLoggedin$.next(true);
          this.auth$.next(user);
        })
      );
  }

  public fetchCurrentUser(): Observable<User | null> {
    return this.http.get<User | null>('/api/auth/currentuser').pipe(
      tap((user: User | null) => {
        this.auth$.next(user);
        if (user !== null) {
          this.isLoggedin$.next(true);
        } else {
          this.isLoggedin$.next(false);
        }
      })
    );
  }

  public getToken() {
    return this.access_token;
  }
  public getIsAdmin() {
    return this.isAdmin;
  }
  public getUserId() {
    return this.userId;
  }

  public logout(): Observable<any> {
    return this.http.delete('api/auth/logout').pipe(
      tap(() => {
        this.auth$.next(null);
      })
    );
  }
}
