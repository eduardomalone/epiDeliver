import { useState } from "react";
import { EpiDTO } from "../Orders/types";
import ResumoCard from "./ResumoCard";


type Props = {
  selectedProducts: EpiDTO[];
}

function ProductsList( { selectedProducts}: Props ) {
  
    console.log('### ProductsList - Resumo ###')
    console.log(selectedProducts)

    const [status, setStatus] = useState<boolean>();
    
    return (

      <>
      {(
        <div className="orders-list-container">
        <div className="orders-list-items">
            {selectedProducts.map(product => (
                <ResumoCard 
                  key={product.id} 
                  product={product}
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