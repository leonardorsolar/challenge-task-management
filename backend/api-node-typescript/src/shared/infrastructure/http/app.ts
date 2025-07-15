import express, { Request, Response } from "express";

// Carrega variáveis de ambiente

const app = express();

const apiKey = process.env.OPENAI_API_KEY;

// Middleware para analisar corpos JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Jumpad online!!!");
});

export default app;
