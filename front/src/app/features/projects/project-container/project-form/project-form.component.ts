import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Project } from 'src/app/shared/interfaces/project.inferface';
import { User } from 'src/app/shared/interfaces/user.interface';
import { ProjectService } from 'src/app/shared/services/project.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit {
  public error!: string;
  public user$: Observable<User[] | []> = this.userService.user$.asObservable();
  public project!: Project;
  public projectForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    contribution: ['', Validators.required],
  });

  userList!: any;
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private projectService: ProjectService,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: {}
  ) {}

  ngOnInit(): void {
    if (this.data !== null) {
      this.project = this.data;
      this.projectForm = this.initForm(this.project);
    } else {
      this.projectForm = this.initForm();
    }
  }

  public initForm(
    project: any = {
      name: '',
      description: '',
      contribution: '',
    }
  ): FormGroup {
    return this.fb.group({
      name: [project.name, Validators.required],
      description: [project.description, Validators.required],
      contribution: [project.contribution, Validators.required],
    });
  }

  public submit() {
    if (this.data !== null) {
      this.projectService
      .updateProject(this.project.id, this.projectForm.getRawValue())
      .subscribe(() => {
        this.closeDialog();
      });
    } else {
      this.projectService
        .createProject(this.projectForm.getRawValue())
        .subscribe(() => {
          this.closeDialog();
        });
    }
  }

  public closeDialog() {
    this.dialog.closeAll();
  }
}
