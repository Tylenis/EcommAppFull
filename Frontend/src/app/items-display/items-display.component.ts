import { Component, OnInit } from '@angular/core';

import { ItemService } from '../services/item.service';
import { Item } from '../models/ItemModel';

@Component({
    selector: 'app-items-display',
    templateUrl: './items-display.component.html',
    styleUrls: ['./items-display.component.css'],
})
export class ItemsDisplayComponent implements OnInit {
    allItems: Item[] = [];
    dataSize = 0;
    selectedCategory = 'all';
    sortDirection = 'nosort';
    itemsPerPage = 10;
    dataStart = 0;
    dataEnd = 10;

    constructor(private itemService: ItemService) {}

    ngOnInit(): void {
        this.itemService.getAllItems().subscribe((res) => {
            this.allItems = res;
            this.dataSize = this.allItems.length;
        });
    }

    sortItems(dir: string): void {
        this.sortDirection = dir;
    }

    filterItems(cat: string): void {
        this.selectedCategory = cat;
    }

    onPageChange(page: number): void {
        this.dataEnd = this.itemsPerPage * page;
        this.dataStart = this.dataEnd - 10;
    }
}
