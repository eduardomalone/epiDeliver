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

export const getByCodBarras = async (codBarras: string): Promise<any> => {
    try {
        const { data } = await api.get(`solicitacao/busca?cobBarras=`+codBarras);

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

export const setDownOrder = async (payload: any): Promise<any> => {
    try {
        const { data } = await api.put(`solicitacao/baixa`, payload);
        if(data){
            console.log("######## downOrders:",data)
            return{
                data
            }
        }
    } catch(error){
        console.log(error);
        return new Error((error as {message: string }).message || 'Erro downOrders.')
    }
};

