import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { UserRoutingModule } from './user-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { MaterialModule } from '../material/material.module';
import { CategoryListComponent } from './category-list/category-list.component';




@NgModule({
  declarations: [HomeComponent, ProductsComponent, CategoryListComponent],
  imports: [
    CommonModule,
    UserRoutingModule  ,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MaterialModule
  ]
})
export class UserModule { }
