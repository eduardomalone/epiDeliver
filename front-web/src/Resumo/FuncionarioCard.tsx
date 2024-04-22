import { FuncionarioDTO } from "../Orders/types";


type Props = {
    funcionario: FuncionarioDTO
}

function FuncionarioCard(this: any, { funcionario }: Props) {
    // function onError(e: any) {
    //     e.target.src = '/func_imgs/func_default.svg';
    // }
    return (
        <div className="">
            {/* <img className=""
                src={'/func_imgs/'+funcionario.registro+'.jpg'}
                onError={(e) => onError(e)} alt="testImg" 
            /> 
            <div className="order-card-description">
                <h3>{funcionario.nome}</h3>
                <h3>{funcionario.setor}</h3>
            </div> */}
        </div>
    )
}

export default FuncionarioCard;
