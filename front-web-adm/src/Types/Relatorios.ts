
export type RelatorioDataSolicitacao = {
	registro: string,
	dataInclusao: string,
	setor: string,
	codigo: string
};

export type RelatorioDataSolicitacaoBaixa = {
	nome: string,
	codigo: string,
	descricao: string,
	dataBaixa: string;
	dataInclusao: string
};

export type RelatorioDataSolicitacaoBaixaFunc = {
	nome: string,
	codigo: string,
	descricao: string,
	dataBaixa: string;
	dataInclusao: string
};

export type RelatorioDataSolicitacaoFuncionarios = {
    funcionarios: RelatorioDataSolicitacao[]
    };

export type Epi = {
	id: number;
	idCliente: number;
	codigo: string;
	descricao: string;
	validade: number;
}

	