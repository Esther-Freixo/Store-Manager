# Sistema de Gerenciamento de Vendas 🛒

Este repositório contém o código-fonte de uma API RESTful desenvolvida para gerenciar produtos e vendas. A API foi construída utilizando a arquitetura em camadas, com um banco de dados MySQL para a gestão de dados, e inclui testes para garantir a funcionalidade das implementações.

## Descrição do Projeto

A API permite criar, visualizar, deletar e atualizar produtos e vendas. A arquitetura em camadas foi utilizada para promover a separação de responsabilidades e facilitar a manutenção do código.

## Estrutura do Projeto

O projeto é organizado da seguinte forma:

- **Camada de Roteamento (Routes)**: Define os endpoints da API e direciona as solicitações para os controladores correspondentes.
- **Camada de Controladores (Controllers)**: Gerencia a lógica de entrada e saída, manipulando solicitações e respostas.
- **Camada de Serviços (Services)**: Contém a lógica de negócios da aplicação.
- **Camada de Modelos (Models)**: Interage com o banco de dados MySQL através do ORM Sequelize.

## Funcionalidades

- **Gerenciamento de Produtos**:
  - Criar produto
  - Visualizar lista de produtos
  - Atualizar produto
  - Deletar produto
- **Gerenciamento de Vendas**:
  - Criar venda
  - Visualizar lista de vendas
  - Atualizar venda
  - Deletar venda


