export type ItemSolicitacao = {
    id: number;
    idCliente: number;
    codigo: string;
    descricao: string;
    validade: number;
}

export type ItemSolicitacaoDTO = {
    funcionarioDTO: FuncionarioDTO;
    listaEpiDTO: EpiDTO[];
}

export type FuncionarioDTO = {
    id: number;
    idCliente: number;
    registro: string;
    nome: string;
    setor: string;
    codFuncao: string;
    coringa: string;
}

export type EpiDTO = {
    id: number;
    idCliente: number;
    codigo: string;
    descricao: string;
    validade: number;
}

export type MontaTelaEpiRequest = {
    registro: string;
    idCliente: number;
}

export type SolicitacaoRequest = {
    funcionario: FuncionarioDTO
    listaEpiDTO: EpiDTO[]
}
