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

  public auth$: Observable<User | null> = this.authService.auth$.asObservable();

  public projects!: Project[];

  constructor(
    private authService: AuthService,
    private projectService: ProjectService,
    private userService: UserService,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.auth$.subscribe((user) => {
        if (user?.roleId === 1) {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      })
    );

    this.subscription.add(
      this.projectService.getProjects().subscribe((projects) => {
        this.projects = projects;
      })
    );

    this.subscription.add(this.userService.getAllUsers().subscribe());
    this.subscription.add(this.ticketService.getAllTickets().subscribe());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
