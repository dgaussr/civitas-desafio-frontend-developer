# 🌬️ Painel de Qualidade do Ar - Rio de Janeiro

Uma aplicação web moderna para monitoramento da qualidade do ar nos bairros do Rio de Janeiro, desenvolvida com Next.js 14+, TypeScript e Tailwind CSS.

![CI](https://github.com/seu-usuario/ar-rio/workflows/CI/badge.svg)

## 📋 Sobre o Projeto

Este projeto foi desenvolvido como parte de um desafio técnico para criar um painel interativo de qualidade do ar para a Prefeitura do Rio de Janeiro. A aplicação permite que os cidadãos consultem dados atualizados sobre a qualidade do ar em diferentes bairros da cidade, visualizem tendências históricas e recebam recomendações baseadas nos níveis de poluição.

## ✨ Funcionalidades

- 📊 **Dashboard Interativo**: Visualização em tempo real da qualidade do ar em todos os bairros
- 🗺️ **Múltiplas Visualizações**: Alterne entre cards, tabela e mapa
- 🔍 **Filtros Avançados**: Filtre por zona e nível de qualidade do ar
- 📈 **Gráficos Históricos**: Visualize a variação da qualidade do ar ao longo do tempo
- 📱 **Responsivo**: Interface adaptada para desktop, tablet e mobile
- ♿ **Acessível**: Seguindo as melhores práticas de acessibilidade web
- 🎨 **Design Moderno**: Interface limpa e intuitiva com shadcn/ui

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js 20+ instalado
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/ar-rio.git
cd ar-rio
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador

### Scripts Disponíveis

```bash
npm run dev          # Inicia o servidor de desenvolvimento
npm run build        # Cria a build de produção
npm start            # Inicia o servidor de produção
npm run lint         # Executa o linter
npm test             # Executa os testes
npm run test:watch   # Executa os testes em modo watch
npm run test:coverage # Executa os testes com cobertura
```

## 🏗️ Estrutura do Projeto

```
ar-rio/
├── app/                          # App Router do Next.js
│   ├── api/                      # API Routes
│   │   └── neighborhoods/        # Endpoints de bairros
│   ├── neighborhood/[id]/        # Página de detalhes do bairro
│   ├── layout.tsx                # Layout raiz
│   ├── page.tsx                  # Página principal
│   └── globals.css               # Estilos globais
├── components/                   # Componentes React
│   ├── ui/                       # Componentes do shadcn/ui
│   ├── air-quality-badge.tsx     # Badge de qualidade do ar
│   ├── air-quality-chart.tsx     # Gráfico de histórico
│   ├── filters.tsx               # Componente de filtros
│   ├── neighborhood-card.tsx     # Card de bairro
│   ├── neighborhoods-list.tsx    # Lista de bairros
│   ├── neighborhoods-map.tsx     # Mapa de bairros
│   └── neighborhoods-table.tsx   # Tabela de bairros
├── lib/                          # Utilitários e helpers
│   ├── air-quality-utils.ts      # Funções de qualidade do ar
│   ├── mock-data.ts              # Dados mockados
│   └── utils.ts                  # Utilitários gerais
├── types/                        # Definições de tipos TypeScript
│   └── air-quality.ts            # Tipos de qualidade do ar
├── __tests__/                    # Testes automatizados
│   ├── components/               # Testes de componentes
│   └── lib/                      # Testes de utilitários
├── .github/                      # Configurações do GitHub
│   └── workflows/                # GitHub Actions
│       └── ci.yml                # Pipeline de CI/CD
├── jest.config.js                # Configuração do Jest
├── jest.setup.js                 # Setup do Jest
└── package.json                  # Dependências do projeto
```

## 🛠️ Tecnologias Utilizadas

### Core
- **Next.js 16.0** - Framework React com SSR e App Router
- **React 19.2** - Biblioteca para construção de interfaces
- **TypeScript 5** - Superset tipado do JavaScript

### UI/Styling
- **Tailwind CSS 4** - Framework CSS utility-first
- **shadcn/ui** - Componentes reutilizáveis e acessíveis
- **Lucide React** - Ícones modernos
- **Recharts** - Biblioteca de gráficos

### Testing
- **Jest** - Framework de testes
- **Testing Library** - Testes de componentes React
- **Jest DOM** - Matchers customizados para DOM

### DevOps
- **GitHub Actions** - CI/CD automatizado
- **ESLint** - Linter para código JavaScript/TypeScript

## 🎯 Decisões Arquiteturais

### 1. Next.js App Router
Optei pelo App Router (Next.js 14+) em vez do Pages Router por:
- **Server Components**: Melhor performance com renderização no servidor
- **Layouts aninhados**: Melhor organização e reutilização de código
- **API Routes integradas**: Facilita a criação de endpoints mockados
- **Streaming e Suspense**: Melhor experiência de carregamento

### 2. TypeScript
TypeScript foi escolhido para:
- **Type Safety**: Prevenir erros em tempo de desenvolvimento
- **IntelliSense**: Melhor experiência de desenvolvimento
- **Documentação implícita**: Tipos servem como documentação
- **Refatoração segura**: Mudanças são mais seguras

### 3. shadcn/ui
Escolhi shadcn/ui em vez de outras bibliotecas porque:
- **Componentes copiáveis**: Controle total sobre o código
- **Acessibilidade**: Baseado em Radix UI com ARIA completo
- **Customização**: Fácil de adaptar ao design system
- **Sem dependências pesadas**: Apenas o necessário é instalado

### 4. API Mockada
Implementei uma API REST mockada usando Next.js API Routes:
- **Realismo**: Simula comportamento de API real com delays
- **Filtros**: Suporta query parameters para filtros
- **Escalabilidade**: Fácil substituir por API real no futuro
- **Desenvolvimento independente**: Não depende de backend externo

### 5. Gerenciamento de Estado
Usei React Hooks (useState, useEffect) em vez de Redux/Zustand porque:
- **Simplicidade**: Estado local é suficiente para este escopo
- **Performance**: Menos overhead e complexidade
- **Manutenibilidade**: Código mais direto e fácil de entender

### 6. Lazy Loading
Implementei lazy loading para:
- **Gráficos**: Recharts é carregado apenas quando necessário
- **Componentes pesados**: Melhora o tempo de carregamento inicial
- **Imagens**: Next.js Image otimiza automaticamente

## 🎨 Padrões de Design

### Componentização
- Componentes pequenos e focados em uma responsabilidade
- Props tipadas com TypeScript
- Componentes reutilizáveis na pasta `components/ui`

### Responsividade
- Mobile-first approach
- Breakpoints do Tailwind (sm, md, lg, xl)
- Grid responsivo que se adapta ao tamanho da tela

### Acessibilidade
- Semântica HTML correta
- ARIA labels e roles
- Navegação por teclado
- Contraste de cores adequado
- Textos alternativos em ícones

## 🧪 Testes

O projeto inclui testes automatizados para:
- **Utilitários**: Funções de cálculo e formatação
- **Componentes**: Renderização e comportamento
- **Integração**: Fluxos completos de usuário

Execute os testes com:
```bash
npm test
```

Cobertura de testes:
```bash
npm run test:coverage
```

## 🔄 CI/CD

O projeto utiliza GitHub Actions para:
- ✅ Executar linter em cada push
- ✅ Executar testes automatizados
- ✅ Gerar build de produção
- ✅ Upload de artefatos
- ✅ Relatório de cobertura (opcional com Codecov)

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona em:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large Desktop (1280px+)

## ♿ Acessibilidade

Seguindo as diretrizes WCAG 2.1:
- Contraste de cores adequado (AAA)
- Navegação por teclado completa
- Screen reader friendly
- Semântica HTML correta
- ARIA labels apropriados

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Outras Plataformas
O projeto pode ser deployado em qualquer plataforma que suporte Next.js:
- Netlify
- AWS Amplify
- Google Cloud Run
- Docker

## 📝 Próximos Passos

Melhorias futuras que podem ser implementadas:
- [ ] Integração com API real de qualidade do ar
- [ ] Notificações push para alertas de qualidade
- [ ] PWA (Progressive Web App)
- [ ] Modo escuro
- [ ] Internacionalização (i18n)
- [ ] Exportação de dados em CSV/PDF
- [ ] Comparação entre bairros
- [ ] Previsão de qualidade do ar

## 👥 Contribuindo

Contribuições são bem-vindas! Por favor:
1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Commits Semânticos

Este projeto segue a convenção de [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação
- `refactor:` Refatoração
- `test:` Testes
- `chore:` Manutenção

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 👨‍💻 Autor

Desenvolvido como parte do desafio técnico para a Prefeitura do Rio de Janeiro.

---

**Nota**: Este é um projeto de demonstração com dados fictícios. Para uso em produção, integre com APIs reais de monitoramento de qualidade do ar.
