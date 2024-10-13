

import { useLocation } from "react-router-dom"
import { EpiDTO } from "../Orders/types"
import StepsHeader from "./StepsHeader"
import ProductsList from "./ProductsList"
import { fetchSalvarSolicitacao } from "../api"
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import { ReactComponent as MainImage } from './printer-svgrepo-com.svg';
import { useRef, useState } from "react"
import ImpressaoList from "./ImpressaoList"
import ImpressaoHeader from "./ImpressaoHeader"
import ReactToPrint from 'react-to-print';
import axios from "axios"
import { Button } from "@mui/material"


function Resumo(this: any) {

    console.log('##### Resumo #####')
    const [idSolicitacao, setIdSolicitacao] = useState<any>();
    const [statusImp, setStatusImp] = useState<boolean>(false);
    const [statusPrint, setStatusPrint] = useState<boolean>(false);
    const location: any = useLocation()
    console.log('### location ###')
    console.log(location.state)
    let funcionario: any = location.state.funcionario
    const arrayEpi: EpiDTO[] = location.state.selectedProducts as EpiDTO[]
    const [barCode, setBarcode] = useState<any>();
    const ref = useRef<HTMLDivElement | null>(null);

    console.log('###### funcionario ######', funcionario.registro)

    let history = useHistory();
    function handleClickHome() {
        setTimeout(() => {
            history.push(`/home`);
        }, 2000);
        return;
    }

    function printPwd(barCode:any|undefined) {
        const options = {
          method: 'POST',
          url: 'http://127.0.0.1:5000/printer',
          headers: {'Content-Type': 'application/json'},
          data: {CMD: 'imprimirBMP', PARAM: '/storage/emulated/0/tectoylogo.bmp'}
          //informar sempre o path completo do arquivo da logo.bmp de até 200x200 px, que deve estar no dispositivo.
        };
        //a logo será impressa junto com o buffer de exemplo
        axios.request(options).then(function (response) {
        const options = {
          method: 'POST',
          url: 'http://127.0.0.1:5000/printer',
          headers: {'Content-Type': 'application/json'},
          // data: {CMD: 'imprimir', PARAM: `<ce><b><da><dl><l>BEM VINDO<l><l></dl></da><inv><eg>S123<l></eg></inv></b><da>Sua posicao na fila: 10<l><l></da>Conheca nossos produtos!<l>http://tectoy.com.br/<l><l>06/10/2023<l></ce><l><l><l><l><l>`}
          data: {CMD: 'imprimir', PARAM: `<ce><b><da><dl><l>`+barCode+`<l><l></dl></da><inv><eg>S123<l></eg></inv></b><da>Sua posicao na fila: 10<l><l></da>Conheca nossos produtos!<l>http://tectoy.com.br/<l><l>06/10/2023<l></ce><l><l><l><l><l>`}
        };
        
        axios.request(options).then(function (response) {
          const options = {
            method: 'POST',
            url: 'http://127.0.0.1:5000/printer',
            headers: {'Content-Type': 'application/json'},
            data: {CMD: 'acionarGuilhotina', PARAM: ''}
          };
          
          axios.request(options).then(function (response) {
            console.log(response.data);
          }).catch(function (error) {
            console.error(error);
          });
        }).catch(function (error) {
          console.error(error);
        });
      }).catch(function (error) {
        console.error(error);
      });
      }

    function callImpSendOrder() {
        console.log('##### chamou imprimir 2 ####')
        montaCodBarras();
        setStatusImp(true);
        handleSubmit();
    }

    // var statusPrint para mostrar a img de impressao
    function ativaLogoImp() {
        console.log('##### chamou imprimir ####')
        setStatusPrint(true)
        setTimeout(() => {
            history.push(`/home`);
        }, 5000);
        return;
    }

    const date = new Date();
    let dataHMS = date.getFullYear() + "" + (date.getMonth() + 1) + "" + date.getHours() + "" + date.getMinutes() + "" + date.getSeconds();
    var listaCodBarras: any[] = []
    //var func = funcionario

    //monta codBarras
    function montaCodBarras() {
        arrayEpi.map((x) => (
            //listaCodBarras.push(x.codigo + (func.registro) + dataHMS)
            listaCodBarras.push(x.id + dataHMS)
        ))
        console.log('##### codBarras ####', listaCodBarras)
        setBarcode(listaCodBarras)
    }

    //volta para a pagina anterior
    function goBack() {
        window.history.back()
    }

    const handleSubmit = () => {

        const produtos = arrayEpi;
        const payload = {
            funcionarioDTO: funcionario,
            listaEpiDTO: produtos,
            listaCodBarras: listaCodBarras
        }
        //salva a solicitacao
        fetchSalvarSolicitacao(payload)
            .then((response) => {
                toast.error(`Pedido enviado com sucesso! - id: ${response.data.solicitacaoDTO.id}`, {
                    position: toast.POSITION.TOP_CENTER
                });
                setIdSolicitacao(response.data.solicitacaoDTO.id)
                console.log('### solicitacao gerada com sucesso ###', idSolicitacao)
            })
            .catch(() => {
                toast.warning('Erro ao enviar pedido', {
                    position: toast.POSITION.TOP_CENTER
                });
            })
    }
    return (
        <>
            {!statusPrint && (
                <div className="home-container">
                    {!statusImp && (
                        <div>

                            <div className="">
                                <div className="orders-container">
                                    <StepsHeader funcionario={funcionario} />
                                    <ProductsList
                                        selectedProducts={arrayEpi}
                                        registro={funcionario}
                                    />
                                </div>
                                <div className="order-summary-container">
                                    <div className="order-summary-content">
                                        <button
                                            className="order-summary-make-order"
                                            onClick={callImpSendOrder} >
                                            Confirmar
                                        </button>
                                        <button
                                            className="order-summary-make-order"
                                            onClick={goBack} >
                                            Voltar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {statusImp && (
                        <>
                            <div className="">
                                <div className="orders-container" ref={ref}>
                                    <ImpressaoHeader funcionario={funcionario} />
                                    <ImpressaoList
                                        selectedProducts={arrayEpi}
                                        registro={funcionario}
                                        listaCod={barCode}
                                    />
                                </div>
                                <div className="order-summary-container">
                                    <div className="order-summary-content">
                                        <ReactToPrint
                                            bodyClass="print-agreement"
                                            content={() => ref.current}
                                            trigger={() => (
                                                <button
                                                    className="order-summary-make-order"
                                                    onClick={ativaLogoImp} >
                                                    Imprimir Solicitação
                                                </button>
                                            )}
                                        />
                                        <button
                                            className="order-summary-make-order"
                                            onClick={handleClickHome} >
                                            Finalizar
                                        </button>
                                        <button className="order-summary-make-order" color="primary" onClick={() => printPwd(barCode)}>
                                            Imprimir cupom exemplo
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
            {statusPrint && (
                <div>
                    <div className="home-image">
                        <MainImage />
                    </div>
                    <div className="home-container">
                        <div className="home-content">
                            <div className="home-actions">
                                <h1 className="home-title">
                                    Aguarde a impressão
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Resumo;