# Books API

<div align="center"></br>
  <img alt="API badge" src="https://img.shields.io/badge/API%20REST-E64D80?style=for-the-badge" />
  <img alt="NodeJS badge" src="https://img.shields.io/badge/Node.js-90C53F?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img alt="ExpressJS badge" src="https://img.shields.io/badge/Express.js-333331?style=for-the-badge" />
  <img alt="Sequelize badge" src="https://img.shields.io/badge/Sequelize-00B1EA?style=for-the-badge&logo=sequelize&logoColor=white" />
</div></br>

CRUD simples, com o objetivo de aplicar os meus conhecimentos em typescript.

---

**Manipulação**
  - [**Novo registro**](#adicionar-livro)
  - [**Atualizar**](#atualizar-livro)
  - [**Deletar**](#deletar-um-livro)

**Consultas**
  - [**Pesquisar livros**](#consultar-livros)
  - [**Pegar livro pelo ID**](#pegar-livro-pelo-id)

**Resposta de erros**
  - [**Tipagem**](#erros-de-tipagem)

---

# Iniciando

Saída no console se tudo estiver certo ao iniciar a `API REST` localmente.

    DATABASE OK
    API IS RUNNING AT: http://127.0.0.1:3000

---

# Adicionar livro

| Rota        | método     |
|-------------|------------|
| **`/book`** | **`POST`** |

**Parâmetros obrigatórios**

| Campo             | Tipo         | Local | Descrição        |
|-------------------|--------------|-------|------------------|
| **`title`**       | **`string`** | Body  | Nome do livro    |
| **`description`** | **`string`** | Body  | Sinopse do livro |
| **`genre`**       | **`string`** | Body  | Gênero Textual   |
| **`author`**      | **`string`** | Body  | Autor            |
| **`price`**       | **`number`** | Body  | Preço do livro   |

**Exemplo de requisição**

**`POST`** **`/book`**

```json
{
  "title": "A Invenção de Hugo Cabret",
  "description": "Em 1931, o menino órfão Hugo Cabret vive escondido em uma estação de trem de Paris. Ali, cuida do funcionamento de gigantescos...",
  "author": "Brian Selznick"
  "genre": "ação",
  "price": 34.2,
}
```

**Resposta de sucesso**

**Código**: **`201 CREATED`**

```json
{
  "id": 1,
  "title": "A Invenção de Hugo Cabret",
  "description": "Em 1931, o menino órfão Hugo Cabret vive escondido em uma estação de trem de Paris. Ali, cuida do funcionamento de gigantescos...",
  "price": 34.2,
  "genre": "ação",
  "author": "Brian Selznick",
  "createdAt": "2022-01-05T15:46:56.000Z",
  "updatedAt": "2022-01-05T15:46:56.000Z"
}
```

**Respostas de erro**

**Causa**: Um título semelhante já existe.

**Código**: **`400 BAD REQUEST`**

```json
{
	"msg": "The book already exists"
}
```

OU

**Causa**: Algum erro interno no servidor

**Código**: **`500 INTERNAL ERROR`**

```json
{
  msg: "Error when trying to create a new book"
}
```

---

# Consultar livros

| Rota         | Método    |
|--------------|-----------|
| **`/books`** | **`GET`** |

**Parâmetros**

| Campo        | Tipo          | Requerido | Local | Descrição                      |
|--------------|---------------|-----------|-------|--------------------------------|
| **`author`** | **`string`**  | N         | query | Autor                          |
| **`title`**  | **`string`**  | N         | query | Nome do livro                  |
| **`genre`**  | **`string`**  | N         | query | Gênero textual                 |
| **`limit`**  | **`integer`** | N         | query | Limite de registros por página |
| **`page`**   | **`integer`** | N         | query | Páginação dos registros        |

**Exemplo de requisição**

**`GET`** **`/books?author={AuthorName}&title={BookTitle}genre={genre}&limit={limit}&page={page}`**

**Resposta de sucesso**

**`GET`** **`/books?limit=3&page=1`**

**Código**: **`200 OK`**

```json
{
	"books": [
		{
			"id": 125,
			"title": "teste 5",
			"description": "teste",
			"price": 54.5,
			"genre": "werwr",
			"author": "teste",
			"createdAt": "2022-01-25T22:16:53.000Z",
			"updatedAt": "2022-01-25T22:16:53.000Z"
		},
		{
			"id": 9,
			"title": "Boneco de neve",
			"description": "Considerado pelo jornal inglês The Guardian o livro mais ambicioso de Jo Nesbø e comparado a O silêncio dos inocentes pelo The Times, Boneco de Neve é seu livro mais arrepiante.A primeira neve do ano cai sobre Oslo...",
			"price": 30.55,
			"genre": "terror",
			"author": "Jo Nesbø",
			"createdAt": "2022-01-15T15:52:35.000Z",
			"updatedAt": "2022-01-15T15:52:35.000Z"
		},
		{
			"id": 8,
			"title": "E não sobrou nenhum",
			"description": "Em Uma ilha misteriosa, um poema infantil, dez soldadinhos de porcelana e muito suspense são os ingredientes com que Agatha Christie constrói seu romance mais importante. Na ilha do Soldado, antiga propriedade de um milionário...",
			"price": 22.2,
			"genre": "suspense",
			"author": "Agatha Christie",
			"createdAt": "2022-01-15T15:49:45.000Z",
			"updatedAt": "2022-01-15T15:49:45.000Z"
		}
	],
	"totalRecords": 1234,
	"records": 3
}
```

**Resposta de error**

**Causa**: Algum erro interno no servidor

**Código**: **`500 INTERNAL ERROR`**

```json
{
  msg: "Error when trying to get the books"
}
```

---

# Pegar livro pelo ID

| Rota            | Método    |
|-----------------|-----------|
| **`/book/:id`** | **`GET`** |

**Parâmetro obrigatório**

| Campo    | Tipo          | Local |
|----------|---------------|-------|
| **`id`** | **`integer`** | rota  |

**Exemplo de requisição**

**`GET`** **`/book/{bookId}`**

**Resposta de sucesso**

**`GET`** **`/book/5`**

**Código**: **`200 OK`**

```json
{
	"id": 5,
	"title": "Sherlock Holmes - Um estudo em vermelho",
	"description": "Holmes é chamado para solucionar o caso de um homem que foi encontrado morto, com uma expressão de terror, mas que não apresenta ferimentos, apenas manchas de sangue pelo corpo. ",
	"price": 9.9,
	"genre": "ação",
	"author": "Arthur Conan Doyle",
	"createdAt": "2022-01-15T15:43:44.000Z",
	"updatedAt": "2022-01-15T15:43:44.000Z"
}
```

**Respostas de erro**

**Causa**: O id buscado não existe

**Código**: **`400 BAD REQUEST`**

```json
{
	"msg": "Book does not exist"
}
```

OU

**Causa**: Algum erro interno no servidor

**Código**: **`500 INTERNAL ERROR`**

```json
{
  msg: "Error when trying to get the book"
}
```

---

# Atualizar livro

| Rota                   | Método      |
|------------------------|-------------|
| **`/book/:id/update`** | **`PATCH`** |

**Parâmetros**

| Campo             | Tipo          | Requerido | Local | Descrição                     |
|-------------------|---------------|-----------|-------|-------------------------------|
| **`id`**          | **`integer`** | Y         | Rota  | ID do objeto a ser atualizado |
| **`title`**       | **`string`**  | N         | Body  | Nome do livro                 |
| **`description`** | **`string`**  | N         | Body  | Sinopse do livro              |
| **`genre`**       | **`string`**  | N         | Body  | Gênero Textual                |
| **`author`**      | **`string`**  | N         | Body  | Autor                         |
| **`price`**       | **`number`**  | N         | Body  | Preço do livro                |

**Exemplo de requisição**

**`PATCH`** **`/book/{bookId}/update`**

**`PATCH`** **`/book/1/update`**

body

```json
{
  "price": 11.99,
  //"title": ...
  //"description": ...
  //"author": ...
}
```

**Resposta de sucesso**

**Código**: **`200 OK`**

```json
{
  "id": 1,
  "title": "A Invenção de Hugo Cabret",
  "description": "Em 1931, o menino órfão Hugo Cabret vive escondido em uma estação de trem de Paris. Ali, cuida do funcionamento de gigantescos...",
  "price": 11.99,
  "genre": "ação",
  "author": "Brian Selznick",
  "createdAt": "2022-01-05T15:46:56.000Z",
  "updatedAt": "2022-01-15T14:12:37.000Z"
}
```

**Respostas de erro**

**Causa**: O id do livro a ser atualizado não existe

**Código**: **`400 BAD REQUEST`**

```json
{
	"msg": "Book does not exist"
}
```

OU 

**Causa**: Algum erro interno no servidor

**Código**: **`500 INTERNAL ERROR`**

```json
{
  msg: "Error when trying to update the book"
}
```

---

# Deletar um livro

| Rota                   | Método       |
|------------------------|--------------|
| **`/book/:id/delete`** | **`DELETE`** |

**Parâmetro obrigatório**

| Campo    | Tipo          | Local | Descrição                     |
|----------|---------------|-------|-------------------------------|
| **`id`** | **`integer`** | Rota  | ID do registro a ser deletado |

**Exemplo de requisição**

**`DELETE`** **`/book/{bookId}/delete`**

**Resposta de sucesso**

**`DELETE`** **`/book/1/delete`**

**Código**: **`200 OK`**

```json
{
	"deletedBook": {
	      "id": 1,
	      "title": "A Invenção de Hugo Cabret",
	      "description": "Em 1931, o menino órfão Hugo Cabre      vive escondido em uma estação de trem de Paris      Ali, cuida do funcionamento de gigantescos...",
	      "price": 11.99,
	      "genre": "ação",
	      "author": "Brian Selznick",
	      "createdAt": "2022-01-05T15:46:56.000Z",
	      "updatedAt": "2022-01-15T14:12:37.000Z"
	}
}
```

**Respostas de erro**

**Causa**: O id do livro a ser deletado não existe

**Código**: **`400 BAD REQUEST`**

```json
{
	"msg": "Book does not exist"
}
```

OU

**Causa**: Algum erro interno no servidor

**Código**: **`500 INTERNAL ERROR`**

```json
{
  msg: "Error when trying to delete the book"
}
```

# Erros de tipagem

**Causa**: Caso o consumidor passe um tipo de dados errado em um certo campo, o esquema de erros de tipagem será algo nesse seguimento, informando a tipagem correta que deverá ser enviada.

**Código**: **`422 UNPROCESSABLE ENTITY`**

**exemplo de requisição**:

```json
{
  "title": 12345,
  "price": -1
}
```

**Resposta**:

```json
[
	{
		"msg": "\"title\" must be a string",
		"field": "title"
	},
	{
		"msg": "\"price\" must be a positive number",
		"field": "price"
	}
]
```
