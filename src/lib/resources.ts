// ===================================================================
// RECURSOS DE TEXTO - COMUNIDADE EVANGÉLICA LUTERANA EBENÉZER
// ===================================================================
// Este arquivo contém todas as strings estáticas do sistema em português
// Organizado por página/componente para facilitar manutenção e tradução

// Recursos de Sistema/Debug (para mensagens de erro internas)
export const SystemResources = {
    errors: {
        supabaseCredentialsMissing: 'Credenciais do Supabase estão faltando. Adicione NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY às variáveis de ambiente.',
        fetchMarkdownFailed: 'Falha ao buscar conteúdo markdown',
        invalidUrlFormat: 'Formato de URL inválido',
    },
}

// Recursos de SEO/Metadata
export const SEOResources = {
    defaultTitle: 'Igreja Ebenézer - Fé, Comunidade, Esperança',
    defaultDescription: 'Bem-vindo à Igreja Ebenézer - Uma comunidade de fé, amor e esperança',
    keywords: 'igreja, comunidade, fé, esperança, amor, eventos, blog, Ebenézer',
}

// Recursos Comuns - Compartilhados entre múltiplas telas
export const CommonResources = {
    navigation: {
        home: 'Início',
        about: 'Sobre',
        aboutUs: 'Sobre nós',
        events: 'Eventos',
        blog: 'Blog',
        donate: 'Doar',
        contribute: 'Contribua',
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
        upload: 'Fazer Upload',
        uploading: 'Enviando...',
        download: 'Baixar',
        close: 'Fechar',
        confirm: 'Confirmar',
        viewAll: 'Ver todos',
        open: 'Abrir',
    },
    validation: {
        required: 'Este campo é obrigatório',
        invalidEmail: 'E-mail inválido',
        invalidUrl: 'URL inválida',
        minLength: 'O campo deve ter no mínimo {min} caracteres',
        maxLength: 'O campo deve ter no máximo {max} caracteres',
    },
    common: {
        welcome: 'Bem-vindo',
        or: 'ou',
        and: 'e',
        by: 'Por',
        at: 'às',
        on: 'em',
        optional: 'opcional',
        search: 'Pesquisar',
        filter: 'Filtrar',
        sort: 'Ordenar',
        noResults: 'Nenhum resultado encontrado',
        error: 'Erro',
        success: 'Sucesso',
        warning: 'Aviso',
        info: 'Informação',
    },
    errors: {
        generic: 'Ocorreu um erro. Tente novamente.',
        network: 'Erro de conexão. Verifique sua internet.',
        notFound: 'Não encontrado',
        unauthorized: 'Não autorizado',
        serverError: 'Erro no servidor. Tente novamente mais tarde.',
        bannerUploadFailed: 'Falha ao fazer upload da imagem de capa',
        contentUploadFailed: 'Falha ao fazer upload do conteúdo markdown',
        saveFailed: 'Falha ao salvar',
        createFailed: 'Falha ao criar',
        updateFailed: 'Falha ao atualizar',
        deleteFailed: 'Falha ao excluir',
        genericError: 'Ocorreu um erro ao salvar',
    },
    messages: {
        confirmDelete: 'Tem certeza que deseja excluir?',
        saveSuccess: 'Salvo com sucesso!',
        deleteSuccess: 'Excluído com sucesso!',
        updateSuccess: 'Atualizado com sucesso!',
        uploadSuccess: 'Upload realizado com sucesso!',
        uploadFailed: 'Falha no upload. Tente novamente.',
    },
};

// Recursos da Página Inicial
export const HomeResources = {
    hero: {
        title: 'Bem-vindo à Congregação Ebenézer',
        subtitle: 'Um lugar de fé, esperança e amor',
        description: 'Junte-se a nós em adoração, comunhão e serviço. Todos são bem-vindos em nossa família.',
        ctaPrimary: 'Visite-nos',
        ctaSecondary: 'Próximos Eventos',
    },
    about: {
        sectionLabel: 'Sobre a Comunidade',
        title: 'Nossa missão é fazer a fé transformar vidas',
        description: 'Acreditamos que a fé vai além das palavras e se torna uma força poderosa de mudança. Nosso propósito é aplicar os ensinamentos de Cristo de forma prática e relevante no dia a dia. Queremos equipar e inspirar você a viver o potencial que Deus lhe deu.',
        cta: 'Conheça nossa história',
        imageAlt: 'Sobre a comunidade',
    },
    events: {
        sectionLabel: 'Próximos Eventos',
        title: 'Próximos Eventos',
        subtitle: 'Junte-se a nós',
        viewAll: 'Ver todos os eventos',
        noEvents: 'Nenhum evento próximo agendado',
        imageAlt: 'Imagem do evento',
    },
    blog: {
        sectionLabel: 'Do nosso blog',
        title: 'Últimas Reflexões',
        subtitle: 'Do nosso blog',
        viewAll: 'Ver todos os posts',
        noPosts: 'Nenhuma publicação disponível',
        imageAlt: 'Imagem do post',
    },
    cta: {
        title: 'Faça Parte da Nossa Comunidade',
        description: 'Estamos ansiosos para conhecê-lo. Venha nos visitar e experiencie o amor e a graça de Deus.',
        button: 'Entre em Contato',
    },
};

// Recursos da Página Sobre
export const AboutResources = {
    hero: {
        sectionLabel: 'Nossa História',
        title: 'Comunidade Evangélica Luterana Ebenézer',
        subtitle: '&quot;Até aqui o Senhor Deus nos ajudou&quot; - 1 Samuel 7:12',
    },
    whoWeAre: {
        sectionLabel: 'Quem Somos',
        title: 'Uma Comunidade de Fé',
        description1: 'A Comunidade Evangélica Luterana Ebenézer é uma congregação filiada à Igreja Evangélica Luterana do Brasil – IELB. Temos como finalidade propagar o evangelho de Jesus Cristo por meio da palavra, do livro, do jornal, do rádio, da TV e de outros meios condignos, e administrar os Sacramentos do Santo Batismo e da Santa Ceia ordenados pelo Senhor Jesus Cristo.',
        description2: 'Aceitamos toda a Bíblia, a Escritura Sagrada, tanto do Antigo como do Novo Testamento, como a infalível palavra de Deus, visto que seus autores a escreveram inspirados pelo Espírito Santo.',
        imageAlt: 'Nossa comunidade',
    },
    foundation: {
        sectionLabel: 'Assim Começou Um Sonho',
        title: 'Fundação em 31 de Outubro de 1980',
        description1: 'A história da Comunidade Evangélica Luterana Ebenézer tem como marco o dia 31 de outubro de 1980. Nessa data, na residência da família do Sr. Alfredo Oestereich, situada na Rua Bertha Weege, número 367, no bairro Barra do Rio Cerro, em Jaraguá do Sul, reuniram-se um grupo de membros até então pertencentes à Comunidade Evangélica Luterana Emanuel, com o objetivo de fundar a nova comunidade.',
        description2: 'Já era final da tarde, quando o Sr. Alfredo Oestereich e o pastor Luiz Adolfo Hegele retornavam de uma reunião distrital. Ficaram um bom tempo conversando na varanda da casa do Sr. Alfredo sobre a possibilidade de criar uma nova comunidade no bairro Barra do Rio Cerro. O Sr. Alfredo Oestereich, com seu sorriso maroto, falou ao pastor que esse problema já estava resolvido. Naquele momento, emocionado, disse ao pastor que doaria o terreno que se via ao fundo de sua varanda para iniciar os trabalhos da nova comunidade evangélica luterana na Barra do Rio Cerro.',
        description3: 'A nova comunidade foi formada por 15 famílias, 16 membros votantes, totalizando 54 pessoas. Seu nome foi escolhido com base em 1Sm 7.12 (NTLH): &quot;Aí Samuel pegou uma pedra, pôs entre Mispa e Sem e disse: - Até aqui o Senhor Deus nos ajudou. Por isso deu a ela o nome de Ebenézer.&quot;',
    },
    mission: {
        sectionLabel: 'Planejamento IELB',
        title: 'Nossa Missão, Propósito e Visão',
        ourMission: {
            title: 'Nossa Missão',
            description: 'Proclamar Cristo para Todos',
        },
        ourPurpose: {
            title: 'Nosso Propósito',
            description: 'Compartilhar o evangelho de Cristo para promover a evangelização e o crescimento espiritual',
        },
        ourValues: {
            title: 'Nossos Valores',
            description: 'A ação e o amor de Deus através da sua Palavra e dos sacramentos do Batismo e da Santa Ceia, que concedem perdão, vida e salvação em Cristo a todos os que creem',
        },
        ourVision: {
            title: 'Nossa Visão',
            description: 'Sermos uma Igreja Luterana confessional que vai ao encontro das necessidades das pessoas',
        },
    },
    growth: {
        sectionLabel: 'Crescimento e Desenvolvimento',
        title: 'Nossa Jornada de Fé',
        description1: 'Em 1981, a CEL Emanuel doou sua antiga capela para a CEL Ebenézer, que foi totalmente desmontada e transferida para sua nova localização no terreno doado pelo Sr. Alfredo Oestereich, na rua Concórdia, bairro Barra do Rio Cerro. Em 7 de junho de 1981, foi celebrado o culto de consagração da capela, num dia festivo, com culto, almoço e café de confraternização.',
        description2: 'Em 1985, iniciaram-se os primeiros estudos para construção da nova igreja. O sonho de cinco anos atrás começava a tomar forma. Em outubro de 1986, foi lançada a pedra fundamental da nova igreja. No ano seguinte, 1987, iniciou-se a construção do templo sustentada praticamente com recursos próprios obtidos da campanha interna com a participação das famílias integrantes da comunidade.',
        description3: 'Em 13 de junho de 2002, foi fundada a Paróquia Evangélica Luterana Ebenézer, formada pelas comunidades Ebenézer (sede) e Salvador (Rio da Luz). Aquela pequena comunidade fundada em outubro de 1980 agora passava a ser sede de paróquia.',
        conclusion: 'Quando paramos um pouco e olhamos para trás, podemos ver o quanto essa comunidade cresceu e o potencial de crescimento que possui. Com toda certeza, podemos dizer como Samuel: &quot;Até aqui o Senhor Deus nos ajudou.&quot; (1Sm 7.12)',
    },
    cta: {
        title: 'Faça parte da nossa jornada de fé',
        description: 'Venha conhecer a Congregação Ebenézer e descobrir como você pode crescer espiritualmente e fazer a diferença na vida de outras pessoas através do amor de Cristo.',
        button: 'Conheça nossos eventos',
    },
};

// Recursos da Página de Eventos
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
        labels: {
            date: 'Data',
            time: 'Horário',
            location: 'Local',
        },
        imageAlt: 'Imagem do evento',
    },
};

// Recursos da Página do Blog
export const BlogResources = {
    title: 'Blog',
    subtitle: 'Reflexões, insights e histórias da nossa comunidade',
    empty: 'Nenhuma publicação disponível ainda. Volte em breve para conteúdo inspirador!',
    detail: {
        backToBlog: '← Voltar para o Blog',
        errorLoading: 'Falha ao carregar conteúdo da publicação',
        errorDetails: 'Detalhes do Erro',
        noContent: 'Nenhum conteúdo disponível',
        labels: {
            author: 'Autor',
            publishedOn: 'Publicado em',
            readTime: 'min de leitura',
        },
        imageAlt: 'Imagem do post',
    },
};

// Recursos da Página de Doações
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
            description: 'Chave PIX CNPJ',
            key: '83.784.264/0001-00',
            qrCode: '/assets/ebenezer_pix_qr_code.png',
            copyButton: 'Copiar Chave PIX',
            copied: 'Copiado!',
        },
        bank: {
            title: 'Transferência Bancária',
            bank: 'Banco',
            bankName: 'Banco 085',
            agency: 'Agência',
            agencyNumber: '0101-5',
            account: 'Conta',
            accountNumber: '9868135',
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

// Recursos da Página de Login
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
        showPassword: 'Mostrar senha',
        hidePassword: 'Ocultar senha',
    },
    errors: {
        invalidCredentials: 'E-mail ou senha inválidos',
        generic: 'Ocorreu um erro. Tente novamente.',
    },
    info: 'Somente administradores autorizados podem acessar esta área.',
};

// Recursos do Painel Administrativo
export const AdminDashboardResources = {
    title: 'Painel Administrativo',
    subtitle: 'Bem-vindo de volta',
    welcome: 'Bem-vindo ao painel administrativo da Congregação Ebenézer',
    navigation: {
        backToDashboard: 'Voltar ao Dashboard',
        goBack: 'Voltar',
        home: 'Início',
    },
    actions: {
        visitSite: 'Visitar Site',
        logout: 'Sair',
        loggingOut: 'Saindo...',
    },
    stats: {
        totalEvents: 'Total de Eventos',
        blogPosts: 'Posts do Blog',
        active: 'Ativos',
    },
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
    quickActionsTitle: 'Ações Rápidas',
};

// Recursos de Gerenciamento de Eventos (Admin)
export const AdminEventsResources = {
    title: 'Gerenciamento de Eventos',
    createButton: 'Criar Evento',
    loading: 'Carregando eventos...',
    empty: {
        title: 'Nenhum evento ainda',
        description: 'Crie seu primeiro evento',
        action: 'Criar seu primeiro evento',
    },
    list: {
        loadingText: 'Carregando eventos...',
        noEvents: 'Nenhum evento ainda',
    },
    actions: {
        edit: 'Editar',
        delete: 'Excluir',
    },
    confirmDelete: 'Tem certeza que deseja excluir este evento?',
    editor: {
        titleNew: 'Criar Novo Evento',
        titleEdit: 'Editar Evento',
        loading: 'Carregando conteúdo do evento...',
        fields: {
            name: {
                label: 'Nome do Evento',
                placeholder: 'Digite o nome do evento',
            },
            date: {
                label: 'Data e Horário',
            },
            location: {
                label: 'Local',
                placeholder: 'Digite o local do evento',
            },
            banner: {
                label: 'Imagem de Capa (Banner)',
                button: 'Escolher Imagem de Capa',
                uploading: 'Enviando imagem...',
                change: 'Alterar imagem',
                preview: 'Pré-visualização da capa',
            },
            content: {
                label: 'Conteúdo do Evento',
                info: 'Use o editor para formatar o conteúdo. O conteúdo será salvo automaticamente.',
                placeholder: 'Digite o conteúdo do evento aqui...',
            },
        },
        actions: {
            save: 'Salvar Evento',
            saving: 'Salvando...',
            cancel: 'Cancelar',
            back: 'Voltar',
        },
        alerts: {
            uploadFailed: 'Falha ao fazer upload. Tente novamente.',
            contentUploadFailed: 'Falha ao fazer upload do conteúdo',
            saveFailed: 'Falha ao salvar o evento',
        },
    },
};

// Recursos de Gerenciamento de Posts (Admin)
export const AdminPostsResources = {
    title: 'Gerenciamento de Posts do Blog',
    createButton: 'Criar Post',
    loading: 'Carregando posts...',
    empty: {
        title: 'Nenhum post ainda',
        description: 'Crie seu primeiro post',
        action: 'Criar seu primeiro post',
    },
    list: {
        loadingText: 'Carregando posts...',
        noPosts: 'Nenhum post ainda',
    },
    actions: {
        edit: 'Editar',
        delete: 'Excluir',
    },
    confirmDelete: 'Tem certeza que deseja excluir este post?',
    editor: {
        titleNew: 'Criar Novo Post',
        titleEdit: 'Editar Post',
        loading: 'Carregando conteúdo do post...',
        fields: {
            title: {
                label: 'Título do Post',
                placeholder: 'Digite o título do post',
            },
            author: {
                label: 'Autor',
                placeholder: 'Digite o nome do autor',
            },
            banner: {
                label: 'Imagem de Capa (Banner)',
                button: 'Escolher Imagem de Capa',
                uploading: 'Enviando imagem...',
                change: 'Alterar imagem',
                preview: 'Pré-visualização da capa',
            },
            content: {
                label: 'Conteúdo do Post',
                info: 'Use o editor para formatar o conteúdo. O conteúdo será salvo automaticamente.',
                placeholder: 'Digite o conteúdo do post aqui...',
            },
        },
        actions: {
            save: 'Salvar Post',
            saving: 'Salvando...',
            cancel: 'Cancelar',
            back: 'Voltar',
        },
        alerts: {
            uploadFailed: 'Falha ao fazer upload. Tente novamente.',
            contentUploadFailed: 'Falha ao fazer upload do conteúdo',
            saveFailed: 'Falha ao salvar o post',
        },
    },
};

// Recursos de Migração de Dados (Admin)
export const AdminMigrationResources = {
    title: 'Verificação de Migração de Dados',
    warning: {
        title: '⚠️ Importante',
        description: 'Esta ferramenta verifica se seus eventos e posts estão usando o novo schema baseado em storage.',
        note: 'Eventos criados antes da atualização do schema não terão um campo content_url e precisarão ser recriados.',
    },
    checkButton: 'Verificar Banco de Dados',
    checking: 'Verificando...',
    results: {
        events: 'Eventos',
        posts: 'Posts',
        total: 'Total',
        withContentUrl: 'Com content_url',
        withoutContentUrl: 'Sem content_url (precisam ser recriados)',
    },
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

// Recursos do Layout Administrativo
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

// Recursos do Rodapé
export const FooterResources = {
    description: 'Uma comunidade de fé, esperança e amor.',
    quickLinks: {
        title: 'Links Rápidos',
    },
    contact: {
        title: 'Contato',
        address: 'Rua Concórdia, 105, Bairro Barra do Rio Cerro',
        city: 'Jaraguá do Sul - Santa Catarina',
        phone: '(47) 3376-3625',
        email: 'contato@ebenezer.com.br',
    },
    social: {
        title: 'Redes Sociais',
        facebook: 'Facebook',
        instagram: 'Instagram',
        youtube: 'YouTube',
    },
    copyright: '© {year} Congregação Ebenézer. Todos os direitos reservados.',
};

// Recursos de Navbar
export const NavbarResources = {
    logoAlt: 'Congregação Ebenézer',
    toggleMenu: 'Alternar menu',
    menuItems: [
        { name: 'Início', href: '/' },
        { name: 'Sobre nós', href: '/about' },
        { name: 'Eventos', href: '/events' },
        { name: 'Blog', href: '/blog' },
    ],
    donateButton: 'Contribua',
};

// Recursos de Formatação de Data
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
        shortWithTime: {
            year: 'numeric' as const,
            month: '2-digit' as const,
            day: '2-digit' as const,
            hour: '2-digit' as const,
            minute: '2-digit' as const,
        },
    },
    daysOfWeek: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    months: [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ],
};

// Recursos do Editor de Texto Rico (RichTextEditor)
export const RichTextEditorResources = {
    toolbar: {
        bold: 'Negrito',
        italic: 'Itálico',
        strike: 'Tachado',
        code: 'Código',
        heading1: 'Título 1',
        heading2: 'Título 2',
        heading3: 'Título 3',
        bulletList: 'Lista com marcadores',
        orderedList: 'Lista numerada',
        blockquote: 'Citação',
        codeBlock: 'Bloco de código',
        link: 'Link',
        image: 'Imagem',
        undo: 'Desfazer',
        redo: 'Refazer',
    },
    dialogs: {
        link: {
            title: 'Inserir Link',
            urlLabel: 'URL',
            urlPlaceholder: 'https://exemplo.com',
            textLabel: 'Texto do Link',
            textPlaceholder: 'Digite o texto do link',
            insert: 'Inserir',
            update: 'Atualizar',
            remove: 'Remover',
            cancel: 'Cancelar',
        },
        image: {
            title: 'Inserir Imagem',
            uploading: 'Enviando imagem...',
            button: 'Escolher Imagem',
            altLabel: 'Texto Alternativo',
            altPlaceholder: 'Descrição da imagem',
        },
    },
    bubbleMenu: {
        editLink: 'Editar link',
        removeLink: 'Remover link',
        editImage: 'Editar imagem',
        removeImage: 'Remover imagem',
    },
    placeholder: 'Digite o conteúdo aqui...',
};

// Recursos de Metadados (SEO)
export const MetadataResources = {
    site: {
        name: 'Comunidade Evangélica Luterana Ebenézer',
        title: 'Ebenézer - Fé, Comunidade, Esperança',
        description: 'Comunidade Evangélica Luterana Ebenézer - Uma comunidade de fé, esperança e amor em Jaraguá do Sul, SC.',
        keywords: 'igreja, evangélica, luterana, ebenézer, jaraguá do sul, fé, comunidade, cristo, IELB',
    },
    pages: {
        home: {
            title: 'Início - Congregação Ebenézer',
            description: 'Bem-vindo à Comunidade Evangélica Luterana Ebenézer. Junte-se a nós em adoração, comunhão e serviço.',
        },
        about: {
            title: 'Sobre Nós - Congregação Ebenézer',
            description: 'Conheça a história da Congregação Ebenézer, fundada em 1980 em Jaraguá do Sul, SC.',
        },
        events: {
            title: 'Eventos - Congregação Ebenézer',
            description: 'Confira os próximos eventos e atividades da Congregação Ebenézer.',
        },
        blog: {
            title: 'Blog - Congregação Ebenézer',
            description: 'Reflexões, insights e histórias da nossa comunidade de fé.',
        },
        donate: {
            title: 'Doar - Congregação Ebenézer',
            description: 'Apoie nossa missão através de suas doações e contribuições.',
        },
        admin: {
            title: 'Painel Administrativo - Congregação Ebenézer',
            description: 'Área administrativa da Congregação Ebenézer.',
        },
    },
};
