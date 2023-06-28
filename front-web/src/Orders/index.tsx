
import React, { useEffect, useState } from 'react';
import StepsHeader from './StepsHeader';
import './styles.css';
import ProductsList from './ProductsList';
import { EpiDTO, FuncionarioDTO } from './types';
import { fetchFuncionario, fetchMontaTelaEpi, fetchSalvarSolicitacao } from '../api';
import { ReactComponent as MainImage } from './epiLogo.svg';
import OrderSummary from './OrderSummary';
import { checkIsSelected } from './helpers';
import { toast } from 'react-toastify';
import { useLocation } from "react-router";
import { Link, useHistory } from "react-router-dom";
import Home from '../Home';
import { exit } from 'process';

var registro: string;
var idCliente: string;

const search = window.location.search;
const params = new URLSearchParams(search);
const foox = params.get('registro');
const foo3x = params.get('idCli');


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
  const [infoRegistro, setInfoRegistro] = useState<string>("");
  const [status, setStatus] = useState<boolean>(true);
  const totalPrice = selectedProducts.reduce((sum, item) => {
    return sum + item.validade
  }, 0)
  const listaItens = selectedProducts;
  console.log(' selected itens ####')
  console.log(selectedProducts)

  function validaFunc() {

    toast.warning('######################', {
      position: toast.POSITION.TOP_CENTER
    });
    handleClick();


  }
  useEffect(() => {
    if (location)
      fetchMontaTelaEpi(getRegistro(location.state as string), getIdCliente(location.state as string))
        .then((response) => {
          setProducts(response.data[0].listaEpiDTO);
          setFuncionarios(response.data[0].funcionarioDTO)
        })
        .catch(error => {
          console.log('###-error-####', error.response)
          // toast.warning('Funcional não encontrada', {
          //   position: toast.POSITION.TOP_CENTER
          // });
          // handleClick();

          //setInfoRegistro('###')
          //return;
        }

        )


  }, []);
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

  function sumaryTeste(){

    return true
  }

  return (
    <>
      {!funcionarios[0] && 
        (<div className="home-container">
          <div className="home-content">
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
          </div>
        </div>)
      }
      {funcionarios[0]  &&(
        <div className="orders-container">
          <StepsHeader funcionarios={funcionarios} />
          <ProductsList
            products={products}
            onSelectProduct={handleSelectProduct}
            selectedProducts={selectedProducts}
            status2={status}
          //AnimationPage={AnimationPage}
          />
          </div>
          )}
          
          {products[0] &&(
          <div>
          <OrderSummary
            amount={selectedProducts.length}
            totalPrice={totalPrice}
            listaItens={listaItens}
            selectedProducts={selectedProducts}
            onSubmit={handleSubmit}
            funcionario={funcionarios[0]}

          />
        </div>)}

        {!products[0] && (<div className="home-container">
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
      
    </>
  )

}

export default Orders;

