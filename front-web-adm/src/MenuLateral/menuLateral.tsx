import { Avatar, Box, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from "@mui/material"
import React, {  useEffect, useState } from "react";
import HomeIcon from '@mui/icons-material/Home';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import HeadsetIcon from '@mui/icons-material/Headset';
import BadgeIcon from '@mui/icons-material/Badge';
import AssessmentIcon from '@mui/icons-material/Assessment';
//import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
//import { AuthContext } from "../Contexts/Auth/AuthContext.tsx_txt";
import { useDrawerContext } from "./DrawerContext";
import { useHistory } from "react-router-dom";
import { useAuThContext } from "../contexts_/AuthContext";

interface IListItemLinkProps {
    to: string;
    label: string;
    icon: any;
    onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<IListItemLinkProps> = ({ to, icon, label, onClick }) => {

    const navigate = useHistory();

    //const reselvedPath = path(to);
    //const match = useRouteMatch({ path: to });
    

    const handleClick = () => {
        navigate.push(to);
        onClick?.();
    };
    return (
        <ListItemButton onClick={handleClick}>
            <ListItemIcon >
                <Icon>{icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={label} />
        </ListItemButton>
    )
};


export const MenuLateral: React.FC<any> = ({ children }) => {
    const theme = useTheme();
    //ve o tamanho da tela
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext();
    //const auth = useContext(AuthContext);
    const {user} = useAuThContext();
    const perfilLOG = Number(process.env.REACT_APP_IDPerfilLogistica);
    const perfilADM = Number(process.env.REACT_APP_IDPerfilAdm);
    const perfilADMSIST = Number(process.env.REACT_APP_IDPerfilAdmSist);
    const API_URL = process.env.REACT_APP_API;
    const [perfTeste, setPerfTeste] = useState<number>(Number(localStorage.getItem('APP_ACCESS_USER')));
    //const perfilBD = auth.userLogin?.idPerfil

    console.log('### api_url',API_URL)
    console.log('### perfil adm',perfilADM)
    console.log('### perfil log',perfilLOG)
    console.log('### perfil admsist',perfilADMSIST)
    //console.log('### perfil bd', auth.userLogin?.idPerfil)
    //console.log('### var perfil bd', perfilBD)
// REACT_APP_IDPerfilAdmSist=1
// REACT_APP_IDPerfilAdm=2
// REACT_APP_IDPerfilLogistica=3

useEffect(() => {
    setPerfTeste(Number(localStorage.getItem('APP_ACCESS_USER')))
    //const [perfTeste, setPerfTeste] = useState<number>();
    //perfTeste
     }, []);





    return (
        <>

            <Drawer open={isDrawerOpen} variant={smDown ? "temporary" : "permanent"} onClose={toggleDrawerOpen}>
                <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column" >
                    <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center">
                        <Avatar
                            sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
                            alt={user?.nome} src="/static/images/1.jpg"
                        />
                        {/* <Avatar {...user.nome.substring(0, 1)} /> */}
                    </Box>
                    <Divider />
                    <Box flex={1}>
                        <List component="nav">
                            <ListItemLink
                                icon={<HomeIcon></HomeIcon>}
                                label="HOME"
                                to="/"
                                onClick={smDown ? toggleDrawerOpen : undefined}
                            />
                             <ListItemLink
                                icon={<WarehouseIcon></WarehouseIcon>}
                                label="Solicitacoes"
                                to="/solicitacoes"
                                onClick={smDown ? toggleDrawerOpen : undefined}
                            />
                            {(perfilADM  === perfTeste as number || perfilADMSIST  === perfTeste as number) &&(
                                <ListItemLink
                                icon={<ManageAccountsIcon></ManageAccountsIcon>}
                                label="Atualiza Senha"
                                to="/cadastrar"
                                onClick={smDown ? toggleDrawerOpen : undefined}
                            />
                             )}
                            {(perfilADM  === perfTeste as number || perfilADMSIST  === perfTeste as number) &&(
                            <ListItemLink
                                icon={<BadgeIcon></BadgeIcon>}
                                label="Funcionários"
                                to="/funcionarios"
                                onClick={smDown ? toggleDrawerOpen : undefined}
                            />
                            )}
                            {(perfilADM  === perfTeste as number || perfilADMSIST  === perfTeste as number) &&(
                            <ListItemLink
                                icon={<HeadsetIcon></HeadsetIcon>}
                                label="EPIs"
                                to="/epis"
                                onClick={smDown ? toggleDrawerOpen : undefined}
                            />
                            )}
                            {(perfilADM  === perfTeste as number || perfilADMSIST  === perfTeste as number) &&(
                            <ListItemLink
                                icon={<EngineeringIcon></EngineeringIcon>}
                                label="FuncXepis"
                                to="/funcXepi"
                                onClick={smDown ? toggleDrawerOpen : undefined}
                            />
                            )}
                            {(perfilADM  === perfTeste as number || perfilADMSIST  === perfTeste as number) &&(
                            <ListItemLink
                                icon={<AssessmentIcon></AssessmentIcon>}
                                label="Relatórios"
                                to="/relatorios"
                                onClick={smDown ? toggleDrawerOpen : undefined}
                            />
                            )}
                            {/* <ListItemButton >
                                <ListItemIcon >
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Pagina Inicial" />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Pagina 2" />
                            </ListItemButton> */}
                        </List>
                    </Box>
                </Box>
            </Drawer>

            <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
                {children}

            </Box>

        </>
    );
};