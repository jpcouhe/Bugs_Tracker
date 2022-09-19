import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from '../core/core.module';
import { FeaturesComponent } from './features.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProjectContainerComponent } from './projects/project-container/project-container.component';
import { ProjectListComponent } from './projects/project-container/project-list/project-list.component';
import { ProjectDetailsComponent } from './projects/project-container/project-details/project-details.component';
import { ProjectFormComponent } from './projects/project-container/project-form/project-form.component';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketsInformationComponent } from './tickets/tickets-information/tickets-information.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TicketsListComponent } from './tickets/tickets-list/tickets-list.component';
import { TicketFormComponent } from './tickets/ticket-form/ticket-form.component';
import { AdminModule } from '../admin/admin.module';
import { AdminRoutingModule } from '../admin/admin-routing.module';
import { TicketsCommentsComponent } from './tickets/tickets-comments/tickets-comments.component';

@NgModule({
  declarations: [
    FeaturesComponent,
    ProjectContainerComponent,
    ProjectListComponent,
    ProjectDetailsComponent,
    ProjectFormComponent,
    TicketsInformationComponent,
    TicketsComponent,
    TicketsListComponent,
    TicketFormComponent,
    TicketsCommentsComponent,
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    SharedModule,
    CoreModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    AdminModule,
    AdminRoutingModule,
  ],
})
export class FeatureModule {}
