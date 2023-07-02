import { FuncionarioDTO } from "../Orders/types";

type Props = {
    funcionario: FuncionarioDTO;
}

function StepsHeader({ funcionario }: Props) {
    return (
        <>
            <div className="orders-steps-container">
                <div className="orders-steps-content2" /*style={{alignItems:'center'}}*/>
                    <div className="steps-title">
                        Itens Selecionados:
                    </div>
                </div>
            </div>
        </>
    )
}

export default StepsHeader;