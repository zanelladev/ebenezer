// Common Resources - Shared across multiple screens
export const CommonResources = {
    navigation: {
        home: 'Início',
        about: 'Sobre',
        events: 'Eventos',
        blog: 'Blog',
        donate: 'Doar',
        admin: 'Admin',
        login: 'Entrar',
    },
    actions: {
        save: 'Salvar',
        cancel: 'Cancelar',
        delete: 'Excluir',
        edit: 'Editar',
        create: 'Criar',
        back: 'Voltar',
        readMore: 'Ler mais',
        loading: 'Carregando',
        saving: 'Salvando',
        submit: 'Enviar',
    },
    validation: {
        required: 'Este campo é obrigatório',
        invalidEmail: 'E-mail inválido',
        invalidUrl: 'URL inválida',
    },
    common: {
        welcome: 'Bem-vindo',
        or: 'ou',
        and: 'e',
        by: 'Por',
        at: 'às',
        on: 'em',
        optional: 'opcional',
    },
};

// Home Page Resources
export const HomeResources = {
    hero: {
        title: 'Bem-vindo à Comunidade Ebenézer',
        subtitle: 'Um lugar de fé, esperança e amor',
        description: 'Junte-se a nós em adoração, comunhão e serviço. Todos são bem-vindos em nossa família.',
        ctaPrimary: 'Visite-nos',
        ctaSecondary: 'Próximos Eventos',
    },
    about: {
        title: 'Nossa Comunidade',
        subtitle: 'Construindo fé juntos',
        description: 'Somos uma comunidade diversa e acolhedora, dedicada a viver e compartilhar o amor de Deus.',
        values: {
            title: 'Nossos Valores',
            faith: 'Fé',
            faithDesc: 'Acreditamos no poder transformador da fé',
            community: 'Comunidade',
            communityDesc: 'Construímos relacionamentos genuínos',
            service: 'Serviço',
            serviceDesc: 'Servimos com amor e dedicação',
        },
    },
    events: {
        title: 'Próximos Eventos',
        subtitle: 'Junte-se a nós',
        viewAll: 'Ver todos os eventos',
        noEvents: 'Nenhum evento próximo agendado',
    },
    blog: {
        title: 'Últimas Reflexões',
        subtitle: 'Do nosso blog',
        viewAll: 'Ver todos os posts',
        noPosts: 'Nenhuma publicação disponível',
    },
    cta: {
        title: 'Faça Parte da Nossa Comunidade',
        description: 'Estamos ansiosos para conhecê-lo. Venha nos visitar e experiencie o amor e a graça de Deus.',
        button: 'Entre em Contato',
    },
};

// About Page Resources
export const AboutResources = {
    title: 'Sobre Nós',
    subtitle: 'Conheça nossa história e missão',
    mission: {
        title: 'Nossa Missão',
        description: 'Proclamar o evangelho, edificar vidas e servir à comunidade com amor e excelência.',
    },
    vision: {
        title: 'Nossa Visão',
        description: 'Ser uma igreja relevante, transformadora e referência em amor e serviço.',
    },
    values: {
        title: 'Nossos Valores',
        items: [
            {
                title: 'Fé em Deus',
                description: 'Colocamos nossa confiança em Deus acima de tudo',
            },
            {
                title: 'Amor ao Próximo',
                description: 'Amamos e servimos uns aos outros com sinceridade',
            },
            {
                title: 'Integridade',
                description: 'Vivemos com transparência e honestidade',
            },
            {
                title: 'Excelência',
                description: 'Buscamos fazer tudo com excelência para a glória de Deus',
            },
        ],
    },
    history: {
        title: 'Nossa História',
        description: 'A Comunidade Ebenézer nasceu do desejo de criar um espaço acolhedor onde as pessoas pudessem encontrar esperança, amor e propósito.',
    },
    leadership: {
        title: 'Liderança',
        description: 'Nossa equipe pastoral e de liderança está comprometida em servir e cuidar de nossa comunidade.',
    },
};

// Events Page Resources
export const EventsResources = {
    title: 'Eventos',
    subtitle: 'Junte-se a nós para adoração, comunhão e encontros comunitários',
    upcoming: {
        title: 'Próximos Eventos',
        empty: 'Nenhum evento próximo agendado no momento. Volte em breve!',
    },
    past: {
        title: 'Eventos Anteriores',
    },
    detail: {
        backToEvents: '← Voltar para Eventos',
        errorLoading: 'Falha ao carregar conteúdo do evento',
        errorDetails: 'Detalhes do Erro',
        noContent: 'Nenhum conteúdo disponível',
    },
};

// Blog Page Resources
export const BlogResources = {
    title: 'Blog',
    subtitle: 'Reflexões, insights e histórias da nossa comunidade',
    empty: 'Nenhuma publicação disponível ainda. Volte em breve para conteúdo inspirador!',
    detail: {
        backToBlog: '← Voltar para o Blog',
        errorLoading: 'Falha ao carregar conteúdo da publicação',
        errorDetails: 'Detalhes do Erro',
        noContent: 'Nenhum conteúdo disponível',
    },
};

// Donate Page Resources
export const DonateResources = {
    title: 'Doar',
    subtitle: 'Apoie nossa missão',
    introduction: {
        title: 'Faça a Diferença',
        description: 'Suas doações ajudam a manter nossas atividades e a impactar vidas através do evangelho.',
    },
    why: {
        title: 'Por Que Doar?',
        items: [
            {
                title: 'Apoiar o Ministério',
                description: 'Suas doações mantêm nossas atividades e programas funcionando',
            },
            {
                title: 'Ajudar a Comunidade',
                description: 'Contribuímos para projetos sociais e assistência aos necessitados',
            },
            {
                title: 'Expandir o Reino',
                description: 'Investimos em missões e evangelismo local e global',
            },
        ],
    },
    methods: {
        title: 'Como Doar',
        pix: {
            title: 'PIX',
            description: 'Chave PIX',
            key: 'doacao@ebenezer.com.br',
        },
        bank: {
            title: 'Transferência Bancária',
            bank: 'Banco',
            agency: 'Agência',
            account: 'Conta',
        },
        inPerson: {
            title: 'Presencial',
            description: 'Você pode contribuir durante nossos cultos e eventos',
        },
    },
    impact: {
        title: 'Seu Impacto',
        description: 'Cada contribuição, independente do valor, faz diferença e nos ajuda a cumprir nossa missão.',
    },
    thanks: {
        title: 'Obrigado!',
        message: 'Sua generosidade transforma vidas e glorifica a Deus.',
    },
};

// Login Page Resources
export const LoginResources = {
    title: 'Área Administrativa',
    subtitle: 'Faça login para acessar o painel administrativo',
    form: {
        email: 'E-mail',
        emailPlaceholder: 'seu@email.com',
        password: 'Senha',
        passwordPlaceholder: 'Digite sua senha',
        submit: 'Entrar',
        loggingIn: 'Entrando...',
    },
    errors: {
        invalidCredentials: 'E-mail ou senha inválidos',
        generic: 'Ocorreu um erro. Tente novamente.',
    },
    info: 'Somente administradores autorizados podem acessar esta área.',
};

// Admin Dashboard Resources
export const AdminDashboardResources = {
    title: 'Painel Administrativo',
    subtitle: 'Bem-vindo de volta',
    welcome: 'Bem-vindo ao painel administrativo da Comunidade Ebenézer',
    cards: {
        events: {
            title: 'Gerenciar Eventos',
            description: 'Criar, editar e organizar eventos da igreja',
            action: 'Ir para Eventos',
        },
        posts: {
            title: 'Gerenciar Posts',
            description: 'Criar e gerenciar publicações do blog',
            action: 'Ir para Posts',
        },
        migrate: {
            title: 'Verificar Migração',
            description: 'Verificar status do banco de dados',
            action: 'Verificar Dados',
        },
    },
    stats: {
        totalEvents: 'Total de Eventos',
        totalPosts: 'Total de Posts',
        upcomingEvents: 'Eventos Próximos',
        recentPosts: 'Posts Recentes',
    },
};

// Admin Events Resources
export const AdminEventsResources = {
    title: 'Gerenciamento de Eventos',
    createButton: '+ Criar Evento',
    loading: 'Carregando eventos...',
    empty: {
        title: 'Nenhum evento ainda',
        description: 'Crie seu primeiro evento',
    },
    confirmDelete: 'Tem certeza que deseja excluir este evento?',
    editor: {
        titleNew: 'Criar Novo Evento',
        titleEdit: 'Editar Evento',
        loading: 'Carregando conteúdo do evento...',
        fields: {
            name: {
                label: 'Nome',
                placeholder: 'Nome do evento',
            },
            date: {
                label: 'Data',
            },
            location: {
                label: 'Local',
                placeholder: 'Local do evento',
            },
            content: {
                label: 'Conteúdo (Markdown)',
                info: 'Este conteúdo será armazenado como arquivo markdown no Supabase Storage',
            },
        },
        actions: {
            save: 'Salvar Evento',
            saving: 'Salvando...',
            cancel: 'Cancelar',
        },
    },
};

// Admin Posts Resources
export const AdminPostsResources = {
    title: 'Gerenciamento de Posts do Blog',
    createButton: '+ Criar Post',
    loading: 'Carregando posts...',
    empty: {
        title: 'Nenhum post ainda',
        description: 'Crie seu primeiro post',
    },
    confirmDelete: 'Tem certeza que deseja excluir este post?',
    editor: {
        titleNew: 'Criar Novo Post',
        titleEdit: 'Editar Post',
        loading: 'Carregando conteúdo do post...',
        fields: {
            title: {
                label: 'Título',
                placeholder: 'Título do post',
            },
            author: {
                label: 'Autor',
                placeholder: 'Nome do autor',
            },
            content: {
                label: 'Conteúdo (Markdown)',
                info: 'Este conteúdo será armazenado como arquivo markdown no Supabase Storage',
            },
        },
        actions: {
            save: 'Salvar Post',
            saving: 'Salvando...',
            cancel: 'Cancelar',
        },
    },
};

// Admin Migration Resources
export const AdminMigrationResources = {
    title: 'Verificação de Migração de Dados',
    warning: {
        title: '⚠️ Importante',
        description: 'Esta ferramenta verifica se seus eventos e posts estão usando o novo schema baseado em storage.',
        note: 'Eventos criados antes da atualização do schema não terão um campo content_url e precisarão ser recriados.',
    },
    checkButton: 'Verificar Banco de Dados',
    checking: 'Verificando...',
    howToFix: {
        title: '📝 Como Corrigir',
        steps: [
            'Excluir o evento antigo (ele não tem um content_url válido)',
            'Ir para Gerenciamento de Eventos',
            'Criar um novo evento com as mesmas informações',
            'O novo evento armazenará automaticamente o markdown no Supabase Storage',
        ],
    },
};

// Admin Layout Resources
export const AdminLayoutResources = {
    title: 'Painel Admin',
    menu: {
        dashboard: 'Dashboard',
        events: 'Eventos',
        posts: 'Posts do Blog',
        migrate: '🔧 Verificar Migração',
    },
    logout: 'Sair',
    loggingOut: 'Saindo...',
};

// Footer Resources
export const FooterResources = {
    description: 'Uma comunidade de fé, esperança e amor.',
    quickLinks: {
        title: 'Links Rápidos',
    },
    contact: {
        title: 'Contato',
        address: 'Rua Exemplo, 123 - São Paulo, SP',
        phone: '(11) 1234-5678',
        email: 'contato@ebenezer.com.br',
    },
    social: {
        title: 'Redes Sociais',
    },
    copyright: '© 2025 Comunidade Ebenézer. Todos os direitos reservados.',
};

// Date Formatting Resources
export const DateResources = {
    locale: 'pt-BR',
    formats: {
        long: {
            weekday: 'long' as const,
            year: 'numeric' as const,
            month: 'long' as const,
            day: 'numeric' as const,
        },
        longWithTime: {
            weekday: 'long' as const,
            year: 'numeric' as const,
            month: 'long' as const,
            day: 'numeric' as const,
            hour: '2-digit' as const,
            minute: '2-digit' as const,
        },
        short: {
            year: 'numeric' as const,
            month: 'long' as const,
            day: 'numeric' as const,
        },
    },
};
