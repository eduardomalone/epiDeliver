
//import { Box, Card, CardContent, Typography } from "@mui/material";
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
      {/* <Card>
          <CardContent>
          </CardContent>
     </Card>      */}


      {/* <Card>
        <CardContent> */}
          {/* <Box padding={0} display='flex' alignItems='center' justifyItems='center' > */}
            {/* <div className=""> */}
              <div className="orders-list-items">
                <p style={{color: "red important"}}>
                  {product.descricao}
                </p>
                <h1 >

                <Barcode value={codBarras}
                  format={"CODE128"}
                  height={100}
                  width={1}
                  textAlign= {"center"}
                  textPosition= {"bottom"}
                  //textMargin= {2}
                  fontSize={5}
                  //marginRight= {20}
                  marginLeft={0}
                  />
                  </h1>
              </div>
            {/* </div> */}

          {/* </Box> */}
        {/* </CardContent>
      </Card> */}



    </>
  )
}

export default ImpressaoCard;