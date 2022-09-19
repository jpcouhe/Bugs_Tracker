import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, tap } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user$: BehaviorSubject<User[] | []> = new BehaviorSubject<User[] | []>(
    []
  );
  constructor(private http: HttpClient) {}

  public getAllUsers() {
    return this.http.get<User[]>('/api/user').pipe(
      tap((users: User[]) => {
        this.user$.next(users);
      })
    );
  }

  public getOneUser(index: number | null) {
    return this.user$.pipe(
      filter((user: User[]) => {
        return user !== null;
      }),
      map((user: User[]) => {
        return user[index!];
      })
    );
  }

  public updateUser(id: number, user: User) {
    return this.http.put<User>('api/user/' + id, user).pipe(
      tap((userSave: User) => {
        const value = this.user$.value;
        this.user$.next(
          value.map((user: User) => {
            if (user.email === userSave.email) {
              return userSave;
            } else {
              return user;
            }
          })
        );
      })
    );
  }
}
