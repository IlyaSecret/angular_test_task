import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item, addModelArgs } from '../../interfaces/item';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

    public items: Item[] = [];
    public collectionSize: number = 0;
    public page: number;

    public searchItem: string = '';
    public searchSuffix: string = '';
    public searchType: string = '';

    constructor(private itemService: ItemService) {

        let localPage = localStorage.getItem('page');

        if (localPage != null) {
            this.getItems({page: Number(localPage), pagesize: 5});
            this.page = Number(localPage);
        } else {
            this.getItems({page: 1, pagesize: 5});
            this.page = 1;
        }
     }


    ngOnInit() {}

    getItems(args: addModelArgs) {

        let localItem = localStorage.getItem('searchItem');
        let localType = localStorage.getItem('searchType');
        let localSuffix = localStorage.getItem('searchSuffix');

        if (localItem != null) {
            this.searchItem = localItem;
        }
        if (localType != null) {
            this.searchType = localType;
        }
        if (localSuffix != null) {
            this.searchSuffix = localSuffix;
        }

        this.itemService.getItems().subscribe((items) => {

            let startIndex = args.pagesize * (args.page - 1);
            this.collectionSize = items.length;
            this.items = items.slice(startIndex, startIndex + args.pagesize);

        },
            (error) => {
                console.log('Error: ' + error);
            }
        );
    }

    getOtherItems(args: addModelArgs) {

        this.deleteFilters();

        this.itemService.getItems().subscribe((items) => {

            let startIndex = args.pagesize * (args.page - 1);
            this.collectionSize = items.length;
            this.items = items.slice(startIndex, startIndex + args.pagesize);

        },
            (error) => {
                console.log('Error: ' + error);
            }
        );
    }

    public getFromFilter(data: string) {
        this.searchItem = data;
        localStorage.setItem('searchItem', this.searchItem);
    }
    public getFromFilter2(data: string) {
        this.searchType = data;
        localStorage.setItem('searchType', this.searchType);
    }
    public getFromFilter3(data: string) {
        this.searchSuffix = data;
        localStorage.setItem('searchSuffix', this.searchSuffix);
    }
    public deleteFilters() {
        let arrCheck: Array<any> | null =  Array.from(document.getElementsByName('checkbox'));
        arrCheck.forEach((input) => {input.checked = false;});
        let arrRadio: Array<any> | null =  Array.from(document.getElementsByName('radio'));
        arrRadio.forEach((input) => {input.checked = false;});
        localStorage.removeItem('searchItem');
        localStorage.removeItem('checkboxItem');
        localStorage.removeItem('radioItem');
        this.searchItem = '';
        this.searchType = '';
        this.searchSuffix = '';
    }
}
