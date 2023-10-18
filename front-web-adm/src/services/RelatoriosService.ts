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

export const solicitacoesDatas = async (data1: string, data2: string): Promise<any> => {

    try {
        //relatorios/datas?data1=2023-06-25&data2=2023-06-27&idCli=1
        const { data } = await api.get(`relatorios/datas?data1=`+data1+`&data2=`+data2+`&idCli=`+cli.idCliente);
        //const { data } = await api.get(`/relatorios/datas?data1=`+data1+`&data2=`+data2+`&idCli=`+cli.idCliente);

        if(data){
            console.log("######## solicitacoesDatas:", data)
            return{
                data
            }
        }

    } catch(error){
        console.log(error);
        return new Error((error as {message: string }).message || 'Erro ao listar registros.')
    }
};

export const solicitacoesDatasBaixa = async (data1: string, data2: string): Promise<any> => {

    try {
        //relatorios/datas?data1=2023-06-25&data2=2023-06-27&idCli=1
        const { data } = await api.get(`relatorios/datasBaixa?data1=`+data1+`&data2=`+data2+`&idCli=`+cli.idCliente);
        //const { data } = await api.get(`/relatorios/datas?data1=`+data1+`&data2=`+data2+`&idCli=`+cli.idCliente);

        if(data){
            console.log("######## solicitacoesDatasBaixa:", data)
            return{
                data
            }
        }

    } catch(error){
        console.log(error);
        return new Error((error as {message: string }).message || 'Erro ao listar registros.')
    }
};


export const solicitacoesDatasBaixaFunc = async (registro: string): Promise<any> => {

    try {
        //relatorios/datasBaixaFunc?registro=123&idCli=1
        const { data } = await api.get(`relatorios/datasBaixaFunc?registro=`+registro+`&idCli=`+cli.idCliente);
        //const { data } = await api.get(`/relatorios/datas?data1=`+data1+`&data2=`+data2+`&idCli=`+cli.idCliente);

        if(data){
            console.log("######## solicitacoesDatasBaixa:", data)
            return{
                data
            }
        }

    } catch(error){
        console.log(error);
        return new Error((error as {message: string }).message || 'Erro ao listar registros.')
    }
};



export const getAll = async (): Promise<any> => {
    console.log("######## apiUrl:", apiUrl)
    
    try {
        const { data } = await api.get(`/funcionarios/cliente?idCliente=`+cli.idCliente);

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
        const { data } = await api.get(`/funcionarios/funcionario/cliente?idFunc=`+id+`&idCliente=`+cli.idCliente);

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

export const getByName = async (nome: string): Promise<any> => {
    try {
        const { data } = await api.get(`/funcionarios/funcionario/nome?nome=`+nome+`&idCliente=`+cli.idCliente);

        if(data){
            console.log("######## getByName:",data)
            return{
                data
            }
        }

    } catch(error){
        console.log(error);
        return new Error((error as {message: string }).message || 'Erro ao procurar registro.')
    }
};


export const create = async (funcionario: any): Promise<any> => {
    try {
        const { data } = await api.post(`/funcionarios`, funcionario);

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

export const updateById = async (id: number, funcionario: any): Promise<any> => {
    try {
        const { data } = await api.put(`/funcionarios`, funcionario);
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
        console.log("######## chegou delete:",id)
        const { data } = await api.delete(`/funcionarios?id=`+id);
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

export const cargaFuncionario = async (id: number, path: string): Promise<any> => {
    try {
        const { data } = await api.get(`/funcionarios/carga?idCliente=${id}&path=${path}`);

        if(data){
            console.log("######## cargaFuncionario:", data)
            return{
                data
            }
        }
    } catch(error){
        console.log(error);
        return new Error((error as {message: string }).message || 'Erro ao deletar registro.')
    }
};