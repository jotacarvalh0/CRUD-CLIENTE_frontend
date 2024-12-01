# Cliente Management Frontend

Este projeto é uma aplicação frontend para a gestão de clientes, permitindo ao usuário visualizar, adicionar, editar e excluir informações de clientes. A aplicação foi construída com Vue.js e utiliza a API backend para interagir com os dados. O frontend também inclui um sistema de notificações para feedback do usuário, modais para edição de clientes e uma interface responsiva para dispositivos móveis.

## Tecnologias Utilizadas

- **Vue.js**: Framework JavaScript para construção da interface do usuário.
- **Axios**: Cliente HTTP para interagir com a API backend.
- **CSS**: Estilos personalizados para tornar a aplicação visualmente atraente e responsiva.
- **Vue Router**: Gerenciador de rotas para navegação entre páginas.

### Explicação dos Arquivos Principais:

1. **App.vue**:
   - O componente raiz da aplicação. Ele contém o layout principal, incluindo o cabeçalho, rodapé e a navegação para outras páginas.
   
2. **ClienteList.vue**:
   - Componente responsável por exibir a lista de clientes. Ele utiliza o `axios` para buscar os dados da API e os exibe em uma tabela. Permite editar e excluir clientes, acionando os modais de edição ou exclusão.

3. **ClienteEditModal.vue**:
   - Componente modal para edição de informações de um cliente. Exibe um formulário com os dados do cliente e possibilita a atualização das informações. É invocado a partir do `ClienteList.vue`.

4. **HomeView.vue**:
   - Página inicial da aplicação, que exibe uma mensagem de boas-vindas e um botão para adicionar novos clientes. Também utiliza o componente `ClienteList` para listar os clientes já cadastrados.

5. **index.js (Vue Router)**:
   - Arquivo responsável pela configuração das rotas da aplicação. Ele define a navegação entre os componentes como `Clientes.vue` e outros componentes da aplicação.

## Dependências

As dependências principais do projeto estão listadas no arquivo `package.json`:

- **axios**: Para realizar requisições HTTP ao backend.
- **vue-router**: Para gerenciar as rotas da aplicação.
- **vue**: Framework JavaScript para construção da interface.

### Instale as dependências utilizando o comando:

```bash
npm install
```
## Como Executar o Ambiente de Desenvolvimento
### Clonando o Repositório:

1. **Primeiro, clone o repositório**:

```bash
git clone https://github.com/jotacarvalh0/CRUD-CLIENTE_frontend
cd CRUD-CLIENTE_frontend
```
2. **Instalando Dependências**:

Após clonar o repositório, instale as dependências do projeto utilizando o npm:

```bash
npm install vue
npm install vue-router
npm install axios
```
3. **Executando a Aplicação**:

Para rodar a aplicação localmente em desenvolvimento, use o comando:

```bash
npm run serve
```
O servidor de desenvolvimento estará disponível em http://localhost:8080 por padrão.

4. **Acessando a Aplicação**:

Abra seu navegador e acesse http://localhost:8080 para visualizar a aplicação em funcionamento.

## Funcionalidades
### Listar Clientes
A página de clientes exibe uma tabela com os seguintes dados:

- Nome
- Email
Cada cliente tem botões de ação:

- Editar: Abre um modal para editar os dados do cliente.
- Excluir: Exclui o cliente após confirmação.

## Responsividade
A aplicação foi projetada para ser responsiva, garantindo uma boa experiência de usuário em dispositivos móveis. As tabelas se tornam roláveis horizontalmente em telas menores, e o modal de edição é adaptado para dispositivos móveis.
