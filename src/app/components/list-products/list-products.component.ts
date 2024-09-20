import { Component } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProgressBarComponent } from "../../shared/progress-bar/progress-bar.component";

import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [CommonModule, RouterLink, ProgressBarComponent,],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent {

  listProducts: Product[]=[]

  loading:boolean = false;

  constructor(private _productService: ProductService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getListProducts();
  }

  getListProducts() {
    this.loading = true;

    this._productService.getListProducts().subscribe((data: Product[]) => {
      this.listProducts = data;
      this.loading = false;
    })   
  }

  deleteProduct(id:number){
    this.loading = true;
    this._productService.deleteProduct(id).subscribe(() => {
      this.getListProducts();
      this.toastr.warning('El producto fue eliminado con éxito!', 'Producto eliminado');
    })
  }
}
