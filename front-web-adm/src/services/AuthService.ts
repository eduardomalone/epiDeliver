import axios from 'axios';
//import { User } from '../Types/User';

const api = axios.create({
    baseURL: process.env.REACT_APP_API
});

const apiUrl = ({
    URL: process.env.REACT_APP_API
})

const cli = ({
    idCliente: process.env.REACT_APP_IDcli
})
    

const auth = async (login: string, senha: string): Promise<any> => {

    const payload = {
        idCliente: cli.idCliente,
        login: login,
        senha: senha
    }
    
    try {
        const { data } = await api.post(apiUrl.URL + `loginUsuario/validarSenha`, payload);
        if(data){
            console.log('##### signin service', data);
            return{
                data
            }
        }
    } catch(error){
        console.log(error);
        return new Error((error as {message: string }).message || 'Não foi possivel fazer o Loggin.')
    }
};

const updateLogin = async (login: string, senha: string, novaSenha: string): Promise<any> => {

    const payload = {
        idCliente: cli.idCliente,
        login: login,
        senha: senha,
        novaSenha: novaSenha
    }
    
    try {
        const { data } = await api.post(apiUrl.URL + `loginUsuario/atualizarSenha`, payload)
        if(data){
            console.log('#### senha atualizada xxxxxx ###', data);
            return data;
        }
        
    } catch(error){
        console.log(error);
        return new Error((error as {message: string }).message || 'Não foi possivel atualizar a senha.')
    }
};

export const AuthService = {
    auth, updateLogin
};