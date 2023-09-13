
export type Funcionario = {
      id: number;
	  idCliente: number;
	  registro: string;
	  nome: string;
	  setor: string;
	  codFuncao: string;
	  coringa: string;
};

export type Funcionarios = {
    funcionarios: Funcionario[]
    };

export type Epi = {
	id: number;
	idCliente: number;
	codigo: string;
	descricao: string;
	validade: number;
}

	