
import { Component, Input, OnInit } from '@angular/core';

import { Ticket } from 'src/app/shared/interfaces/ticket.inferface';

@Component({
  selector: 'app-tickets-information',
  templateUrl: './tickets-information.component.html',
  styleUrls: ['./tickets-information.component.scss'],
})
export class TicketsInformationComponent implements OnInit {
  @Input() public ticket?: Ticket;

  constructor() {}

  ngOnInit(): void {}
}
