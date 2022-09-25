import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { AuthService } from 'src/app/shared/services/auth.service';
import { TicketService } from 'src/app/shared/services/ticket.service';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.scss'],
})
export class TicketFormComponent implements OnInit {
  public ticketForm!: FormGroup;
  public error!: string;
  public ticket!: any;
  public userId!: number;
  public number!: any;
  public modifyForm: boolean = false;
  public contributor!: boolean;
  public selectedPriority!: any;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TicketFormComponent>,
    private authService: AuthService,
    private ticketService: TicketService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      ticket?: any;
      project: any;
    }
  ) {}

  ngOnInit(): void {
    this.userId = +this.authService.getUserId();
    if (this.data.ticket == undefined) {
      this.ticketForm = this.initForm();
    } else {
      this.ticket = this.data.ticket;
      this.modifyForm = true;
      this.selectedPriority = +this.ticket.priority.id;
      this.ticketForm = this.initForm(this.ticket);
    }
  }

  public closeDialog() {}

  public submit() {
    if (this.data.ticket == undefined) {
      this.ticketForm.patchValue({ projectId: this.data.project.id });
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
      projectId: '',
      ticketsContribution: [{ user: { id: '' } }],
      statusId: 1,
      priorityId: '',
      typeId: '',
      ticketId: '',
    }
  ): FormGroup {
    return this.fb.group({
      title: [ticket.title, Validators.required],
      description: [ticket.description, Validators.required],
      estimateTime: [ticket.estimateTime, Validators.required],
      userId: [this.userId],
      projectId: [ticket.projectId],
      contributor: [ticket.ticketsContribution[0].user.id],
      statusId: [ticket.statusId.toString(), Validators.required],
      priorityId: [ticket.priorityId.toString(), Validators.required],
      typeId: [ticket.typeId.toString(), Validators.required],
      ticketId: [ticket.id],
    });
  }
}
