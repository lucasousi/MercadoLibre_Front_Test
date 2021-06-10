<center><h1>MercadoLivre WMS Front End Test</h1></center>

Seguem orientações para execução do sistema:

1º Instale as dependências, tanto para o back quanto para o front.

```
npm i
```

2º Crie o arquivo environment na raiz da pasta frontend, chamado .env.local com o seguinte conteúdo:

```
REACT_APP_API_URL=http://localhost:3001/api
```

3º Os dados para acesso são:

- _Login:_ testeml@teste.com
- _Senha:_ !xYbEz$q

<hr />
<br />

🖥️ **Backend**

<br />

O serviço pode ser executado por meio dos comandos:

```
npm run dev
```

```
npm run start
```

Lembre-se de estar na pasta correta dentro do prompt.

🖥️ **Front**

O serviço pode ser executado por meio do comando:

```
npm run start
```

Lembre-se de estar na pasta correta dentro do prompt.

<br />

**Detalhes de Implementação**

❕ Não implementei os testes unitários pois não houve tempo hábil. Preferi focar numa rotina de autenticação melhor elaborada e gastei a maior parte do tempo lá.
<br />

**Sobre a autenticação**

- ✅ Implementei por meio de um serviço Node integrado ao Firebase.
- ✅ As rotas que necessitam de autenticação foram mapeadas
- ✅ Há um Middleware que controla esse assunto, tanto no front quanto no back
- ❕ Não foi implementado gestão de sessão/refresh token e logout.

**Sobre a rotina de Rating e Favorite**

- ✅ Implementei ambas sem uso de bibliotecas tercerizadas
- ❕ Não persisti os dados dela pois penso que o componente que desenvolvi já consegue mostrar como faço para desenvolver componentes próprios

**Sobre responsividade**

- ✅ Todas as telas e componentes estão responsíveis
- ✅ Não utilizei o sistema de css-grid-layout e sim o grid do próprio bootstrap que se baseia em flex-box por meio de Container, Rows, e Cols.

**Sobre filtro por categoria**

- ❕ Implementei o filtro por meio de SELECT pois não encontrei na documentação a forma de enviar um Array de IDS como filtro para categoria. Dessa forma, não coloquei exatamente na lateral mas acredito que ficou elegante.

É isso. Obrigado pela oportunidade e até breve.
