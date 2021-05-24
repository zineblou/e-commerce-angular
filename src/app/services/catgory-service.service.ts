import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';
@Injectable({
  providedIn: 'root'
})
export class CatgoryServiceService {

  private baseUrl= 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }

  getCategories():Observable<ProductCategory[]>{
    return this.httpClient.get<GetReponse>(this.baseUrl).pipe(
      map(response => response._embedded.categories)
      );
   
  }
}

 interface GetReponse{
  _embedded:{
  categories:ProductCategory[];
}
}


