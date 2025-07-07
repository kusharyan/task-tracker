import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private router: Router) { }

  // login(credentials: {email: string; password: string}): Observable<boolean> {
  //   const users = [
  //     { email: 'aryanp@propel.com', password: 'Aryan@123' },
  //     { email: 'kush@example.com', password: 'Kush@456' }
  //   ];

  //   const userExists = users.some(user => user.email === credentials.email && user.password === credentials.password);
  //   if (userExists) {
  //     this.isAuthenticated = true;
  //     localStorage.setItem('user', JSON.stringify(credentials));
  //     return of(true);
  //   }
  //   return of(false);
  // }

  login(email: string, password: string){
    return this.http.post<{token: string}>(`${this.apiUrl}/login`, {email, password});
  }

  saveToken(token : string) {
    return localStorage.setItem('token', token)
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login-form']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
