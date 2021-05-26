import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product?: Product;
  constructor(private productService:ProductService,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.getProductDetails();
    }

    )
  }

  getProductDetails(){
    const productId:number = Number( this.route.snapshot.paramMap.get("id"));
    console.log("Received product id: "+productId);
    this.productService.getProductById(productId).subscribe(data => this.product = data);
    console.log("Received product: "+this.product?.name);

  }
}
