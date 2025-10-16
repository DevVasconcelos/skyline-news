#!/bin/bash

# Script para deploy manual local (opcional)
echo "🚀 Iniciando deploy para GitHub Pages..."

# Build do projeto
echo "📦 Fazendo build..."
npm run build

# Verificar se a pasta dist existe
if [ ! -d "dist" ]; then
    echo "❌ Erro: Pasta dist não encontrada!"
    exit 1
fi

echo "✅ Build concluído com sucesso!"
echo "📄 Arquivos gerados:"
ls -la dist/

echo ""
echo "🌐 Para deploy automático:"
echo "1. Configure GitHub Pages em Settings > Pages"
echo "2. Selecione 'Deploy from a branch' > 'gh-pages'"
echo "3. Faça push deste commit"
echo "4. O GitHub Actions fará o deploy automaticamente"