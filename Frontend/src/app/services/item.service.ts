import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Item } from '../models/ItemModel';

const API_URL_BASE = 'http://localhost:3000';

@Injectable({
    providedIn: 'root',
})
export class ItemService {
    constructor(private http: HttpClient) {}

    getAllItems(): Observable<Item[]> {
        return this.http.get<Item[]>(API_URL_BASE + '/product/all');
    }

    getItemsCategories(): Observable<string[]> {
        return this.http.get<string[]>(
            API_URL_BASE + '/product/categories'
        );
    }

    getOneItem(itemId: number): Observable<Item> {
        return this.http.get<Item>(
            API_URL_BASE + '/product/id/' + itemId
        );
    }
}
