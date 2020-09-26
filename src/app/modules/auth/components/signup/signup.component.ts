import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  error: string;
  registerForm: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    console.log('signup comp');
  }

  register() {
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

  private createForm() {
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
}
