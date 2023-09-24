// import { Box, CardContent, Grid } from "@mui/material";
import { EpiDTO, FuncionarioDTO } from "../Orders/types";
import ImpressaoCard from "./ImpressaoCard";

type Props = {
  selectedProducts: EpiDTO[];
  registro: FuncionarioDTO;
  listaCod: any[];
}

function ImpressaoList({ selectedProducts, registro, listaCod }: Props) {

  return (
    <>

      {(
        <div className="orders-list-container">
          <div className="">
            {selectedProducts.map((product, index) => (
              <ImpressaoCard
                key={product.id}
                product={product}
                registro={registro.registro}
                codBarras={listaCod[index]}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default ImpressaoList;