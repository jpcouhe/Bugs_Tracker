import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Ticket } from 'src/app/shared/interfaces/ticket.inferface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProjectService } from 'src/app/shared/services/project.service';
import { TicketService } from 'src/app/shared/services/ticket.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.scss'],
})
export class TicketFormComponent implements OnInit {
  @Input() public projectId!: number;

  public ticketForm!: FormGroup;
  public error!: string;
  public ticket!: any;
  public userId!: number;
  public number!: any;
  public modifyForm: boolean = false;

  public selectedPriority!: any;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TicketFormComponent>,
    private authService: AuthService,
    private ticketService: TicketService,
    @Inject(MAT_DIALOG_DATA) public data: []
  ) {}

  ngOnInit(): void {
    this.userId = +this.authService.getUserId();
    this.ticket = this.data;

    if (typeof this.data === 'number') {
      this.ticketForm = this.initForm();
    } else {
      this.modifyForm = true;

      this.selectedPriority = +this.ticket.priority.id;
      this.ticketForm = this.initForm(this.ticket);
    }
  }

  public closeDialog() {}

  public submit() {
    if (typeof this.data === 'number') {
      this.ticketForm.patchValue({ projectId: this.data });
      this.ticketService
        .createTicket(this.ticketForm.getRawValue())
        .subscribe((data) => {
          this.dialogRef.close(data);
        });
    } else {
      this.ticketService
        .updateTicket(this.ticket.id, this.ticketForm.getRawValue())
        .subscribe((data) => {
          this.dialogRef.close(data);
        });
    }
  }

  public initForm(
    ticket: any = {
      title: '',
      description: '',
      estimateTime: '',
      userId: '',
      project: {
        id: '',
      },
      status: {
        id: 1,
      },
      priority: {
        id: '',
      },
      type: {
        id: '',
      },
    }
  ): FormGroup {
    return this.fb.group({
      title: [ticket.title, Validators.required],
      description: [ticket.description, Validators.required],
      estimateTime: [ticket.estimateTime, Validators.required],
      userId: [this.userId],
      projectId: [ticket.project.id],
      statusId: [ticket.status.id.toString(), Validators.required],
      priorityId: [ticket.priority.id.toString(), Validators.required],
      typeId: [ticket.type.id.toString(), Validators.required],
      ticketId: [ticket.id],
    });
  }
}
