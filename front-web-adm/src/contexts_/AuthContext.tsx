import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AuthService } from "../services/AuthService";
import { User, UserLogin } from "../Types/User";


interface IAuthContextData {
    logout: () => void;
    isAuthenticated: boolean;
    login: (login: string, senha: string) => Promise<string | void>
    updateLogin: (login: string, senha: string, novaSenha: string) => Promise<string | void>
    user: any;
    userLogin: any;
}

const AuthContext = createContext({} as IAuthContextData);

const LOCAL_STORAGE_KEY_ACCESS_TOKEN = 'APP_ACCESS_TOKEN';

interface IAuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {

    const [accessToken, setAcessToken] = useState<string>();
    const [user, setUser] = useState<User>();
    const [userLogin2, setUserLogin2] = useState<UserLogin>();

    useEffect(() => {
        const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
        if(accessToken){
            setAcessToken(accessToken);
        }else{
            setAcessToken(undefined);
        }
    }, []);

    const handleLogin = useCallback(async (login: string, senha: string) => {
        const result = await AuthService.auth(login, senha);
        if (result instanceof Error) {
            return result.message;
        }else{
            console.log('### loggin realizado ###', result.data.login.idPerfil)
            localStorage.setItem('APP_ACCESS_TOKEN',(result.data.autorizado))
            localStorage.setItem('APP_ACCESS_USER',(result.data.login.idPerfil))
            setAcessToken(result.data.autorizado);
            setUser(result.data.funcionario);
            setUserLogin2(result.data.login);
        }
    }, []);

    const handleUpdateLogin = useCallback(async (login: string, senha: string, novaSenha: string) => {
        const result = await AuthService.updateLogin(login, senha, novaSenha);
        if (result instanceof Error) {
            return result.message;
        }else{
            console.log('### senha atualizada ###',)
            //setAcessToken(result.data.autorizado);
            //setUser(result.data.funcionario);
            //setUserLogin(result.data.login);
        }
    }, []);

    const handleLogout = useCallback(async () => {
        localStorage.removeItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN)
        setAcessToken(undefined);
    }, []);

    const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);
    const userLogin = useMemo(() => userLogin2, [userLogin2])
    //const user = user2;

    return (
        <AuthContext.Provider value={{isAuthenticated, login: handleLogin, logout: handleLogout, updateLogin: handleUpdateLogin ,user, userLogin}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuThContext = () => useContext(AuthContext);