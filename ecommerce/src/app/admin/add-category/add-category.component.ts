import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from 'src/app/model/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  public form!: FormGroup;
  public category: Category={} as Category;
  private isEdit = false;

  constructor(public formBuilder: FormBuilder,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddCategoryComponent>,
    private snackBar: MatSnackBar
  ) {
    this.isEdit = data.isEdit;
    if(this.isEdit)
    this.category = data.category.category 
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [this.category.name, Validators.required],
    });
  }
  
  save({ value, valid }: { value: Category, valid: boolean }) {
    if (valid) {
      if (this.isEdit)
        value.id = this.category.id
      this.categoryService.saveCategory(value)
      this.form.reset();
      this.snackBar.open("Category is saved to Database", "", {
        duration: 2000,
      });
      this.dialogRef.close();
    }
  }

  close() {
    this.dialogRef.close();
  }
}
