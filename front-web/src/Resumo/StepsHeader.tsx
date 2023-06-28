import { FuncionarioDTO } from "../Orders/types";
import FuncionarioCard from "./FuncionarioCard";


type Props = {
    funcionario: FuncionarioDTO;
}

function StepsHeader({ funcionario }: Props) {
    return (
        <div className="orders-steps-container">
            <div className="orders-steps-content">
                <div className="steps-title">
                    <FuncionarioCard key={funcionario.nome} funcionario={funcionario} />
                </div>
            </div>
        </div>
    )
}

export default StepsHeader;