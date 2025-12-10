import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="d-flex align-items-center min-vh-100 bg-light">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-5 col-lg-4">
            <div class="card shadow-lg border-0">
              <div class="card-body p-5">
                <h3 class="text-center mb-4">Admin Login</h3>
                <div *ngIf="error" class="alert alert-danger">{{ error }}</div>
                <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
                  <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-control" formControlName="email">
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Password</label>
                    <input type="password" class="form-control" formControlName="password">
                  </div>
                  <button type="submit" class="btn btn-primary w-100">Sign In</button>
                </form>
                <div class="mt-3 text-center text-muted small">
                  Try: admin@artexhibition.test / Admin123!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  loginForm: FormGroup;
  error = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      // Simple mock authentication
      if (email === 'admin@artexhibition.test' && password === 'Admin123!') {
        this.auth.login(email);
        this.router.navigate(['/admin']);
      } else {
        this.error = 'Invalid credentials';
      }
    }
  }
}
