import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import{ map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl:string = 'http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) { }

  getProductList(categoryId: number) :Observable<Product[]>{

    const searchUrl:string = this.baseUrl+"/search/findByCategoryId?id="+categoryId+"&size=100";

    return this.httpClient.get<GetReponse>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }
}

interface GetReponse{
  _embedded:{
    products: Product[];
  }
}
