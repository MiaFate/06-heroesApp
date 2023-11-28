import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, UrlSegment, UrlTree, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class PublicGuard implements CanMatch, CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  private checkAuthStatus(): boolean | Observable<boolean> {

    return this.authService.checkAuthentication()
      .pipe(
        tap(isAuthenticated => console.log('Authenticated:', isAuthenticated)),
        tap(isAuthenticated => {
          if (isAuthenticated) {
            // Redirect to login page
            this.router.navigate(['./'])
          }
        }),
        map(isAuthenticated => !isAuthenticated)
      )
  }

  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    // console.log('CanMatch');:w
    // console.log({ route, segments });
    // return false
    return this.checkAuthStatus();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    // console.log('canActivate');
    // console.log({ route, state });
    // return false
    return this.checkAuthStatus();
  }

}
