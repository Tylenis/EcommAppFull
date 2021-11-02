import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { Cart } from '../models/cartModel';
import { CartService } from '../services/cart.service';

@Component({
    selector: 'app-cart-data',
    templateUrl: './cart-data.component.html',
    styleUrls: ['./cart-data.component.css'],
})
export class CartDataComponent implements OnInit {
    cart: Cart | undefined;
    total = 0;
    shoppingCart = faShoppingCart;

    constructor(private cartService: CartService, private router: Router) {}

    ngOnInit(): void {
        this.cart = this.cartService.getCart();
        this.cartService.cartObs.subscribe((data) => {
            this.cart = data;
        });
        this.getTotal();
    }

    getTotal(): void {
        this.total = 0;
        this.cart?.products.forEach((el) => {
            this.total = this.total + parseFloat(el.item.price) * el.qty;
        });
    }

    onDecrement(index: number): void {
        if (this.cart) {
            if (this.cart.products[index].qty > 1) {
                this.cartService.decrementItem(index);
                this.getTotal();
            }
        }
    }

    onIncrement(index: number): void {
        if (this.cart) {
            this.cartService.incrementItem(index);
            this.getTotal();
        }
    }

    onRemove(index: number): void {
        if (this.cart) {
            this.cartService.removeItemFromCart(index);
            this.getTotal();
        }
    }

    goToShipment(): void {
        this.router.navigateByUrl('/cart/userdata');
    }
}
