import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminFormComponent } from './admin-form/admin-form.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path: 'edit', component: AdminFormComponent, outlet: 'sub' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
