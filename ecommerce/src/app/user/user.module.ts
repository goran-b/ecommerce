import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { UserRoutingModule } from './user-routing.module';



@NgModule({
  declarations: [HomeComponent, ProductsComponent],
  imports: [
    CommonModule,
    UserRoutingModule  
  ]
})
export class UserModule { }
