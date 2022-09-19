import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public error!: string;

  public form: FormGroup = this.fb.group({
    lastname: ['', Validators.required],
    firstname: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
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
        .register(this.form.getRawValue())
        .subscribe(() => this.router.navigateByUrl('/dashboard/resume')),
        (err: Error) => {
          this.error = err?.message || 'Une erreur est survenur';
        };
    }
  }
}
