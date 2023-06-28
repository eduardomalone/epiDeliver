import { EpiDTO } from "./types";

export function checkIsSelected(selectedProducts: EpiDTO[], product: EpiDTO){
    return selectedProducts.some(item => item.id === product.id);
}