import './styles.css';
import { ReactComponent as MainImage } from './epiLogo.svg';
import * as React from 'react';
//import Footer from '../Footer';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { Box, Button, Card,  CardContent, Grid, Paper, TextField, Typography, useTheme } from '@mui/material';
import { useDebounce } from '../hook/UseDebounce';



//const idCliente = "_1"
const idCliente = "_4"

//pega o Id do cliente de acordo com a home criada
function retornaCliente(x: string) {
    let y = x + idCliente
    return y
}


function Home() {

    const [idCliente] = useState('_4');
    //const [idCliente] = useState('_1');
    const [valuex, setValuex] = useState("");
    const theme = useTheme();
    const { debounce } = useDebounce();

    // redireciona para a pagina de descanso
    let history = useHistory();
    function contadorTelaDescanso() {
        setTimeout(() => {
            history.push(`/ItemSolicitacao`);
        }, 1800000);
        return;
    }

    

    function aoMudarTextoDeBusca(func:string) {
        debounce(() => {
            alert(`aoMudarTextoDeBusca: ` + retornaCliente(valuex as string))
            alert(`func: ` + func)
            alert(`valuex: ` + valuex)
            //let path = `/solicitacao/`+func+`&idCli=${idCliente}`;
            //history.push(path);
            history.push({
                // pathname: path,
                // state: (retornaCliente(valuex as string))

                pathname: `/solicitacao/${valuex}&idCli=${idCliente}`,
                state: (retornaCliente(valuex as string))
            });
            
       });
      
      }

    return (
        <>

            {/* <Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center'
                sx={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundImage: "url('/epi_imgs/epi_padrao.jpg')",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                }}
            >
                <Card>
                    <CardContent>
                        <Box display='flex' flexDirection='column' gap={2} width={300} >
                            <Typography variant="h6" align="center" sx={{ fontWeight: 'bold', m: 1 }}>
                                SOLICITE SEU EPI
                            </Typography>
                            <Typography variant="h6" align="center">Informe a Funcional </Typography>
                            <TextField
                                autoFocus
                                fullWidth
                                size="small"
                                placeholder="Funcional..."
                                value={value}
                                onChange={e => { setValue(e.target.value); }}
                            />
                        </Box>
                        <CardActions>
                            <Box width='100%' display='flex' justifyContent='center'>

                                <Link
                                    to={{
                                        pathname: `/solicitacao/${value}&idCli=${idCliente}`,
                                        state: (retornaCliente(value as string))
                                    }}
                                    className="">
                                    <Button
                                        variant="contained"
                                        color="warning"
                                        disableElevation
                                    >
                                        Buscar
                                    </Button>
                                </Link>
                            </Box>
                        </CardActions>
                    </CardContent>
                </Card>

            </Box> */}

            <Box height='100%' width='100%' display='flex' >

                <Grid container margin={3} >
                    <Grid item container spacing={2}>
                        <Grid item xs={12} sm={6} xl={3}>
                            <Card style={{ border: "none", boxShadow: "none" }}>
                                <CardContent>
                                    <Typography variant='h5' align='center'>
                                        <h1 className="home-title">
                                            Solicite seu EPI <br /> <br />Trabalhe com SEGURANÇA
                                        </h1>
                                    </Typography>
                                    <Box padding={5} display='flex' justifyContent='center' alignItems='center'>
                                        <h1 className=""> Digite sua Funcional</h1>
                                    </Box>
                                    <Box>
                                        <Box height={theme.spacing(30)} component={Paper} marginX={1} padding={1} paddingX={2} display="flex" gap={1} alignItems="center" marginTop={1}>
                                            <TextField
                                                id='input'
                                                autoFocus
                                                fullWidth
                                                size="small"
                                                placeholder="Funcional..."
                                                value={valuex}
                                                onChange={e => { setValuex(e.target.value); aoMudarTextoDeBusca?.(e.target.value)}}
                                            />
                                            <Box flex={1} display="flex" justifyContent="end">

                                                <Link
                                                    to={{
                                                        pathname: `/solicitacao/${valuex}&idCli=${idCliente}`,
                                                        state: (retornaCliente(valuex as string))
                                                    }}
                                                    className="">
                                                    <Button
                                                        variant="contained"
                                                        color="warning"
                                                        disableElevation
                                                    >
                                                        Buscar
                                                    </Button>
                                                </Link>
                                            </Box>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} xl={3}>
                            <Card style={{ border: "none", boxShadow: "none" }}>
                                <CardContent>
                                    <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                                        <MainImage />
                                    </Box>
                                    <Typography variant='h6' align='center'>
                                        <h1 className="home-title">
                                        Escolha seu EPI <br />
                                        </h1>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>

            {/* <div className="home-container">
                
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
                                { }
                                <Link
                                    to={{
                                        pathname: `/solicitacao/${value}&idCli=${idCliente}`,
                                        state: (retornaCliente(value as string))
                                    }}
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
            </div> */}
            {/* <Footer /> */}
            {contadorTelaDescanso()}
        </>
    )
}

export default Home;