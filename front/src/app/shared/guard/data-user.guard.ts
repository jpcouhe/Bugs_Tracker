import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { first, map, Observable, of, switchMap } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataUserGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  canActivate(): Observable<true> {


    return this.authService.auth$.pipe(
      first(),
      switchMap((user: User | null): Observable<true> => {
        if (!user) {
          return this.authService.fetchCurrentUser().pipe(map(() => true));
        } else {
          return of(true);
        }
      })
    );
  }
}
