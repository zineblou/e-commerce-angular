import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { CatgoryServiceService } from 'src/app/services/catgory-service.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  listCategories: ProductCategory[];



  constructor(private categoryService:CatgoryServiceService) { 
    this.listCategories = [];
  }

  ngOnInit(): void {
    this.listCategory();
  }

  listCategory(){
    this.categoryService.getCategories().subscribe(
      data => {
        this.listCategories = data;
      }
    )
  }

}

