import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService
      .logout()
      .subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

}
