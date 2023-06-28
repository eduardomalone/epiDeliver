

import { useLocation } from "react-router-dom"
import { EpiDTO } from "../Orders/types"
import StepsHeader from "./StepsHeader"
import ProductsList from "./ProductsList"
import { fetchSalvarSolicitacao } from "../api"
import { toast } from 'react-toastify';
import {  useHistory } from "react-router-dom";
import Home from "../Home"


function Resumo(this: any) {
    
    console.log('##### Resumo #####')

    const location: any = useLocation()
    console.log('### location ###')
    console.log(location.state)
    let funcionario: any = location.state.funcionario
    const arrayEpi: EpiDTO[] = location.state.selectedProducts as EpiDTO[]
   
    let history = useHistory();
    function handleClick() {
        setTimeout(() => {
          history.push(`/home`);
        }, 3000);
        return <Home />;
    
      }

    const handleSubmit = () => {
        const produtos = arrayEpi;
        const payload = {
          funcionarioDTO: funcionario,
          listaEpiDTO: produtos
        }

          fetchSalvarSolicitacao(payload)
            .then((response) => {
              toast.error(`Pedido enviado com sucesso! - n ${response.data.solicitacaoDTO.id}`, {
                position: toast.POSITION.TOP_CENTER
                
              });
              //setSelectedProducts([]);
              handleClick();
            })
            .catch(() => {
              toast.warning('Erro ao enviar pedido', {
                position: toast.POSITION.TOP_CENTER
              });
            })
    
        
      }
    

    return (
        <>
            <div className="orders-container">
                <StepsHeader funcionario={funcionario} />
                <ProductsList
                    selectedProducts={arrayEpi}
                />
            </div>
            <div className="order-summary-container">
                <div className="order-summary-content">
                    <button
                        className="order-summary-make-order"
                    onClick={handleSubmit} >
                        Fazer solicitacao
                    </button>
                </div>
            </div>
        </>
    )
}

export default Resumo;