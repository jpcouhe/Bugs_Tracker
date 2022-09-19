import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ContainerComponent } from './container/container.component';
import { SharedModule } from '../shared/shared.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { LoginComponent } from './container/login/login.component';
import { SignupComponent } from './container/signup/signup.component';



@NgModule({
  declarations: [ContainerComponent, LoginComponent, SignupComponent],
  imports: [CommonModule, AuthRoutingModule, SharedModule,ReactiveFormsModule,
    FormsModule],

})
export class AuthModule {}
