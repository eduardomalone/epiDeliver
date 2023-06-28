import './style.css';
// import {ReactComponent as Logo} from './epiLogo.svg'
import {ReactComponent as Logo} from './eng.svg'
import { Link } from 'react-router-dom';

function Navbar(){
    return(
        <nav className="main-navbar">
            <Logo />
            <Link to="/home" className="logo-text"> EPI Delivery</Link>
        </nav>
    )
}

export default Navbar;