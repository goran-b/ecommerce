import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from 'src/app/model/category.model';
import { Product } from 'src/app/model/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products!: Product[];
  productsList!: Product[];

  constructor(private productsService: ProductsService, private snackBar: MatSnackBar) {
    this.productsService.$products.subscribe(result => {
      this.products = result
      this.productsList = this.products
    })
  }

  ngOnInit(): void {
  }

  openProduct() {
    this.snackBar.open("Work in progress. Please check Admin page ", "", {
      duration: 3000,
    });
  }

  filterProducts(category: Category) {
    this.filter(category)
  }

  private filter(category: Category) {
    if (category.name == "") {
      console.log('sdsaddsa')
      this.productsList = this.products
    } else {
      this.productsList = this.products.filter(product => product.category == category.name)
    }
  }
}
