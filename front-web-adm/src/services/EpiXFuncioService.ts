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
        const { data } = await api.get(`/funcXepi/all?idCliente=`+cli.idCliente);
        if(data){
            console.log("######## getAll:", data)
            return{
                data
            }
        }
    } catch(error){
        console.log(error);
        return new Error((error as {message: string }).message || 'Erro ao listar funcXepi.')
    }
};

export const getById = async (id: number): Promise<any> => {
    try {
        const { data } = await api.get(`/funcXepi/id?idCliente=`+cli.idCliente+`&id=`+id);
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


export const getByRegistro = async (registro: string): Promise<any> => {
    try {
        const { data } = await api.get(`/funcXepi/registro?idCliente=`+cli.idCliente+`&registro=`+registro);
        if(data){
            console.log("######## getByRegistro:",data)
            return{
                data
            }
        }
    } catch(error){
        console.log(error);
        return new Error((error as {message: string }).message || 'Erro ao procurar Registro.')
    }
};


export const getByDetalheRegistro = async (registro: string): Promise<any> => {
    try {
        const { data } = await api.get(`/funcionarios/funcionario/registro?idCliente=`+cli.idCliente+`&registro=`+registro);
        if(data[0]){
            console.log("######## detalheRegistro:",data)
            return{
                data
            }
        }
    } catch(error){
        console.log(error);
        return new Error((error as {message: string }).message || 'Erro ao procurar Registro.')
    }
};



export const create = async (epiXfunc: any): Promise<any> => {
    try {
        const { data } = await api.post(`/funcXepi`, epiXfunc);
        if(data){
            console.log("######## create:", data.id)
            return{
                data
            }
        }
    } catch(error){
        console.log(error);
        return new Error((error as {message: string }).message || 'Erro ao salvar epiXfunc.')
    }
};

export const deleteById = async ( funcXepi: any): Promise<any> => {
    try {
        console.log("######## delete chegou:", funcXepi)
        const { data } = await api.delete(`/funcXepi?id=`+funcXepi.id);
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

export const cargaEpi = async (id: number, path: string): Promise<any> => {
    try {
        const { data } = await api.get(`/epis/carga?idCliente=${id}&path=${path}`);
        if(data){
            console.log("######## cargaEpi:", data)
            return{
                data
            }
        }
    } catch(error){
        console.log(error);
        return new Error((error as {message: string }).message || 'Erro ao deletar registro.')
    }
};