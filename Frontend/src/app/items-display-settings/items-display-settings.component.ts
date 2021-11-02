import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ItemService } from '../services/item.service';

const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
    selector: 'app-items-display-settings',
    templateUrl: './items-display-settings.component.html',
    styleUrls: ['./items-display-settings.component.css'],
})
export class ItemsDisplaySettingsComponent implements OnInit {
    categories: string[] = [];
    page = 1;
    @Input() dataSize = 0;
    @Output() itemsSortDir: EventEmitter<string> = new EventEmitter();
    @Output() itemsFilterCat: EventEmitter<string> = new EventEmitter();
    @Output() currentPage: EventEmitter<number> = new EventEmitter();

    constructor(private itemService: ItemService) {}

    ngOnInit(): void {
        this.itemService.getItemsCategories().subscribe((res) => {
            this.categories = res;
        });
    }

    selectPage(page: string): void {
        this.page = parseInt(page, 10) || 1;
        this.currentPage.emit(this.page);
    }

    formatInput(input: HTMLInputElement): void {
        input.value = input.value.replace(FILTER_PAG_REGEX, '');
    }

    pageChanged(page: number): void {
        this.page = page;
        this.currentPage.emit(this.page);
    }

    sortItemsSelected(value: string): void {
        this.itemsSortDir.emit(value);
    }

    emitFilterItems(cat: string): void {
        this.itemsFilterCat.emit(cat);
    }
}
