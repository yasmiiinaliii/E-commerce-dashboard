import { Product } from './../models/product';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../../../../../apps/admin/src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  apiURLProducts = environment.apiUrl + 'products';

  constructor(private http: HttpClient) { 

  }
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiURLProducts);
  }
  
  addProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(this.apiURLProducts, productData);
  }
  
  deleteProduct(productId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURLProducts}/${productId}`);
  }

  getProduct(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiURLProducts}/${productId}`);
  }

  updateProduct(productData: FormData, productId: number): Observable<Product> {
    return this.http.put<Product>(`${this.apiURLProducts}/${productId}`, productData);
  }
}