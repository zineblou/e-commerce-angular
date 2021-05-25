import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  currentCategoryId?: number;
  searchMode: boolean = false;

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
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        //console.log('Product = '+JSON.stringify(data));

        this.products = data;
      }
    )

  }
    
}


