import { identifierModuleUrl } from '@angular/compiler';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  currentCategoryId?: number = 1;
  previousCategoryId?: number = 1;
  searchMode: boolean = false;

  // new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 10;
  theTotalElements: number = 0;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { 
    this.products = [];
  }

  ngOnInit(): void {
      this.route.paramMap.subscribe(()=>{
      this.getProduct();
    })
   
  }

  getProduct(){
    this.searchMode = this.route.snapshot.paramMap.has("keyword");
    if(this.searchMode){
      this.handleSearchProduct();
      console.log('Search MOOODEEE')
    }
    else{
    this.handleListProduct();
    console.log('GEt MOOODEE');

    }
  }

  handleSearchProduct() {
    const thekeyWork: string = String(this.route.snapshot.paramMap.get('keyword'));
   this.productService.getProductsBykeyWord(thekeyWork).subscribe(data => {
     this.products = data;
   });
  }

  handleListProduct(){
    // check if "id" parameter is available route: is the activated route, snapshot: state of route at this givven moment and time, paramMap: Map of all route param
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if(hasCategoryId){

      // get the "id" parameters, convert string to a number 
      this.currentCategoryId = Number(this.route.snapshot.paramMap.get('id'));       
    }
    else{
      // not category id available ... default to category id 1
      this.currentCategoryId = 1;
    }

    //
    // Check if we have a different category id than the previous
    // Note: Angular will reuse component if it is currently being viewed
    //

    // if we have a different categoryId than the previous
    // Then we have to reset the PageNumber to 1
    if(this.currentCategoryId != this.previousCategoryId){
      
      this.thePageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;
    /** 
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        //console.log('Product = '+JSON.stringify(data));

        this.products = data;
      }
    )
    */
   this.productService.getProductListPaginate(this.thePageNumber - 1, 
                                              this.thePageSize,
                                              this.currentCategoryId).subscribe(this.processResult());

  }
  processResult(){
    return (data: GetReponse)=> {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
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

