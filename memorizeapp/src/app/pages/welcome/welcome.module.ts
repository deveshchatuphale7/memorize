import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import { HomeComponent } from '../home/home.component';
import { CreateComponent } from '../create/create.component';
import { ViewComponent } from '../view/view.component';

import { CommonModule } from '@angular/common'

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzCardModule } from 'ng-zorro-antd/card';


@NgModule({
  imports: [CommonModule,WelcomeRoutingModule,NzGridModule,FormsModule,ReactiveFormsModule,
    NzButtonModule,NzInputModule,NzSelectModule,NzModalModule,
    NzLayoutModule,
    NzMenuModule,
    NzFormModule,NzTagModule,NzCardModule],
  declarations: [WelcomeComponent,HomeComponent,CreateComponent,ViewComponent],
  exports: [WelcomeComponent,HomeComponent,CreateComponent]
})
export class WelcomeModule { }
