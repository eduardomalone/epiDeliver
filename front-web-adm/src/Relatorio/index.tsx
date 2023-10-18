import './styles.css';
import {  useHistory } from 'react-router-dom';
//import {  useState } from 'react';
//import { AuthContext } from '../Contexts/Auth/AuthContext.tsx_txt';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import BadgeIcon from '@mui/icons-material/Badge';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import { Box, Card, CardContent, Grid, Icon, Typography } from '@mui/material';
import { useAuThContext } from '../contexts_/AuthContext';



function HomeRelatorio() {
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
            <Box width='100%' display='flex'>

                <Grid container margin={2}>
                    <Grid item container spacing={2}>
                        <Grid item xs={12} sm={6} lg={4} xl={3}>
                            <Card>
                                <CardContent onClick={() => navigate.push('/relatorios/solicitacaoDatas')}>
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
                                <CardContent onClick={() => navigate.push('/relatorios/solicitacaoDatasBaixa')}>
                                    <Typography variant='h5' align='center'>
                                    Solicitações/Baixas
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
                                <CardContent onClick={() => navigate.push('/relatorios/solicitacaoDatasBaixaFunc')}>
                                    <Typography variant='h5' align='center'>
                                    Solic. Baixas/Func
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
                        {/* {(showCard() &&
                        <Grid item xs={12} sm={6} lg={4} xl={3}>
                            <Card>
                                <CardContent onClick={() => navigate.push('/epis')}>
                                    <Typography variant='h5' align='center'>
                                        Relatorio 4
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
                        )} */}
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default HomeRelatorio;