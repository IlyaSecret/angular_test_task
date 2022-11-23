import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { addModelArgs } from '../../interfaces/item';
import { ItemService } from '../../services/item.service';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnInit {

    public page: number = 1;
    public pageSize: number = 5;
    public collectionSize: number = 0;

    @Input() set amount1(value: number) {
        if (value) {
            this.page = value;
        }
    };
    @Input() set amount2(value: number) {
        if (value) {
            this.collectionSize = value;
        }
    };


    @Output() changePage = new EventEmitter<addModelArgs>();

    constructor(private itemService: ItemService) { }

    ngOnInit(): void { }

    changeLeft (event: any) {
        if (this.page != 1) {
            this.page -= 1;
            this.getOtherItems();
        }

    }

    changeRight (event: any) {
        if (this.page < this.collectionSize / this.pageSize) {
            this.page += 1;
            this.getOtherItems();
        }
    }

    getOtherItems () {
        let args: addModelArgs = {
            page: this.page,
            pagesize: this.pageSize
        }

        localStorage.setItem('page', `${this.page}`);
        this.changePage.emit(args);
    }
}
