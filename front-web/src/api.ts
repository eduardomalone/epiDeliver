import axios from "axios";


const API_URL = 'https://sistemaepi.herokuapp.com';

export function fetchMontaTelaEpi(registro:string, idCliente:string){
    //console.log('###################### tentou chamar a API')
    return axios(`${API_URL}/montaTelaEpi?registro=`+registro+`&idCliente=`+idCliente);
}

export function fetchFuncionario(registro:string, idCliente:string){
    //console.log('###################### tentou chamar a API')
    return axios(`${API_URL}/funcionarios?registro=`+registro+`&idCliente=`+idCliente);
}

export function fetchSalvarSolicitacao(payload: any){
    console.log('###################### tentou chamar a API')
    console.log(payload)
    
    return axios.post(`${API_URL}/solicitacao`, payload);
}



