import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import { HomeComponent } from '../home/home.component';
import { CreateComponent } from '../create/create.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzModalModule } from 'ng-zorro-antd/modal';


@NgModule({
  imports: [WelcomeRoutingModule,NzGridModule,FormsModule,ReactiveFormsModule,
    NzButtonModule,NzInputModule,NzSelectModule,NzModalModule],
  declarations: [WelcomeComponent,HomeComponent,CreateComponent],
  exports: [WelcomeComponent,HomeComponent,CreateComponent]
})
export class WelcomeModule { }
