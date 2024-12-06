# Lobby - Teste de Frontend

Este projeto foi desenvolvido como parte de um teste para uma vaga de desenvolvedor frontend na empresa **Lobby**. A aplicação consiste em um fluxo de resgate de produtos, composto por 3 telas.

## Fluxo da Aplicação

1. **Tela de Boas-Vindas**: O usuário é apresentado a uma página de boas-vindas com um botão que o direciona para a próxima etapa.
2. **Tela de Formulário**: O usuário preenche um formulário com perguntas sobre dados pessoais, endereço e, caso necessário, informações sobre o tamanho de algum produto que ele receberá. Há também perguntas extras que podem ser exibidas, dependendo da lógica do sistema.

3. **Tela de Conclusão**: Após o envio do formulário, se os dados forem validados corretamente, o usuário é redirecionado para a tela de finalização, com a confirmação de que o pedido de resgate foi feito com sucesso. Caso haja erros, um toast de erro é exibido.

## Tecnologias Utilizadas

- **Next.js** - Framework React para construção de páginas e renderização no lado do servidor.
- **React.js** - Biblioteca para construção de interfaces de usuário.
- **TypeScript** - Superset do JavaScript para aumentar a confiabilidade e manutenção do código.
- **Material UI** - Biblioteca de componentes React para design de interfaces.
- **Axios** - Cliente HTTP para realizar requisições ao backend.
- **TanStack Query** - Para o gerenciamento de requisições e cache de dados.
- **SVGR/webpack** - Para otimização e importação de ícones SVG.
- **React-toastify** - Para exibição de notificações de sucesso e erro.
- **Máscaras de Inputs** - Para formatação de dados como CPF, CNPJ, telefone, e-mail e CEP.

## Configuração do Ambiente

Para rodar o projeto localmente, você precisará da variável de ambiente `NEXT_PUBLIC_API_KEY` configurada no arquivo `.env` para realizar requisições ao backend. Exemplo:

```bash
NEXT_PUBLIC_API_KEY=2adzvI66EeGBSGDv_TNqdFaq73ZVAJtb6R7QeUrXDuo
```

## Como Rodar o Projeto

1. Clone o repositório:

```bash
git clone https://github.com/MarcusVNT/lobby-test.git
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

4. Acesse a aplicação em "http://localhost:3000" e adicione no domínio "/5c7e9bc8-e063-4d86-8e2c-eccce6f3ee1c"

## Link de Produção

A aplicação também está hospedada na Vercel e pode ser acessada [AQUI](https://lobby-test-marcusvnt.vercel.app/5c7e9bc8-e063-4d86-8e2c-eccce6f3ee1c).

## Melhorias Futuras

1. Para melhor experiência do usuário, seria legal fazer a integração com alguma API de CEP, para quando o usuário digitar, o endereço ser buscado automáticamente.
