import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public error!: string;
  public form: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    remember: [false],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  public submit() {
    if (this.form.valid) {
      this.authService
        .login(this.form.getRawValue())
        .pipe(
          catchError((error: any) => {
          
            
            this.error = error.error;
            return EMPTY;
          })
        )
        .subscribe(() => this.router.navigateByUrl('/dashboard/resume'));
      // (err: Error) => {
      //   this.error = err?.message;
      // };
    }
  }

  public requestNewPassword() {}
}
