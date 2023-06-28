import './styles.css';
import { ReactComponent as MainImage } from './epiLogo.svg';
import * as React from 'react';
import Footer from '../Footer';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const idCliente = "_1"

function retornaCliente(x: string){
    let y = x+idCliente
    return y
}

function Home() {

    const [idCliente] = useState('_1');
    const [value, setValue] = useState("");
    return (
        <>
            <div className="home-container">
                <div className="home-content">
                    <div className="home-actions">
                        <h1 className="home-title">
                            Solicite seu EPI <br /> Trabalhe com SEGURANÇA
                        </h1>
                        <h3 className="home-subtitle">
                            Escolha seu EPI e retire-o no departamento indicado
                        </h3>
                        <h1 className="py-5"> Digite sua Funcional</h1>

                        <h1>
                            <div>
                                <input
                                    value={value}
                                    onChange={(e) => { setValue((e.target.value)) }}
                                    className='home-input-order'
                                />
                            </div>
                            <div>
                                {}
                                <Link
                                    to={{
                                        pathname: `/solicitacao/${value}&idCli=${idCliente}`,
                                        //state: { value},
                                        state: (retornaCliente(value as string))
                                    }}
                                    //to="solicitacao" className="home-btn-order"
                                    className="home-btn-order">
                                    Fazer Solicitação
                                </Link>
                            </div>
                        </h1>
                    </div>
                    <div className="home-image">
                        <MainImage />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home;