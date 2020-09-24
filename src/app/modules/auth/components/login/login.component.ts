import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  error: string;
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthService
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  login(){
    console.log('log in');
    this.isLoading = true;
    this.authenticationService.login(this.loginForm.value)
    .pipe(
      finalize(() => {
        this.loginForm.markAsPristine();
        this.isLoading = false;
      })
    )
    .subscribe(
      credentials => {
        console.log('credentials', credentials);
        
        this.authenticationService.loginSuccess(
          this.loginForm.value,
          credentials.token
        );
        this.route.queryParams.subscribe(params =>
          // this.router.navigate([params.redirect || '/'], { replaceUrl: true })
          this.router.navigate(['/marketingreports'], { replaceUrl: true })
        );
      }
    )
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
