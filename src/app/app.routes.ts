import { HomeComponent } from './pages/home/home.component';
import { DetallesComponent } from './pages/detalles/detalles.component';
import {  Routes } from '@angular/router';
import { CarritoComponent } from './elementos/carrito/carrito.component';
import { NewProductComponent } from './pages/new-product/new-product.component';
import { MenComponent } from './pages/men/men.component';
import { WomenComponent } from './pages/women/women.component';
import { ElectronicsComponent } from './pages/electronics/electronics.component';
import { JewelwryComponent } from './pages/jewelwry/jewelwry.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component:HomeComponent},
  { path: 'detalles/:id', component: DetallesComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'men', component: MenComponent },
  { path: 'women', component: WomenComponent },
  { path: 'electronics', component: ElectronicsComponent },
  { path: 'jewelery', component: JewelwryComponent },
  { path: 'new-product', component: NewProductComponent }
];
