import { Component, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventEmitter } from 'events';
import { Category } from 'src/app/model/category.model';
import { Product } from 'src/app/model/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  public categories!: Array<Category>
  public form!: FormGroup;
  public product!: Product;
  private isEdit = false

  @Output("sendData") public insideData = new EventEmitter();

  constructor( 
  public formBuilder: FormBuilder,
  private productsService:ProductsService,
  @Inject(MAT_DIALOG_DATA) public data:any,
  private dialogRef: MatDialogRef<AddProductComponent>,
  private snackBar: MatSnackBar,
  private categoryService: CategoryService) { 
    this.categoryService.$categories.subscribe(result => this.categories = result)
    this.isEdit = data.isEdit;
    this.product=data.product
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [this.product.name, Validators.required],
      description: [this.product.description, Validators.required],
      imgUrl: [this.product.imgUrl],
      price: [this.product.price, Validators.required],
      category: [this.product.category, Validators.required]
    });

  }


  save({ value, valid }: { value: Product, valid: boolean }) {
    if (valid) {
      if(this.isEdit)
      value.id=this.product.id
      this.productsService.saveProduct(value)
      this.form.reset();
      this.snackBar.open("Product is saved to Database","" ,{
        duration: 2000,
      });
      this.dialogRef.close();
    }
  }
}

