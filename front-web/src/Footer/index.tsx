import './styles.css';
// import {ReactComponent as Logo} from './epiLogo.svg'
import {ReactComponent as YouTuBeIcon} from './youtube.svg'
import {ReactComponent as Linkedin} from './linkedin.svg'
import {ReactComponent as Instagran} from './instagram.svg'

function Footer(){
    return(
        <footer className="main-footer">
            App EPI DELIVERY
            <div className="footer-icons">
                <a href="www.youtube.com" target='_new'>
                    <YouTuBeIcon />
                </a>
                <a href="www.youtube.com" target='_new'>
                    <Linkedin />
                </a>
                <a href="www.youtube.com" target='_new'>
                    <Instagran />
                </a>

            </div>
        </footer>
    )
}

export default Footer;