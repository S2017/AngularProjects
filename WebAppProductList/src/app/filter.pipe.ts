import { Pipe, PipeTransform } from "@angular/core";

/*Pipe customized to filter products during checkbox toggle using Pipe transform function*/
@Pipe({
    name: 'filterPrice'
})
export class FilterPipe implements PipeTransform {
    transform(productsArray: any[], checked: boolean) {
        if (checked === true) {
            return productsArray.filter(prod => prod.pricePerUnitText < "(2,00 €/Liter)");
        } else {
            return productsArray;
        }
    }

}