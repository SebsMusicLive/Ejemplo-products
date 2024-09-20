import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { ProgressBarComponent } from "../../shared/progress-bar/progress-bar.component";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, ProgressBarComponent],
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.css'
})
export class AddEditProductComponent implements OnInit {
  form: FormGroup;
  loading:boolean = false;
  id:number; 
  operacion:string = 'Agregar ';
  
  constructor(private fb : FormBuilder,
    private _productService: ProductService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required]
    })

    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }
  ngOnInit(): void {
    if(this.id != 0){
      // Es editar
      this.operacion = 'Editar ';
      this.getProduct(this.id);
    }
  }
 
  getProduct(id:number){
    this.loading = true;
    this._productService.getProduct(id).subscribe((data:Product) => {
      console.log(data);
      this.loading = false;
      this.form.setValue({
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock
      })
    })
  }

  addProduct(){

    /* console.log(this.form.value.name);
    console.log(this.form.get('name')?.value); */

     const product: Product = {
      name: this.form.value.name,
      description: this.form.value.description,
      price: this.form.value.price,
      stock: this.form.value.stock
    }

    this.loading = true;

    if(this.id != 0){
      // Es editar
      this._productService.updateProduct(this.id, product).subscribe(() => {
      this.toastr.info(`El producto ${product.name} fue actualizado con exito!`, 'Producto actualizado');
    this.router.navigate(['/']);

      });
    }else{
      // Es agregar
    this._productService.saveProduct(product).subscribe(() => {
      this.toastr.success(`El producto ${product.name} fue agregado con exito!`, 'Producto agregado');
    this.router.navigate(['/']);
    });
    }
    this.loading = false;

    
  }

 
}
