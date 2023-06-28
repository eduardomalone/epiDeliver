
import { EpiDTO, ItemSolicitacaoDTO } from "./types";
import ProductCard from "./ProductCard";
import { checkIsSelected } from "./helpers";
import ResumoCard from "../Resumo/ResumoCard";
import { useState } from "react";

type Props = {
  //products: ItemSolicitacaoDTO[];
  products: EpiDTO[];
  selectedProducts: EpiDTO[];
  onSelectProduct: (product: EpiDTO) => void;
  status2: boolean
}

function ProductsList( {products, selectedProducts, onSelectProduct, status2}: Props ) {
  
    console.log('### aqui ProductsList ###')
    console.log(products)

    const [status, setStatus] = useState<boolean>(status2);
    
    return (

      <>
      {status &&(
        <div className="orders-list-container">
        <div className="orders-list-items">
            {products.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  onSelectProduct={onSelectProduct}
                  isSelected={checkIsSelected(selectedProducts, product)}
                />
            ))}
        </div>
        </div>
      )
      }
      </>
    )
  }
  
  export default ProductsList;