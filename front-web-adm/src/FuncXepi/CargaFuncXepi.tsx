import './styles.css';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Button, Icon, IconButton, Paper, Typography, useMediaQuery, useTheme, Divider, LinearProgress, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useDrawerContext } from '../MenuLateral/DrawerContext';
import { cargaFuncXepi } from '../services/EpiXFuncioService';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAuThContext } from '../contexts_/AuthContext';
import { FileUpload } from 'primereact/fileupload';


export const CargaFuncXepi: React.FC = () => {

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('sm'));
    const { toggleDrawerOpen } = useDrawerContext();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useHistory();
    const {  userLogin, isAuthenticated, logout } = useAuThContext();
    const perfilADM = Number(process.env.REACT_APP_IDPerfilAdm);
    const perfilADMSIST = Number(process.env.REACT_APP_IDPerfilAdmSist);
    const [perfTeste, setPerfTeste] = useState<number>(Number(localStorage.getItem('APP_ACCESS_USER')));
    const history = useHistory();

    const chooseOptions = { label: 'Arquivo', icon: 'pi pi-fw pi-plus', className: 'p-button-danger' };
    const uploadOptions = { label: 'Uplaod', icon: 'pi pi-upload', className: 'p-button-danger' };
    const cancelOptions = { label: 'Cancelar', icon: 'pi pi-times', className: 'p-button-danger' };

    const Upload = (event: any) => {
        setIsLoading(true);
        const lst2 = event.files[0].name.slice(-4);
        if (lst2 !== '.txt') {
            alert('Arquivo com extensão diferente de .txt')
            navigate.push(`/epis`)
            return
        }
        console.log('### event', event)
        let formData = new FormData();
        event.files.forEach((file: any) => {
            formData.append("files", file);
            console.log('### files', file)
        });
        executarCarga(event.files[0].name)
        event.options.clear();
    }

    function executarCarga(path: string) {

        setIsLoading(true);

        if (window.confirm('Deseja realizar a carga?')) {
            cargaFuncXepi(path)
                .then((response) => {
                    //console.log('##### Carga realizada com Sucesso! ####')
                    console.log('##### carga status ####', response)
                    alert('carga realizada com sucesso!',)
                    //navigate.push(`/funcXepi`)
                    history.push("/resultadoRelatorio", {data: response});  
                    //console.log('##### Efetuado carga com Sucesso! ####', response.data)
                }).catch((error) => {
                    console.log('### problema ao realizar carga ###',)
                    alert('Problema ao executar a carga !' + error)
                    navigate.push(`/funcXepi`)
                })

                .catch(error => {
                    console.log('###-error-####', error.response)
                    navigate.push(`/funcXepi`)
                })
            //setIsLoading(false);
        }
    }

    function aoClicarEmVoltar() {
        navigate.push('/detalhe/funcXepis/novo')
    }

    useEffect(() => {
        setPerfTeste(Number(localStorage.getItem('APP_ACCESS_USER')))
         }, [userLogin.idPerfil]);


    function validaAutenticado() {
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
                            Carga - FUNC x EPI
                        </Typography>
                    </Box>
                    <Box height={theme.spacing(10)} component={Paper} marginX={1} padding={1} paddingX={2} display="flex" gap={1} alignItems="center">
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
                        <Grid container direction="column" padding={2} spacing={2}>
                            {/* <Grid item>
                                <Typography variant='h6'>Carga EPI</Typography>
                            </Grid> */}
                            <Grid container item direction="row" spacing={2}>
                                <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                </Grid>
                            </Grid>
                            <Grid container item direction="row" spacing={2}>

                                <FileUpload name="files"
                                    url=''
                                    // action="post"
                                    customUpload
                                    uploadHandler={Upload}
                                    //multiple 
                                    accept="file"
                                    maxFileSize={100000000}
                                    chooseOptions={chooseOptions}
                                    uploadOptions={uploadOptions}
                                    cancelOptions={cancelOptions}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    {isLoading && (
                        <LinearProgress variant='indeterminate' />
                    )}
                </Box>
            )}
        </>
    );
}

export default CargaFuncXepi;