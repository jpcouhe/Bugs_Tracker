import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Ticket } from 'src/app/shared/interfaces/ticket.inferface';
import { User } from 'src/app/shared/interfaces/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TicketService } from 'src/app/shared/services/ticket.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent implements OnInit {
  @Input() public projectId?: number;
  public subscription = new Subscription();
  public auth$: Observable<User | null> = this.authService.auth$.asObservable();
  public isAdmin!: boolean;
  public userId!: number;
  ticketList$!: Observable<Ticket[] | null>;

  constructor(
    private ticketService: TicketService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.getIsAdmin();
    this.userId = parseInt(this.authService.getUserId());
    // this.subscription.add(
    //   this.auth$.subscribe((user) => {
    //     if (user?.roleId === 1) {
    //       this.isAdmin = true;
    //     } else {
    //       this.isAdmin = false;
    //       this.userId = user?.id!;
    //     }
    //   })
    // );
    if (this.isAdmin) {
      this.ticketList$ = this.ticketService.getAllTickets();
    } else {
      this.ticketList$ = this.ticketService.getAllTickets(this.userId);
    }
  }
}
