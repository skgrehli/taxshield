import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @ViewChild('snav') snav;

  mobileQuery: MediaQueryList;

  fillerNav = Array.from({length: 10}, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from({length: 50}, () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  private _mobileQueryListener: () => void;

  constructor(private authService: AuthService, private router: Router, private notifyService : NotificationService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.snav.toggle()
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  logout() {
    this.authService
      .logout()
      .subscribe(() => {
        this.notifyService.showSuccess( "Logged out successfully !", "Logout")
        this.router.navigate(['/login'], { replaceUrl: true })
      });
  }

}
