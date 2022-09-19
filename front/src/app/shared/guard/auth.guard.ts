import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { first, Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private route: Router) {}
  canActivate(): Observable<boolean> {
    return this.authService.isLoggedin$.pipe(
      first(),
      tap((isLoggedin: boolean) => {
        if (!isLoggedin) {
          this.route.navigate(['../auth/login']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}


// GUARD pour savoir l'utilisateur est connecté 