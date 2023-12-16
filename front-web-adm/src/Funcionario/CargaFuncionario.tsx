import './styles.css';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Button, Icon, IconButton, Paper, Typography, useMediaQuery, useTheme, LinearProgress, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useDrawerContext } from '../MenuLateral/DrawerContext';
//import { cargaFunc } from '../services/FuncionariosService';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAuThContext } from '../contexts_/AuthContext';
import { FileUpload } from 'primereact/fileupload';
import AWS from 'aws-sdk';
//import { s3Config } from './s3Config.ts';


export const CargaFuncionario: React.FC = () => {

    const accessKeyId = process.env.REACT_APP_ACCESS_KEY_ID
    const secretAccessKey = process.env.REACT_APP_SECRET_KEY

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('sm'));
    const { toggleDrawerOpen } = useDrawerContext();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useHistory();
    const { userLogin, isAuthenticated, logout } = useAuThContext();

    const perfilADM = Number(process.env.REACT_APP_IDPerfilAdm);
    const perfilADMSIST = Number(process.env.REACT_APP_IDPerfilAdmSist);
    const [perfTeste, setPerfTeste] = useState<number>(Number(localStorage.getItem('APP_ACCESS_USER')));

    const chooseOptions = { label: 'Arquivo', icon: 'pi pi-fw pi-plus', className: 'p-button-danger' };
    const uploadOptions = { label: 'Uplaod', icon: 'pi pi-upload', className: 'p-button-danger' };
    const cancelOptions = { label: 'Cancelar', icon: 'pi pi-times', className: 'p-button-danger' };
    //const history = useHistory();

     // Create state to store file
  const [file, setFile] = useState<any>();

  // Function to upload file to s3
  const uploadFile = async () => {
    // S3 Bucket Name
    const S3_BUCKET = "sistemaepi";

    // S3 Region
    const REGION = "us-east-1";

    
    // S3 Credentials
    AWS.config.update({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
    });
    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    // Files Parameters

    const params = {
      Bucket: S3_BUCKET,
      Key: file?.name ,
      Body: file,
    };

    // Uploading file to s3

    var upload = s3
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        // File uploading progress
        console.log(
          "Uploading " )//+ parseInt((evt.loaded * 100) / evt.total) + "%"
      })
      .promise();

    await upload.then((err) => {
      console.log(err);
      // Fille successfully uploaded
      alert("File uploaded successfully.");
    });
  };
  // Function to handle file and store it to file state
  const handleFileChange = (e:any) => {
    // Uploaded file
    const file = e.target.files[0];
    // Changing file state
    setFile(file);
  };

    // ##################################

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
        //executarCarga(event.files[0].name)
        uploadFile()
        event.options.clear();
    }

    // function executarCarga(path: string) {

    //     setIsLoading(true);

    //     if (window.confirm('Deseja realizar a carga?')) {
    //         cargaFunc(path)
    //             .then((response) => {
    //                 //console.log('##### Carga realizada com Sucesso! ####')
    //                 console.log('##### carga status ####', response)
    //                 alert('carga realizada com sucesso!')
    //                 history.push("/resultadoRelatorio", {data: response});
    //                 //navigate.push(`/funcionarios`)
    //                 //console.log('##### Efetuado carga com Sucesso! ####', response.data)
    //             }).catch((error) => {
    //                 console.log('### problema ao realizar carga ###',)
    //                 alert('Problema ao executar a carga !' + error)
    //                 navigate.push(`/funcionarios`)
    //             })

    //             .catch(error => {
    //                 console.log('###-error-####', error.response)
    //                 navigate.push(`/funcionarios`)
    //             })
    //         //setIsLoading(false);
    //     }
    // }


    function aoClicarEmVoltar() {
        navigate.push('/detalhe/funcionarios/novo')
    }

    function validaAutenticado() {
        // import { useAuThContext } from "../contexts_/AuthContext";
        //const { user, userLogin, updateLogin, isAuthenticated,logout } = useAuThContext();
        // {(validaAutenticado() &&
        // )}
        console.log('### userLogin ###', userLogin)
        console.log('### isAuthenticated ###', isAuthenticated)
        if (!isAuthenticated || userLogin === undefined) {
            logout()
            return false
        }
        return true
    }

    useEffect(() => {
        setPerfTeste(Number(localStorage.getItem('APP_ACCESS_USER')))
        //console.log("### var process.env.REACT_APP_API" + process.env.REACT_APP_ACCESS_KEY_ID)
        //console.log("### var accessKeyId" + accessKeyId)
        
        //const [perfTeste, setPerfTeste] = useState<number>();
        //perfTeste
    }, []);


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
                            Carga - FUNC
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
                                    //uploadHandler={uploadFile}
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

<div className="App">
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={uploadFile}>Upload</button>
      </div>
    </div>


   
        </>
        
    );
}

export default CargaFuncionario;