import './styles.css';
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
//import { AuthContext } from '../Contexts/Auth/AuthContext.tsx_txt';
import { fetchBuscarSolicitacao, fetchSolicitacaoBaixa } from '../api';
import { EpiDTO, ItemSolicitacao, ItemSolicitacaoEpiDTO } from '../Types/User';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import { useAuThContext } from '../contexts_/AuthContext';

// busca img padrao
function onError(e: any) {
    e.target.src = '/epi_imgs/epi_padrao.jpg';
}


function UpdateOrders() {

    console.log(' ##### ProductCard ####')
    var repoGitImg = 'https://eduardomalone.github.io/img/epi_imgs/'
    const location = useLocation();
    //const { isAuthenticated, login, user, userLogin } = useAuThContext();
    //const auth = useContext(AuthContext);
    const [itemSolicitEpi, setItemSolicitEpi] = useState<ItemSolicitacaoEpiDTO>();
    const [epiDTO, setEpiDTO] = useState<EpiDTO>();
    const [itemSolicitacaoDTO, setItemSolicitacaoDTO] = useState<ItemSolicitacao>();

    let history = useHistory();
    function handleClickHome() {
        setTimeout(() => {
            history.push(`/orders`);
        }, 3000);
        return;
    }

    const handleSubmit = () => {
        const payload = {
            //idFuncBaixa: auth.user?.id,
            barCode: location.state
        }
        //salva a solicitacao
        fetchSolicitacaoBaixa(payload)
            .then((response) => {
                toast.error(`Baixa do Equipamento realizada com sucesso!`, {
                    position: toast.POSITION.TOP_CENTER
                });
                //setIdSolicitacao(response.data.solicitacaoDTO.id)
                console.log('### baixa gerada com sucesso ###',)
                handleClickHome()
            })
            .catch(() => {
                toast.warning('Erro ao enviar pedido', {
                    position: toast.POSITION.TOP_CENTER
                });
            })
    }

    useEffect(() => {
        console.log('#### location ', location)
        if (location)
            fetchBuscarSolicitacao(location.state as string)
                .then((response) => {
                    setItemSolicitEpi(response.data);
                    setEpiDTO(response.data.epiDTO);
                    setItemSolicitacaoDTO(response.data.itemSolicitacaoDTO);
                    console.log('###### response', response.data);
                })
                .catch(error => {
                    console.log('###-error-####', error.response)
                })
    }, [location]);

    return (
        <>
            {itemSolicitacaoDTO?.codigoBarra && (
                <div>
                    <div className="home-container">
                        <div className="home-content">
                            <div className="home-actions">
                                {!itemSolicitacaoDTO?.idUsuarioBaixa && (
                                    <>
                                        {/* Ola {auth.user?.nome}, seja bem vindo! <br /> */}
                                        <div className="home-actions">
                                            <button className="order-summary-make-order"
                                                onClick={handleSubmit}>
                                                Clique AQUI para confirmar a entrega do equipamento?
                                            </button>
                                        </div>

                                    </>
                                )}
                                {itemSolicitacaoDTO?.idUsuarioBaixa && (
                                    <h3 className="home-subtitle">
                                        Item ja foi entregue!
                                    </h3>
                                )}
                            </div>

                        </div>
                        <div className="orders-list-container">
                            <div className="orders-list-items">
                                <div>
                                    <img
                                        //src= {'/epi_imgs/'+product.codigo+'.jpg'}
                                        src={repoGitImg + "" + itemSolicitEpi?.epiDTO.codigo + '.jpg'}
                                        className="order-card-image"
                                        alt={itemSolicitEpi?.epiDTO.codigo}
                                        onError={(e) => onError(e)}
                                    />
                                    <div className="order-card-description">
                                        <p>
                                            Descrição: {epiDTO?.descricao}
                                        </p>
                                        <p>
                                            Código: {epiDTO?.codigo}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {!itemSolicitacaoDTO?.idUsuarioBaixa && (

                        <div>
                            <div
                                className="home-content"
                            >
                                <div className="home-actions">
                                    <button className="order-summary-make-order"
                                        onClick={handleSubmit}>
                                        Realizar entrega
                                    </button>
                                </div>
                            </div>
                        </div>

                    )}
                </div>
            )}
            {!itemSolicitacaoDTO?.codigoBarra && (
                <div>
                    <div className="home-container">
                        <div className="home-content">
                            <div className="home-actions">
                                <h3 className="home-subtitle">
                                    Codigo de barras não encontrado
                                </h3>
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </>
    )
}

export default UpdateOrders;