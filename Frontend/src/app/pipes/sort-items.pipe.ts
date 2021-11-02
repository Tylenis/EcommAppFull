import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../models/ItemModel';

function compareNumbersAsc(a: Item, b: Item): number {
    return parseFloat(a.price) - parseFloat(b.price);
}

function compareNumbersDesc(a: Item, b: Item): number {
    return parseFloat(b.price) - parseFloat(a.price);
}

@Pipe({
    name: 'sortItems',
})
export class SortItemsPipe implements PipeTransform {
    transform(value: Item[], sort: string): Item[] {
        if (sort == 'desc') {
            return value.sort(compareNumbersDesc);
        } else if (sort == 'asc') {
            return value.sort(compareNumbersAsc);
        } else {
            return value;
        }
    }
}
