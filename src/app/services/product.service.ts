import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import{ map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
  private baseUrl:string = 'http://localhost:8080/api/products';

  private categoryUrl:string = 'http://localhost:8080/api/productCategories';
  
  constructor(private httpClient: HttpClient) { }

  getProductList(categoryId: number) :Observable<Product[]>{

    const searchUrl:string = this.baseUrl+"/search/findByCategoryId?id="+categoryId+"&size=100";

    return this.httpClient.get<GetReponse>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }
  getProductListPaginate(thePage:number, thePageSize: number, categoryId: number) :Observable<GetReponse>{

    const searchUrl:string = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}&page=${thePage}&size=${thePageSize}`; 
    return this.httpClient.get<GetReponse>(searchUrl);
  }

  getCategoryList():Observable<ProductCategory[]> {
    
    return this.httpClient.get<GetCategory>(this.categoryUrl).pipe(map(res => res._embedded.productCategories));
  }

  getProductsBykeyWord(keyword: string):Observable<Product[]>{
    const searchUrl:string = `http://localhost:8080/api/products/search/findByNameContaining?name=${keyword}`;

    return this.httpClient.get<GetReponse>(searchUrl).pipe(map(response => response._embedded.products));
  }

  getProductById(productId: number): Observable<Product>{
    const getProductUrl: string = `http://localhost:8080/api/products/${productId}`;
    console.log("getProductUrl: "+getProductUrl);
    return this.httpClient.get<Product>(getProductUrl);
  }
}


interface GetCategory{
  _embedded: {
    productCategories: ProductCategory[];
  }
}


interface GetReponse{
  _embedded:{
    products: Product[];
  }
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
    }
}
