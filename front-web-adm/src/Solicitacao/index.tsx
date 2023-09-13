import './styles.css';
import { useHistory } from 'react-router-dom';
import { ReactNode, useState } from 'react';
import { Box, Button, Grid, Icon, IconButton, LinearProgress, Paper, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useDrawerContext } from '../MenuLateral/DrawerContext';
import { getByCodBarras, setDownOrder } from '../services/SolicitacaoService';
import { useDebounce } from '../hook/UseDebounce';
//import { AuthContext } from '../Contexts/Auth/AuthContext.tsx_txt';
import { useAuThContext } from "../contexts_/AuthContext";
import { EpiDTO, ItemSolicitacao, ItemSolicitacaoEpiDTO } from '../Types/User';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function onError(e: any) {
    e.target.src = '/epi_imgs/epi_padrao.jpg';
}


function Solicitacoes() {
    var repoGitImg = 'https://eduardomalone.github.io/img/epi_imgs/'
    //const auth = useContext(AuthContext);
    const { user } = useAuThContext();
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('sm'));
    const { toggleDrawerOpen } = useDrawerContext();
    const barraDeFerramentas: ReactNode = <></>;
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [textoDaBusca, setTextoDaBusca] = useState('');
    const { debounce } = useDebounce();
    //const navigate = useHistory();
    const [itemSolicitEpi, setItemSolicitEpi] = useState<ItemSolicitacaoEpiDTO>();
    const [epiDTO, setEpiDTO] = useState<EpiDTO>();
    const [itemSolicitacaoDTO, setItemSolicitacaoDTO] = useState<ItemSolicitacao>();

    function aoMudarTextoDeBusca(novoTexto: string) {
        debounce(() => {
            setIsLoading(true);
            getByCodBarras(novoTexto)
                .then((response) => {
                    setIsLoading(false);
                    console.log('### filtro por codBarras ###',)
                    setItemSolicitEpi(response.data);
                    setEpiDTO(response.data.epiDTO);
                    setItemSolicitacaoDTO(response.data.itemSolicitacaoDTO);
                    console.log('###### response', response.data);

                })
                .catch(() => {
                    setIsLoading(false);
                    setItemSolicitacaoDTO(undefined)
                    console.log('### erro no filtro por codBarras ###',)
                    toast.warning('Código de Barras não encontrado !', {
                        position: toast.POSITION.TOP_CENTER
                    });
                })
        });
    }


    function baixaSolicitacoes() {
        const payload = {
            idFuncBaixa: user.id,
            barCode: textoDaBusca
        }
        console.log('######', payload)
        debounce(() => {
            setIsLoading(true);
            setDownOrder(payload)
                .then((response) => {
                    setIsLoading(false);
                    toast.error(`Solicitação atualizada com sucesso!`, {
                        position: toast.POSITION.TOP_CENTER
                    });
                    //setIdSolicitacao(response.data.solicitacaoDTO.id)
                    console.log('### baixa da solicitacao ok###',)
                    setTextoDaBusca(''); 
                    setItemSolicitacaoDTO(undefined);
                })
                .catch(() => {
                    setIsLoading(false);
                    console.log('### erro no filtro por nome ###',)
                    toast.warning('Erro ao dar baixa na solicitação!', {
                        position: toast.POSITION.TOP_CENTER
                    });
                })
        });
    }

    return (
        <>
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
                        Entrega de Equipamentos
                    </Typography>
                </Box>
                {barraDeFerramentas && (
                    <Box>
                        {/* Ola {auth.user?.nome}, seja bem vindo! <br /> */}
                        <Box height={theme.spacing(5)} component={Paper} marginX={1} padding={1} paddingX={2} display="flex" gap={1} alignItems="center" marginTop={1}>
                            <TextField
                                autoFocus
                                fullWidth
                                size="small"
                                placeholder="Codigo de barras"
                                value={textoDaBusca}
                                onChange={e => { setTextoDaBusca(e.target.value); aoMudarTextoDeBusca?.(e.target.value) }}
                            //onChange={ e => aoMudarTextoDeBusca?.(e.target.value)}
                            />
                            <Box flex={1} display="flex" justifyContent="end">
                                <Button
                                    onClick={() => { setTextoDaBusca(''); setItemSolicitacaoDTO(undefined) }}
                                    //onClick={aoClicarEmNovo}
                                    variant="contained"
                                    color="warning"
                                    disableElevation
                                //endIcon={<Icon><AddIcon /></Icon>}
                                >Limpar</Button>
                            </Box>
                        </Box>
                        {isLoading && (
                            <div>
                                <LinearProgress variant='indeterminate' />
                            </div>
                        )}
                    </Box>

                )}
                <Box flex={1} overflow='auto' >
                    {itemSolicitacaoDTO?.codigoBarra && (

                        <Box margin={1} display="flex" flexDirection="column" component={Paper} variant='outlined'>
                            <Grid container direction="column" padding={1} spacing={1}>
                                <Grid item>
                                    <Typography variant='h6'>Descrição: {epiDTO?.descricao}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container direction="column" padding={1} spacing={1}>
                                <Grid item>
                                    <Typography variant='h6'>Código: {epiDTO?.codigo}</Typography>
                                </Grid>
                            </Grid>
                            <Box margin={1}>
                                <div className="">
                                    <div className="orders-list-items">
                                        <div>
                                            <img
                                                //src= {'/epi_imgs/'+product.codigo+'.jpg'}
                                                src={repoGitImg + "" + itemSolicitEpi?.epiDTO.codigo + '.jpg'}
                                                className="order-card-image"
                                                alt={itemSolicitEpi?.epiDTO.codigo}
                                                onError={(e) => onError(e)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Box>
                        </Box>
                    )}
                    {itemSolicitacaoDTO?.codigoBarra && (
                        <Box height={theme.spacing(5)} component={Paper} marginX={1} padding={1} paddingX={2} display="flex" gap={1} alignItems="center" marginTop={1}>
                            {!itemSolicitacaoDTO?.idUsuarioBaixa && (
                                <Button
                                    //onClick={() => navigate.push('/detalhe/funcionarios/novo')}
                                    onClick={baixaSolicitacoes}
                                    variant="contained"
                                    color="warning"
                                    disableElevation
                                //endIcon={<Icon><AddIcon /></Icon>}
                                >Entregar</Button>
                            )}
                            {itemSolicitacaoDTO?.idUsuarioBaixa && (
                                <>
                                    <Button
                                        //onClick={() => navigate.push('/detalhe/funcionarios/novo')}
                                        onClick={() => { setTextoDaBusca(''); setItemSolicitacaoDTO(undefined) }}
                                        variant="contained"
                                        color="warning"
                                        disableElevation
                                    //endIcon={<Icon><AddIcon /></Icon>}
                                    >Voltar</Button>
                                    <h3 className="home-subtitle">
                                        Item ja foi entregue!
                                    </h3>
                                </>
                            )}
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    )
}

export default Solicitacoes;
