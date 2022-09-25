import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Project } from '../shared/interfaces/project.inferface';
import { User } from '../shared/interfaces/user.interface';
import { AuthService } from '../shared/services/auth.service';
import { ProjectService } from '../shared/services/project.service';
import { TicketService } from '../shared/services/ticket.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent implements OnInit {
  public isAdmin!: boolean;
  public subscription = new Subscription();
  public userId!: number;
  public auth$: Observable<User | null> = this.authService.auth$.asObservable();

  public projects!: Project[];

  constructor(
    private authService: AuthService,
    private projectService: ProjectService,
    private userService: UserService,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.getIsAdmin();
    this.userId = parseInt(this.authService.getUserId());
    if (this.isAdmin) {
      this.subscription.add(
        this.projectService.getProjects().subscribe((projects) => {
          this.projects = projects;
        })
      );
      this.subscription.add(this.ticketService.getAllTickets().subscribe());
    } else {
      this.subscription.add(
        this.projectService.getProjects(this.userId).subscribe((projects) => {
          this.projects = projects;
        })
      );
      this.subscription.add(
        this.ticketService.getAllTickets(this.userId).subscribe()
      );
    }

    this.subscription.add(this.userService.getAllUsers().subscribe());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
