
import React, { useEffect, useState } from 'react';
import StepsHeader from './StepsHeader';
import './styles.css';
import ProductsList from './ProductsList';
import { EpiDTO, FuncionarioDTO } from './types';
import { fetchMontaTelaEpi, fetchSalvarSolicitacao } from '../api';
// import { ReactComponent as MainImage } from './epiLogo.svg';
import OrderSummary from './OrderSummary';
import { checkIsSelected } from './helpers';
import { toast } from 'react-toastify';
import { useLocation } from "react-router";
import { Link, useHistory } from "react-router-dom";
import Home from '../Home';
import { Box, Card, CardContent } from '@mui/material';
import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

var registro: string;
var idCliente: string;

const search = window.location.search;
const params = new URLSearchParams(search);
const foox = params.get('registro');
const foo3x = params.get('idCli');

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};


console.log('###', foox)
console.log('###', foo3x)

function getRegistro(texto: string) {
  console.log('##### teeee', texto)
  if (texto == null || texto === undefined) {
    texto = " _ "
  }

  let arrayReturn: string[]
  arrayReturn = texto.split("_");
  registro = arrayReturn[0]
  return registro
}

function getIdCliente(texto: string) {
  if (texto == null || texto === undefined) {
    texto = " _ "
  }
  let arrayReturn: string[]
  arrayReturn = texto.split("_");
  idCliente = arrayReturn[1]
  return idCliente
}



function Orders() {

  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  

  let history = useHistory();

  function handleClick() {
    setTimeout(() => {
      history.push(`/home`);
    }, 3000);
    return <Home />;

  }

  //const state = location.state as string
  //const [products, setProducts] = useState<ItemSolicitacaoDTO[]>([]);
  const location = useLocation()
  const [products, setProducts] = useState<EpiDTO[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<EpiDTO[]>([]);
  const [funcionarios, setFuncionarios] = useState<FuncionarioDTO[]>([]);
  //const [infoRegistro, setInfoRegistro] = useState<string>("");
  //const [status, setStatus] = useState<boolean>();
  // const totalPrice = selectedProducts.reduce((sum, item) => {
  //   return sum + item.validade
  // }, 0)

  const listaItens = selectedProducts;
  console.log(' selected itens ####')
  console.log(selectedProducts)

  // function validaFunc() {

  //   toast.warning('######################', {
  //     position: toast.POSITION.TOP_CENTER
  //   });
  //   handleClick();


  // }
  useEffect(() => {
    setLoading(true);
  setColor("#ffffff");
  
    if (location)
      fetchMontaTelaEpi(getRegistro(location.state as string), getIdCliente(location.state as string))
        .then((response) => {
          console.log('###-testando-####', response)
          console.log('###-response.data[0]-####', response.data[0])
          setFuncionarios(response.data[0].funcionarioDTO);

          if(response.data[0].listaEpiDTO !== null){
            setProducts(response.data[0].listaEpiDTO);
            //setProducts([])
          }else{
            
          }
          
          
        })
        .catch(error => {
          console.log('###-error-####', )
          // toast.warning('Equipamentos não encontrados', {
          //   position: toast.POSITION.TOP_CENTER
          // });
          //handleClick;

          //setInfoRegistro('###')
          //return;
        }

        )

    //}, []);
  }, [location]);
  //validaFunc()

  const handleSelectProduct = (product: EpiDTO) => {
    const isAlreadySelected = checkIsSelected(selectedProducts, product);

    if (isAlreadySelected) {
      const selected = selectedProducts.filter(item => item.id !== product.id);
      setSelectedProducts(selected);
    } else {
      setSelectedProducts(previous => [...previous, product]);
    }
  }

  const handleSubmit = () => {
    const produtos = selectedProducts;
    const payload = {
      funcionarioDTO: funcionarios[0],
      listaEpiDTO: produtos
    }

    if (selectedProducts.length === 0) {
      console.log('### setSelectedProducts uuuuu ###')
      toast.warning(' Selecione um dos Itens ou Retorne para a pagina anterior!', {
        position: toast.POSITION.TOP_CENTER
      });
    } else {
      fetchSalvarSolicitacao(payload)
        .then((response) => {
          toast.error(`Pedido enviado com sucesso! - n ${response.data.solicitacaoDTO.id}`, {
            position: toast.POSITION.TOP_CENTER
          });
          setSelectedProducts([]);
          handleClick();
        })
        .catch(() => {
          toast.warning('Erro ao enviar pedido', {
            position: toast.POSITION.TOP_CENTER
          });
        })

    }
  }

  // function sumaryTeste(){

  //   return true
  // }

  return (
    <>
    <div className='container_teste'>
      <div>
      <StepsHeader funcionarios={funcionarios} />
      </div>
      {/* <div>
        {products[0] && (
            <div>
              <OrderSummary
                amount={selectedProducts.length}
                //totalPrice={totalPrice}
                listaItens={listaItens}
                selectedProducts={selectedProducts}
                onSubmit={handleSubmit}
                funcionario={funcionarios[0]}

              />
            </div>)}

      </div> */}

    </div>
      <Box height='100%' width='100%' display='flex' alignItems='center' justifyContent='center' marginTop={10}>
        <Card style={{ border: "none", boxShadow: "none" }}>
          <CardContent>

            
            <Box display='flex' flexDirection='column' gap={2} width={650} >
              {!funcionarios[0] &&
                (
                  
  //TODO - fazer o if de loading e ou apresentar a msg d q n tem
  
  
                <div className="home-container">
                  {/* <div className="home-content">
                    <div className="home-actions">
                      <h1 className="home-title">
                        Funcional não encontrada!
                      </h1>
                      <h3 className="home-subtitle">
                        Clique no botão abaixo para fazer uma nova pesquisa
                      </h3>
                      <h1>
                        <div>
                          <Link
                            to={{
                              pathname: `/Home/`,
                              state: ('')
                            }}
                            className="home-btn-order">
                            Home
                          </Link>
                        </div>
                      </h1>
                    </div>
                    <div className="home-image">
                      <MainImage />
                    </div>
                  </div> */}
       <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
                </div>
                )
              }
            </Box>
          </CardContent>
        </Card>
      </Box>
      {funcionarios[0] && products[0] &&(
        <div>
          {/* <StepsHeader funcionarios={funcionarios} /> */}

        
        <div className="orders-container">
          {/* <StepsHeader funcionarios={funcionarios} /> */}
          <ProductsList
            products={products}
            onSelectProduct={handleSelectProduct}
            selectedProducts={selectedProducts}
          //status2={status}
          //AnimationPage={AnimationPage}
          />
        </div>
        </div>
      )}

      {products[0] && (
        <div>
          <OrderSummary
            amount={selectedProducts.length}
            //totalPrice={totalPrice}
            listaItens={listaItens}
            selectedProducts={selectedProducts}
            onSubmit={handleSubmit}
            funcionario={funcionarios[0]}

          />
        </div>)}
      <Box height='100%' width='100%' display='flex' alignItems='center' justifyContent='center' marginTop={10}>
        <Card style={{ border: "none", boxShadow: "none" }}>
          <CardContent>
            <Box display='flex' flexDirection='column' gap={2} width={650} >
              {funcionarios[0] && !products[0] && (<div className="home-container">
                <div className="home-content">
                  <div className="home-actions">
                    <h1 className="home-title">
                      Não existem equipamentos cadastrados!
                    </h1>
                    <h3 className="home-subtitle">
                      Clique no botão abaixo para fazer uma nova pesquisa
                    </h3>
                    <h1>
                      <div>
                        <Link
                          to={{
                            pathname: `/Home/`,
                            state: ('')
                          }}
                          className="home-btn-order">
                          Home
                        </Link>
                      </div>
                    </h1>
                  </div>
                </div>
              </div>)}

            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  )

}

export default Orders;
