import './styles.css';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Box, Button, Icon, IconButton, Paper, Typography, useMediaQuery, useTheme, Divider, LinearProgress, Grid, TextField } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useDrawerContext } from '../MenuLateral/DrawerContext';
import { create, getByDetalheRegistro, getById } from '../services/EpiXFuncioService';
import { getByCod } from '../services/EpiService';
import AddIcon from '@mui/icons-material/Add';
import { Delete, Save } from "@mui/icons-material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Form } from '@unform/web';
import { VTextField } from '../forms/VTextField';
import { FormHandles } from '@unform/core';
import { FuncXepiEntityDTO } from '../Types/FuncXepi';
import { useDebounce } from '../hook/UseDebounce';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useAuThContext } from '../contexts_/AuthContext';


interface IformData {
    idEpi: string;
    idFunc: string;
}

export const DetalheDeFuncXepi: React.FC = () => {
    const { id = 'novo' } = useParams<any>();
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('sm'));
    const { toggleDrawerOpen } = useDrawerContext();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [codigo, setCodigo] = useState('');
    const navigate = useHistory();
    const formRef = useRef<FormHandles>(null);
    const formRef2 = useRef<FormHandles>(null);
    const [funcXepi, setfuncXEpi] = useState<FuncXepiEntityDTO | undefined>();
    const [funcXepis, setFuncXepis] = useState<FuncXepiEntityDTO[]>([]);
    const { debounce } = useDebounce();
    const [textoDaBusca, setTextoDaBusca] = useState('');
    const [textoDaBuscaEPI, setTextoDaBuscaEPI] = useState('');
    const [idFunc, setIdFunc] = useState('');
    const [idEpi, setIdEpi] = useState('');
    const { userLogin, isAuthenticated,logout } = useAuThContext();
    //const perfilLOG = Number(process.env.REACT_APP_IDPerfilLogistica);
    const perfilADM = Number(process.env.REACT_APP_IDPerfilAdm);
    const perfilADMSIST = Number(process.env.REACT_APP_IDPerfilAdmSist);
    const [perfTeste, setPerfTeste] = useState<number>(Number(localStorage.getItem('APP_ACCESS_USER')));

    function deleteById(id: any) {
        // if (window.confirm('Deseja apagar?')) {
        //     deleteById(id)
        //         .then((response) => {
        //             console.log('##### Deletado com Sucesso! ####')
        //             navigate.push(`/funcionarios/`)
        //         }).catch(() => {
        //             console.log('### Erro ao Deletar ###',)
        //         });
        // }
    }

    function validaDados(){
        let validate = false;
        if (idFunc !== '' && idEpi !== ''){
            validate = true;
        }
        return validate;
    }


    function aoClicarEmSalvar(dados: IformData) {
             if(validaDados()){
                console.log("### valido ###", idFunc + '###' + idEpi)
                setIsLoading(true);
                if (id === 'novo') {
                    const payload={
                        idFuncio:idFunc,
                        idEpi:idEpi
                    }
                    create(payload)
                        .then((response) => {
                            setIsLoading(false);
                            navigate.push(`/funcXepi`)
                            console.log('##### Criado com Sucesso! ####')
                        }).catch(() => {
                            setIsLoading(false);
                            console.log('### Erro ao Criar funcXepi ###',)
                        });
                }
             }else{
                toast.warning('Todos os campos são obrigatórios', {
                        position: toast.POSITION.TOP_CENTER
                    });
                console.log('### nao valido idEpi ###', idEpi)
                console.log('### nao valido idFunc ###', idFunc)
             }
    }

    function aoClicarEmNovo() {
        navigate.push('/detalhe/funcXepis/novo')
    }

    function aoClicarEmVoltar() {
        navigate.push('/funcXepis')
    }

    useEffect(() => {
        setPerfTeste(Number(localStorage.getItem('APP_ACCESS_USER')))
        //const [perfTeste, setPerfTeste] = useState<number>();
        //perfTeste
         }, []);

    useEffect(() => {
        setPerfTeste(userLogin.idPerfil)
        if (id !== 'novo') {
            setIsLoading(true);
            getById(Number(id)).then((response) => {
                setIsLoading(false);
                setfuncXEpi(response.data);
                setCodigo(response.data.codigo)
                console.log('###### response - getById', response.data);
                formRef.current?.setData(response.data)
            })
                .catch(error => {
                    setIsLoading(false);
                    console.log(funcXepi)
                    console.log('###-error-####', error.response)
                    //navigate.push('/funcionarios')
                })
        } else {
            formRef.current?.setData({
                codigo: '',
                registro: ''
            });
        }
    }, []);

    function aoMudarTextoDeBusca(novoTexto: string) {
        setTextoDaBusca(novoTexto);
        console.log('######', novoTexto)
        debounce(() => {
            setIsLoading(true);
            getByDetalheRegistro(novoTexto)
                .then((response) => {
                    setIsLoading(false);
                    console.log('### filtro por getByDesc ###', response.data[0])
                    setFuncXepis(response.data)
                    formRef.current?.setData({
                        registro: response.data[0].registro,
                        nome: response.data[0].nome
                    });
                    setIdFunc(response.data[0].id)
                })
                .catch(() => {
                    console.log('### erro no filtro por nome ###',)
                    toast.warning('Erro ao buscar FUNC!', {
                        position: toast.POSITION.TOP_CENTER
                    });
                })
        });
        //console.log('######', funcXepis)
    }

    function aoMudarTextoDeBuscaEPI(novoTextoEPI: string) {
        setTextoDaBuscaEPI(novoTextoEPI);
        console.log('######', novoTextoEPI)
        debounce(() => {
            setIsLoading(true);
            getByCod(novoTextoEPI)
                .then((response) => {
                    setIsLoading(false);
                    console.log('### filtro por getByEPI ###', response.data[0])
                    formRef2.current?.setData({
                        codigo: response.data[0].codigo,
                        descricao: response.data[0].descricao
                    });
                    setIdEpi(response.data[0].id)
                    console.log('###### setIdEpi', idEpi)
                })
                .catch(() => {
                    setIsLoading(false);
                    console.log('### erro no filtro EPI ###',)
                    toast.warning('Erro ao buscar EPI!', {
                        position: toast.POSITION.TOP_CENTER
                    });
                })
        });
        //setIsLoading(false);
    }

    function validaAutenticado() {
        // import { useAuThContext } from "../contexts_/AuthContext";
        //const { user, userLogin, updateLogin, isAuthenticated,logout } = useAuThContext();
        // {(validaAutenticado() &&
        // )}
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
                        {id === 'novo' ? 'Novo Func X EPI' : ('Editar: ' + codigo)}
                    </Typography>
                </Box>
                <Box height={theme.spacing(5)} component={Paper} marginX={1} padding={1} paddingX={2} display="flex" gap={1} alignItems="center">
                    <Button
                        onClick={() => formRef.current?.submitForm()}
                        disableElevation
                        variant="contained"
                        color="warning"
                        startIcon={<Icon><Save /></Icon>}
                        disabled={false}
                        >
                        <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                            Salvar
                        </Typography>
                    </Button>
                    {id !== 'novo' && (
                        <Button
                        onClick={() => deleteById(Number(id))}
                        variant="outlined"
                        color="warning"
                        disableElevation
                        startIcon={<Icon><Delete /></Icon>}
                        >
                            <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                                Apagar
                            </Typography>
                        </Button>
                    )}
                    {id !== 'novo' && (
                        <Button
                        onClick={aoClicarEmNovo}
                        variant="outlined"
                        color="warning"
                        disableElevation
                        endIcon={<Icon><AddIcon /></Icon>}
                        >
                            <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                                Novo
                            </Typography>
                        </Button>
                    )}
                    <Divider
                        variant="middle" orientation="vertical"
                        />
                    <Button
                        onClick={aoClicarEmVoltar}
                        variant="outlined"
                        color="warning"
                        disableElevation
                        endIcon={<Icon><ArrowBackIcon /></Icon>}
                        >
                        <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                            Voltar
                        </Typography>
                    </Button>
                </Box>

                <Box margin={1} display="flex" flexDirection="column" component={Paper} variant='outlined'>
                    <Grid container direction="column" padding={1} spacing={1}>
                        <Grid item>
                            <Typography variant='h6'>Funcionário</Typography>
                        </Grid>
                    </Grid>
                    <Box>
                        <Box height={theme.spacing(5)} component={Paper} marginX={1} padding={1} paddingX={2} display="flex" gap={1} alignItems="center" marginTop={1}>
                            <TextField
                                size="small"
                                placeholder="Digite o Registro..."
                                value={textoDaBusca}
                                onChange={e => { setTextoDaBusca(e.target.value) }}
                                />
                            <Box flex={1} display="flex" justifyContent="end">
                                <Button
                                    onClick={() => aoMudarTextoDeBusca(textoDaBusca)}
                                    variant="contained"
                                    color="warning"
                                    disableElevation
                                    >Buscar Func</Button>
                            </Box>
                        </Box>
                    </Box>

                    <Form ref={formRef} onSubmit={(aoClicarEmSalvar)}>
                        <Box margin={1} display="flex" flexDirection="column" component={Paper} variant='outlined'>
                            <Grid container direction="column" padding={2} spacing={2}>
                                {isLoading && (
                                    <Grid item>
                                        <LinearProgress variant='indeterminate' />
                                    </Grid>
                                )}
                                <Grid container item direction="row" spacing={2}>
                                    <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                        <VTextField
                                            fullWidth
                                            label='Registro'
                                            name='registro'
                                            disabled={true}
                                            onChange={e => setCodigo(e.target.value)}
                                            />
                                    </Grid>
                                </Grid>
                                <Grid container item direction="row" spacing={2}>
                                    <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                        <VTextField
                                            fullWidth
                                            label='Nome'
                                            name='nome'
                                            disabled={true}
                                            />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Form>
                </Box>
                    <Box margin={1} display="flex" flexDirection="column" component={Paper} variant='outlined'>
                        <Grid container direction="column" padding={1} spacing={1}>
                            <Grid item>
                                <Typography variant='h6'>EPI</Typography>
                            </Grid>
                        </Grid>
                        <Box height={theme.spacing(5)} component={Paper} marginX={1} padding={1} paddingX={2} display="flex" gap={1} alignItems="center" marginTop={1}>
                            <TextField
                                size="small"
                                placeholder="Digite o Código..."
                                value={textoDaBuscaEPI}
                                onChange={e => { setTextoDaBuscaEPI(e.target.value); }}
                                />
                            <Box flex={1} display="flex" justifyContent="end">
                                <Button
                                    onClick={() => aoMudarTextoDeBuscaEPI(textoDaBuscaEPI)}
                                    variant="contained"
                                    color="warning"
                                    disableElevation
                                    >Buscar EPI</Button>
                            </Box>
                            {isLoading && (
                                <Grid item>
                                        <LinearProgress variant='indeterminate' />
                                    </Grid>
                                )}
                        </Box>
                    <Form ref={formRef2} onSubmit={(aoClicarEmSalvar)}>
                        <Box margin={1} display="flex" flexDirection="column" component={Paper} variant='outlined'>
                            <Grid container direction="column" padding={2} spacing={2}>
                                {isLoading && (
                                    <Grid item>
                                        <LinearProgress variant='indeterminate' />
                                    </Grid>
                                )}
                                <Grid container item direction="row" spacing={2}>
                                    <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                        <VTextField
                                            fullWidth
                                            label='Código'
                                            name='codigo'
                                            disabled={true}
                                            />
                                    </Grid>
                                </Grid>
                                <Grid container item direction="row" spacing={2}>
                                    <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                        <VTextField
                                            fullWidth
                                            label='Descrição'
                                            name='descricao'
                                            disabled={true}
                                            />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Form>
                </Box>
                </Box>
                )}
            {isLoading && (
                <LinearProgress variant='indeterminate' />
                )}
        </>
    );
}