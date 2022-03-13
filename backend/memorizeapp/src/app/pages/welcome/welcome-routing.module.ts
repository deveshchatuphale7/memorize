import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
import { HomeComponent } from '../home/home.component';
import { CreateComponent } from '../create/create.component';


const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'create', component: CreateComponent },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule { }
