import { EpiDTO } from "./types";

//funcao para selecionar e descelecionar a imagem colocando em um arry
export function checkIsSelected(selectedProducts: EpiDTO[], product: EpiDTO){
    return selectedProducts.some(item => item.id === product.id);
}