import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ValidityFormService } from 'src/app/shared/services/validity-form.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public error!: string;

  public form: FormGroup = this.fb.group(
    {
      lastname: ['', [Validators.required, this.validator.onlyTextValidator()]],
      firstname: [
        '',
        [Validators.required, this.validator.onlyTextValidator()],
      ],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      password: [
        '',
        [Validators.required, this.validator.createPasswordStrengthValidator()],
      ],
      passwordControl: ['', [Validators.required]],
    },
    {
      validator: this.validator.passwordMatchValidator(
        'password',
        'passwordControl'
      ),
    }
  );
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private validator: ValidityFormService
  ) {}

  ngOnInit(): void {}

  public submit() {
    console.log(this.form)
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
