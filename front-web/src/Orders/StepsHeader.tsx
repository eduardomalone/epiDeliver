import { FuncionarioDTO } from "./types";
import FuncionarioCard from "./FuncionarioCard";

type Props = {
    funcionarios: FuncionarioDTO[];
}

function StepsHeader({ funcionarios }: Props) {
    return (
        <div className="orders-steps-container">
            <div className="orders-steps-content">
                    <div className="steps-title">
                        {funcionarios.map(funcionario => (
                            <FuncionarioCard key={funcionario.nome} funcionario={funcionarios} />
                        ))}
                    </div>
            </div>
        </div>
    )
}

export default StepsHeader;