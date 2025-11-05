# Painel de Gestão do Active Directory (Front-End)

Este projeto é a interface de **front-end (HTML, CSS, JavaScript)** para a API de Automação do Active Directory. Ele fornece um painel web para gerir o ciclo de vida dos utilizadores, substituindo a necessidade de administrar o AD manualmente.

Esta interface comunica diretamente com o projeto de back-end (API em Docker).

---

## 🌟 Funcionalidades

- **Login Seguro:** Autenticação via `/auth/login` usando `usuario@dominio.local`.
- **Dashboard de Utilizadores:** Lista de usuários via `/users`, mostrando Nome, CPF e Status.
- **Criação Individual:** Formulário para criar novos usuários via `/users`.
- **Exclusão de Utilizador:** Remove usuários via `/users/{username}`.
- **Upload em Massa:** Envio de planilhas `.xlsx` para criação/atualização em lote via `/jobs/upload`.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5**
- **CSS3**
- **JavaScript (Puro)**

---

## 🚀 Como Executar este Front-End

Este projeto é **estático**, portanto **não precisa** de `npm install` ou `npm start`.

### 1. Pré-requisito: Back-End

O front depende da API de Automação do Active Directory estar rodando no Docker.

Back-end acessível em:

http://localhost:8000

### 2. Executando Localmente (Tests)

1. Clone o repositório.  
2. Abra o arquivo `index.html` no navegador.

O CORS do back-end já aceita origem `null`, então funciona abrindo direto no navegador.

### 3. Executando no IIS (Windows Server)

1. No **IIS Manager**, crie um novo site (ex: `SENAI Frontend`).  
2. Defina o *Physical Path* para a pasta do projeto (ex: `C:\sites\senai-frontend`).  
3. Configure *Bindings* para **HTTP (80)** e **HTTPS (443)**.  
4. Gere um certificado *Self-Signed* e associe à porta 443.  
5. Libere as portas 80 e 443 no Firewall do Windows.  
6. No back-end, adicione seu domínio (ex: `https://seu-servidor.local`) na lista de *allowed origins* do `main.py`, depois reconstrua a imagem Docker.

---
