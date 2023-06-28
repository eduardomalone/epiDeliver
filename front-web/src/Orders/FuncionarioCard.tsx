
//import path from 'path';
import { SyntheticEvent, useState } from 'react';
import { FuncionarioDTO } from './types';
//import { View, Text, StyleSheet, Button, Image } from 'react';

type Props = {
    funcionario: FuncionarioDTO[]
}


function FuncionarioCard(this: any, { funcionario }: Props) {

    function onError(e: any) {
        e.target.src = '/func_imgs/func_default.svg';
      }

    return (
        <div className="">
            <img className=""
                src={'/func_imgs/'+funcionario[0].registro+'.jpg'}
                onError={(e) => onError(e)} alt="testImg" 
            /> 
            {/* <img
                src={require('./teste_foto.jpg')}
                alt="logo"

            /> */}
            <div className="order-card-description">
                <h3>{funcionario[0].nome}</h3>
                <h3>{funcionario[0].setor}</h3>
            </div>
        </div>
    )
}

export default FuncionarioCard;