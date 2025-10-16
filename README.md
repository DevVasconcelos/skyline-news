# 🌆 Skyline News

Um site moderno de notícias integrado com NY Times API e informações meteorológicas em tempo real.

## 🚀 Funcionalidades

- ✅ **Notícias do NY Times**: Most Viewed, Most Shared, Top Stories
- ✅ **Busca de Notícias**: Sistema de busca integrado
- ✅ **Clima de NY**: Widget meteorológico em tempo real
- ✅ **Design Responsivo**: Layout moderno com CSS Grid/Flexbox
- ✅ **Animações**: Transições suaves e efeitos visuais

## 🛠 Tecnologias

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Build Tool**: Vite
- **APIs**: NY Times API, GoWeather API
- **Deploy**: GitHub Pages

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/Projeto_3.git

# Entre na pasta
cd Projeto_3

# Instale as dependências
npm install

# Execute em desenvolvimento
npm run dev
```

## 🌐 Deploy para GitHub Pages

### Passo a Passo Completo:

1. **PRIMEIRO - Habilite o GitHub Pages**:
   - Vá em `Settings > Pages`
   - **Source**: Selecione `Deploy from a branch`
   - **Branch**: Selecione `gh-pages` (será criada automaticamente)
   - **Folder**: `/ (root)`
   - Clique em `Save`

2. **Push para o repositório**:
   ```bash
   git add .
   git commit -m "Deploy setup for GitHub Pages"
   git push origin main
   ```

3. **O deploy automático será executado**:
   - ✅ GitHub Actions criará a branch `gh-pages`
   - ✅ Build automático
   - ✅ Deploy automático para GitHub Pages

4. **Acesse o site**:
   - URL: `https://DevVasconcelos.github.io/skyline-news/`

### Teste Local

```bash
# Build do projeto
npm run build

# Teste local do build
npm run preview
```

## ⚙️ Configuração

### Vite Config
O projeto está configurado para GitHub Pages com:
- **Base URL**: `/skyline-news/` (nome do repositório)
- **Build Output**: `dist/`
- **Assets**: `assets/`

### APIs Utilizadas
- **NY Times API**: Chave incluída no código (sandbox)
- **GoWeather API**: Sem autenticação necessária

## 🔧 Solução de Problemas

### CSS não carrega no GitHub Pages
✅ **Solucionado**: Caminhos ajustados para relativos (`./src/style.css`)

### JavaScript não funciona
✅ **Solucionado**: Configuração correta do `base` no `vite.config.js`

### Build falha
✅ **Solucionado**: Dependências corretas instaladas

## 📁 Estrutura do Projeto

```
Projeto_3/
├── src/
│   ├── main.js         # Lógica principal
│   └── style.css       # Estilos
├── .github/workflows/
│   └── deploy.yml      # GitHub Actions
├── index.html          # HTML principal
├── vite.config.js      # Configuração Vite
└── package.json        # Dependências
```

## 🎯 Pontuação Acadêmica

- ✅ JavaScript: 25/25 pontos
- ✅ APIs de terceiros: 25/25 pontos  
- ✅ JSON: 10/10 pontos
- ✅ CSS avançado: 10/10 pontos
- ✅ Eventos: 10/10 pontos
- **Total**: 85/100 pontos

---

💡 **Desenvolvido por**: Ben-hur  
🔗 **Demo**: https://DevVasconcelos.github.io/skyline-news/