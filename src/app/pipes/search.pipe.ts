import { Pipe, PipeTransform } from "@angular/core";

@Pipe ({
    name: 'search'
})
export class SearchPipe implements PipeTransform {
    transform(items: any, value: string) {
        if (items) {
            return items.filter((item: any) => {
                return item.business_name.toLowerCase().includes(value.toLowerCase());
            });
        }
    }
}

@Pipe ({
    name: 'search2'
})
export class Search2Pipe implements PipeTransform {
    transform(items: any, value: any) {
        if (items) {
            if (value != '') {
                let arr = value.split(','); 
                return items.filter((item: any) => {
                        return arr.includes(item.type);
                });
            } else {
                return items;
            }
        }
    }
}

@Pipe ({
    name: 'search3'
})
export class Search3Pipe implements PipeTransform {
    transform(items: any, value: string) {
        if (items) {
            return items.filter((item: any) => {
                return item.suffix.toLowerCase().includes(value.toLowerCase());
            });
        }
    }
}