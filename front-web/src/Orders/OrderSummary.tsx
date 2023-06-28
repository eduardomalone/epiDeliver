
import { Link } from 'react-router-dom';
import Resumo from '../Resumo';
import { useState } from 'react';
import { EpiDTO, FuncionarioDTO } from './types';

type Props = {
    amount: number;
    totalPrice: number;
    listaItens: any;
    selectedProducts: any;
    onSubmit: () => void;
    funcionario: FuncionarioDTO
    //status3: any;
}

var varTeste: any;

function OrderSummary({amount, totalPrice, listaItens, selectedProducts, onSubmit, funcionario}: Props){
    
    const [status, setStatus] = useState<boolean>(false);
    function mudaStatus(){
        if(status === true){
            setStatus(false)
        }else{
            setStatus(true)
        } 
    }

    const payload = {
        funcionarioDTO: funcionario,
        listaEpiDTO: selectedProducts
      }
    return(

        <>
        {!status && (
            <div className="order-summary-container">
            <div className="order-summary-content">
                <div>
                    <span className="amount-selected-container">
                         
                        <strong className="amount-selected">QTD Itens: { amount }</strong>
                    </span>
                    {/* <span className="ORDER-SUMMARY-TOTAL">
                        <strong className="amount-selected">R$ {totalPrice}</strong>
                        Valor Total
                    </span> */}
                    {/* <span className="ORDER-SUMMARY-TOTAL">
                        <strong className="amount-selected">R$ {listaItens.codigo}</strong>
                        Valor Total
                    </span>
                    <span className="ORDER-SUMMARY-TOTAL">
                        <strong className="amount-selected">{listaItens.codigo}</strong>
                        itens
                    </span> */}
                </div>
                <div>
                    {selectedProducts.map((item: any) => (
                        <li>{item.descricao}</li>
                    ))}       
                </div>
                <button 
                    className="order-summary-make-order"
                    // onClick={onSubmit} >
                    onClick={onSubmit} >
                    Fazer solicitacao
                </button>
                <button 
                    className="order-summary-make-order"
                    // onClick={onSubmit} >
                    onClick={onSubmit} >
                    Pagina de resumo
                </button>
                <div>
                    {}
                    <Link
                        to={{
                            pathname: `/resumo`,
                            //state: { value},
                            state: {funcionario: funcionario,
                                    selectedProducts: selectedProducts
                            }
                        }}
                        //to="solicitacao" className="home-btn-order"
                        className="home-btn-order">
                        Fazer Solicitação
                    </Link>
                </div>    
            </div>

        </div>)}
        
        {/* {status &&(
            <span>
                <h1>
                    Resumo
                </h1>
                <button 
                    className="order-summary-make-order"
                    // onClick={onSubmit} >
                    onClick={onSubmit} >
                    Fazer solicitacao
                </button>
            </span>
        )} */}

                {/* <button 
                    className="order-summary-make-order"
                    
                    onClick={mudaStatus} >
                    Teste Resumo
                </button> */}
        
         
            {/* <div className="order-summary-container">
            <div className="order-summary-content">
                <div>
                    {selectedProducts.map((item: any) => (
                        <li>{item.descricao}</li>
                    ))}       
                </div>
                <button 
                    className="order-summary-make-order"
                    // onClick={onSubmit} >
                    onClick={onSubmit} >
                    Resumo da solicitacao
                </button>    
            </div>

        </div> */}
        </>
        
    )
}

export default OrderSummary;