import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Category } from '../model/category.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  $categories!: Observable<Category[]>;

  constructor(private firestore: AngularFirestore) {
    this.$categories = this.getCategories()
  }

  saveCategory(category: Category) {
    this.saveCategoryToDataBase(category)
  }

  deleteCategory(id: string) {
    this.deleteCategoryInDatabase(id)
  }

  private getCategories() {
    return this.firestore.collection("categories").snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Category;
        const id = a.payload.doc.id;
        return { ...data, id };
      }))
    );
  }

  private saveCategoryToDataBase(category: Category) {
    if (category.id == null) {
      this.firestore.collection('categories').add(category);
    } else {
      this.firestore.doc('categories/' + category.id).update(category)
    }
  }
  private deleteCategoryInDatabase(id: string) {
    this.firestore.doc('categories/' + id).delete()
  }
}
