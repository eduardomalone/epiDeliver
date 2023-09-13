import axios from "axios";


//const API_URL = 'https://sistemaepi.herokuapp.com'
const API_URL = process.env.REACT_APP_API

export function fetchMontaTelaEpi(registro:string, idCliente:string){
    return axios(`${API_URL}montaTelaEpi?registro=`+registro+`&idCliente=`+idCliente);
}

export function fetchFuncionario(registro:string, idCliente:string){
    return axios(`${API_URL}funcionarios?registro=`+registro+`&idCliente=`+idCliente);
}

export function fetchSalvarSolicitacao(payload: any){
    return axios.post(`${API_URL}solicitacao`, payload);
}

export function fetchSolicitacaoBaixa(payload: any){
    return axios.put(`${API_URL}solicitacao/baixa`, payload);
}

export function fetchBuscarSolicitacao(payload: string){
    return axios.get(`${API_URL}solicitacao/busca?cobBarras=`+payload);
}



