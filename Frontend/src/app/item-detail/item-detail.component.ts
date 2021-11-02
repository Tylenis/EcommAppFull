import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import { Item } from '../models/ItemModel';
import { ItemService } from '../services/item.service';
import { CartService } from '../services/cart.service';
import { Cart } from '../models/cartModel';

@Component({
    selector: 'app-item-detail',
    templateUrl: './item-detail.component.html',
    styleUrls: ['./item-detail.component.css'],
})
export class ItemDetailComponent implements OnInit {
    item: Item | undefined;
    cart: Cart | undefined;
    qty = 0;
    timesCircle = faTimesCircle;
    closeResult = '';
    loaded = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private itemService: ItemService,
        private cartSevice: CartService,
        private modalService: NgbModal
    ) {}

    ngOnInit(): void {
        const routeParams = this.route.snapshot.paramMap;
        const productIdFromRoute = Number(routeParams.get('id'));
        this.itemService.getOneItem(productIdFromRoute).subscribe((res) => {
            this.item = res;
            this.loaded = true;
        });
        this.cartSevice.cartObs.subscribe((res) => {
            this.cart = res;
        });
    }

    open(content: TemplateRef<string>, item: Item): void {
        this.cartSevice.addItemTocart(item, this.qty);
        this.modalService
            .open(content, { ariaLabelledBy: 'modal-basic-title' })
            .result.then(
                (result) => {
                    this.closeResult = `Closed with: ${result}`;
                    this.router.navigateByUrl('/cart/cartdata');
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

    removeUnit(): void {
        this.qty > 0 ? (this.qty = this.qty - 1) : 0;
    }

    addUnit(): void {
        this.qty = this.qty + 1;
    }
}
