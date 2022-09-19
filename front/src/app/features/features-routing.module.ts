import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from 'src/app/admin/admin.component';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';
import { DataUserGuard } from 'src/app/shared/guard/data-user.guard';
import { ProjectContainerComponent } from './projects/project-container/project-container.component';
import { TicketsComponent } from './tickets/tickets.component';
import { ProjectListComponent } from './projects/project-container/project-list/project-list.component';
import { FeaturesComponent } from './features.component';
import { ProjectDetailsComponent } from './projects/project-container/project-details/project-details.component';
import { ProjectFormComponent } from './projects/project-container/project-form/project-form.component';
import { AdminFormComponent } from '../admin/admin-form/admin-form.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [DataUserGuard, AuthGuard],
    component: FeaturesComponent,
    children: [
      {
        path: 'resume',
        component: ProjectContainerComponent,
      },
      {
        path: 'resume/:index',
        component: ProjectDetailsComponent,
      },
      { path: 'tickets', component: TicketsComponent },
      {
        path: 'admin',
        component: AdminComponent,
        children: [
          { path: 'edit/:index', component: AdminFormComponent, outlet: 'sub' },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
