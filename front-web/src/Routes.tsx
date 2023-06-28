import { BrowserRouter , Route, Switch} from "react-router-dom";
import Solicitacao from "./Orders"
import ItemSolicitacao from "./ItemSolicitacao"
import Home from "./Home";
import Navbar from "./Navbar";
import Resumo from "./Resumo";

function Routes(){

    return (
        <BrowserRouter>
            <Navbar></Navbar>
            <Switch>
                <Route path="/resumo">
                    <Resumo />
                </Route>
                <Route path="/solicitacao">
                    <Solicitacao />
                </Route>
                <Route path="/ItemSolicitacao">
                    <ItemSolicitacao />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
            
        </BrowserRouter>
    )

}

export default Routes;