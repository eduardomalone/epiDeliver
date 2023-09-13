import './styles.css';
import {  useHistory } from 'react-router-dom';
import {  useState } from 'react';
//import { AuthContext } from '../Contexts/Auth/AuthContext.tsx_txt';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import BadgeIcon from '@mui/icons-material/Badge';
import HeadsetIcon from '@mui/icons-material/Headset';
import EngineeringIcon from '@mui/icons-material/Engineering';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { Box, Card, CardContent, Grid, Icon, Typography } from '@mui/material';
import { useAuThContext } from '../contexts_/AuthContext';



function HomeADM() {
    //const auth = useContext(AuthContext);
    //const [barCode, setBarcode] = useState('');
    const {  user } = useAuThContext();
    // console.log('###### USER ######', auth.user);
    // console.log('###### USERLOGIN ######', auth.userLogin);
    const navigate = useHistory();
    //const perfilLOG = Number(process.env.REACT_APP_IDPerfilLogistica);
    const perfilADM = Number(process.env.REACT_APP_IDPerfilAdm);
    const perfilADMSIST = Number(process.env.REACT_APP_IDPerfilAdmSist);


    function showCard(){
        let pef = Number(localStorage.getItem('APP_ACCESS_USER'))
        if(pef === perfilADM || pef === perfilADMSIST){
            return true
        }
        return false
    }


    

    return (
        <>
            <Box>
                <div className="home-content">
                    <div className="home-actions">
                        {/* <h1 className="home-actions">Entrega de Equipamentos</h1> */}
                        <h3 className="home-subtitle">
                            Ola {user?.nome}, seja bem vindo! <br />
                        </h3>
                    </div>
                </div>
            </Box>
            <Box width='100%' display='flex'>

                <Grid container margin={2}>
                    <Grid item container spacing={2}>
                        <Grid item xs={12} sm={6} lg={4} xl={3}>
                            <Card>
                                <CardContent onClick={() => navigate.push('/solicitacoes')}>
                                    <Typography variant='h5' align='center'>
                                        Solicitações
                                    </Typography>
                                    <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                                        <Typography >
                                            <Icon fontSize='large'>
                                                <WarehouseIcon fontSize='large'></WarehouseIcon>
                                            </Icon>
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        {(showCard() && 
                        <Grid item xs={12} sm={6} lg={4} xl={3}>
                            <Card>
                                <CardContent onClick={() => navigate.push('/cadastrar')}>
                                    <Typography variant='h5' align='center'>
                                        Atualiza Senha
                                    </Typography>
                                    <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                                        <Typography>
                                            <Icon fontSize='large'>
                                                {/* <PermContactCalendarIcon fontSize='large'></PermContactCalendarIcon> */}
                                                <ManageAccountsIcon fontSize='large'></ManageAccountsIcon>
                                            </Icon>
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                            )}
                            {(showCard() && 
                        <Grid item xs={12} sm={6} lg={4} xl={3}>
                            <Card>
                                <CardContent onClick={() => navigate.push('/funcionarios')}>
                                    <Typography variant='h5' align='center'>
                                        Funcionários
                                    </Typography>
                                    <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                                        <Typography>
                                            <Icon fontSize='large'>
                                                <BadgeIcon fontSize='large'></BadgeIcon>
                                            </Icon>
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        )}
                        {(showCard() &&
                        <Grid item xs={12} sm={6} lg={4} xl={3}>
                            <Card>
                                <CardContent onClick={() => navigate.push('/epis')}>
                                    <Typography variant='h5' align='center'>
                                        EPIs
                                    </Typography>
                                    <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                                        <Typography >
                                            <Icon fontSize='large'>
                                                <HeadsetIcon fontSize='large'></HeadsetIcon>
                                            </Icon>
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        )}
                        {(showCard() &&
                        <Grid item xs={12} sm={6} lg={4} xl={3}>
                            <Card>
                                <CardContent onClick={() => navigate.push('/funcXepi')}>
                                    <Typography variant='h5' align='center'>
                                        Func X EPIs
                                    </Typography>
                                    <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                                        <Typography>
                                            <Icon fontSize='large'>
                                                <EngineeringIcon fontSize='large'></EngineeringIcon>
                                            </Icon>
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        )}
                        {(showCard() &&
                        <Grid item xs={12} sm={6} lg={4} xl={3}>
                            <Card>
                                <CardContent onClick={() => navigate.push('/reloarios')}>
                                    <Typography variant='h5' align='center'>
                                        Relatórios
                                    </Typography>
                                    <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                                        <Typography>
                                            <Icon fontSize='large'>
                                                {/* <ManageAccountsIcon fontSize='large'></ManageAccountsIcon> */}
                                                <AssessmentIcon fontSize='large'></AssessmentIcon>
                                            </Icon>
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        )}
                        
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default HomeADM;