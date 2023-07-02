
import { Link } from 'react-router-dom';
import { FuncionarioDTO } from './types';
import { toast } from 'react-toastify';

type Props = {
    amount: number;
    listaItens: any;
    selectedProducts: any;
    onSubmit: () => void;
    funcionario: FuncionarioDTO
}

function OrderSummary({ amount, listaItens, selectedProducts, onSubmit, funcionario }: Props) {

    function validaItens() {
        if (selectedProducts.length === 0) {
            console.log('### setSelectedProducts uuuuu ###')
            toast.warning(' Selecione um dos Itens ou Retorne para a pagina anterior!', {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    return (
        <>
            {(
                <div className="order-summary-container">
                    <div className="order-summary-content">
                        <div>
                            {selectedProducts[0] && (
                                <div>
                                    <button
                                        className="order-summary-make-order">
                                        <Link style={{ color: 'inherit', textDecoration: 'inherit' }}
                                            to={{
                                                pathname: `/resumo`,
                                                state: {
                                                    funcionario: funcionario,
                                                    selectedProducts: selectedProducts
                                                }
                                            }}
                                        >
                                            Fazer Solicitação
                                        </Link>
                                    </button>
                                </div>
                            )}
                            {!selectedProducts[0] && (
                                <>
                                    <button className="order-summary-make-order" onClick={validaItens}>
                                        Fazer Solicitação
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default OrderSummary;