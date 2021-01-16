import { Component, EventEmitter, Output } from '@angular/core';
import { Category } from 'src/app/model/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent  {
  public categories!: Array<Category>;
  @Output() filter: EventEmitter<any> = new EventEmitter();

  constructor(private categoryService: CategoryService) {
    this.categoryService.$categories.subscribe(result => this.categories = result)
   }

  filterByCategory(value: Category) {
    this.filter.emit(value)
  }
}
