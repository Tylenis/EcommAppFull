import { Item } from './ItemModel';

export interface Cart {
    id: number;
    products: [{ item: Item; qty: number }];
}
