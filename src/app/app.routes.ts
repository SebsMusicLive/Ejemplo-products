import { Routes } from '@angular/router';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';

// Componentes
export const routes: Routes = [
    {
        path: '',
        component: ListProductsComponent
    },
    {
        path:'add',
        component: AddEditProductComponent
    },
    {
        path: 'edit/:id',
        component: AddEditProductComponent
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
