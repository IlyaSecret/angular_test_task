import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Item } from '../interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

    private url = 'https://random-data-api.com/api/company/random_company';
    public collectionSize: number = 0;

    constructor(private http: HttpClient) {

    }

    public getItems(): Observable<any> {
      return this.http.get('https://random-data-api.com/api/company/random_company?size=20');
    };

    public getItem(id:number): Observable<Item>  {
        const urlID = `${this.url}?${id}`;
        return this.http.get<Item>(urlID);
    };
}
