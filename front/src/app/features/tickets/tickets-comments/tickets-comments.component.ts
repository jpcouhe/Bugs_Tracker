import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ticket } from 'src/app/shared/interfaces/ticket.inferface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TicketService } from 'src/app/shared/services/ticket.service';

@Component({
  selector: 'app-tickets-comments',
  templateUrl: './tickets-comments.component.html',
  styleUrls: ['./tickets-comments.component.scss'],
})
export class TicketsCommentsComponent implements OnInit, OnDestroy {
  commentCtrl!: FormControl;
  public subscription!: Subscription;
  @Input() public ticket?: Ticket | null;
  public comments!: any;
  public userId!: string;
  constructor(
    private fb: FormBuilder,
    private ticketService: TicketService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.subscription = this.ticketService
      .getCommentByTicket(this.ticket?.id!)
      .subscribe((comment: Comment[]) => {
        this.comments = comment;
      });

    this.commentCtrl = this.fb.control('', [
      Validators.required,
      Validators.minLength(10),
    ]);
  }

  ngOnChanges() {
    this.subscription = this.ticketService
      .getCommentByTicket(this.ticket?.id!)
      .subscribe((comment: Comment[]) => {
        this.comments = comment;
      });
  }

  onLeaveComment() {
    const comment = {
      user: this.userId,
      content: this.commentCtrl.value,
    };
    this.ticketService
      .postComment(this.ticket?.id!, comment)
      .subscribe((data) => {
        this.comments.push(data);
      });

    this.commentCtrl.reset();
  }

  removeComment(id: number, index: number) {
    this.ticketService.removeComment(id).subscribe(() => {
      this.comments.splice(index, 1);
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
