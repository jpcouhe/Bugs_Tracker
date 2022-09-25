import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Project } from 'src/app/shared/interfaces/project.inferface';
import { ProjectService } from 'src/app/shared/services/project.service';
import { Subscription } from 'rxjs';
import { Ticket } from 'src/app/shared/interfaces/ticket.inferface';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
  public project?: Project;
  public ticket?: Ticket;
  public subscription?: Subscription;
  public index!: number;

  public dataSource: MatTableDataSource<Project['contribution'] | undefined> =
    new MatTableDataSource();

  public displayedColumns: string[] = ['nom', 'phone', 'email'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.get() !== null) {
        this.index = +paramMap.get('index')!;
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
