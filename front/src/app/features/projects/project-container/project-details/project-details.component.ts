import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Project } from 'src/app/shared/interfaces/project.inferface';
import { ProjectService } from 'src/app/shared/services/project.service';
import { Subscription } from 'rxjs';
import { Ticket } from 'src/app/shared/interfaces/ticket.inferface';
import { MatTableDataSource } from '@angular/material/table';
import { PROJECT_DETAIL_ID_PARAM } from 'src/app/shared/utils/type.params';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
  public project?: Project;
  public ticket?: Ticket;
  public subscription?: Subscription;
  public index!: number | null;

  public dataSource: MatTableDataSource<Project['contribution'] | undefined> =
    new MatTableDataSource();

  public displayedColumns: string[] = ['nom', 'phone', 'email'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.get(PROJECT_DETAIL_ID_PARAM) !== null) {
        this.index = Number(paramMap.get(PROJECT_DETAIL_ID_PARAM));
      }
    });

    this.projectService
      .getOneProject(this.index)
      .subscribe((project: Project[]) => {
        if (project) {
          this.project = project[0];
          this.dataSource = project[0]?.contribution as any;
        }
      });
  }
  getInfo(event: any) {
    this.ticket = event;
  }
}
