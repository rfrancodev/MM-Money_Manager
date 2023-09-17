
# Money Manager

Este projeto é uma API para sistema bancário. Você conseguirá realizar as principais transações bancárias.
Este projeto foi um desafio do curso de back-end da @CubosAcademy.
## Rodando localmente

Clone o projeto

```bash
git@github.com:rfrancodev/MM-Money_Manager.git
```

Entre no diretório do projeto

```bash
  cd MM-Money_Manager
```

Configure o servidor

```bash
  npm init -y
```
Instale as dependências

```bash
  npm install express
  npm install -D nodemom
  npm install -D date-fns
  
```
Na pasta raiz crie arquivo .gitignore e insira:

```bash
  node_modules
```

Inicie o servidor

```bash
  npm run dev
```

Local para testar end-points

```bash
Insomnia

```

Rota para teste

```bash
http://localhost:3000/contas

```


## Funcionalidades

- Listar contas
- Criar contas
- Atualizar contas
- Excluir conta
- Depositar
- Sacar
- Transferir
- Extrato


## Armazenamento de dados
Os dados são persistidos em memoria. Dessa forma sempre que o servidor for atualizado as informações são zeradas. 
O armazenamento permanente de dados esta previsto como melhoria.
## Documentação da API

### Principais end-points

#### - Listar todas as contas

```http
  GET http://localhost:3000/contas
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `senha` | `string` | **A senha é:** Cubos123Bank |

#### - Criar uma nova conta

```http
  POST http://localhost:3000/contas
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `objeto`      | `json` | **Campos são obrigatórios**.|

#### 
     "usuario": {
            "nome": "Rafael",
            "cpf": "00011122230",
            "data_nascimento": "2021-03-15",
            "telefone": "71999998888",
            "email": "rafa@email.com",
            "senha": "1234"
            }

#### - Realizar transfências

```http
  POST http://localhost:3000/transacoes/transferir
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `objeto`      | `json` | **Campos são obrigatórios**.|

#### 
     {
	"numero_conta_origem": "2",
	"numero_conta_destino": "1",
	"valor": 200,
	"senha": "12345"
    }

Recebe dois números de contas diferentes.
#### - Extrato da conta

```http
  GET http://localhost:3000/contas/extrato/1/1234
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` | Numero da conta.|
| `id`      | `number` | Senha da conta.|

#### Exemplo de extrato
     {
	"depositos": [
		{
			"data": "2023-09-16 20:31:47",
			"numero_conta": "1",
			"valor": 1900
		}
	],
	"saques": [],
	"transferenciasEnviadas": [
		{
			"data": "2023-09-16 20:32:52",
			"numero_conta_origem": "1",
			"numero_conta_destino": "2",
			"valor": 200
		}
	],
	"transferenciasRecebidas": [
		{
			"data": "2023-09-16 20:31:53",
			"numero_conta_origem": "2",
			"numero_conta_destino": "1",
			"valor": 200
		},
		{
			"data": "2023-09-16 20:31:54",
			"numero_conta_origem": "2",
			"numero_conta_destino": "1",
			"valor": 200
		},
		{
			"data": "2023-09-16 20:32:37",
			"numero_conta_origem": "2",
			"numero_conta_destino": "1",
			"valor": 200
		}
	]
}


## Demonstração

#### Essa é a visualização dos end-points pelo Insomnia. 

[![end-points.png](https://i.postimg.cc/bwGL12D2/end-points.png)](https://postimg.cc/HrgQgntp)

#### O GET "Listar Contas" irá retornar os dados do Banco e todas as contas cadastradas e suas respectivas informções.

[![lista-contas.png](https://i.postimg.cc/7LGcPWMd/lista-contas.png)](https://postimg.cc/06vZcZ40)

#### Não esqueça de inserir a **senha**. Ela pode ser passada pelo query conforme imagem.

[![senha.png](https://i.postimg.cc/tCqMnTNh/senha.png)](https://postimg.cc/F16Z2hqR)

#### Exemplo de dados que podem ser atualizados.

[![atualizar-conta.png](https://i.postimg.cc/mk8VyYy7/atualizar-conta.png)](https://postimg.cc/JHHb1Bgh)

#### Exemplo de extrato bancário.

[![extrato.png](https://i.postimg.cc/RZzxY97h/extrato.png)](https://postimg.cc/JGKFyfdC)

## Autores

- [Rafael Franco](https://www.linkedin.com/in/rafa-franco/)
- [@rfrancodev](https://github.com/rfrancodev)


## Stack utilizada


**Back-end:** Javascript, Node, Express, Insomnia


## Melhorias

Implantação de banco de dados para armazenar as informacões.


## Contribuindo

Contribuições são sempre bem-vindas!

Veja `contribuindo.md` para saber como começar.

Por favor, siga o `código de conduta` desse projeto.


## Feedback

Se você tiver algum feedback, por favor nos deixe saber por meio de francorfs@hotmail.com
