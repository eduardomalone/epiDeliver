import './styles.css';
import { ReactNode, useEffect, useState } from 'react';
import { Box, Button, Grid, Icon, IconButton, LinearProgress, Paper, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useDrawerContext } from '../MenuLateral/DrawerContext';
import { getByCodBarras, setDownOrder } from '../services/SolicitacaoService';
import { useDebounce } from '../hook/UseDebounce';
//import { AuthContext } from '../Contexts/Auth/AuthContext.tsx_txt';
import { useAuThContext } from "../contexts_/AuthContext";
import { EpiDTO, ItemSolicitacao, ItemSolicitacaoEpiDTO } from '../Types/User';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import axios from 'axios';
import { config } from 'aws-sdk'




function onError(e: any) {
    e.target.src = '/epi_imgs/epi_padrao.jpg';
}

function refreshPage() {
    //window.location.reload();
    // setTimeout(()=>{
    //     window.location.reload();
    // }, 5000);

    //window.location.href="/solicitacoes"
    //inputRef.current.value = "";
    console.log('page to reload')
}


function Solicitacoes() {
    
    const accessKeyId = process.env.REACT_APP_ACCESS_KEY_ID
    const secretAccessKey = process.env.REACT_APP_SECRET_KEY

    //var repoGitImgS3 = 'https://sistemaepifotos.s3.amazonaws.com/WA0008.jpg'
    var repoGitImg = 'https://eduardomalone.github.io/img/epi_imgs/'
    //const auth = useContext(AuthContext);
    const { user } = useAuThContext();
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('sm'));
    const { toggleDrawerOpen } = useDrawerContext();
    const barraDeFerramentas: ReactNode = <></>;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [textoDaBusca, setTextoDaBusca] = useState('');
    const { debounce } = useDebounce();
    const [itemSolicitEpi, setItemSolicitEpi] = useState<ItemSolicitacaoEpiDTO>();
    const [epiDTO, setEpiDTO] = useState<EpiDTO>();
    const [itemSolicitacaoDTO, setItemSolicitacaoDTO] = useState<ItemSolicitacao>();
    const [valCodBar, setValCodBar] = useState("");

     // S3 Bucket Name
     //const S3_BUCKET = "sistemaepi";

     // S3 Region
     const REGION = "us-east-1";


    function aoMudarTextoDeBusca(novoTexto: string) {
        debounce(() => {
            setIsLoading(true);
            getByCodBarras(novoTexto)
                .then((response) => {
                    setIsLoading(false);
                    console.log('### filtro por codBarras ###',)
                    setItemSolicitEpi(response.data);
                    setEpiDTO(response.data.epiDTO);
                    setItemSolicitacaoDTO(response.data.itemSolicitacaoDTO);
                    console.log('###### response', response.data);

                })
                .catch(() => {
                    setIsLoading(false);
                    setItemSolicitacaoDTO(undefined)
                    setTextoDaBusca('');
                    setItemSolicitacaoDTO(undefined);
                    console.log('### erro no filtro por codBarras ###',)
                    toast.warning('Código de Barras não encontrado !', {
                        position: toast.POSITION.TOP_CENTER
                    });
                    //refreshPage()
                    //window.location.reload();
                    //navigate.push(`/solicitacoes`)
                })
        });
        refreshPage();
    }

    useEffect(() => {
        //config.update(AWSConfig)
        const AWSConfig = {
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
            region: REGION,
        }
        config.update(AWSConfig)
    

       
        //setPerfTeste(Number(localStorage.getItem('APP_ACCESS_USER')))
        //const [perfTeste, setPerfTeste] = useState<number>();
        //perfTeste
        //lerScanner();
    });

    // async function ligarScanner() {
    //     const options = {
    //         method: 'POST',
    //         url: 'http://127.0.0.1:5000/scanner',
    //         headers: { 'Content-Type': 'application/json' },
    //         data: { CMD: 'ligarScanner', PARAM: '' }
    //     };
    //     try {
    //         const { data, status } = await axios.request(options)
    //         console.log(data,status)
    //         console.log('### ligarScanner:')
    //         alert('ligou scanner')
    //         return data
    //     } catch (ex) {
    //         console.log(ex)
    //         return ''
    //     }

    // }
    // async function recebeScanner() {
    //     const options = {
    //         method: 'GET',
    //         url: 'http://127.0.0.1:5000/scanner',
    //         headers: { 'Content-Type': 'application/json' },
    //         data: {}
    //     };
    //     try {
    //         const { data, status } = await axios.request(options);
    //         console.log('### recebeScanner:', status)
    //         console.log('### recebeScanner data:', data)
    //         //alert('status: ' + status)
    //         alert('recebe scanner')
    //         //aoMudarTextoDeBusca?.(data)
    //         return data;
    //     }
    //     catch (ex) {
    //         console.error(ex);
    //         return '';
    //     }

    // }

    // async function lerScanner() {
    //     await ligarScanner();
    //     await new Promise(r => setTimeout(r, 1000));
    //     for (let i = 0; i < 5; i++) {
    //         const valRet = await recebeScanner();
    //         //alert(valRet)
    //         console.log(valRet);
    //         await new Promise(r => setTimeout(r, 3000));
    //         if (valRet !== '') i = 5;
    //         //setTextoDaBusca(valRet)
    //     }

    // }


    async function ligarScanner() {
        // const options = {
        //   method: 'POST',
        //   url: 'http://127.0.0.1:5000/scanner',
        //   headers: {'Content-Type': 'application/json'},
        //   data: {CMD: 'ligarScanner', PARAM: ''}
        // };
        // try{
        //   const {data,status}= await axios.request(options)
        //   console.log('### dataLigaScanner: ',data)
        //   console.log('### statusLigaScanner: ',status)
        //   console.log('### testevarS3: ', S3_BUCKET)
        //   return data
        // }catch(ex) {
        //   console.log(ex)
        //   return ''
        // } 
      }
    
      async function recebeScanner() {
        const options = {
        //   method: 'GET',
        //   url: 'http://127.0.0.1:5000/scanner',
        //   headers: {'Content-Type': 'application/json'},
        //   data: {}
        };
        try{
        //   const {data,status}= await axios.request(options);
        //   console.log('###### statusReceScanner', status)
        //   return data;
        var rndInt = randomIntFromInterval(1, 10);
        console.log(rndInt);
        return 'VALUE='+String(rndInt)
      }
      catch(ex){
        console.error(ex);
        return '';
      }
      }
    
      async function lerScanner() {
        console.log(valCodBar)
        await ligarScanner();
        await new Promise (r=>setTimeout(r,1000));
        for (let i=0;i<10;i++){
          const valCodBar = await recebeScanner();
          //console.log(valCodBar);
          setValCodBar(valCodBar);
          var myArray = valCodBar.split('VALUE=')
          setTextoDaBusca(myArray[1].substring(0, myArray[1].length - 1));
         // alert(myArray[1].toString())
          aoMudarTextoDeBusca(myArray[1].substring(0, myArray[1].length - 1));
          console.log('### texto scanner: ', valCodBar)
          
          await new Promise (r=>setTimeout(r,3000));
          if (valCodBar!=='') i=10;
        }
        
      }
    
      
    function baixaSolicitacoes() {
        const payload = {
            idFuncBaixa: user.id,
            barCode: textoDaBusca
        }
        console.log('######', payload)
        debounce(() => {
            setIsLoading(true);
            setDownOrder(payload)
                .then((response) => {
                    setIsLoading(false);
                    toast.error(`Solicitação atualizada com sucesso!`, {
                        position: toast.POSITION.TOP_CENTER
                    });
                    //setIdSolicitacao(response.data.solicitacaoDTO.id)
                    console.log('### baixa da solicitacao ok###',)
                    setTextoDaBusca('');
                    setItemSolicitacaoDTO(undefined);
                })
                .catch(() => {
                    setIsLoading(false);
                    setTextoDaBusca('');
                    setItemSolicitacaoDTO(undefined);
                    console.log('### erro no filtro por nome ###', )
                    toast.warning('Erro ao dar baixa na solicitação!', {
                        position: toast.POSITION.TOP_CENTER
                    });
                    setTextoDaBusca('');
                })
        });
    }

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
                        Entrega de Equipamentos
                    </Typography>
                </Box>
                {barraDeFerramentas && (
                    <Box>
                        {/* Ola {auth.user?.nome}, seja bem vindo! <br /> */}
                        <Box height={theme.spacing(10)} component={Paper} marginX={1} padding={1} paddingX={2} display="flex" gap={1} alignItems="center" marginTop={1}>
                            <TextField
                                id='input'
                                autoFocus
                                fullWidth
                                size="small"
                                placeholder="Codigo de barras"
                                value={textoDaBusca}
                                onChange={e => { setTextoDaBusca(e.target.value); aoMudarTextoDeBusca?.(e.target.value) }}
                            //onChange={ e => aoMudarTextoDeBusca?.(e.target.value)}
                            />
                            <Box flex={1} display="flex" justifyContent="end">
                                <Button
                                    onClick={() => { setTextoDaBusca(''); setItemSolicitacaoDTO(undefined) }}
                                    //onClick={aoClicarEmNovo}
                                    variant="contained"
                                    color="warning"
                                    disableElevation
                                //endIcon={<Icon><AddIcon /></Icon>}
                                >Limpar</Button>
                            </Box>
                        </Box>
                        {isLoading && (
                            <div>
                                <LinearProgress variant='indeterminate' />
                            </div>
                        )}
                    </Box>


                )}
                <div style={{
                    textAlign: "center"
                }}>

                    {/* <Button
                        onClick={lerScanner}
                        disableElevation
                        variant="contained"
                        color="warning"
                        // startIcon={<Icon><Save /></Icon>}
                        disabled={false}
                    >
                        <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                            teste
                        </Typography>
                    </Button> */}
                    <Button variant="contained" color="primary" onClick={lerScanner}>
                        Ler Scanner
                    </Button>
                    {/* {valCodBar}
                    {valCodBar.split('VALUE=')[1]}
                    {textoDaBusca} */}
                </div>
                {/* <Grid item style={{ marginTop: 20 }}>
            <Button variant="contained" color="primary" onClick={lerScanner}>
              Ler Scanner 2
            </Button>
            {valCodBar}
        </Grid> */}
                {/* <div>
                                            <img
                                                //src= {'/epi_imgs/'+product.codigo+'.jpg'}
                                                src={repoGitImgS3 + "" + itemSolicitEpi?.epiDTO.codigo + '.jpg'}
                                                className="order-card-image"
                                                alt={itemSolicitEpi?.epiDTO.codigo}
                                                onError={(e) => onError(e)}
                                            />
                                        </div> */}
                <Box flex={1} overflow='auto' >
                    {itemSolicitacaoDTO?.codigoBarra && (

                        <Box margin={1} display="flex" flexDirection="column" component={Paper} variant='outlined'>
                            <Grid container direction="column" padding={1} spacing={1}>
                                <Grid item>
                                    <Typography variant='h6'>Descrição: {epiDTO?.descricao}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container direction="column" padding={1} spacing={1}>
                                <Grid item>
                                    <Typography variant='h6'>Código: {epiDTO?.codigo}</Typography>
                                </Grid>
                            </Grid>
                            <Box margin={1}>
                                <div className="">
                                    <div className="orders-list-items">
                                        <div>
                                            <img
                                                //src= {'/epi_imgs/'+product.codigo+'.jpg'}
                                                src={repoGitImg + "" + itemSolicitEpi?.epiDTO.codigo + '.jpg'}
                                                className="order-card-image"
                                                alt={itemSolicitEpi?.epiDTO.codigo}
                                                onError={(e) => onError(e)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Box>
                        </Box>
                    )}
                    {itemSolicitacaoDTO?.codigoBarra && (
                        <Box height={theme.spacing(5)} component={Paper} marginX={1} padding={1} paddingX={2} display="flex" gap={1} alignItems="center" marginTop={1}>
                            {!itemSolicitacaoDTO?.idUsuarioBaixa && (
                                <Button
                                    //onClick={() => navigate.push('/detalhe/funcionarios/novo')}
                                    onClick={baixaSolicitacoes}
                                    variant="contained"
                                    color="warning"
                                    disableElevation
                                //endIcon={<Icon><AddIcon /></Icon>}
                                >Entregar</Button>
                            )}
                            {itemSolicitacaoDTO?.idUsuarioBaixa && (
                                <>
                                    <Button
                                        //onClick={() => navigate.push('/detalhe/funcionarios/novo')}
                                        onClick={() => { setTextoDaBusca(''); setItemSolicitacaoDTO(undefined) }}
                                        variant="contained"
                                        color="warning"
                                        disableElevation
                                    //endIcon={<Icon><AddIcon /></Icon>}
                                    >Voltar</Button>
                                    <h3 className="home-subtitle">
                                        Item ja foi entregue!
                                    </h3>
                                </>
                            )}
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    )
}

export default Solicitacoes;
function randomIntFromInterval(arg0: number, arg1: number) {
    throw new Error('Function not implemented.');
}

