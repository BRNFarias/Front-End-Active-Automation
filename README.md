# Front‑End – Active Directory Automation

Interface web estática para gerenciar usuários no Active Directory via API — pensada pra consumir o back‑end da automação e prover um painel simples e funcional.

---

## Funcionalidades

- Login com credenciais do AD (`usuario@dominio.local`)
- Dashboard de usuários: exibe lista de usuários com Nome, CPF e Status.
- Criação manual de usuário via formulário.
- Exclusão de usuário.
- Upload em massa via planilha `.xlsx`, para criação/atualização de usuários.

---

## Tecnologias usadas

- HTML5
- CSS3
- JavaScript puro (vanilla)

---

## Como usar este front‑end

### Pré‑requisito
O back‑end da API (contêiner Docker com a automação AD) deve estar rodando na porta 8000 (ou no endereço configurado no JS).

### Executando localmente (modo teste)
1. Clone o repositório.
2. Abra o arquivo `index.html` no navegador — não precisa de servidor, o front é estático.
3. Como a API permite CORS para origem `null`, os requests devem funcionar direto.

### Servindo por servidor HTTP (IIS / Apache / Nginx)
- Aponte o diretório raiz para a pasta do front.
- Se for usar HTTPS, gere/configure certificado e libere portas (80/443).
- Caso o domínio mude, atualize a origem permitida no back-end e reconstrua o contêiner.

---

## Estrutura de pastas

```
Front-End-Active-Automation/
├── index.html
├── cadastro.html
├── novo-usuario.html
├── arquivo.html
├── assets/     → logos, imagens etc
├── css/        → folhas de estilo
└── js/         → scripts de comunicação com a API
```

---

## Dependências da API

O front‑end depende de rotas e estrutura da API. Para funcionar corretamente, o back‑end deve expor endpoints como:

- `/auth/login`
- `/users`
- `/users/{id}`
- `/jobs/upload`

(Conforme especificado no repositório da API.)

---

## Sobre

Projeto de painel de gestão de usuários via Active Directory + Automação, criado como interface web leve & estática, ideal para ser combinada com um back‑end em Docker/FastAPI.

---

## Autor

Breno Rodrigues de Farias
