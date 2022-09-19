import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { User } from 'src/app/shared/interfaces/user.interface';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.scss'],
})
export class AdminFormComponent implements OnInit {
  public userForm!: FormGroup;

  public user!: User;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const index = paramMap.get('index');
      if (index !== null) {
        this.userService.getOneUser(+index).subscribe((user) => {
          this.user = user;
        });
      }

      this.userForm = this.initForm(this.user);
    });
  }

  submit() {}

  private initForm(
    user: User = {
      firstname: '',
      lastname: '',
      phone: '',
      email: '',
      roleId: 2,
    }
  ): FormGroup {
    return this.fb.group({
      firstname: [user.firstname, Validators.required],
      lastname: [user.lastname, Validators.required],
      phone: [user.phone, Validators.required],
      email: [user.email, Validators.required],
      roleId: [user.roleId, Validators.required],
    });
  }

  public updateUser() {
    this.userService
      .updateUser(this.user.id!, this.userForm.getRawValue())
      .subscribe();
  }
}
