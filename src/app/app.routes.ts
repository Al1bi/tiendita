import { HomeComponent } from './pages/home/home.component';
import { DetallesComponent } from './pages/detalles/detalles.component';
import {  Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component:HomeComponent},
  { path: 'detalles/:id', component: DetallesComponent }
];
