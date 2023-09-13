import './styles.css';
import { useHistory } from 'react-router-dom';
import {  useEffect, useRef, useState } from 'react';
import { Box, Button, Icon, IconButton, Paper, Typography, useMediaQuery, useTheme, Divider, LinearProgress, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useDrawerContext } from '../MenuLateral/DrawerContext';
import { cargaFuncionario} from '../services/FuncionariosService';
import AddIcon from '@mui/icons-material/Add';
import { Save } from "@mui/icons-material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Form } from '@unform/web';
import { VTextField } from '../forms/VTextField';
import { FormHandles } from '@unform/core';
import * as yup from 'yup';
import { useAuThContext } from '../contexts_/AuthContext';


interface IformData {
    idCliente: string | undefined;
    nome: string;
}

const msgErrorRequiered = 'Campo obrigatório!'

const formValidationSchema = yup.object().shape({
    nome: yup.string().required(msgErrorRequiered),
});

export const CargaFuncionario: React.FC = () => {
   
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('sm'));
    const { toggleDrawerOpen } = useDrawerContext();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [nome, setNome] = useState('');
    const [nomePic, setNomePic] = useState('');
    const navigate = useHistory();
    const formRef = useRef<FormHandles>(null);
    const formRefPic = useRef<FormHandles>(null);
    const { user, userLogin, updateLogin, isAuthenticated,logout } = useAuThContext();

    const perfilLOG = Number(process.env.REACT_APP_IDPerfilLogistica);
    const perfilADM = Number(process.env.REACT_APP_IDPerfilAdm);
    const perfilADMSIST = Number(process.env.REACT_APP_IDPerfilAdmSist);
    const [perfTeste, setPerfTeste] = useState<number>(Number(localStorage.getItem('APP_ACCESS_USER')));



    function aoClicarEmVoltar() {
        navigate.push('/funcionarios')
    }

    function aoClicarEmCargaPic() {
        console.log('####',nomePic)
        console.log('#### nome', nome)
    
    }

    function aoClicarEmCarga(dados: IformData) {
        dados.idCliente = process.env.REACT_APP_IDcli;

        formValidationSchema
            .validate(dados, { abortEarly: false })
            .then((dadosValidados) => {
                setIsLoading(true);
                console.log('### carga ###', dadosValidados);
                cargaFuncionario(Number(process.env.REACT_APP_IDcli), dadosValidados.nome)
                    .then((response) => {
                        setIsLoading(false);
                        console.log('##### carga status ####', response)
                        //console.log('##### Efetuado carga com Sucesso! ####', response.data)
                        if(response.data === 400){
                            console.log('##### arquivo com problema! ####', response)
                            navigate.push(`/cargaFuncionarios`)
                        }
                        if(response.data === 404){
                            console.log('##### arquivo nao encontrado! ####', response)
                            navigate.push(`/cargaFuncionarios`)
                        }
                        if(response.data === 500){
                            console.log('##### problemas ao fazer carga ####', response)
                            navigate.push(`/cargaFuncionarios`)
                        }
                        if(response.data === 200){
                            console.log('##### carga realizada com sucesso ####', response)
                            navigate.push(`/funcionarios`)
                        }
                    }).catch((response) => {
                        console.log('### Erro realizar carga Funcionario ###', response.status)
                        navigate.push(`/cargaFuncionarios`)
                    });


            })
            .catch((errors: yup.ValidationError) => {
                const validationErrors: { [key: string]: string } = {};
                errors.inner.forEach(error => {
                    if (!error.path) return;

                    validationErrors[error.path] = error.message;
                });
                console.log('###### validation errors ######', validationErrors)
                formRef.current?.setErrors(validationErrors);
            });
    }

    function validaAutenticado(){
        // import { useAuThContext } from "../contexts_/AuthContext";
        //const { user, userLogin, updateLogin, isAuthenticated,logout } = useAuThContext();
        // {(validaAutenticado() &&
        // )}
        console.log('### userLogin ###', userLogin)
        console.log('### isAuthenticated ###', isAuthenticated)
        if(!isAuthenticated || userLogin === undefined){
            logout()
            return false
        }
        return true
    }

    useEffect(() => {
        setPerfTeste(Number(localStorage.getItem('APP_ACCESS_USER')))
        //const [perfTeste, setPerfTeste] = useState<number>();
        //perfTeste
         }, []);


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
                        Carga
                    </Typography>
                </Box>
                <Box height={theme.spacing(5)} component={Paper} marginX={1} padding={1} paddingX={2} display="flex" gap={1} alignItems="center">
                        <Button
                            // onClick={aoClicarEmNovo}
                            variant="outlined"
                            color="warning"
                            disableElevation
                            endIcon={<Icon><AddIcon /></Icon>}
                            >
                            <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                                Novo
                            </Typography>
                        </Button>
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
                <Form ref={formRef} onSubmit={(aoClicarEmCarga)}>
                    <Box margin={1} display="flex" flexDirection="column" component={Paper} variant='outlined'>

                        <Grid container direction="column" padding={2} spacing={2}>
                            {isLoading && (
                                <Grid item>
                                    <LinearProgress variant='indeterminate' />
                                </Grid>
                            )}
                            <Grid item>
                                <Typography variant='h6'>Dados Funcionários</Typography>
                            </Grid>
                            <Grid container item direction="row" spacing={2}>
                                <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                    <VTextField
                                        fullWidth
                                        label='Path Carga Funcionario'
                                        name='nome'
                                        disabled={isLoading}
                                        onChange={e => setNome(e.target.value)}
                                        />
                                </Grid>
                            </Grid>
                            <Grid container item direction="row" spacing={2}>
                                <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                    <Button
                                        onClick={() => formRef.current?.submitForm()}
                                        disableElevation
                                        variant="contained"
                                        color="warning"
                                        startIcon={<Icon><Save /></Icon>}
                                        >
                                        <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                                            Enviar Dados
                                        </Typography>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Form>
                <Form ref={formRefPic} onSubmit={(aoClicarEmCargaPic)}>
                    <Box margin={1} display="flex" flexDirection="column" component={Paper} variant='outlined'>
                        <Grid container direction="column" padding={2} spacing={2}>
                            {isLoading && (
                                <Grid item>
                                    <LinearProgress variant='indeterminate' />
                                </Grid>
                            )}
                            <Grid item>
                                <Typography variant='h6'>Fotos Funcionários</Typography>
                            </Grid>
                            <Grid container item direction="row" spacing={2}>
                                <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                    <VTextField
                                        fullWidth
                                        label='Path Carga Fotos de Funcionario'
                                        name='nome'
                                        disabled={isLoading}
                                        onChange={e => setNomePic(e.target.value)}
                                        />
                                </Grid>
                            </Grid>
                            <Grid container item direction="row" spacing={2}>
                                <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                    <Button
                                        onClick={() => formRefPic.current?.submitForm()}
                                        disableElevation
                                        variant="contained"
                                        color="warning"
                                        startIcon={<Icon><Save /></Icon>}
                                        >
                                        <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                                            Enviar Fotos
                                        </Typography>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Form>
            </Box>
                )}
            {isLoading && (
                <LinearProgress variant='indeterminate' />
            )}
        </>
    );
}

export default CargaFuncionario;