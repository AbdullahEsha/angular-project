import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  constructor(private http: HttpClient, private router: Router) {}

  logout() {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      alert('You are not logged in!');
      return;
    }

    console.log('Logging out...', accessToken);

    this.http
      .delete('http://localhost:5000/api/v1/auth/logout', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .subscribe({
        next: (response: any) => {
          console.log('Logout response:', response);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('user');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Logout error:', err);
          alert('Failed to log out. Please try again.');
        },
      });
  }
}
