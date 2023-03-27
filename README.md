# Projeto Trybe - Store Manager
## Módulo de Back End
### Arquitetura de Software em camadas utilizando Node.Js
### :construction: README customizado em construção ! :construction:

Neste projeto a **Trybe** propôs a criação de uma API REST de gerenciamento de vendas. O foco principal era consolidar o aprendizado de arquitetura em camadas (MSC - Model, Service, Controller) para receber requisições e se comunicar com um banco de dados MySQL. Como parte do projeto a **Trybe** já disponibilizou os arquivos _.sql_ responsáveis pela criação e por popular o banco de dados, bem como a estrutura dos _containers_ docker.

Para desenvolver esse projeto, optei por utilizar TDD (_Test Driven Development_), garantindo que novas implementações e ajustes de código manteriam a API funcionando como esperado.


## Stack utilizada

**Back-end:** Node.js, Express, MySQL

**Tests:** Mocha, Sinon, Chai


## Variáveis de Ambiente

No caso específico desse projeto, visto que sua função é apenas uma demonstração, as variáveis de ambiente necessárias já foram incluídas no arquivo `docker-compose.yml`


## Documentação da API

#### Retorna todos os itens

```http
  GET /products
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `` | `` | Retorna a lista de produtos cadastrados no banco. |

#### Retorna um item

```http
  GET /products/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | Retorna o produto através do ID enviado na url. |

#### Retorna uma lista de itens

```http
  GET /products/searchq=?
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `nome` | `string` | Retorna a lista de produtos filtrada pelo nome enviado na query |

#### Retorna todos os itens

```http
  POST /products
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `{ name }` | `string` | Adiciona um objeto ao banco de dados. |

