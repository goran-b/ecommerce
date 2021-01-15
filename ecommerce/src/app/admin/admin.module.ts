import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { AdminRoutingModule } from './admin-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './order/order.component';
import { MaterialModule } from '../material/material.module';
import { CategoriesComponent } from './categories/categories.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './add-product/add-product.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AddCategoryComponent } from './add-category/add-category.component';



@NgModule({
  declarations: [HomeComponent, ProductsComponent, 
    OrdersComponent, OrderComponent, CategoriesComponent, AddProductComponent, ConfirmModalComponent, AddCategoryComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ]
})
export class AdminModule { }
