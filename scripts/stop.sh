#!/bin/bash
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PID_FILE="$ROOT_DIR/.pids"

if [ ! -f "$PID_FILE" ]; then
  echo "❌ Arquivo .pids não encontrado. Nenhum processo para parar."
  exit 1
fi

echo "🛑 Encerrando serviços..."

while read -r pid; do
  if kill -0 "$pid" 2>/dev/null; then
    echo "Tentando encerrar processo PID $pid..."
    kill "$pid"
    sleep 3
    if kill -0 "$pid" 2>/dev/null; then
      echo "PID $pid não terminou, forçando encerramento..."
      kill -9 "$pid"
      sleep 1
      if kill -0 "$pid" 2>/dev/null; then
        echo "⚠️ Não foi possível encerrar o processo PID $pid."
      else
        echo "✅ Processo PID $pid forçado a encerrar."
      fi
    else
      echo "✅ Processo PID $pid encerrado."
    fi
  else
    echo "⚠️ Processo PID $pid não está em execução."
  fi
done < "$PID_FILE"

rm "$PID_FILE"
echo "🧹 Limpeza feita. Todos os serviços foram encerrados."
