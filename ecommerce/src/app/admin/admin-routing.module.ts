import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';



const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [{
            path: '',
            redirectTo: 'products',
            pathMatch: 'full'
        },
        {
            path: 'products',
            component: ProductsComponent
        }, {
            path: 'orders',
            component: OrdersComponent
        }, {
            path: 'order/:id',
            component: OrderComponent
        }, {
            path: 'add-product',
            component: AddProductComponent
        }
        ]
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
