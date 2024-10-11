# User Registration App

Uma aplicação de registro de usuários desenvolvida com React. Utiliza Formik para gerenciamento de formulários e Yup para validação de dados. Inclui testes automatizados para garantir a qualidade e a funcionalidade do aplicativo.

## Funcionalidades

- Registro de usuários com nome, e-mail e senha.
- Validação de formulários com mensagens de erro amigáveis.
- Integração com API para submissão dos dados.
- Testes automatizados para validação de funcionalidades.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Formik**: Biblioteca para gerenciamento de formulários em React.
- **Yup**: Biblioteca para validação de esquemas de dados.
- **Axios**: Cliente HTTP para fazer requisições à API.
- **Jest** e **React Testing Library**: Ferramentas para testes automatizados.

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/user-registration-app.git
   cd user-registration-app
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie a aplicação:
   ```bash
   npm start
   ```
### Validação de Formulário

A validação do formulário é feita com Yup. Aqui está um exemplo de esquema de validação:

```javascript
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string().email('E-mail inválido').required('O e-mail é obrigatório'),
  password: Yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('A senha é obrigatória'),
});

