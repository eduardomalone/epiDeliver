import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API
});

const apiUrl = ({
    URL: process.env.REACT_APP_API
})

const cli = ({
    idCliente: process.env.REACT_APP_IDcli
})

export const useApi = () => ({
    validateToken: async (token: string) => {
        const response = await api.post('/validate', { token });
        return response.data;
    },
    signin: async (login: string, senha: string) => {
        const payload = {
            idCliente: cli.idCliente,
            login: login,
            senha: senha
        }
        //console.log('####|o/',apiUrl.URL , '###', payload)
        const response = await api.post(apiUrl.URL + `loginUsuario/validarSenha`, payload);
        console.log('##### signin', response.data);

        if (response) {
            console.log('#### uhuu ####')
        }
        return response.data;
    },
    atualizaSenha: async (login: string, senha: string, novaSenha: string) => {

        const payload = {
            idCliente: cli.idCliente,
            login: login,
            senha: senha,
            novaSenha: novaSenha
        }
        //console.log('####',payload , '###') 
        const response = await api.post(apiUrl.URL + `loginUsuario/atualizarSenha`, payload)
        console.log('##### status', response.status);
        return response.data;
    },
    tokenJWT: async (login: string, senha: string) => {
        const response = await api.post(apiUrl.URL + 'login', { login, senha });
        return response.data;
    },
    logout: async () => {
        return { statu: true }
    }
})