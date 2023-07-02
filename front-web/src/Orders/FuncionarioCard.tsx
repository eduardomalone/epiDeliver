
import { FuncionarioDTO } from './types';

type Props = {
    funcionario: FuncionarioDTO[]
}

function FuncionarioCard(this: any, { funcionario }: Props) {

    var srcImgGit = 'https://eduardomalone.github.io/img/func_imgs/'

    // coloca uma img padrao caso n encontre a foto do funcionario
    function onError(e: any) {
        e.target.src = '/func_imgs/func_default.svg';
    }
    console.log(' ##### FuncionarioCard ####')
    return (
        <div className="">
            <img className=""
                src={ srcImgGit+""+funcionario[0].registro + '.jpg'}
                onError={(e) => onError(e)} alt="testImg"
            />
            <div className="order-card-description">
                <h3>{funcionario[0].nome}</h3>
                <h3>{funcionario[0].setor}</h3>
            </div>
        </div>
    )
}

export default FuncionarioCard;