INSERT INTO `tab_cliente`
(`nome`,
`video`)
VALUES
(
'BASF',
'teste');

INSERT INTO `tab_cliente`
(`nome`,
`video`)
VALUES
(
'Itautec',
'testeUri');

INSERT INTO `tab_cliente`
(`nome`,
`video`)
VALUES
(
'Usiminas',
'testeUri');

INSERT INTO `tab_epi`
(`id_cliente`,
`codigo`,
`descricao`,
`validade`)
VALUES
(1,
'CA37537',
'BLUSAO PVC FORRADO COM CAPUZ',
30);

INSERT INTO `tab_epi`
(`id_cliente`,
`codigo`,
`descricao`,
`validade`)
VALUES
(1,
'CA14781',
'MASCARA FACIAL 1/4 ALLTEC 2001',
60);

INSERT INTO `tab_epi`
(`id_cliente`,
`codigo`,
`descricao`,
`validade`)
VALUES
(1,
'CA5745',
'PROTETOR AUDITIVO TIPO PLUG 3M',
180);

INSERT INTO `tab_funcionario`
(`id_cliente`,
`registro`,
`nome`,
`setor`,
`cod_funcao`,
`coringa`)
VALUES
(1,
'005919048',
'FLAVIO MARRA',
'MONTAGEM DE PNEU',
'M235',
'N');

INSERT INTO `tab_funcionario`
(`id_cliente`,
`registro`,
`nome`,
`setor`,
`cod_funcao`,
`coringa`)
VALUES
(1,
'981234563',
'EDUARDO LUCIO',
'INSTALACAO DE VIDRO',
'M245',
'N');

INSERT INTO `tab_funcxepi`
(`id_funcio`,
`id_epi`)
VALUES
(1,
1);
INSERT INTO `tab_funcxepi`
(`id_funcio`,
`id_epi`)
VALUES
(1,
2);
INSERT INTO `tab_funcxepi`
(`id_funcio`,
`id_epi`)
VALUES
(2,
1);
INSERT INTO `tab_funcxepi`
(`id_funcio`,
`id_epi`)
VALUES
(2,
2);
INSERT INTO `tab_funcxepi`
(`id_funcio`,
`id_epi`)
VALUES
(2,
3);

INSERT INTO `tab_solicitacao`
(`id_funcio`,
`data`)
VALUES
(1,
now());

INSERT INTO `tab_item_solicitacao`
(
`id_solicitacao`,
`id_epi`,
`codigo_barra`,
`data_inclusao`,
`id_usuario_baixa`,
`ip`,
`data_baixa`)
VALUES
(
1,
1,
'1010',
now(),
5,
'',
now());

