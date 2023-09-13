import './style.css';
import {ReactComponent as Logo} from './eng.svg';
import {ReactComponent as Logout} from './logout.svg';
import { Link } from 'react-router-dom';
//import { AuthContext } from '../Contexts/Auth/AuthContext.tsx_txt';
import { useContext } from 'react';
import { useAuThContext } from '../contexts_/AuthContext';
//import { useDrawerContext } from '../MenuLateral/DrawerContext';
//import { Avatar, Box, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from "@mui/material"


function Navbar(){
    //const { toggleDrawerOpen } = useDrawerContext();
    //const auth = useContext(AuthContext);
    const {user, userLogin, updateLogin, logout } = useAuThContext();
    function handleLogout() {
        //await auth.singout();
        //atualiza a pagina
        // eslint-disable-next-line no-self-assign
        //window.location.href = window.location.href;
        logout()
    }
    return(
        <nav className="main-navbar" >
            
            <Link  to="/cadastrar">
                <Logo />
            </Link>
            <Link to="/orders" className="logo-text"> SistemaEpi ADM</Link>
            {user && (
                <Link to="/" className="logo-text" 
                onClick={handleLogout}
                >
                    <Logout />
                </Link>
            )}
            {/* <button onClick={toggleDrawerOpen}> teste</button> */}
        </nav>
    )
}

export default Navbar;