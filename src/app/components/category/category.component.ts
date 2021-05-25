import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/common/category';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

   listCategories: ProductCategory[];
  length?:number ;


  constructor(private productService:ProductService) { 
    this.listCategories = [];
  }

  ngOnInit() {
    this.listCategory();
  }

  listCategory(){
    this.productService.getCategoryList().subscribe(
      data => {
        this.listCategories = data;
        console.log('Product Categories= '+JSON.stringify(data));

        this.length = this.listCategory.length;
        console.log('Length = '+this.length);
         }
    )
  }

}

