import './style.css';
// import {ReactComponent as Logo} from './epiLogo.svg'
import {ReactComponent as Logo} from './eng.svg'

function Navbar(){
    return(
        <nav className="main-navbar">
            <Logo />
            <a href="home" className="logo-text"> EPI Delivery</a>
        </nav>
    )
}

export default Navbar;