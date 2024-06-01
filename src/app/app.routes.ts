import { HomeComponent } from './pages/home/home.component';
import { DetallesComponent } from './pages/detalles/detalles.component';
import {  Routes } from '@angular/router';
import { CarritoComponent } from './elementos/carrito/carrito.component';
import { NewProductComponent } from './pages/new-product/new-product.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component:HomeComponent},
  { path: 'detalles/:id', component: DetallesComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'new-product', component: NewProductComponent }
];
