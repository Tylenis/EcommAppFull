import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../models/ItemModel';

@Pipe({
    name: 'categoriesPipe',
})
export class CategoriesPipe implements PipeTransform {
    transform(value: Item[], cat: string): Item[] {
        if (cat == 'all') {
            return value;
        } else {
            return value.filter((el) => {
                return el.category == cat;
            });
        }
    }
}
