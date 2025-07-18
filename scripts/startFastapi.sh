#!/bin/bash

FASTAPI_DIR="$(pwd)/backend/api-fastapi"
VENV_DIR="$FASTAPI_DIR/venv"

cd "$FASTAPI_DIR" || exit

# Verifica se o venv existe
if [ ! -f "$VENV_DIR/bin/activate" ]; then
  echo "⚙️ Ambiente virtual não encontrado. Criando..."
  python3 -m venv venv
  source venv/bin/activate
  pip install -r requirements.txt
else
  echo "✅ Ambiente virtual encontrado."
  source "$VENV_DIR/bin/activate"
fi

uvicorn app.main:app --reload
