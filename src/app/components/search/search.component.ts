import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  searchProducts(keyword: string){
    console.log('search products where namqe like '+keyword);
    this.router.navigateByUrl(`/search/${keyword}`);
  }
}
