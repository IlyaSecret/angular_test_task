import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../../interfaces/item';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

    public searchItem: string = '';
    public searchSuffix: string = '';
    public searchType: any = [];
    public checkboxArr: any;
    public radioArr: any;

    @Input() set arrItems(value: Item[]) {
        if (value) {
            this.searchType = [];
            this.getChekboxArr(value);
            this.getRadioArr(value);

            setTimeout(() => {
            this.localCheckbox();
            this.localRadio();
            }, 0);
        }
    };
    @Output() event: EventEmitter<string> = new EventEmitter();
    @Output() event2: EventEmitter<string> = new EventEmitter();
    @Output() event3: EventEmitter<string> = new EventEmitter();


    constructor(private itemService: ItemService) { }

    ngOnInit(): void {}

    getChekboxArr(value: Item[]) {
        this.checkboxArr = new Set(value.map((element: Item) => {
            return element.type;
        }));
    }

    getRadioArr(value: Item[]) {
        this.radioArr = new Set(value.map((element: Item) => {
            return element.suffix;
        }));
    }

    sendToList() {
        this.event.emit(this.searchItem);
    }

    sendToList2(string: string) {
        this.event2.emit(string);
    }

    sendToList3() {
        this.event3.emit(this.searchSuffix);
    }

    openCheckList(event: any): void {
        let list: any = document.querySelector('.list__checkboxes');
        list.classList.toggle('list__checkboxes-active');
        event.target.classList.toggle('list__select-active');
    }

    onCheckboxClick(event: any): void {
        let type;
        type = event.target.nextElementSibling.innerHTML;

        if (event.target.checked === true) {
            this.searchType.push(type);
        } else {
            let index;
            index = this.searchType.indexOf(type, 0);
            this.searchType.splice(index, 1);
        }

        let string = '';
        for (let i = 0; i < this.searchType.length; i++) {
            string += `${this.searchType[i]},`;
        }

        localStorage.setItem('checkboxItem', string);

        this.sendToList2(string);
    }


    onRadioClick(event:any): void {
        this.searchSuffix = event.target.nextElementSibling.innerHTML;

        localStorage.setItem('radioItem', event.target.nextElementSibling.innerHTML);

        this.sendToList3();
    }

    localCheckbox (): void {
        let checkboxItem = localStorage.getItem('checkboxItem');
        let arrCheck: Array<any> | null =  Array.from(document.getElementsByName('checkbox'));
        let listCheckbox: any = document.querySelector('.list__checkboxes');

        if (checkboxItem != null && arrCheck != null && listCheckbox != null) {
            let arr = checkboxItem.split(',');

            arrCheck.forEach((input) => {
                if (arr.includes(input.nextElementSibling.innerHTML)) {
                    input.checked = true;
                }
            });

            listCheckbox.classList.add('list__checkboxes-active');

        }
    }

    localRadio (): void {
        let radioItem = localStorage.getItem('radioItem');
        let arrRadio: Array<any> | null =  Array.from(document.getElementsByName('radio'));

        if (radioItem != null && arrRadio != null) {
            arrRadio.forEach((input) => {
                if (input.nextElementSibling.innerHTML === radioItem) {
                    input.checked = true;
                }
            });
        }
    }
}
