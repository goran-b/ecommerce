import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventEmitter } from '@angular/core';
import { Category } from 'src/app/model/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  public form!: FormGroup;
  public categories!: Array<Category>;
  public selected: Category = { id: '', name: '' }

  @Input() childData!: Category;
  @Output() childDataChange = new EventEmitter();
  @Output() filter: EventEmitter<any> = new EventEmitter();

  constructor(private categoryService: CategoryService, private dialog: MatDialog, private snackBar: MatSnackBar, public formBuilder: FormBuilder) {
    this.categoryService.$categories.subscribe(result => this.categories = result)
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      category: [this.selected.name, Validators.required],
    });
  }

  onModelChange(value: Category) {
    this.childDataChange.emit(value);
    this.filter.emit(null)
  }

  deleteCategory(category: Category) {
    this.dialog.open(ConfirmModalComponent, {
      width: '300px'
    })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.categoryService.deleteCategory(category.id);
          this.snackBar.open("Category is deleted from Database", "", {
            duration: 2000,
          });
          this.onModelChange({ id: '', name: '' })
        }
      })
  }

  editCategory(category: Category) {
    this.dialog.open(AddCategoryComponent, {
      width: '600px', data: {
        category,
        isEdit: true
      }
    })
      .afterClosed()
      .subscribe(result => {
        this.onModelChange({ id: '', name: '' })
      });
  }
  addCategory() {
    this.dialog.open(AddCategoryComponent, {
      width: '600px',
      data: {
        category: {} as Category,
        isEdit: false
      }
    })
      .afterClosed()
      .subscribe(result => {
        this.onModelChange({ id: '', name: '' })
      });
  }
}