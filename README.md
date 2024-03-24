## Requisitos Não Funcionais (RNF)

- [X] RNF1: A aplicação deve ter uma boa performance, com tempos de resposta rápidos.
- [X] RNF2: A aplicação deve ser resiliente, capaz de se recuperar de falhas.
- [X] RNF3: Código da API em repositório Git público.
- [ ] RNF4: Documentação da aplicação no Git (README).
- [ ] RNF5: Aplicação rodando no ambiente local do candidato.
- [ ] RNF6: Swagger implementado para acesso à documentação da API.
- [ ] RNF7: Arquivo SQL contendo o DDL final e alguns "inserts" de dados de exemplo.
- [ ] RNF8: Coleção do Postman ou Insomnia, em formato JSON, para testes na API.
- [ ] RNF9: Testes unitários e de integração implementados.


## Requisitos Funcionais (RF)
### Entidade: Clientes
#### CRUD (Create, Read, Update, Delete)

- [X] RF1: Criar um novo cliente.
  - [x] Criar controller
  - [x] Criar use case
  - [x] Criar repository
  - [ ] Criar InMemoryRepository
- [X] RF2: Ler informações de um cliente existente.
  - [x] Criar controller
  - [x] Criar use case
  - [x] Criar repository
  - [ ] Criar InMemoryRepository
- [X] RF3: Atualizar informações de um cliente existente.
  - [x] Criar controller
  - [x] Criar use case
  - [x] Criar repository
  - [ ] Criar InMemoryRepository
- [X] RF4: Excluir um cliente existente.
  - [x] Criar controller
  - [x] Criar use case
  - [x] Criar repository
  - [ ] Criar InMemoryRepository

### Entidade: Addresses
#### CRUD (Create, Read, Update, Delete)

- [X] RF5: Criar um novo endereço.
  - [x] Criar controller
  - [x] Criar use case
  - [x] Criar repository
  - [ ] Criar InMemoryRepository
- [X] RF6: Ler informações de um endereço existente.
  - [x] Criar controller
  - [x] Criar use case
  - [x] Criar repository
  - [ ] Criar InMemoryRepository
- [X] RF7: Atualizar informações de um endereço existente.
  - [x] Criar controller
  - [x] Criar use case
  - [x] Criar repository
  - [ ] Criar InMemoryRepository
- [X] RF8: Excluir um endereço existente.
  - [x] Criar controller
  - [x] Criar use case
  - [x] Criar repository
  - [ ] Criar InMemoryRepository

### Entidade: Orders
#### CRUD (Create, Read, Update, Delete)

- [X] RF9: Criar um novo pedido.
  - [x] Criar controller
  - [x] Criar use case
  - [x] Criar repository
  - [ ] Criar InMemoryRepository
- [X] RF10: Ler informações de um pedido existente.
  - [x] Criar controller
  - [x] Criar use case
  - [x] Criar repository
  - [ ] Criar InMemoryRepository
- [ ] RF11: Atualizar informações de um pedido existente.
  - [] Criar controller
  - [] Criar use case
  - [] Criar repository
- [ ] RF12: Excluir um pedido existente.
  - [] Criar controller
  - [] Criar use case
  - [] Criar repository

### Entidade: Products
#### CRUD (Create, Read, Update, Delete)

- [X] RF13: Criar um novo produto.
  - [X] Criar controller
  - [X] Criar use case
  - [X] Criar repository
  - [ ] Criar InMemoryRepository
- [X] RF14: Ler informações de um produto existente.
  - [X] Criar controller
  - [X] Criar use case
  - [X] Criar repository
  - [ ] Criar InMemoryRepository
- [X] RF15: Atualizar informações de um produto existente.
  - [X] Criar controller
  - [X] Criar use case
  - [X] Criar repository
  - [ ] Criar InMemoryRepository
- [X] RF16: Excluir um produto existente.
  - [X] Criar controller
  - [X] Criar use case
  - [X] Criar repository
  - [ ] Criar InMemoryRepository

### Entidade: Categories
#### CRUD (Create, Read, Update, Delete)

- [X] RF17: Criar uma nova categoria.
  - [X] Criar controller
  - [X] Criar use case
  - [X] Criar repository
  - [ ] Criar InMemoryRepository
- [X] RF18: Ler informações de uma categoria existente.
  - [X] Criar controller
  - [X] Criar use case
  - [X] Criar repository
  - [ ] Criar InMemoryRepository
- [X] RF19: Atualizar informações de uma categoria existente.
  - [X] Criar controller
  - [X] Criar use case
  - [X] Criar repository
  - [ ] Criar InMemoryRepository
- [X] RF20: Excluir uma categoria existente.
  - [X] Criar controller
  - [X] Criar use case
  - [X] Criar repository
  - [ ] Criar InMemoryRepository

### Entidade: ProductOrders
#### CRUD (Create, Read, Update, Delete)

- [ ] RF21: Criar uma nova relação entre produto e pedido.
  - [] Criar controller
  - [] Criar use case
  - [] Criar repository
- [ ] RF22: Ler informações de uma relação entre produto e pedido existente.
  - [] Criar controller
  - [] Criar use case
  - [] Criar repository
- [ ] RF23: Atualizar informações de uma relação entre produto e pedido existente.
  - [] Criar controller
  - [] Criar use case
  - [] Criar repository
- [ ] RF24: Excluir uma relação entre produto e pedido existente.
  - [] Criar controller
  - [] Criar use case
  - [] Criar repository