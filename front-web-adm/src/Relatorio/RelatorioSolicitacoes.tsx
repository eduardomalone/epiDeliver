import './styles.css';
import { ReactNode, useEffect, useState } from 'react';
import { Box, Button, Icon, IconButton, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useDrawerContext } from '../MenuLateral/DrawerContext';
import { solicitacoesDatas } from '../services/RelatoriosService';
import { useAuThContext } from '../contexts_/AuthContext';
import { RelatorioDataSolicitacao } from '../Types/Relatorios';
import React from "react";
import { Calendar } from 'primereact/calendar';
import { Nullable } from "primereact/ts-helpers";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { useRef } from 'react';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { format } from "date-fns";
import {  addLocale } from 'primereact/api';
 


function RelatorioSolicitacoes() {

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('sm'));
    const { toggleDrawerOpen } = useDrawerContext();
    const [relatorioDatasSolic, setRelatorioDatasSolic] = useState<RelatorioDataSolicitacao[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const barraDeFerramentas: ReactNode = <></>;
    const { userLogin, isAuthenticated, logout } = useAuThContext();
    const [date, setDate] = useState<Nullable<Date>>(null);
    const [dateFim, setDateFim] = useState<Nullable<Date>>(null);
    const perfilADM = Number(process.env.REACT_APP_IDPerfilAdm);
    const perfilADMSIST = Number(process.env.REACT_APP_IDPerfilAdmSist);
    const [perfTeste, setPerfTeste] = useState<number>(Number(localStorage.getItem('APP_ACCESS_USER')));
    const tableRef = useRef(null);

    addLocale('pt', {
        firstDayOfWeek: 1,
        //showMonthAfterYear: true,
        dayNames: ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'],
        dayNamesShort: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
        dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
        monthNames: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
        monthNamesShort: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
        today: 'Hoje',
        clear: 'Limpar'
    });

    useEffect(() => {
        setPerfTeste(Number(localStorage.getItem('APP_ACCESS_USER')))
    }, []);


    function ajustaDataPt(data: any){
        var date = new Date(data);
        date.setHours(date.getHours()-3); //ajuste da hora
        //var formattedDate = format(date, "MMMM do, yyyy H:mma");
        var formattedDate = format(date, 'dd/MM/yyyy HH:mm:ss');  
        return formattedDate
    }
    

    function buscarDatas(data1: any, data2: any) {
        setIsLoading(true);

        if (data1 === undefined || data1 === null || data2 === undefined || data2 === null) {
            console.log('### datas vazias ###',)
            toast.warning('Preencha as datas corretamente!', {
                position: toast.POSITION.TOP_CENTER
            });

        } else {

            let dataFormatada = (data1.getFullYear() + "-" + ((data1.getMonth() + 1)) + "-" + (data1.getDate()));
            let dataFormatada2 = (data1.getFullYear() + "-" + ((data2.getMonth() + 1)) + "-" + (data2.getDate()));
            console.log('###### buscarDatasIni: ', date?.toString())
            console.log('###### buscarDatasFim: ', dateFim?.toString())
            solicitacoesDatas(dataFormatada + ' 00:00:00', dataFormatada2 + ' 23:59:59')
                .then((response) => {
                    console.log('### filtro por datas ###',)
                    setRelatorioDatasSolic(response.data)
                })
                .catch(() => {
                    console.log('### erro no filtro por datas ###',)
                })
        }
        setIsLoading(false);
    }

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
                            Retiradas
                        </Typography>
                    </Box>

                    {barraDeFerramentas && (
                        <Box>
                            <Box height={theme.spacing(10)} component={Paper} marginX={1} padding={1} paddingX={2} display="flex" gap={1} alignItems="center" marginTop={1}>
                                <Box flex={1} display="flex" className="p-float-label">
                                    <Calendar value={date} onChange={(e) => setDate(e.value)} dateFormat="dd/mm/yy" locale="pt"/>
                                    <label htmlFor="birth_date">Data Inicio:</label>
                                </Box>

                                <Box flex={1} display="flex" className="p-float-label">
                                    <Calendar value={dateFim} onChange={(e) => setDateFim(e.value)} dateFormat="dd/mm/yy" locale="pt"/>
                                    <label htmlFor="birth_date">Data Fim:</label>
                                </Box>
                                <Box flex={1} display="flex" justifyContent="end">
                                    <Button
                                        //onClick={() => navigate.push('/detalhe/funcionarios/novo')}
                                        onClick={() => buscarDatas(date, dateFim)}
                                        variant="contained"
                                        color="warning"
                                        disableElevation
                                        endIcon={<Icon><ZoomInIcon /></Icon>}
                                    >Buscar</Button>
                                </Box>
                            </Box>
                        </Box>
                    )}
                    <Box flex={1} overflow='auto'>
                        {relatorioDatasSolic.length !== 0 && (
                            <DownloadTableExcel
                                filename="solic"
                                sheet="solic"
                                currentTableRef={tableRef.current}
                            >
                                <Box height={theme.spacing(10)} component={Paper} marginX={1} padding={1} paddingX={2} display="flex" gap={1} alignItems="center" marginTop={1}>
                                    <Box flex={1} display="flex" justifyContent="center">
                                        <Button
                                            variant="contained"
                                            color="warning"
                                            disableElevation
                                            endIcon={<Icon><FileDownloadIcon /></Icon>}
                                        >Exportar</Button>
                                    </Box>
                                </Box>
                            </DownloadTableExcel>
                        )}

                        <TableContainer component={Paper} variant='outlined' sx={{ m: 1, width: 'auto' }}>
                            <Table ref={tableRef}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Registro</TableCell>
                                        <TableCell>Data Inclusao</TableCell>
                                        <TableCell>Setor</TableCell>
                                        <TableCell>Código</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {relatorioDatasSolic.map((relat, index) =>
                                        <TableRow key={index}>
                                            <TableCell>{relat.registro}</TableCell>
                                            <TableCell>{ajustaDataPt(relat.dataInclusao)}</TableCell>
                                            <TableCell>{relat.setor}</TableCell>
                                            <TableCell>{relat.codigo}</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                                {relatorioDatasSolic.length === 0 && !isLoading && (
                                    <caption>Nenhum registro encontrado</caption>
                                )}
                                <TableFooter>
                                    {isLoading && (
                                        <TableRow>
                                            <TableCell colSpan={4}>
                                                <LinearProgress variant='indeterminate' />
                                            </TableCell>
                                        </TableRow>
                                    )}

                                </TableFooter>
                            </Table>

                        </TableContainer>
                    </Box>
                </Box>
            )}

        </>
    )
}

export default RelatorioSolicitacoes;