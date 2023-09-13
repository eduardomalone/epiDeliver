import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuThContext } from "../contexts_/AuthContext";
import * as yup from "yup";
import { Box, Card, CardContent, Typography, TextField, CardActions, Button, CircularProgress } from "@mui/material";

const loginSchema = yup.object().shape({
    login: yup.string().required(),
    senha: yup.string().required(),
    senha2: yup.string().required()
});

export const Cadastrar = () => {
    //const auth = useContext(AuthContext);
    const { user, userLogin, updateLogin, isAuthenticated,logout } = useAuThContext();
    const [isLoading, setIsLoading] = useState(false);
    const [login, setLogin] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [senha2, setSenha2] = useState('');
    const [senhaDiferente, setSenhaDiferente] = useState<Boolean>(false);
    const [registroError, setRegistroError] = useState('');
    const [senhaError, setSenhaError] = useState('');
    const [senha2Error, setSenha2Error] = useState('');
    const perfilLOG = Number(process.env.REACT_APP_IDPerfilLogistica);
    const perfilADM = Number(process.env.REACT_APP_IDPerfilAdm);
    const perfilADMSIST = Number(process.env.REACT_APP_IDPerfilAdmSist);
    const [perfTeste, setPerfTeste] = useState<number>(Number(localStorage.getItem('APP_ACCESS_USER')));


    let history = useHistory();
    function handleClickHome() {
        setTimeout(() => {
            history.push(`/`);
        }, 3000);
        return;
    }

    useEffect(() => {
       setPerfTeste(Number(localStorage.getItem('APP_ACCESS_USER')))
       //const [perfTeste, setPerfTeste] = useState<number>();
       //perfTeste
        }, []);

    function validaAutenticado(){
        console.log('### userLogin ###', userLogin)
        console.log('### isAuthenticated ###', isAuthenticated)
        if(!isAuthenticated || userLogin === undefined){
            logout()
            return false
        }
        return true
    }

    const handleSubmit = () => {
        loginSchema
            .validate({ login, senha, senha2 }, { abortEarly: false })
            .then(dadosValidados => {
                setIsLoading(true);
                console.log('### loggin ', loginSchema)
                updateLogin(dadosValidados.login, dadosValidados.senha, dadosValidados.senha2)
                    .then(() => {
                        setIsLoading(false);
                        console.log('##### atualizou ###')
                        toast.error(`Senha atualizada com sucesso!`, {
                            position: toast.POSITION.TOP_CENTER
                        });
                        handleClickHome();
                    })
            })
            .catch((errors: yup.ValidationError) => {
                console.log('##### nauuuummmm atualizouuuuu ###')
                setIsLoading(false);
                errors.inner.forEach(error => {
                    if (error.path === 'login') {
                        setRegistroError('Campo obrigatório');
                    } else if (error.path === 'senha') {
                        setSenhaError('Campo obrigatório');
                    }
                    else if (error.path === 'senha2') {
                        setSenha2Error('Campo obrigatório');
                    }
                })
            });
        console.log('##### xxxxxxx atualizouuuuu ###')
    }

    const handleLogin = async () => {
        setIsLoading(true);
        if (login && senha && senha2) {
            loginSchema
                .validate({ login, senha, senha2 }, { abortEarly: false })
            const isLogged = await updateLogin(login, senha, senha2);
            setIsLoading(false);
            console.log('##### atualizouuuuu ###', isLogged)
            toast.error(`Senha atualizada com sucesso!`, {
                position: toast.POSITION.TOP_CENTER
            });
            handleClickHome();
        } else {
            setIsLoading(false);
            console.log('##### nauuuummmm atualizouuuuu ###')
            setSenhaDiferente(true);
        }
    }




    return (
        <>

        {(validaAutenticado() && (perfilADM  === perfTeste || perfilADMSIST  === perfTeste) &&
            <Box height='100vh' display='flex' alignItems='center' justifyContent='center'>
            <Card>
            <CardContent>
                    <Box display='flex' flexDirection='column' gap={2} width={250}>
                    <Typography variant="h6" align="center">Atualize a sua senha</Typography>
                    <TextField
                    fullWidth
                    label='Registro'
                    value={login}
                    onChange={e => setLogin(e.target.value)}
                    // value={registro}
                    // onChange={e => setRegistro(e.target.value)}
                    // onKeyDown={() => setRegistroError('')}
                    // error={!!registroError}
                    helperText={registroError}
                    disabled={isLoading}
                    />
                    <TextField
                    fullWidth
                    label='Senha'
                    type='password'
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                    // onChange={e => setSenha(e.target.value)}
                    // onKeyDown={() => setSenhaError('')}
                    // error={!!senha}
                    helperText={senhaError}
                    disabled={isLoading}
                    />
                            <TextField
                            fullWidth
                            label='Nova Senha'
                            type='password'
                            value={senha2}
                            onChange={e => setSenha2(e.target.value)}
                            // onChange={e => setSenha(e.target.value)}
                            // onKeyDown={() => setSenhaError('')}
                            // error={!!senha}
                            helperText={senhaError}
                            disabled={isLoading}
                            />
                            </Box>
                            <CardActions>
                            <Box width='100%' display='flex' justifyContent='center'>
                            
                            <Button
                            variant='contained'
                            color="warning"
                            onClick={handleSubmit}
                            // disabled={isLoading}
                            // endIcon={isLoading ? <CircularProgress size={20} color="inherit" variant="indeterminate"/> : undefined}
                            >
                            Atualizar
                            </Button>
                            
                            </Box>
                            </CardActions>
                            </CardContent>
                            </Card>
                            
                            </Box>
                            
                            )}
                            </>
                            
                            );
                        }