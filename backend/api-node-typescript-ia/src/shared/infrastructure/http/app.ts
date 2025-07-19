import * as dotenv from "dotenv";

import express, { Request, Response } from "express";
import cors from "cors";
//import { pool, initializeDB } from "../database/postgress" // Importa a função de inicialização
import v1Router from "./api/v1";

import { SqliteConnectionAdapter } from "../database/SqliteConnectionAdapter";

// Carrega variáveis de ambiente

const app = express();

const apiKey = process.env.OPENAI_API_KEY;

//console.log(apiKey);

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173", // <-- ADICIONE ESTA LINHA politica do cors
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
  //origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(options));
// Middleware para analisar corpos JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Jumpad online!!!");
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "node-server",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.use("/api/v1", v1Router);

// Inicializa tabelas ANTES de exportar app
(async () => {
  try {
    const connection = SqliteConnectionAdapter.getInstance();
    await connection.createTablesDB();
    console.log("Tabelas verificadas/criadas com sucesso");
  } catch (error) {
    console.error("Erro ao criar tabelas:", error);
  }
})();

export default app;
