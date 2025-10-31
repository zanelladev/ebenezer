# Summary of Resource Constants

Este documento lista todos os recursos (resources) criados para centralizar as strings estáticas do projeto em português.

## 📁 Arquivo Central
**Localização**: `src/lib/resources.ts`

## 📋 Recursos Disponíveis

### 1. **CommonResources**
Recursos compartilhados em múltiplas telas.

**Seções**:
- `navigation` - Links de navegação (Início, Sobre, Eventos, Blog, Doar, Admin, Entrar)
- `actions` - Ações comuns (Salvar, Cancelar, Excluir, Editar, Criar, Voltar, etc.)
- `validation` - Mensagens de validação
- `common` - Palavras comuns (Bem-vindo, ou, e, Por, às, em, opcional)

**Uso**:
```typescript
import { CommonResources } from '@/lib/resources';

// Exemplo
<button>{CommonResources.actions.save}</button>
<a href="/about">{CommonResources.navigation.about}</a>
```

---

### 2. **HomeResources**
Recursos da página inicial.

**Seções**:
- `hero` - Seção hero (título, subtítulo, descrição, CTAs)
- `about` - Seção sobre a comunidade
- `events` - Seção de eventos próximos
- `blog` - Seção de posts do blog
- `cta` - Call to action final

**Páginas que usam**: `src/app/page.tsx`, `src/components/home/Hero.tsx`

---

### 3. **AboutResources**
Recursos da página Sobre.

**Seções**:
- `title`, `subtitle` - Títulos principais
- `mission` - Nossa missão
- `vision` - Nossa visão
- `values` - Nossos valores (array com 4 itens)
- `history` - Nossa história
- `leadership` - Liderança

**Páginas que usam**: `src/app/about/page.tsx`

---

### 4. **EventsResources**
Recursos da página de Eventos.

**Seções**:
- `title`, `subtitle` - Títulos principais
- `upcoming` - Próximos eventos
- `past` - Eventos anteriores
- `detail` - Página de detalhes do evento

**Páginas que usam**: `src/app/events/page.tsx`, `src/app/events/[id]/page.tsx`

---

### 5. **BlogResources**
Recursos da página de Blog.

**Seções**:
- `title`, `subtitle` - Títulos principais
- `empty` - Mensagem quando não há posts
- `detail` - Página de detalhes do post

**Páginas que usam**: `src/app/blog/page.tsx`, `src/app/blog/[id]/page.tsx`

---

### 6. **DonateResources**
Recursos da página de Doações.

**Seções**:
- `title`, `subtitle` - Títulos principais
- `introduction` - Introdução sobre doações
- `why` - Por que doar (array com 3 itens)
- `methods` - Métodos de doação (PIX, banco, presencial)
- `impact` - Impacto das doações
- `thanks` - Agradecimento

**Páginas que usam**: `src/app/donate/page.tsx`

---

### 7. **LoginResources**
Recursos da página de Login.

**Seções**:
- `title`, `subtitle` - Títulos principais
- `form` - Labels e placeholders do formulário
- `errors` - Mensagens de erro
- `info` - Informação sobre acesso

**Páginas que usam**: `src/app/login/page.tsx`

---

### 8. **AdminDashboardResources**
Recursos do painel administrativo.

**Seções**:
- `title`, `subtitle`, `welcome` - Títulos e boas-vindas
- `cards` - Cards de navegação (eventos, posts, migrate)
- `stats` - Estatísticas (não implementado ainda)

**Páginas que usam**: `src/app/admin/page.tsx`

---

### 9. **AdminEventsResources**
Recursos do gerenciamento de eventos no admin.

**Seções**:
- `title`, `createButton` - Títulos e botões
- `loading` - Mensagem de carregamento
- `empty` - Estado vazio
- `confirmDelete` - Confirmação de exclusão
- `editor` - Editor de eventos (títulos, campos, ações)

**Páginas que usam**: `src/app/admin/events/page.tsx`, `src/components/admin/EventEditor.tsx`

---

### 10. **AdminPostsResources**
Recursos do gerenciamento de posts no admin.

**Seções**:
- `title`, `createButton` - Títulos e botões
- `loading` - Mensagem de carregamento
- `empty` - Estado vazio
- `confirmDelete` - Confirmação de exclusão
- `editor` - Editor de posts (títulos, campos, ações)

**Páginas que usam**: `src/app/admin/posts/page.tsx`, `src/components/admin/PostEditor.tsx`

---

### 11. **AdminMigrationResources**
Recursos da página de verificação de migração.

**Seções**:
- `title` - Título principal
- `warning` - Aviso sobre a ferramenta
- `checkButton`, `checking` - Botões e estados
- `howToFix` - Instruções de como corrigir

**Páginas que usam**: `src/app/admin/migrate/page.tsx`

---

### 12. **AdminLayoutResources**
Recursos do layout administrativo.

**Seções**:
- `title` - Título do painel
- `menu` - Itens do menu
- `logout`, `loggingOut` - Botões de sair

**Páginas que usam**: `src/components/admin/AdminLayout.tsx`

---

### 13. **FooterResources**
Recursos do rodapé.

**Seções**:
- `description` - Descrição da comunidade
- `quickLinks` - Links rápidos
- `contact` - Informações de contato
- `social` - Redes sociais
- `copyright` - Direitos autorais

**Páginas que usam**: `src/components/Footer.tsx`

---

### 14. **DateResources**
Recursos para formatação de datas.

**Propriedades**:
- `locale` - 'pt-BR'
- `formats` - Formatos de data (long, longWithTime, short)

**Uso**:
```typescript
import { DateResources } from '@/lib/resources';

const formatted = new Date().toLocaleDateString(
  DateResources.locale, 
  DateResources.formats.long
);
```

**Páginas que usam**: `src/components/EventCard.tsx`, `src/components/BlogCard.tsx`

---

## 🎯 Como Usar

### Importar um recurso específico:
```typescript
import { HomeResources, CommonResources } from '@/lib/resources';

// Usar nas páginas/componentes
<h1>{HomeResources.hero.title}</h1>
<button>{CommonResources.actions.save}</button>
```

### Acessar propriedades aninhadas:
```typescript
// Valores simples
{AboutResources.title}

// Arrays
{AboutResources.values.items.map((value, index) => (
  <div key={index}>
    <h3>{value.title}</h3>
    <p>{value.description}</p>
  </div>
))}

// Objetos aninhados
{DonateResources.methods.pix.title}
{DonateResources.methods.pix.key}
```

---

## ✅ Status de Implementação

### Páginas Públicas
- ✅ Home (`src/app/page.tsx`)
- ✅ Hero Component (`src/components/home/Hero.tsx`)
- ✅ About (`src/app/about/page.tsx`)
- ✅ Events (`src/app/events/page.tsx`)
- ✅ Event Detail (`src/app/events/[id]/page.tsx`)
- ✅ Blog (`src/app/blog/page.tsx`)
- ✅ Blog Detail (`src/app/blog/[id]/page.tsx`)
- ✅ Donate (`src/app/donate/page.tsx`)

### Componentes Compartilhados
- ✅ Navbar (`src/components/Navbar.tsx`)
- ✅ Footer (`src/components/Footer.tsx`)
- ✅ EventCard (`src/components/EventCard.tsx`)
- ✅ BlogCard (`src/components/BlogCard.tsx`)

### Área Administrativa
- ✅ Login (`src/app/login/page.tsx`)
- ✅ Admin Dashboard (`src/app/admin/page.tsx`)
- ✅ Admin Layout (`src/components/admin/AdminLayout.tsx`)
- ✅ Events Management (`src/app/admin/events/page.tsx`)
- ✅ Event Editor (`src/components/admin/EventEditor.tsx`)
- ✅ Posts Management (`src/app/admin/posts/page.tsx`)
- ✅ Post Editor (`src/components/admin/PostEditor.tsx`)
- ✅ Migration Check (`src/app/admin/migrate/page.tsx`)

---

## 🔧 Manutenção

### Adicionar novas strings:
1. Abra `src/lib/resources.ts`
2. Localize o recurso apropriado (ex: `HomeResources`)
3. Adicione a nova propriedade com o texto em português
4. Use a nova propriedade nos componentes

### Exemplo - Adicionar nova seção:
```typescript
export const HomeResources = {
  // ...existing code...
  newSection: {
    title: 'Novo Título',
    description: 'Nova descrição',
  },
};
```

### Modificar strings existentes:
1. Abra `src/lib/resources.ts`
2. Localize a string no recurso apropriado
3. Modifique o valor
4. As mudanças serão refletidas automaticamente em todas as páginas que usam aquele recurso

---

## 📝 Observações

- **Todas as strings estáticas devem estar em português** nos arquivos de recursos
- **Não adicione strings hardcoded** diretamente nos componentes - sempre use os recursos
- **Mantenha a consistência** nos nomes das propriedades
- **Use nomes descritivos** para facilitar a manutenção
- **Agrupe strings relacionadas** na mesma seção

---

## 🌍 Futura Internacionalização (i18n)

Se no futuro você quiser adicionar suporte para múltiplos idiomas:

1. Crie arquivos separados: `resources.pt.ts`, `resources.en.ts`, etc.
2. Use uma biblioteca como `next-intl` ou `react-i18next`
3. A estrutura atual já está organizada para facilitar essa migração

---

**Última atualização**: 31 de outubro de 2025
