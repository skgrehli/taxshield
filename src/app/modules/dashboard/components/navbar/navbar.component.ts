import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private notifyService : NotificationService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService
      .logout()
      .subscribe(() => {
        this.notifyService.showSuccess( "Logged out successfully !", "Logout")
        this.router.navigate(['/login'], { replaceUrl: true })
      });
  }

}
