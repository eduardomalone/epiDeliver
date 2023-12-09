
import './styles.css';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography } from '@mui/material';
import { useAuThContext } from '../contexts_/AuthContext';


function ResultadoRelatorio() {

    const navigate = useHistory();
    const { userLogin, isAuthenticated, logout } = useAuThContext();

    //const perfilLOG = Number(process.env.REACT_APP_IDPerfilLogistica);
    const perfilADM = Number(process.env.REACT_APP_IDPerfilAdm);
    const perfilADMSIST = Number(process.env.REACT_APP_IDPerfilAdmSist);
    const [perfTeste, setPerfTeste] = useState<number>(Number(localStorage.getItem('APP_ACCESS_USER')));

    const history = useHistory<any>();
    const data = history.location.state.data;
    const [conversations, setConversations] = useState([]);


    useEffect(() => {
        setConversations(data.data.linhasComErro)
        setPerfTeste(Number(localStorage.getItem('APP_ACCESS_USER')))
        console.log('##### data history ', data)
        console.log('##### data history 2', data.data.qtdLinhasErros)
    }, []);

    function aoClicarFinalizar() {

        if(data.data.status === 'funcXepi'){
            navigate.push('/funcXepi')
        }
        if(data.data.status === 'epi'){
            navigate.push('/epis')
        }
        if(data.data.status === 'func'){
            navigate.push('/funcionarios')
        }
    }

    function validaAutenticado() {
        // import { useAuThContext } from "../contexts_/AuthContext";
        //const { user, userLogin, updateLogin, isAuthenticated,logout } = useAuThContext();
        // {(validaAutenticado() &&
        // )}
        //setPerfTeste(userLogin.idPerfil as number )
        console.log('### userLogin ###', userLogin)
        console.log('### isAuthenticated ###', isAuthenticated)
        if (!isAuthenticated || userLogin === undefined) {
            logout()
            return false
        }
        return true
    }


    return (
        <>
            {(validaAutenticado() && (perfilADM === perfTeste || perfilADMSIST === perfTeste) &&

                <Box flex={1} overflow='auto'>
                    <TableContainer component={Paper} variant='outlined' sx={{ m: 1, width: 'auto' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{
                                        textAlign: "center"
                                    }}>Resultado da Carga</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Linhas Processadas: {data.data.qtdLinhasProcessadas}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Qdt linhas com falha: {data.data.qtdLinhasErros}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            </TableBody>
                            <TableFooter>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </Box>
            )}

            {(validaAutenticado() && (perfilADM === perfTeste || perfilADMSIST === perfTeste) && (data.data.qtdLinhasErros > 0) &&
                <Box flex={1} overflow='auto'>
                    <TableContainer component={Paper} variant='outlined' sx={{ m: 1, width: 'auto' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Linhas com Problemas:</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>{conversations.map((x, index) => x)}</TableCell>
                                </TableRow>
                            </TableBody>
                            <TableFooter>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </Box>

            )}
                    <div style={{
                        textAlign: "center"
                    }}>

                        <Button
                            onClick={aoClicarFinalizar}
                            disableElevation
                            variant="contained"
                            color="warning"
                            // startIcon={<Icon><Save /></Icon>}
                            disabled={false}
                        >
                            <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                                finalizar
                            </Typography>
                        </Button>
                    </div>
        </>
    )
}

export default ResultadoRelatorio;