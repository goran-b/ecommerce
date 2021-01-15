import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/model/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { AddProductComponent } from '../add-product/add-product.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { Category } from 'src/app/model/category.model';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products!: Product[];
  displayedColumns: string[] = ['position', 'name', 'description', 'price', "category", "edit", "delete"];
  dataSource!: MatTableDataSource<Product>;

  public parentData: Category = { id: '', name: '' }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private productsService: ProductsService, private snackBar: MatSnackBar) {
    this.productsService.$products.subscribe(result => {
      this.products = result
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  addProduct() {
    this.dialog.open(AddProductComponent, {
      width: '800px',height:'633px',
      data: {
        product: {} as Product,
        isEdit: false
      }
    })
      .afterClosed()
      .subscribe(result => {   
      });
  }

  editProduct(element: any) {
    this.dialog.open(AddProductComponent, {
      width: '600px', data: {
        product: element as Product,
        isEdit: true
      }
    })
      .afterClosed()
      .subscribe(result => {  
      });
  }

  deleteProduct(id: string) {
    this.dialog.open(ConfirmModalComponent, {
      width: '300px'
    })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.productsService.deleteProduct(id);
          this.snackBar.open("Product is deleted from Database", "", {
            duration: 2000,
          });
        }
      });
  }

  filterTable(event: Event) {
    if (this.dataSource !== ('' || undefined)) {
      if (this.parentData.name ==  undefined) {
        this.dataSource.filter = this.parentData.name
      } else {
        this.dataSource.filter = this.parentData.name.trim().toLowerCase()
      }
    } 
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}