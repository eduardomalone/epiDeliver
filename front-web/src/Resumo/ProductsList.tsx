import { EpiDTO, FuncionarioDTO } from "../Orders/types";
import ResumoCard from "./ResumoCard";


type Props = {
  selectedProducts: EpiDTO[];
  registro: FuncionarioDTO;
}

function ProductsList({ selectedProducts, registro }: Props) {

  console.log('### ProductsList - Resumo ###')
  console.log(selectedProducts)

  return (
    <>
      {(
        <div className="orders-list-container">
          <div className="orders-list-items">
            {selectedProducts.map((product, index) => (

              <ResumoCard
                key={product.id}
                product={product}
                registro={registro.registro}
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