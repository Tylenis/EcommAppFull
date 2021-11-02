import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Cart } from '../models/cartModel';

import { Item } from '../models/ItemModel';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    cart: Cart | undefined;
    cartObs = new Subject<Cart>();

    addItemTocart(item: Item, qty: number): void {
        if (!this.cart) {
            this.cart = { id: 0, products: [{ item: item, qty: qty }] };
        } else {
            let found = 0;
            for (const prod of this.cart.products) {
                if (prod.item.id == item.id) {
                    prod.qty += qty;
                    found = 1;
                }
            }
            if (found == 0) {
                this.cart.products.push({ item: item, qty: qty });
            }
        }
        this.cartObs.next(this.cart);
    }

    removeItemFromCart(index: number): void {
        if (this.cart) {
            this.cart.products.splice(index, 1);
        }
        this.cartObs.next(this.cart);
    }

    decrementItem(cartindex: number): void {
        if (this.cart) {
            this.cart.products[cartindex].qty -= 1;
        }
        this.cartObs.next(this.cart);
    }

    incrementItem(cartindex: number): void {
        if (this.cart) {
            this.cart.products[cartindex].qty += 1;
        }
        this.cartObs.next(this.cart);
    }

    getCart(): Cart | undefined {
        if (this.cart) {
            return this.cart;
        } else {
            return undefined;
        }
    }

    clearCart(): void {
        this.cart = undefined;
        this.cartObs.next(this.cart);
    }
}
