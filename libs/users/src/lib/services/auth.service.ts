
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../../../../../apps/admin/src/environments/environment';
import { EmailValidator } from '@angular/forms';
import {User} from '../models/user'

@Injectable({
  providedIn: 'root'
})
export class AuthService {


apiURLAuth = environment.apiUrl +'auth/login'
  constructor( private http: HttpClient) { }

  login(username: string, password: string): Observable<User> {
    return this.http.post<User>(this.apiURLAuth, { username, password });
  }
}