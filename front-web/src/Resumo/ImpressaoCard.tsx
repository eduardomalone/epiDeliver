
import { EpiDTO } from "../Orders/types";

type Props = {
  product: EpiDTO
  registro: string
  codBarras: string
}

function ImpressaoCard({ product, registro, codBarras }: Props) {

  var React = require('react');
  var Barcode = require('react-barcode');

  return (
    <>
      <div className="order-card-container">
        <div className="order-card-description">
          <p>
            {product.descricao}
          </p>
          <Barcode value={codBarras}
            format={"CODE128"}
            height={100}
            width={1}
            //textAlign= {"center"}
            //textPosition= {"bottom"}
            //textMargin= {2}
            fontSize={5}
            //marginRight= {20}
            marginLeft={10}
          />
        </div>
      </div>
    </>
  )
}

export default ImpressaoCard;