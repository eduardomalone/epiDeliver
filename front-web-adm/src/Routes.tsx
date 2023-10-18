import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
//import { AuthProvider } from "./Contexts/Auth/AuthProvider.tsx_txt";
//import { RequireAuth } from "./Contexts/Auth/RequireAuth.tsx_txt";
import UpdateOrders from "./UpdateOrders";
import { Cadastrar } from "./Cadastro";
//import { CadastroADM } from "./CadastroADM";
//import { AlteraSenha } from "./AlteraSenha";
import { MenuLateral } from "./MenuLateral/menuLateral";
import { DrawerProvider } from "./MenuLateral/DrawerContext";
import Funcionarios from "./Funcionario";
import { DetalheDeFuncionarios } from "./Funcionario/DetalheDeFuncionarios";
import { CargaFuncionario } from "./Funcionario/CargaFuncionario";
import Epis from "./Epi";
import { DetalheDeEpi } from "./Epi/DetalheDeEpi";
import FuncXepi from "./FuncXepi";
import { DetalheDeFuncXepi } from "./FuncXepi/DetalheDeFuncXepi";
//import { AlteraSenha } from "./AlteraSenha/index.tsx_txt";
import Solicitacao from "./Solicitacao";
//import { Login } from "./Login";
import { AuthProvider } from "./contexts_/AuthContext";
import { Login } from "./Login/Login";
import HomeADM from "./HomeADM";
import HomeRelatorio from "./Relatorio";
import RelatorioSolicitacoes from "./Relatorio/RelatorioSolicitacoes";
import RelatorioSolicitacoesBaixa from "./Relatorio/RelatorioSolicitacoesBaixa";
import RelatorioSolicitacoesBaixaFunc from "./Relatorio/RelatorioSolicitacoesBaixaFunc";

function Routes() {

    //const { isAuthenticated, login, user, userLogin } = useAuThContext();
    return (

        <AuthProvider>
            <Login>
                
                <DrawerProvider>
                    <BrowserRouter>
                        <MenuLateral>
                            <Navbar />
                            <Switch>
                                <Route path="/cadastrar">
                                    <Cadastrar />
                                </Route>
                                <Route path="/relatorios/solicitacaoDatas">
                                    <RelatorioSolicitacoes />
                                </Route>
                                <Route path="/relatorios/solicitacaoDatasBaixa">
                                    <RelatorioSolicitacoesBaixa />
                                </Route>
                                <Route path="/relatorios/solicitacaoDatasBaixaFunc">
                                    <RelatorioSolicitacoesBaixaFunc />
                                </Route>
                                <Route path="/relatorios">
                                    <HomeRelatorio />
                                </Route>
                                <Route path="/updateOrders">
                                    {/* <RequireAuth level={''}> */}
                                    <UpdateOrders />
                                    {/* </RequireAuth> */}
                                </Route>
                                <Route path="/funcionarios">
                                    {/* <RequireAuth level={''}> */}
                                    <Funcionarios />
                                    {/* </RequireAuth> */}
                                </Route>
                                <Route path="/detalhe/funcionarios/:id">
                                    {/* <RequireAuth level={''}> */}
                                    <DetalheDeFuncionarios />
                                    {/* </RequireAuth> */}
                                </Route>
                                <Route path="/cargaFuncionarios">
                                    {/* <RequireAuth level={''}> */}
                                    <CargaFuncionario />
                                    {/* </RequireAuth> */}
                                </Route>
                                <Route path="/epis">
                                    {/* <RequireAuth level={''}> */}
                                    <Epis />
                                    {/* </RequireAuth> */}
                                </Route>
                                <Route path="/detalhe/epis/:id">
                                    {/* <RequireAuth level={''}> */}
                                    <DetalheDeEpi />
                                    {/* </RequireAuth> */}
                                </Route>
                                <Route path="/funcXepi">
                                    {/* <RequireAuth level={''}> */}
                                    <FuncXepi />
                                    {/* </RequireAuth> */}
                                </Route>
                                <Route path="/detalhe/funcXepis/:id">
                                    {/* <RequireAuth level={''}> */}
                                    <DetalheDeFuncXepi />
                                    {/* </RequireAuth> */}
                                </Route>
                                <Route path="/solicitacoes">
                                    {/* <RequireAuth level={''}> */}
                                    <Solicitacao />
                                    {/* </RequireAuth> */}
                                </Route>
                                <Route path="/">
                                    {/* <RequireAuth level={''}> */}
                                    <HomeADM />
                                    {/* </RequireAuth> */}
                                </Route>
                            </Switch>
                        </MenuLateral>
                    </BrowserRouter>
                </DrawerProvider>
                
            </Login>
        </AuthProvider>
    )

}

export default Routes;