import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (
      this.loginForm.value.email === '' ||
      this.loginForm.value.password === ''
    ) {
      console.log("Email and password can't be empty");
      return;
    }

    this.http
      .post('http://localhost:5000/api/v1/auth/login', this.loginForm.value)
      .subscribe({
        next: (response: any) => {
          console.log('Login response 🧨:', response);
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.router.navigate(['/admin']);
        },
        error: (err) => {
          console.error('Login error:', err);
        },
      });
  }
}
