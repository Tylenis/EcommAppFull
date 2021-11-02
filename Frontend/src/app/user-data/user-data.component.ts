import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import {
    faCheckCircle,
    faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';

import { CartService } from '../services/cart.service';
import { Cart } from '../models/cartModel';

@Component({
    selector: 'app-user-data',
    templateUrl: './user-data.component.html',
    styleUrls: ['./user-data.component.css'],
})
export class UserDataComponent implements OnInit {
    cart: Cart | undefined;
    name = '';
    secondName = '';
    email = '';
    adress = '';
    city = '';
    state = '';
    zip = '';
    paywith = '';
    checkCircle = faCheckCircle;
    shoppingCart = faShoppingCart;
    closeResult = '';

    constructor(
        private router: Router,
        private modalService: NgbModal,
        private cartSevice: CartService
    ) {}

    ngOnInit(): void {
        this.cart = this.cartSevice.getCart();
    }

    open(content: TemplateRef<string>): void {
        this.modalService
            .open(content, { ariaLabelledBy: 'modal-basic-title' })
            .result.then(
                (result) => {
                    this.closeResult = `Closed with: ${result}`;
                    this.cartSevice.clearCart();
                    this.router.navigateByUrl('/');
                },
                (reason) => {
                    this.closeResult = `Dismissed ${this.getDismissReason(
                        reason
                    )}`;
                }
            );
    }

    private getDismissReason(reason: number): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    onSelectRadio(method: string): void {
        console.log(method)
    }

    onBack(): void {
        this.router.navigateByUrl('/cart/cartdata');
    }

    onSubmitOrder(form: NgForm, content: TemplateRef<string>): void {
        this.open(content);
    }
}
