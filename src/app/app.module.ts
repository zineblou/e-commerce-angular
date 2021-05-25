import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { from } from 'rxjs';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import {HttpClientModule} from '@angular/common/http'
import { ProductService } from './services/product.service';
import { CategoryComponent } from './components/category/category.component';
import { CatgoryServiceService } from './services/catgory-service.service';
import { Route, RouterModule } from '@angular/router';
import { Category } from './common/category';
import { SearchComponent } from './components/search/search.component';

const routes:Route[] = [
{path: 'search/:keyword', component: ProductListComponent},
{path: 'category/:id', component: ProductListComponent},
{path: 'category', component: ProductListComponent},
{path: 'products', component: ProductListComponent},
{path: '', redirectTo:'/products', pathMatch:'full'},
{path: '**', redirectTo:'/products', pathMatch: 'full'}
]


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    CategoryComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ProductService, 
    CatgoryServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
