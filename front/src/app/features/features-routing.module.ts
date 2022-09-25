import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from 'src/app/admin/admin.component';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';
import { DataUserGuard } from 'src/app/shared/guard/data-user.guard';
import { ProjectContainerComponent } from './projects/project-container/project-container.component';
import { TicketsComponent } from './tickets/tickets.component';
import { FeaturesComponent } from './features.component';
import { ProjectDetailsComponent } from './projects/project-container/project-details/project-details.component';
import { AdminFormComponent } from '../admin/admin-form/admin-form.component';
import { PROJECT_DETAIL_ID_PARAM } from '../shared/utils/type.params';

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
        path: 'resume/:' + PROJECT_DETAIL_ID_PARAM,
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
