# CRUD Zoppy

Este projeto é uma aplicação de exemplo que demonstra um CRUD (Create, Read, Update, Delete) completo, composto por um frontend em Angular 19 e um backend em NestJS com Sequelize, utilizando MySQL como banco de dados e Docker para containerização.

## Tecnologias Utilizadas

**Frontend:**

- Angular 19
- NestJS
- RxJS
- Tailwind CSS
- Utilizado o conceito de mobile first

**Backend:**

- NestJS
- Sequelize (ORM para Node.js)
- MySQL (banco de dados)

**Infraestrutura:**

- Docker
- Docker Compose

## Estrutura do Banco de Dados

O banco de dados MySQL é estruturado com as seguintes tabelas principais:

### Tabela: `client`

Armazena informações sobre os clientes.

| Coluna       | Tipo                                | Restrições e Observações                           |
| :----------- | :---------------------------------- | :------------------------------------------------- |
| `id`         | UUID                                | Chave Primária, Gerado automaticamente (UUIDv4)    |
| `name`       | STRING                              | Não nulo                                           |
| `email`      | STRING                              | Não nulo, Validação de e-mail                      |
| `telephone`  | STRING                              | Não nulo                                           |
| `cpf_cnpj`   | STRING                              | Não nulo, Único                                    |
| `address`    | STRING                              | Permite nulo                                       |
| `birthdate`  | DATEONLY                            | Permite nulo                                       |
| `created_at` | TIMESTAMP WITH TIME ZONE / DATETIME | Data de criação, Gerado automaticamente            |
| `updated_at` | TIMESTAMP WITH TIME ZONE / DATETIME | Data da última atualização, Gerado automaticamente |

### Tabela: `pedido`

Armazena informações sobre os pedidos realizados pelos clientes.

| Coluna             | Tipo                                  | Restrições e Observações                                       |
| :----------------- | :------------------------------------ | :------------------------------------------------------------- |
| `id`               | UUID                                  | Chave Primária, Gerado automaticamente (UUIDv4)                |
| `cliente_id`       | UUID                                  | Chave Estrangeira referenciando `client(id)`, Não nulo         |
| `data_pedido`      | TIMESTAMP WITH TIME ZONE / DATETIME   | Não nulo, Valor padrão: Data/Hora atual                        |
| `status`           | ENUM('PENDENTE', 'PROCESSANDO', ...)  | Não nulo, Valor padrão: 'PENDENTE' (Valores de `PedidoStatus`) |
| `valor_total`      | DECIMAL(10, 2)                        | Não nulo                                                       |
| `metodo_pagamento` | ENUM('CARTAO_CREDITO', 'BOLETO', ...) | Não nulo (Valores de `MetodoPagamento`)                        |
| `observacoes`      | TEXT                                  | Permite nulo                                                   |
| `created_at`       | TIMESTAMP WITH TIME ZONE / DATETIME   | Data de criação, Gerado automaticamente                        |
| `updated_at`       | TIMESTAMP WITH TIME ZONE / DATETIME   | Data da última atualização, Gerado automaticamente             |

### Relacionamentos

- Um `Client` pode ter muitos `Pedido`s (Relacionamento 1-N).
- Um `Pedido` pertence a um `Client`.

## Como Clonar o Repositório

Para clonar este repositório, abra o seu terminal e execute o seguinte comando:

```bash
git clone https://github.com/lucasramosb/crud-zoppy.git
cd crud-zoppy
```

## Como Rodar a Aplicação com Docker

Certifique-se de ter o Docker e o Docker Compose instalados na sua máquina.

1.  **Crie o arquivo de variáveis de ambiente (`.env`)**
    Na raiz do projeto, crie um arquivo chamado `.env` com o seguinte conteúdo:

    ```
    DB_HOST=localhost
    DB_USERNAME=appuser
    DB_PASSWORD=apppass
    DB_NAME=crud_zoppy
    ```

2.  **Construa e Inicie os Containers**
    A partir da raiz do projeto, execute o seguinte comando para construir as imagens e iniciar os serviços:

    ```bash

    docker-compose up --build -d

    ```

## Como Acessar a Aplicação

Após os containers estarem em execução:

- **Frontend (Aplicação Angular):** Acesse seu navegador e vá para `http://localhost:4200`

- **Backend (API NestJS):** A API estará disponível em `http://localhost:3000`

## Parando a Aplicação

Para parar e remover os containers, execute:

```bash
sudo docker-compose down
```
