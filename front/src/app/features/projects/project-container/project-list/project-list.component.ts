import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Project } from 'src/app/shared/interfaces/project.inferface';
import { User } from 'src/app/shared/interfaces/user.interface';
import { ProjectFormComponent } from '../project-form/project-form.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
  @Input() public projects!: Project[] | null;
  @Input() public users!: User[] | null;
  @Input() public isAdmin!: boolean;
  @Output() private deleteProject: EventEmitter<any> = new EventEmitter();
  @Output() private updateProject: EventEmitter<any> = new EventEmitter();
  @ViewChild(MatPaginator) public paginator!: MatPaginator;

  public dataSource: MatTableDataSource<Project | null> =
    new MatTableDataSource();
  public displayedColumns: string[] = [
    'name',
    'description',
    'contributor',
    'actions',
  ];

  constructor(private route: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource.data = this.projects!;
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges() {
    this.dataSource.data = this.projects!;
    this.dataSource.paginator = this.paginator;
  }
  displayProject(project: Project) {
    this.route.navigate([`/dashboard/resume/${project}`]);
  }

  openForm() {
    this.dialog.open(ProjectFormComponent, {
      width: '600px',
    });
  }

  modifyProject(project: Project) {
    this.dialog.open(ProjectFormComponent, {
      width: '600px',
      data: project,
    });
    // this.updateProject.emit(project);
  }

  onDelete(index: number) {
    this.deleteProject.emit(index);
  }
}
