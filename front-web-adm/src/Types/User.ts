export type User = {
codFuncao: string;
coringa: string; 
id: number
idCliente: number
nome: string
registro: string
setor: string
}

export type UserLogin = {
    id: number;
	idPerfil: number;
    idFuncio: number;
	login: string;
    }

export type ItemSolicitacao = {

	id: number;
	idSolicitacao: number;
	idEpi: number;
	codigoBarra: string;
	dataInclusao: string;
	idUsuarioBaixa: number;
	ip: string;
	dataBaixa: string;
    }

export type EpiDTO = {
    id: number;
    idCliente: number;
    codigo: string;
    descricao: string;
    validade: number;
}

export type ItemSolicitacaoEpiDTO = {
    epiDTO: EpiDTO;
    itemSolicit: ItemSolicitacao;
}


export type LoginDTO = {
    idCliente: number;
    login: string;
    senha: string;
}
