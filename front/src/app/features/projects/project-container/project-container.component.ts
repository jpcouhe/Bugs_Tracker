import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/shared/interfaces/project.inferface';
import { User } from 'src/app/shared/interfaces/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';

import { ProjectService } from 'src/app/shared/services/project.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-project-container',
  templateUrl: './project-container.component.html',
  styleUrls: ['./project-container.component.scss'],
})
export class ProjectContainerComponent implements OnInit {
  public projects?: Observable<Project[] | null>;
  public users?: Observable<User[] | null>;
  public isAdmin!: boolean;
  constructor(
    private projectService: ProjectService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.getIsAdmin();
    this.projects = this.projectService.project$;
    this.users = this.userService.user$;
  }

  public deleteProject($Event: number) {
    this.projectService.deleteProject($Event).subscribe();
  }

  public updateProject($Event: Project) {
    this.projectService.updateProject($Event.id, $Event).subscribe();
  }
}
