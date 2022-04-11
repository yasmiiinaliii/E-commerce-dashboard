
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../../../../../apps/admin/src/environments/environment';
import { EmailValidator } from '@angular/forms';
import {User} from '../models/user'
import { LocalstorageService } from '@develop/users';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


apiURLAuth = environment.apiUrl +'users/login'
  

constructor(
  private http: HttpClient,
  private token: LocalstorageService,
  private router: Router
) {}

login(email: string, password: string): Observable<User> {
  return this.http.post<User>(this.apiURLAuth, { email, password });
}

logout() {
  this.token.removeToken();
  this.router.navigate(['/login']);
}
}