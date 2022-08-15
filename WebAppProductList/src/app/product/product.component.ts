import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: any;
  productsArray: any[] = [];
  filterEnabled: boolean = false;
  showBottleView: boolean = true;

  constructor(private productService: ProductService) { }

  /* display list of products on page load*/
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((prod) => {
      this.products = prod;
      Object.entries(this.products).forEach((key, value) => {
        /* pushing only required values in a new array for ease*/
        this.productsArray.push({
          "name": this.products[value].name,
          "image": this.products[value].articles[0].image,
          "shortDescription": this.products[value].articles[0].shortDescription,
          "price": this.products[value].articles[0].price,
          "pricePerUnitText": this.products[value].articles[0].pricePerUnitText
        });
      });
    })
    this.productsArray.sort((low, high) => low.name - high.name);
  }

  /*function to sort the products in ascending, descening, low to high price and high to low price*/
  sort(event: any) {
    switch (event.target.value) {
      case "name_asc":
        {
          this.productsArray = this.productsArray.sort((low, high) => (low.name < high.name) ? -1 : 1);
          break;
        }
      case "name_desc":
        {
          this.productsArray = this.productsArray.sort((low, high) => (low.name < high.name) ? 1 : -1);
          break;
        }
      case "low":
        {
          this.productsArray = this.productsArray.sort((low, high) => low.price - high.price);
          break;
        }
      case "high":
        {
          this.productsArray = this.productsArray.sort((low, high) => high.price - low.price);
          break;
        }
    }

  }

  /*function to clear filter and toggle checkbox */
  clearFilter() {
    this.filterEnabled = false;
  }

  /*function to show bottleview/detailsview based on *ngIf condition.
    By default, bottle view is enabled.*/
  selectedView(event: any) {
    if (event.target.value == "detailsView") {
      this.showBottleView = false;
    } else {
      this.showBottleView = true;
    }
  }
}
