import { Component, OnDestroy, OnInit } from '@angular/core';
import { XAxisComponent } from '@swimlane/ngx-charts';
import { Observable, Subscription } from 'rxjs';
import { Project } from '../../interfaces/project.inferface';
import { Ticket } from '../../interfaces/ticket.inferface';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit, OnDestroy {
  public ticketList!: any;
  public subscription!: Subscription;
  public priority!: any;
  public sumPriority!: any;
  public status!: {}[];
  public type!: {}[];

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.subscription = this.ticketService.ticket$.subscribe((ticket) => {
      this.ticketList = ticket;
      this.priority = this.ticketList.map((value: any) => {
        const newObj = {
          name: value.priority.name,
          value: 1,
        };

        return newObj;
      });
      this.status = this.ticketList.map((value: any) => {
        const newObj = {
          name: value.status.name,
          value: 1,
        };
        return newObj;
      });
      this.type = this.ticketList.map((value: any) => {
        const newObj = {
          name: value.type.name,
          value: 1,
        };
        return newObj;
      });
      this.priority = this.tagazok(this.priority);
      this.status = this.tagazok(this.status);
      this.type = this.tagazok(this.type);
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  tagazok = (array: any[]) => {
    let result: any[] = [];
    let resultArray: any[] = [];
    array.forEach((x: any) => {
      if (typeof result[x.name] === 'undefined') {
        result[x.name] = x.value;
      } else {
        result[x.name] += x.value;
      }
    });
    for (const [key, value] of Object.entries(result))
      resultArray.push({ name: key, value: value });

    return resultArray;
  };
}
