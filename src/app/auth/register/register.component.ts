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
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (
      this.registerForm.value.name === '' ||
      this.registerForm.value.email === '' ||
      this.registerForm.value.password === ''
    ) {
      console.log("Name, email, and password can't be empty");
      return;
    }

    this.http
      .post(
        'http://localhost:5000/api/v1/auth/register',
        this.registerForm.value
      )
      .subscribe({
        next: (response: any) => {
          console.log('Register response:', response);
          if (response.success) {
            this.router.navigate(['/login']);
          }
        },
        error: (err) => {
          console.error('Register error:', err);
        },
      });
  }
}
