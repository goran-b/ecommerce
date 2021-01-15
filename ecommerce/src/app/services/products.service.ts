import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';
import {
  catchError, filter, map, mergeMap, scan, shareReplay, tap, toArray, switchMap,
  mergeAll, max, reduce, concatMap, delay
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  $products!: Observable<any[]>;
  
  constructor(private firestore: AngularFirestore) {
    this.$products = this.getProducts()
  }

  saveProduct(product: Product) {
    this.saveProductToDataBase(product)
  }

  deleteProduct(id: string) {
    this.deleteProductInDatabase(id)
  }

  private getProducts() {
    return this.firestore.collection("products").snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Product;
        const id = a.payload.doc.id;
        return { ...data, id };
      }))
    );
  }

  private saveProductToDataBase(product: Product) {
    if (product.id == null) {
      this.firestore.collection('products').add(product);
    } else {
      this.firestore.doc('products/' + product.id).update(product)
    }
  }
  private deleteProductInDatabase(id: string) {
    this.firestore.doc('products/' + id).delete()
  }
}
