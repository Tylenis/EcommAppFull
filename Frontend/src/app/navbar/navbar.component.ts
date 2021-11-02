import { Component, OnInit } from '@angular/core';
import { faBars, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { Cart } from '../models/cartModel';
import { CartService } from '../services/cart.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
    faBars = faBars;
    shoppingCart = faShoppingCart;
    cartItems = 0;

    constructor(private cartService: CartService) {}

    ngOnInit(): void {
        this.cartService.cartObs.subscribe((cart: Cart) => {
            this.cartItems = 0;
            if (cart) {
                cart.products.forEach((item) => {
                    this.cartItems += item.qty;
                });
            }
        });
    }
}
