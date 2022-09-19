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
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Ticket } from 'src/app/shared/interfaces/ticket.inferface';
import { TicketService } from 'src/app/shared/services/ticket.service';
import { TicketFormComponent } from '../ticket-form/ticket-form.component';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.scss'],
})
export class TicketsListComponent implements OnInit {
  @Input() public tickets?: Ticket[] | null;
  @Input() public projectId?: number;

  @Output() private displayTicket: EventEmitter<any> = new EventEmitter();
  @ViewChild(MatSort, { static: false }) public sort!: MatSort;
  @ViewChild(MatPaginator) public paginator!: MatPaginator;

  
  public dataSource: MatTableDataSource<Ticket | null> =
    new MatTableDataSource();

  public displayedColumns: string[] = [
    'title',
    'description',
    'status.name',
    'priority.name',
    'type.name',
    'author',
    'createdAt',
    'actions',
  ];

  constructor(
    private ticketService: TicketService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.projectId) {
      this.ticketService
        .getTicketsByProject(this.projectId)
        .subscribe((tickets: Ticket[]) => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.data = tickets;
          this.dataSource.sortingDataAccessor = (item: any, property: any) => {
            switch (property) {
              case 'priority.name':
                return item.priority.name;
              case 'type.name':
                return item.priority.name;
              case 'status.name':
                return item.priority.name;
              default:
                return item[property];
            }
          };
          this.dataSource.sort = this.sort;
        });
    } else {
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.tickets!;
      this.dataSource.sort = this.sort;
    }

    // Permet de faire des recherche sur les objets Nested
    this.dataSource.filterPredicate = (data: any, filter) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    };
  }

  ngOnChanges() {
    this.dataSource.data = this.tickets!;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  openForm() {
    const ref = this.dialog.open(TicketFormComponent, {
      width: '600px',
      data: this.projectId,
    });

    ref.afterClosed().subscribe((data: any) => {
      if (data !== undefined) {
        const newData: any = this.dataSource.data;
        newData.push(data);
        this.dataSource.data = newData;
      }
    });
  }

  displayInfo(row: any) {
    if (this.projectId) {
      this.displayTicket.emit(row);
    }
  }

  filtrer(event: Event) {
    let filtre = (event.target as HTMLInputElement).value;
    filtre = filtre.trim();
    filtre = filtre.toLowerCase();
    this.dataSource.filter = filtre;
  }

  modifyTicket(row: any) {
    const ref = this.dialog.open(TicketFormComponent, {
      width: '600px',
      data: row,
    });

    ref.afterClosed().subscribe((data: any) => {
      if (data !== undefined) {
        const newData: any = this.dataSource.data;
        const filter = newData.filter((value: any) => {
          return value.id !== data.id;
        });

        this.dataSource.data = [...filter, data];
      }
    });
  }

  onDelete(row: any) {
    this.ticketService.deleteTicket(row.id).subscribe();
    const newData: any = this.dataSource.data;
    const filter = newData.filter((value: any) => {
      return value.id !== row.id;
    });
    this.dataSource.data = filter;
  }
}
