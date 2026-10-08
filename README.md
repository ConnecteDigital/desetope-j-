# DesentopeJÁ Hidráulica 24h — site

Site estático (HTML + CSS + JS puro) da desentupidora DesentopeJÁ, focado em SEO local no **ABC Paulista**.

## Estrutura

```
src/data.js     ← TEXTOS, telefone, domínio, serviços, cidades e depoimentos (edite aqui)
src/icons.js    ← ícones SVG e logo
src/build.js    ← gerador das páginas
public/         ← SITE PRONTO (é esta pasta que vai para a hospedagem)
```

## Páginas geradas

| Página | URL |
|---|---|
| Início | `/` |
| Serviços (hub) | `/servicos/` |
| Desentupimento de pia | `/desentupimento-de-pia/` |
| Desentupimento de ralo | `/desentupimento-de-ralo/` |
| Desentupimento de vaso sanitário | `/desentupimento-de-vaso-sanitario/` |
| Desentupimento de esgoto | `/desentupimento-de-esgoto/` |
| Encanador 24h | `/encanador/` |
| Áreas atendidas (hub) | `/areas-atendidas/` |
| Santo André | `/desentupidora-santo-andre/` |
| São Bernardo do Campo | `/desentupidora-sao-bernardo-do-campo/` |
| São Caetano do Sul | `/desentupidora-sao-caetano-do-sul/` |
| Diadema | `/desentupidora-diadema/` |
| Mauá | `/desentupidora-maua/` |
| Ribeirão Pires | `/desentupidora-ribeirao-pires/` |
| Rio Grande da Serra | `/desentupidora-rio-grande-da-serra/` |
| Sobre / Contato / 404 | `/sobre/`, `/contato/`, `/404.html` |

Além de `sitemap.xml` e `robots.txt`.

## SEO incluído

- `<title>` e meta description únicos por página, URL canônica, Open Graph
- Dados estruturados (schema.org): `Plumber` (LocalBusiness 24h com as 7 cidades), `Service`, `FAQPage`, `BreadcrumbList`
- Conteúdo próprio por serviço (sinais, causas, como fazemos, prevenção, FAQ) e por cidade (texto local, bairros, mapa, FAQ)
- Links internos entre todos os serviços e cidades (menu, rodapé, cards)
- Mobile-first, imagens em WebP com `lazy-loading`, sem frameworks (carrega rápido)

## Como editar e gerar

1. Edite `src/data.js` (domínio em `site.url`, telefone, textos, depoimentos…)
2. Rode `npm run build` (precisa de Node.js 18+)
3. Visualize com `npm start` e abra http://localhost:3000
4. Publique o conteúdo da pasta `public/` (Hostinger, Vercel, Netlify, GitHub Pages…)

## Antes de publicar

- [ ] Trocar `site.url` em `src/data.js` pelo domínio real e rodar `npm run build`
- [ ] Substituir os depoimentos de exemplo por avaliações reais de clientes
- [ ] Preencher `cnpj` e `instagram` em `src/data.js` (se vazios, ficam ocultos)
- [ ] Trocar as fotos em `public/assets/img/` por fotos reais da equipe/serviços (mesmo nome de arquivo)
- [ ] Cadastrar o site no Google Search Console e enviar o `sitemap.xml`
- [ ] Criar/vincular o Perfil da Empresa no Google (Google Meu Negócio)
