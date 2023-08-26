# ReactNative-CRUD
App mobile, Android e IOS. Cadastro de Clientes e Produtos.


# Aplicativo de Gerenciamento de Usuários e Produtos

Este é um aplicativo móvel desenvolvido em React Native que permite aos usuários cadastrar, visualizar, editar e excluir usuários e produtos. O aplicativo utiliza o contexto (`UserContext` e `ProductContext`) para gerenciar os dados dos usuários e produtos de forma global, permitindo que diferentes telas acessem e atualizem esses dados.

## Funcionalidades

O aplicativo possui as seguintes funcionalidades:

### Tela de Lista de Usuários

- Exibe a lista de usuários cadastrados.
- Cada usuário é exibido com o nome e botões para visualizar detalhes, editar e excluir.
- Permite adicionar novos usuários.

### Tela de Detalhes do Usuário

- Exibe os detalhes de um usuário, incluindo nome e outras informações relevantes.
- Permite editar ou excluir o usuário.

### Tela de Edição de Usuário

- Permite editar o nome de um usuário existente.

### Tela de Lista de Produtos

- Exibe a lista de produtos cadastrados.
- Cada produto é exibido com o nome e preço.
- Permite adicionar novos produtos.

### Tela de Detalhes do Produto

- Exibe os detalhes de um produto, incluindo nome e preço.

## Pré-requisitos

- Node.js (versão 16.10.0)
- npm  (versão 7.24.0)
- npx  (versão 7.24.0)

## Instalação

1. Clone este repositório para o seu computador.


git clone https://github.com/Ctrl-Enter-Development/ReactNative-CRUD

# 2 - Navegue até o diretório do projeto.

cd ReactNative-CRUD


# 3 - Instale as dependências do projeto.

npm install
 ou
yarn install


## Executando o Aplicativo
Certifique-se de que você possui um ambiente de desenvolvimento configurado para React Native (Expo CLI ou React Native CLI).

Inicie o servidor de desenvolvimento.

npm start
 ou
yarn start


## Pacotes Utilizados
React Native
React Navigation
AsyncStorage

#Estrutura

├── src
│   ├── components
│   │   ├── Button.js
│   │   ├── CustomHeader.js
│   │   ├── CustomSideMenu.js
│   │   ├── ...
│   ├── screens
│   │   ├── Home
│   │   │   ├── HomeScreen.js
│   │   ├── Users
│   │   │   ├── AddUserScreen.js
│   │   │   ├── UserListScreen.js
│   │   │   ├── DeleteUserScreen.js
│   │   │   ├── EditUserScreen.js
│   │   │   ├── UserDetailScreen.js
│   │   │   ├── UserListScreen.js
│   │   │   ├── UserProvider.js
│   │   │   ├── UserScreen.js
│   │   │   ├── ...
│   │   ├── Products
│   │   │   ├── AddProductScreen.js
│   │   │   ├── EditProductScreen.js
│   │   │   ├── ProductDetailScreen.js
│   │   │   ├── ProductListScreen.js
│   │   │   ├── ProductScreen.js
│   │   │   ├── ...
│   │   ├── Sales
│   │   │   ├── AddSaleScreen.js
│   │   ├── Settings
│   │   │   ├── SettingsScreen.js
│   │   │   ├── ...
│   │   ├── Details
│   │   │   ├── ...
│   ├── contexts
│   │   ├── UserContext.js
│   │   ├── ProductContext.js
│   │   ├── SaleContext.js
│   ├── navigation
│   │   ├── AppNavigator.js
│   │   ├── DrawerNavigator.js
│   │   ├── ProductStack.js
│   │   ├── UserStack.js
│   │   ├── ...
│   ├── data
│   │   ├── database.json
│   │   ├── ...
│   ├── utils
│   │   ├── api.js
│   │   ├── ...
├── App.js
├── ...