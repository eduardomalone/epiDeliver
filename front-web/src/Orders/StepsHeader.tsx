import { FuncionarioDTO } from "./types";
import FuncionarioCard from "./FuncionarioCard";

type Props = {
    funcionarios: FuncionarioDTO[];
}

function StepsHeader({ funcionarios }: Props) {
    console.log(' ##### StepsHeader ####')
    return (
        <div className="">
            <div className="">
                
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