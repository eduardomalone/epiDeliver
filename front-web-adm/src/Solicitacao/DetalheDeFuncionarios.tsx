import './styles.css';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Box, Button, Icon, IconButton, Paper, Typography, useMediaQuery, useTheme, Divider, LinearProgress, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useDrawerContext } from '../MenuLateral/DrawerContext';
import { create, deleteById, getById, updateById } from '../services/FuncionariosService';
import { Funcionario } from '../Types/Funcionarios';
import AddIcon from '@mui/icons-material/Add';
import { Delete, Save } from "@mui/icons-material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Form } from '@unform/web';
import { VTextField } from '../forms/VTextField';
import { FormHandles } from '@unform/core';
import * as yup from 'yup';


interface IformData {
    nome: string;
    registro: string;
    setor: string;
    codFuncao: string;
    idCliente: any;
    coringa: string
}

const msgErrorRequiered = 'Campo obrigatório!'
const msgErrorCoringa = 'Digite S ou N'

const formValidationSchema = yup.object().shape({
    nome: yup.string().required(msgErrorRequiered),
    registro: yup.string().required(msgErrorRequiered),
    setor: yup.string().required(msgErrorRequiered),
    codFuncao: yup.string().required(msgErrorRequiered),
    coringa: yup.string().required(msgErrorRequiered).min(1).max(1).oneOf(["S", "N"],msgErrorCoringa)
});

export const DetalheDeFuncionarios: React.FC = () => {
    const { id = 'nova' } = useParams<any>();
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('sm'));
    const { toggleDrawerOpen } = useDrawerContext();
    const [funcionario, setFuncionario] = useState<Funcionario | undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [nome, setNome] = useState('');
    const navigate = useHistory();
    const formRef = useRef<FormHandles>(null);

    function handleDelete(id: any) {
        if (window.confirm('Deseja apagar?')) {
            deleteById(id)
                .then((response) => {
                    console.log('##### Deletado com Sucesso! ####')
                    navigate.push(`/funcionarios/`)
                }).catch(() => {
                    console.log('### Erro ao Deletar ###',)
                });
        }
    }


    function aoClicarEmSalvar(dados: IformData) {
        dados.idCliente = process.env.REACT_APP_IDcli;
        console.log('##### funcionario ####', funcionario)
        formValidationSchema
        .validate(dados, {abortEarly:false})
        .then((dadosValidados) => {

        setIsLoading(true);

        if (id === 'novo') {
            console.log('### save ###', dadosValidados);
            create(dados)
                .then((response) => {
                    setIsLoading(false);
                    navigate.push(`/detalhe/funcionarios/${response.data.id}`)
                    console.log('##### Criado com Sucesso! ####')
                }).catch(() => {
                    console.log('### Erro ao Criar Funcionario ###',)
                });

        } else {
            updateById(Number(id), { id: Number(id), ...dadosValidados })
                .then((response) => {
                    setIsLoading(false);
                    console.log('##### Criado com Sucesso! ####')
                    navigate.push(`/detalhe/funcionarios/${response.data.id}`)
                }).catch(() => {
                    console.log('### Erro ao Criar Funcionario ###',)
                });
        }

        })
        .catch((errors: yup.ValidationError) => {
            const validationErrors: {[key: string]: string} = {};
            errors.inner.forEach(error =>{
                if(!error.path) return;
                validationErrors[error.path] = error.message;
            });
            console.log(validationErrors)
            formRef.current?.setErrors(validationErrors);
        });
    }

    // function aoClicarEmCarga() {
    //     navigate.push('/cargaFuncionarios')
    // }

    function aoClicarEmNovo() {
        navigate.push('/detalhe/funcionarios/novo')
    }

    function aoClicarEmVoltar() {
        navigate.push('/funcionarios')
    }

    useEffect(() => {
        if (id !== 'novo') {
            setIsLoading(true);
            getById(Number(id)).then((response) => {
                setIsLoading(false);
                setFuncionario(response.data);
                setNome(response.data.nome)
                console.log('###### response - getById', response.data);
                formRef.current?.setData(response.data)
            })
                .catch(error => {
                    setIsLoading(false);
                    console.log('###-error-####', error.response)
                    //navigate.push('/funcionarios')
                })
        }else{
            formRef.current?.setData({
                nome: '',
                registro: '',
                setor: '',
                codFuncao: '',
                coringa: ''
            });
        }
    }, [id, navigate]);


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
                        {id === 'novo' ? 'Novo Funcionário' : ('Editar: ' + nome)}
                    </Typography>
                </Box>
                <Box height={theme.spacing(5)} component={Paper} marginX={1} padding={1} paddingX={2} display="flex" gap={1} alignItems="center">
                    <Button
                        onClick={() => formRef.current?.submitForm()}
                        disableElevation
                        variant="contained"
                        color="warning"
                        startIcon={<Icon><Save /></Icon>}
                    >
                        <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                            Salvar
                        </Typography>
                    </Button>
                    {/* <Button
                        onClick={aoClicarEmCarga}
                        disableElevation
                        variant="contained"
                        color="warning"
                        startIcon={<Icon><Save /></Icon>}
                    >
                        <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                            Carga
                        </Typography>
                    </Button> */}
                    {id !== 'novo' && (
                        <Button
                            onClick={() => handleDelete(Number(id))}
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
                <Form ref={formRef} onSubmit={(aoClicarEmSalvar)}>
                    <Box margin={1} display="flex" flexDirection="column" component={Paper} variant='outlined'>
                        <Grid container direction="column" padding={2} spacing={2}>
                            {isLoading && (
                                <Grid item>
                                    <LinearProgress variant='indeterminate' />
                                </Grid>
                            )}
                            <Grid item>
                                <Typography variant='h6'>Geral</Typography>
                            </Grid>
                            <Grid container item direction="row" spacing={2}>
                                <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                    <VTextField
                                        fullWidth
                                        label='Nome Completo'
                                        name='nome'
                                        disabled={isLoading}
                                        onChange={e => setNome(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container item direction="row" spacing={2}>
                                <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                    <VTextField
                                        fullWidth
                                        label='Registro'
                                        name='registro'
                                        disabled={isLoading}
                                    />

                                </Grid>
                            </Grid>
                            <Grid container item direction="row" spacing={2}>
                                <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                    <VTextField
                                        fullWidth
                                        label='Setor'
                                        name='setor'
                                        disabled={isLoading}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container item direction="row" spacing={2}>
                                <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                    <VTextField
                                        fullWidth
                                        label='Codigo Função'
                                        name='codFuncao'
                                        disabled={isLoading}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container item direction="row" spacing={2}>
                                <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                    <VTextField
                                        fullWidth
                                        label='Coringa'
                                        name='coringa'
                                        disabled={isLoading}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Form>
            </Box>
            {isLoading && (
                <LinearProgress variant='indeterminate' />
            )}
        </>
    );
}