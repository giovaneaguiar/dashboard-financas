<h1 align="center">Dashboard - Finanças</h1>
<p align="justify">O projeto consiste na criação de um Dashboard de Finanças intuitivo e eficiente, que permitirá aos usuários gerenciar suas transações financeiras de forma organizada e controlada. A plataforma permitirá o cadastro de transações, como receitas e despesas, oferecendo a opção de vinculá-las a categorias específicas.</p>

### 🎨 Layout 

<div align="center">
<img src="/assets/home.png">
</div>

<div align="center">
<img src="/assets/categorias.png">
</div>


### Pré-Requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) e [JSON Server](https://www.npmjs.com/package/json-server).

Além disto é bom ter um <strong>editor</strong> para trabalhar com o código como [VSCode](https://code.visualstudio.com/).

### ☕ Rodando o Servidor



```bash
# Com as ferramentas Git, Node.js, Yarn e JSON Server instaladas, clone este repositório
$ git clone <https://github.com/giovaneaguiar/dashboard-financas>

# Acesse a pasta 'static' do projeto no terminal/cmd, onde se encontra o db.json
$ cd dashboard-financas/static

# Execute o comando
$ npx json-server --watch --port 3005 db.json

# O servidor inciará
$ Acesse <http://localhost:3005>
```

### 🍊 Rodando a Aplicação Web

```bash
# Com as ferramentas Git, Node.js, Yarn e JSON Server instaladas, clone este repositório
$ git clone <https://github.com/giovaneaguiar/dashboard-financas>

# Acesse a pasta do projeto no terminal/cmd
$ cd dashboard-financas

# Instale as dependências
$ yarn install

# Execute o front-end
$ yarn dev

# A aplicação inciará
$ Acesse <http://localhost:3000>
```


