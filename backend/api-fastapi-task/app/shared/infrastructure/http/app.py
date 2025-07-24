from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.shared.infrastructure.http.api.v1 import api_v1_router

app = FastAPI()

# CORS - Liberação de acesso para o frontend
origins = [
    "http://localhost:5173", # Vite
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Rota raiz
@app.get("/")
def root():
    return {"message": "API está no ar! Acesse /api/v1 para acessar as rotas e os endpoints."}


# Montar a versão da API
app.include_router(api_v1_router, prefix="/api/v1")