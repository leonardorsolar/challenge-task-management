# problema 01:

Aí está o problema:

👉 **Você está usando `vite@7.0.6`**, mas **essa versão do Vite não é estável** — ela é experimental e ainda não foi oficialmente lançada como versão final no momento desta resposta (julho de 2025).

O erro `crypto.hash is not a function` **está vindo da Vite 7**, que aparentemente está tentando usar uma função inexistente (`crypto.hash`) — provavelmente parte de testes internos ou APIs do futuro.

---

### ✅ Solução: Rebaixar para uma versão estável (Vite 5)

Vamos resolver isso **voltando para uma versão estável do Vite**.

---

### 🔧 Passo a passo para corrigir

1. **Apague os arquivos de lock e dependências**:

```bash
rm -rf node_modules package-lock.json
```

2. **Instale a versão estável do Vite (ex: `vite@5`)**:

```bash
npm install vite@5 @vitejs/plugin-react@3 --save-dev
```

> ⚠️ O `@vitejs/plugin-react@4.7.0` que você tem agora é compatível com Vite 7, então precisamos voltar ele também para a versão compatível com Vite 5 (`@vitejs/plugin-react@3`).

3. **Instale o restante normalmente**:

```bash
npm install
```

4. **Rode o servidor novamente**:

```bash
npm run dev
```

---

### ✅ Resultado esperado

Com Vite 5 e seus plugins compatíveis, o erro `crypto.hash is not a function` **deve desaparecer**.

---

### (Opcional) Verificar as versões após o downgrade

```bash
npm ls vite
```

Esperado:

```
vite@5.x.x
@vitejs/plugin-react@3.x.x
```

---

Esse erro `ERESOLVE unable to resolve dependency tree` acontece porque o `npm` está sendo rígido com as **versões declaradas como compatíveis**, e o plugin `@vitejs/plugin-react@3.1.0` quer usar `vite@^4.1.0-beta.0`, e não reconhece `vite@5.4.19` como compatível (mesmo funcionando na prática).

---

### ✅ Soluções seguras

#### 🔹 **Opção 1: Instalar com `--legacy-peer-deps`** (recomendado)

Esse é o jeito mais simples e seguro para projetos como o seu:

```bash
npm install vite@5 @vitejs/plugin-react@3 --save-dev --legacy-peer-deps
```

> Isso ignora a checagem rígida de dependências que foi introduzida no `npm 7+`.

---

#### 🔹 **Opção 2: Forçar a instalação** (menos recomendado)

```bash
npm install vite@5 @vitejs/plugin-react@3 --save-dev --force
```

> Usa força bruta para instalar mesmo com conflito. Só use se `--legacy-peer-deps` não funcionar.

---

### ✅ Após isso

1. **Instale tudo novamente** (caso não tenha feito):

```bash
npm install
```

2. **Execute o projeto:**

```bash
npm run dev
```

---

### 🔍 Verifique as versões instaladas

Depois, confira:

```bash
npm ls vite @vitejs/plugin-react
```

Deve mostrar algo como:

```
vite@5.4.x
@vitejs/plugin-react@3.1.x
```

Se ainda travar ou quiser que eu revise seu `package.json`, cole aqui e eu ajusto para você.
