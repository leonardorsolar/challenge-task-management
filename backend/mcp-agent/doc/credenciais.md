GITHUBClaro! Aqui está um **tutorial passo a passo** para obter as três variáveis de ambiente necessárias para o seu projeto MCP com criação de issues no GitHub:

---

## ✅ **1. Como obter o `GITHUB_TOKEN`**

Esse token permite que seu agente MCP interaja com a API do GitHub (como criar uma issue).
Você vai criar um **Personal Access Token (classic)** com permissões mínimas.

### Passos:

1. Acesse [https://github.com/settings/tokens](https://github.com/settings/tokens)
2. Clique em **"Generate new token" > "Generate new token (classic)"**
3. Preencha:

   * **Note**: `Token MCP` (ou qualquer nome)
   * **Expiration**: escolha uma validade (ex: 30 dias)
4. Em **Scopes (permissões)**, selecione:

   * `repo` → acesso completo a repositórios (ou só `public_repo` se for público)
5. Clique em **Generate token**
6. Copie o token e salve com segurança — **não será exibido novamente!**

Você obterá algo como:

```bash
GITHUB_TOKEN=ghp_abcdEfghIJKLmnopQRSTuvwxYZ1234567890
```

---

## ✅ **2. Como obter o `GITHUB_OWNER`**

Esse é o **nome do usuário ou organização** onde está o repositório.

### Como descobrir:

* Se seu repositório for:
  `https://github.com/leonardo/task-bot`,
  então:

```bash
GITHUB_OWNER=leonardo
```

* Se for um repositório de uma organização:
  `https://github.com/sua-empresa/task-bot`
  então:

```bash
GITHUB_OWNER=sua-empresa
```

---

## ✅ **3. Como obter o `GITHUB_REPO`**

É simplesmente o **nome do repositório** que vai receber as issues.

Exemplo:

* Para o repositório `https://github.com/leonardo/task-bot`, use:

```bash
GITHUB_REPO=task-bot
```

---

## ✅ **Resumo: `.env`**

Monte o seu `.env` assim:

```
GITHUB_TOKEN=ghp_abcdEfghIJKLmnopQRSTuvwxYZ1234567890
GITHUB_OWNER=leonardo
GITHUB_REPO=task-bot
```

---

Se quiser, posso montar também um exemplo real com `.env`, `.gitignore` e `.env.example`.

Deseja isso também?
