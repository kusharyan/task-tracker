import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent implements OnInit, OnDestroy{

  loginForm!: FormGroup;
  errorMessage: string = '';
  private loginSubscription!: Subscription;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // this.loginForm = this.fb.group({
    //   email: ['', [Validators.email, Validators.required]],
    //   password: ['', [Validators.required, Validators.minLength(6)]]
    // })
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  onSubmit() {
    if(this.loginForm.valid) {
      const {email, password} = this.loginForm.value;
      this.loginSubscription = this.authService.login(email, password).subscribe({
        next: (res)=> {
          this.authService.saveToken(res.token);
          this.router.navigate(['/layout'])
        },
        error: () => {
          this.errorMessage = 'Invalid Login Credentials';
        }
      })
    }
  }

  ngOnDestroy(): void {
    if(this.loginSubscription){
    this.loginSubscription.unsubscribe();
    }
  }
}
