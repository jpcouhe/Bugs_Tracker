import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/shared/interfaces/project.inferface';
import { User } from 'src/app/shared/interfaces/user.interface';

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

  constructor(
    private projectService: ProjectService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.projects = this.projectService.project$;
    this.users = this.userService.user$;
  }

  public deleteProject(Event: any) {
    this.projectService.deleteProject(Event).subscribe();
  }

  public updateProject(project: any) {

    this.projectService.updateProject(project.id, project).subscribe();
  }
}
