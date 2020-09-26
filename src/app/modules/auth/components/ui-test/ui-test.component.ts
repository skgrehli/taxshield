import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-ui-test',
  templateUrl: './ui-test.component.html',
  styleUrls: ['./ui-test.component.scss'],
})
export class UiTestComponent implements OnInit {
  isLoginWindowActive: boolean = true;

  error: string;
  isLoading = false;

  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthService
  ) {
    this.initializeLoginForm();
    this.initializeRegisterForm();
  }

  ngOnInit(): void {}

  toggleWindow(flag) {
    console.log(flag);

    this.isLoginWindowActive = flag;
  }

  initializeLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if(!this.loginForm.valid){
      return;
    }
    console.log('log in');
    this.isLoading = true;
    this.authenticationService
      .login(this.loginForm.value)
      .pipe(
        finalize(() => {
          this.loginForm.markAsPristine();
          this.isLoading = false;
        })
      )
      .subscribe((credentials) => {
        console.log('credentials', credentials);

        this.authenticationService.loginSuccess(
          this.loginForm.value,
          credentials.token
        );
        this.route.queryParams.subscribe((params) =>
          // this.router.navigate([params.redirect || '/'], { replaceUrl: true })
          this.router.navigate(['/sigplus-sign'], { replaceUrl: true })
        );
      });
  }

  initializeRegisterForm() {
    this.registerForm = this.formBuilder.group({
      confirmpassword: ['', Validators.required],
      email: ['', Validators.required],
      firstname: ['', Validators.required],
      it: [''],
      lastname: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      role: [''],
    });
  }

  register() {
    if(!this.registerForm.valid){
      return;
    }
    this.isLoading = true;
    this.authenticationService
      .register(this.registerForm.value)
      .pipe(
        finalize(() => {
          this.registerForm.markAsPristine();
          this.isLoading = false;
        })
      )
      .subscribe((credentials) => {
        console.log('credentials', credentials);

        this.authenticationService.registerSuccess(
          this.registerForm.value,
          credentials.token
        );
        this.route.queryParams.subscribe((params) =>
          // this.router.navigate([params.redirect || '/'], { replaceUrl: true })
          this.router.navigate(['/sigplus-sign'], { replaceUrl: true })
        );
      });
  }
}
