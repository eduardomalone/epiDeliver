
import './styles.css';
import { useHistory } from 'react-router-dom';
import { ReactNode, useEffect, useState } from 'react';
import { Box, Button, Icon, IconButton, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useDrawerContext } from '../MenuLateral/DrawerContext';
import { deleteById, getAll, getByCod, getByDesc } from '../services/EpiService';
import { Epi } from '../Types/Epi';
import { useDebounce } from '../hook/UseDebounce';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useAuThContext } from "../contexts_/AuthContext";



function Epis() {

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('sm'));
    const { toggleDrawerOpen } = useDrawerContext();
    const [epis, setEpis] = useState<Epi[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const barraDeFerramentas: ReactNode = <></>;

    const [textoDaBusca, setTextoDaBusca] = useState('');
    const { debounce } = useDebounce();
    const navigate = useHistory();
    const { user, userLogin, updateLogin, isAuthenticated,logout } = useAuThContext();

    const perfilLOG = Number(process.env.REACT_APP_IDPerfilLogistica);
    const perfilADM = Number(process.env.REACT_APP_IDPerfilAdm);
    const perfilADMSIST = Number(process.env.REACT_APP_IDPerfilAdmSist);
    const [perfTeste, setPerfTeste] = useState<number>(Number(localStorage.getItem('APP_ACCESS_USER')));


    useEffect(() => {
        setPerfTeste(Number(localStorage.getItem('APP_ACCESS_USER')))
        getAll().then((response) => {
            //setIsLoading(true);
            setEpis(response.data)
            console.log('###### response', response.data);
            setIsLoading(false);
        })
            .catch(error => {
                console.log('###-error-####', error.response)
            })
    }, []);

    function aoMudarTextoDeBusca(novoTexto: string) {
        //setTextoDaBusca(novoTexto);
        console.log('######', novoTexto)
        debounce(() => {

            //setIsLoading(true);
            getByDesc(novoTexto)
                .then((response) => {
                    // toast.error(`Baixa do Equipamento realizada com sucesso!`, {
                    //     position: toast.POSITION.TOP_CENTER
                    // });
                    //setIdSolicitacao(response.data.solicitacaoDTO.id)
                    console.log('### filtro por getByDesc ###',)
                    setEpis(response.data)

                })
                .catch(() => {
                    console.log('### erro no filtro por nome ###',)
                    // toast.warning('Erro ao enviar pedido', {
                    //     position: toast.POSITION.TOP_CENTER
                    // });
                })
        });
        //setIsLoading(false);
    }

    function handleDelete(id: number) {
        if (window.confirm('Deseja apagar?')) {
            deleteById(id)
                .then((response) => {
                    console.log('##### Deletado com Sucesso! ####')
                    setEpis(oldEpis => {
                        return [
                            //removendo da lista atual o item deletado
                            ...oldEpis.filter(oldEpi => oldEpi.id !== id),
                        ];
                    })
                }).catch(() => {
                    console.log('### Erro ao Deletar ###',)
                });
        }
    }

    function validaAutenticado(){
        // import { useAuThContext } from "../contexts_/AuthContext";
        //const { user, userLogin, updateLogin, isAuthenticated,logout } = useAuThContext();
        // {(validaAutenticado() &&
        console.log('### userLogin ###', userLogin)
        console.log('### isAuthenticated ###', isAuthenticated)
        if(!isAuthenticated || userLogin === undefined){
            logout()
            return false
        }
        return true
    }

    return (
        <>
         {(validaAutenticado() && (perfilADM  === perfTeste || perfilADMSIST  === perfTeste) &&
         
            <Box height='100%' display='flex' flexDirection='column' gap={1}>
                <Box padding={1} display='flex' alignItems='center' height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)} gap={1}>
                    {smDown && (
                        <IconButton onClick={toggleDrawerOpen}>
                            <Icon>
                                <MenuIcon />
                            </Icon>
                        </IconButton>
                    )}
                    <Typography
                        variant={smDown ? "h5" : mdDown ? "h4" : "h3"}
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        >
                        EPIs
                    </Typography>
                </Box>
                {barraDeFerramentas && (
                    <Box>
                        <Box height={theme.spacing(5)} component={Paper} marginX={1} padding={1} paddingX={2} display="flex" gap={1} alignItems="center" marginTop={1}>
                            <TextField
                            autoFocus
                            fullWidth
                            size="small"
                            placeholder="Descrição..."
                            value={textoDaBusca}
                            onChange={e => { setTextoDaBusca(e.target.value); aoMudarTextoDeBusca?.(e.target.value) }}
                            />
                            <Box flex={1} display="flex" justifyContent="end">
                                <Button
                                    onClick={() => navigate.push('/detalhe/epis/novo')}
                                    variant="contained"
                                    color="warning"
                                    disableElevation
                                    endIcon={<Icon><AddIcon /></Icon>}
                                    >Novo</Button>
                            </Box>
                        </Box>
                    </Box>
                )}
                <Box flex={1} overflow='auto'>
                    <TableContainer component={Paper} variant='outlined' sx={{ m: 1, width: 'auto' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Acoes</TableCell>
                                    <TableCell>Código</TableCell>
                                    <TableCell>Descrição</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {epis.map(epi =>
                                    <TableRow key={epi.id}>
                                        <TableCell>
                                            <IconButton size='small' onClick={() => handleDelete(epi.id)}>
                                                <Icon><DeleteIcon /></Icon>
                                            </IconButton>
                                            <IconButton size='small' onClick={() => navigate.push('/detalhe/epis/'+epi.id)}>
                                                <Icon><EditIcon /></Icon>
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>{epi.codigo}</TableCell>
                                        <TableCell>{epi.descricao}</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                            {epis.length === 0 && !isLoading && (
                                <caption>Nenhum registro encontrado</caption>
                            )}
                            <TableFooter>
                                {isLoading && (
                                    <TableRow>
                                        <TableCell colSpan={3}>
                                            <LinearProgress variant='indeterminate' />
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        )}
        </>
    )
}

export default Epis;