import { LoginComponent } from './../../../../../apps/admin/src/app/pages/login/login.component';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocalstorageService } from '@develop/users';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  implements CanActivate{
  constructor(private router: Router, private localStorageToken: LocalstorageService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const token = this.localStorageToken.getToken()
    if(token) {
      return true
    }
    
    this.router.navigate(['/login']);
    return false
  }
}
