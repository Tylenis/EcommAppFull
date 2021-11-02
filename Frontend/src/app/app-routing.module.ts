import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartDataComponent } from './cart-data/cart-data.component';
import { CartComponent } from './cart/cart.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ItemsDisplayComponent } from './items-display/items-display.component';
import { UserDataComponent } from './user-data/user-data.component';

const routes: Routes = [
    { path: '', component: ItemsDisplayComponent },
    {
        path: 'cart',
        component: CartComponent,
        children: [
            { path: 'cartdata', component: CartDataComponent },
            { path: 'userdata', component: UserDataComponent },
        ],
    },
    { path: 'itemdetail/:id', component: ItemDetailComponent },
    { path: '**', redirectTo: '' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
