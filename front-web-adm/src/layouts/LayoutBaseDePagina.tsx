import { Box } from "@mui/material";

// interface ILayoutBaseDePaginaProps {
//     titulo: string;
// }

export const LayoutBaseDePagina: React.FC<any>= ({children, titulo}) => {


    return (
        <Box>
            {titulo}
            Seja bem vindo ao Sistema EPI - ADM
            {children}
        </Box>
    );
};