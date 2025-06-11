import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;

  constructor() { }

  // login(credentials: {email:string; password: string}): Observable<boolean> {
  //   if (credentials.email === 'user@example.com' && credentials.password === 'password123') {
  //     this.isAuthenticated = true;
  //     localStorage.setItem('user', JSON.stringify(credentials));
  //     return of(true);
  //   }
  //   return of(false);
  // }

  login(credentials: {email: string; password: string}): Observable<boolean> {
    const users = [
      { email: 'aryanp@propel.com', password: 'Aryan@123' },
      { email: 'kush@example.com', password: 'Kush@456' }
    ];

    const userExists = users.some(user => user.email === credentials.email && user.password === credentials.password);
    if (userExists) {
      this.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(credentials));
      return of(true);
    }
    return of(false);
  }


  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated || localStorage.getItem('user') !== null;
  }

}
