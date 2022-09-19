import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from 'src/app/shared/interfaces/ticket.inferface';
import { TicketService } from 'src/app/shared/services/ticket.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent implements OnInit {
  @Input() public projectId?: number;
  ticketList$!: Observable<Ticket[] | null>;

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.ticketList$ = this.ticketService.getAllTickets();
  }
}
