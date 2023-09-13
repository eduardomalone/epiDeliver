import { Box, Button, Card, CardActions, CardContent, CircularProgress, TextField, Typography } from "@mui/material";
import { useAuThContext } from "../contexts_/AuthContext";
import { useState } from "react";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import useNavigate from "react-use-navigate";

const loginSchema = yup.object().shape({
    registro: yup.string().required(),
    senha: yup.string().required()
});

interface ILoginProps {
    children: React.ReactNode;
}

export const Login: React.FC<ILoginProps> = ({ children }) => {
    const { isAuthenticated, login } = useAuThContext();
    const [registro, setRegistro] = useState('');
    const [senha, setSenha] = useState('');
    const [registroError, setRegistroError] = useState('');
    const [senhaError, setSenhaError] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    //const navigate = useHistory();
    //const useNav = useNavigate();
    

    const handleSubmit = () => {
        loginSchema
            .validate({registro, senha}, {abortEarly: false})
            .then(dadosValidados => {
                setIsLoading(true);
                console.log('### loggin ', loginSchema)
                login(dadosValidados.registro, dadosValidados.senha)
                .then(() => {
                    
                    setIsLoading(false);
                    setRegistro('');
                    setSenha('');
                })
        })
        .catch((errors: yup.ValidationError) => {
            setIsLoading(false);
            errors.inner.forEach(error => {
                if(error.path === 'registro') {
                    setRegistroError('Campo obrigatório');
                }else if (error.path === 'senha'){
                    setSenhaError('Campo obrigatório');
                }
            })
        });
    }
    
    

    if (isAuthenticated) return(
        <>{children}</>
    )

    return (
        
        <Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center'>
            <Card>
                <CardContent>
                    <Box display='flex' flexDirection='column' gap={2} width={250}>
                    <Typography variant="h6" align="center">SISTEMA EPI-ADM</Typography>
                        <Typography variant="h6" align="center">Identifique-se</Typography>
                        <TextField
                            fullWidth 
                            label= 'Registro'
                            value={registro}
                            onChange={e => setRegistro(e.target.value)}
                            onKeyDown={() => setRegistroError('')}
                            error={!!registroError}
                            helperText={registroError}
                            disabled={isLoading}
                        />
                        <TextField 
                            fullWidth
                            label= 'Senha'
                            type= 'password'
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                            onKeyDown={() => setSenhaError('')}
                            error={!!senha}
                            helperText={senhaError}
                            disabled={isLoading}
                        /> 
                    </Box>
                    <CardActions>
                        <Box width='100%' display='flex' justifyContent='center'>

                            <Button
                                color="warning"
                                variant='contained'
                                onClick={handleSubmit}
                                disabled={isLoading}
                                endIcon={isLoading ? <CircularProgress size={20} color="inherit" variant="indeterminate"/> : undefined}
                            >
                                Entrar
                            </Button>

                        </Box>
                    </CardActions>
                </CardContent>
            </Card>

        </Box>
    );
}