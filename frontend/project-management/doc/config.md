Para criar um projeto **React** com **Vite**, siga este passo a passo simples:

---

### ✅ **Pré-requisitos**

- Node.js instalado (versão 20+ recomendada)
  👉 [https://nodejs.org/](https://nodejs.org/)

---

### 🚀 **Passos para criar o projeto**

1. **Abra o terminal e execute:**

```bash
npm create vite@latest nome-do-projeto -- --template react
```

> Substitua `nome-do-projeto` pelo nome desejado.

---

2. **Acesse a pasta do projeto:**

```bash
cd nome-do-projeto
```

---

3. **Instale as dependências:**

```bash
npm install
```

---

4. **Execute o projeto:**

```bash
npm run dev
```

> O Vite iniciará um servidor local geralmente em `http://localhost:5173`.

---

### 🛠️ Estrutura básica do projeto

```
nome-do-projeto/
├── public/
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── main.jsx
├── index.html
├── package.json
├── vite.config.js
```

5. **Configurar tailwindcss :**

```bash
https://tailwindcss.com/docs/installation/using-vite
```

6. **instalar lucide-react:**

Para instalar o pacote `lucide-react` (ícones no estilo outline SVG para React), use o seguinte comando no terminal dentro do seu projeto React:

```bash
npm install lucide-react
```

Ou, se estiver usando Yarn:

```bash
yarn add lucide-react
```

---

### ✅ Após instalar, você pode usar assim:

```jsx
import { Plus, Trash2 } from "lucide-react";
```

Esses ícones são componentes SVG com suporte a `size`, `color`, `strokeWidth`, etc.
