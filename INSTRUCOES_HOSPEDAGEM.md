# ELYA - Site Profissional
## Instruções de Hospedagem e Uso

### 📦 Conteúdo do Pacote

Este arquivo contém o site completo da ELYA, pronto para publicação:

- **9 Páginas HTML**: Home, Quem Somos, Como Funciona, Serviços, Planos, Contato, FAQ, Depoimentos, Blog
- **CSS**: Sistema de design completo com animações e responsividade
- **JavaScript**: Interatividade e funcionalidades
- **Imagens e Ícones**: favicon.svg e assets visuais
- **Servidor Node.js**: server.js para URLs sem extensão .html

---

## 🚀 Opções de Hospedagem

### Opção 1: Hospedagem Gratuita (GitHub Pages)

1. Crie uma conta no GitHub (se não tiver): https://github.com
2. Crie um novo repositório chamado `elya-site`
3. Faça upload de todos os arquivos HTML, CSS, JS, imagens e favicon.svg
4. Vá em Settings → Pages
5. Selecione a branch `main` e pasta `/root`
6. Clique em Save
7. Seu site estará disponível em: `https://seu-usuario.github.io/elya-site`

**Limitação**: GitHub Pages não suporta o server.js (URLs sem .html). Os links precisarão incluir `.html`.

---

### Opção 2: Netlify (Recomendado - Gratuito)

1. Acesse: https://www.netlify.com
2. Faça login com GitHub ou email
3. Arraste a pasta completa do site para a área de upload
4. Aguarde o deploy automático
5. Configure domínio personalizado (opcional)

**Vantagens**: 
- Suporta redirecionamento automático
- HTTPS gratuito
- Deploy em segundos
- Domínio personalizado gratuito

Para usar URLs sem .html no Netlify, crie um arquivo `netlify.toml`:

```toml
[[redirects]]
  from = "/*"
  to = "/:splat.html"
  status = 200
  force = false
```

---

### Opção 3: Vercel (Gratuito)

1. Acesse: https://vercel.com
2. Faça login
3. Click em "New Project"
4. Faça upload da pasta do site
5. Deploy automático

**Vantagens**: Mesmas do Netlify + integração perfeita com Node.js (server.js funciona automaticamente)

---

### Opção 4: Hospedagem Tradicional (cPanel)

Se você já tem uma hospedagem web:

1. Acesse o painel cPanel
2. Vá em "Gerenciador de Arquivos"
3. Navegue até `public_html`
4. Faça upload de todos os arquivos
5. Configure .htaccess para URLs sem .html:

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^([^\.]+)$ $1.html [NC,L]
```

---

### Opção 5: Servidor Local (Desenvolvimento/Teste)

#### Com Node.js:
```bash
node server.js
```
Acesse: http://localhost:8001

#### Com Python:
```bash
python3 -m http.server 8000
```
Acesse: http://localhost:8000
(Nota: URLs sem .html NÃO funcionarão com Python HTTP Server)

---

## 📝 Configurações Importantes

### WhatsApp
- Número configurado: **(11) 91338-1160**
- Mensagem pré-preenchida: "Olá! Conheci a ELYA pelo site e gostaria de receber um diagnóstico gratuito para meu negócio."

### Formulário de Contato
- Configurado com Formspree
- Email de destino: **contato@elya.com.br** (atualize no contato.html se necessário)

### Domínio Personalizado
Após escolher sua hospedagem, você pode configurar um domínio próprio como:
- www.elya.com.br
- elya.com.br

Consulte a documentação da plataforma escolhida para configurar DNS.

---

## ✅ Checklist Pré-Publicação

- [ ] Atualizar email do Formspree em contato.html (se necessário)
- [ ] Verificar número de WhatsApp em todas as páginas
- [ ] Testar todos os links de navegação
- [ ] Testar formulário de contato
- [ ] Verificar responsividade em mobile
- [ ] Configurar domínio personalizado (opcional)
- [ ] Adicionar Google Analytics (opcional)

---

## 🆘 Suporte

Em caso de dúvidas sobre hospedagem ou personalização:

- **Netlify**: https://docs.netlify.com
- **Vercel**: https://vercel.com/docs
- **GitHub Pages**: https://docs.github.com/pages

---

## 📊 Estrutura de Arquivos

```
site-elya/
├── index.html              # Página inicial
├── quem-somos.html        # Sobre a ELYA
├── como-funciona.html     # Processo de trabalho
├── servicos.html          # Serviços oferecidos
├── planos.html            # Planos e preços
├── contato.html           # Formulário de contato
├── faq.html               # Perguntas frequentes
├── depoimentos.html       # Depoimentos de clientes
├── blog.html              # Blog/Artigos
├── favicon.svg            # Ícone do site
├── server.js              # Servidor Node.js (opcional)
├── css/
│   └── style.css          # Estilos principais
├── js/
│   └── script.js          # JavaScript (se houver)
├── images/                # Imagens do site
└── assets/                # Assets diversos
```

---

**Site desenvolvido com HTML5, CSS3 e JavaScript puro. Otimizado para SEO, performance e acessibilidade.**

Boa sorte com a ELYA! 🚀
