import { FuncionarioDTO } from "../Orders/types";

type Props = {
    funcionario: FuncionarioDTO;
}

function ImpressaoHeader({ funcionario }: Props) {
    return (
        <>
        <div className="orders-steps-container">
             <div className="orders-steps-content2">
                 {/* <div className="steps-title2">
                     Deseja Imprimir?
                 </div> */}
             </div>
         </div>
        </>
    )
}

export default ImpressaoHeader;