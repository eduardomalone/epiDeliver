import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API
});

const apiUrl = ({
    URL: process.env.REACT_APP_API
})

const cli = ({
    idCliente: process.env.REACT_APP_IDcli
})

export const getAll = async (): Promise<any> => {
    console.log("######## apiUrl:", apiUrl)
    
    try {
        const { data } = await api.get(`/epis/cliente?idCliente=`+cli.idCliente);
        if(data){
            console.log("######## getAll:", data)
            return{
                data
            }
        }
    } catch(error){
        console.log(error);
        return new Error((error as {message: string }).message || 'Erro ao listar registros.')
    }
};

export const getById = async (id: number): Promise<any> => {
    try {
        const { data } = await api.get(`/epis/epi?idEpi=`+id);
        if(data){
            console.log("######## getById:",data)
            return{
                data
            }
        }
    } catch(error){
        console.log(error);
        return new Error((error as {message: string }).message || 'Erro ao procurar registro.')
    }
};

export const getByCod = async (codEpi: string): Promise<any> => {
    try {
        const { data } = await api.get(`/epis/codigo?idCliente=`+cli.idCliente+`&codEpi=`+codEpi);
        if(data){
            console.log("######## getByCod:",data)
            return{
                data
            }
        }
    } catch(error){
        console.log(error);
        return new Error((error as {message: string }).message || 'Erro ao procurar codigo EPI.')
    }
};

export const getByDesc = async (descricao: string): Promise<any> => {
    try {
        const { data } = await api.get(`/epis/descricao?idCliente=`+cli.idCliente+`&descricao=`+descricao);
        if(data){
            console.log("######## getByDesc:",data)
            return{
                data
            }
        }
    } catch(error){
        console.log(error);
        return new Error((error as {message: string }).message || 'Erro ao procurar codigo EPI.')
    }
};

export const create = async (epi: any): Promise<any> => {
    try {
        const { data } = await api.post(`/epis/epi`, epi);
        if(data){
            console.log("######## create:", data.id)
            return{
                data
            }
        }
    } catch(error){
        console.log(error);
        return new Error((error as {message: string }).message || 'Erro ao salvar registro.')
    }
};

export const updateById = async (id: number, epi: any): Promise<any> => {
    try {
        const { data } = await api.put(`/epis`, epi);
        if(data){
            console.log("######## create:", data.id)
            return{
                data
            }
        }
    } catch(error){
        console.log(error);
        return new Error((error as {message: string }).message || 'Erro ao atualizar registro.')
    }
};

export const deleteById = async (id: number): Promise<any> => {
    try {
        const { data } = await api.delete(`/epis?id=`+id);
        if(data){
            console.log("######## delete:", data.id)
            return{
                data
            }
        }
    } catch(error){
        console.log(error);
        return new Error((error as {message: string }).message || 'Erro ao deletar registro.')
    }
};

export const cargaEpi = async ( path: string): Promise<any> => {
    try {
        const { data } = await api.get(`/carga/epi?idCli=${cli.idCliente}&path=${path}`);
        if(data){
            console.log("######## cargaEPI:", data)
            return{
                data
            }
        }
    } catch(error){
        console.log("######## cargaEPI ERRO",error);
        throw new Error('Falha na leitura ou no processamento do arquivo!');
       // return new Error((error as {message: string }).message || 'Erro ao efetuar carga EPI.')
    }
};