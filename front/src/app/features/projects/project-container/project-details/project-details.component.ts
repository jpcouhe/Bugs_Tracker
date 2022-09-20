import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Project } from 'src/app/shared/interfaces/project.inferface';
import { ProjectService } from 'src/app/shared/services/project.service';
import { Subscription, tap } from 'rxjs';
import { Ticket } from 'src/app/shared/interfaces/ticket.inferface';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ProjectFormComponent } from '../project-form/project-form.component';

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

  public dataSource: MatTableDataSource<Ticket | null> =
    new MatTableDataSource();

  public displayedColumns: string[] = ['nom', 'phone', 'email'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.index = +paramMap.get('index')!;
    });

    this.projectService.getOneProject(this.index).subscribe((project: any) => {
      this.project = project[0];
      this.dataSource = project[0].contribution;
    });
  }
  getInfo(event: any) {
    this.ticket = event;
  }
}
