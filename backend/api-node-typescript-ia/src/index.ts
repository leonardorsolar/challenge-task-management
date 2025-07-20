import app from "./shared/infrastructure/http/app";

const PORT = 4000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
