/**
 * ESCRITOR BLOG MASTER - SOVEREIGN ENGINE
 * Core Logic & Module Management
 */

class EscritorEngine {
    constructor() {
        const savedState = localStorage.getItem('escritor_master_state');
        this.state = savedState ? JSON.parse(savedState) : {
            currentModule: 'dashboard',
            config: {
                niche: 'Geral',
                persona: 'Review',
                siteName: 'Meu Blog Soberano',
                adsenseId: 'pub-XXXXXX',
                discoverMode: false
            },
            stats: {
                totalPosts: 0,
                projectedClicks: 0,
                estimatedRevenue: 0,
                affiliateSales: 0,
                affiliateRevenue: 0
            },
            history: []
        };
        
        this.definePersonas();
        this.init();
    }

    definePersonas() {
        this.personasData = [
            { id: 'FDF', name: 'FDF / Venda', icon: 'shopping_cart', color: 'bg-rose-600', desc: 'Landing Pages & Conversão', tone: 'Agressivo e Direto', audience: 'Compradores Impulsivos / Leads Quentes' },
            { id: 'AdSense', name: 'Escala / AdSense', icon: 'dynamic_feed', color: 'bg-emerald-600', desc: 'Volume & Rankeamento', tone: 'Informativo e Neutro', audience: 'Buscas Orgânicas Gerais' },
            { id: 'Humor', name: 'Humor/Pessoal', icon: 'sentiment_satisfied', color: 'bg-orange-500', desc: 'Sarcástico e coloquial', tone: 'Sarcástico e Engraçado', audience: 'Geral / Consumo Viral' },
            { id: 'Solar', name: 'Solar', icon: 'light_mode', color: 'bg-yellow-500', desc: 'Técnico e comercial', tone: 'Visionário e Sustentável', audience: 'Investidores / Proprietários Tech' },
            { id: 'Pet', name: 'Pet', icon: 'pets', color: 'bg-blue-500', desc: 'Lúdico e bem-estar', tone: 'Carinhoso e Emocional', audience: 'Donos de Pets / Famílias' },
            { id: 'finance', name: 'Finanças Master', icon: 'payments', color: 'bg-emerald-700', desc: 'Investimentos e ROI', tone: 'Analítico e Sério', audience: 'Investidores / Planejadores Fin.' },
            { id: 'travel', name: 'Viagem & Roteiros', icon: 'flight_takeoff', color: 'bg-sky-500', desc: 'Experiências Globais', tone: 'Inspiracional e Descritivo', audience: 'Viajantes / Buscadores de Experiência' },
            { id: 'cars', name: 'Automóveis', icon: 'directions_car', color: 'bg-slate-700', desc: 'Análise de Veículos', tone: 'Expert e Tecnológico', audience: 'Público Masculino / Entusiastas' },
            { id: 'tools', name: 'Ferramentas Expert', icon: 'handyman', color: 'bg-amber-600', desc: 'Reviews Técnicos', tone: 'Robusto e Prático', audience: 'Público Masculino / "Handymen"' },
            { id: 'psycho', name: 'Psicologia', icon: 'psychology', color: 'bg-purple-600', desc: 'Bem-estar e Mente', tone: 'Empático e Clínico', audience: 'Buscadores de Autoconhecimento' },
            { id: 'therapy', name: 'Terapias Naturais', icon: 'spa', color: 'bg-green-600', desc: 'Saúde Holística', tone: 'Zen e Equilibrado', audience: 'Público Saudável / Naturalista' },
            { id: 'cuisine', name: 'Culinária Elite', icon: 'restaurant', color: 'bg-orange-600', desc: 'Receitas e Gastronomia', tone: 'Apetitoso e Instrutivo', audience: 'Cozinheiros / Chefs de Casa' },
            { id: 'fashion', name: 'Vestuário & Estilo', icon: 'apparel', color: 'bg-pink-600', desc: 'Moda e Tendências', tone: 'Estético e Vibrante', audience: 'Público Feminino / Trend Hunters' },
            { id: 'beauty', name: 'Beleza & Estética', icon: 'face_3', color: 'bg-rose-400', desc: 'Skincare e Make', tone: 'Aspiracional e Detalhado', audience: 'Público Feminino / Beauty Hunters' },
            { id: 'perfume', name: 'Perfumes de Elite', icon: 'air', color: 'bg-indigo-400', desc: 'Fragrâncias e Notas', tone: 'Sofisticado e Sensorial', audience: 'Buscadores de Luxo / Status' },
            { id: 'shoes', name: 'Sapatos & Pisantes', icon: 'hiking', color: 'bg-stone-600', desc: 'Calçados e Conforto', tone: 'Prático e Estiloso', audience: 'Geral / Consumo Urbano' },
            { id: 'home', name: 'Casa & Decoração', icon: 'home_pin', color: 'bg-teal-600', desc: 'Ambientes e Design', tone: 'Acheconhante e Inspirador', audience: 'Donos de Casa / Fãs de Decor' },
            { id: 'appliances', name: 'Eletrodomésticos', icon: 'kitchen', color: 'bg-slate-500', desc: 'Cozinha e Praticidade', tone: 'Utilitário e Familiar', audience: 'Donos de Casa / Famílias' },
            { id: 'daily_tools', name: 'Guia de Utilidades', icon: 'construction', color: 'bg-orange-400', desc: 'Ferramentas do Dia a Dia', tone: 'Prático e Simples', audience: 'Geral / Buscadores de Facilidades' },
            { id: 'sports', name: 'Futebol & Esportes', icon: 'sports_soccer', color: 'bg-emerald-800', desc: 'Paixão Nacional', tone: 'Dinâmico e Apaixonado', audience: 'Público Masculino / Torcedores' },
            { id: 'movies', name: 'Filmes & Séries', icon: 'movie_filter', color: 'bg-indigo-600', desc: 'Entretenimento Elite', tone: 'Crítico e Entusiasmado', audience: 'Cinéfilos / Maratoneiros' },
            { id: 'pet_health', name: 'Saúde do Pet', icon: 'medical_services', color: 'bg-red-400', desc: 'Cuidado Veterinário', tone: 'Cuidado e Instrutivo', audience: 'Donos de Pets / Pais de Pet' },
            { id: 'pet_food', name: 'Culinária Pet Natural', icon: 'set_meal', color: 'bg-green-500', desc: 'Nutrição Animal', tone: 'Nutritivo e Natural', audience: 'Donos de Pets Saudáveis' },
            { id: 'bio_expert', name: 'Bio & Curiosity Master', icon: 'account_box', color: 'bg-indigo-700', desc: 'Biografias e Dados', tone: 'Informativo e Curioso', audience: 'Fãs e Buscadores de Dados' },
            { id: 'games', name: 'Games & E-sports', icon: 'sports_esports', color: 'bg-indigo-500', desc: 'Hardware e Gameplay', tone: 'Entusiasmado e Técnico', audience: 'Gamers / Tech Seekers' },
            { id: 'fights', name: 'Combate & MMA', icon: 'sports_mma', color: 'bg-red-800', desc: 'UFC e Boxe', tone: 'Intenso e Analítico', audience: 'Fãs de Lutas / Atletas' },
            { id: 'racing', name: 'Racing & F1', icon: 'speed', color: 'bg-stone-800', desc: 'Automobilismo Elite', tone: 'Veloz e Técnico', audience: 'Fãs de Velocidade / F1' },
            { id: 'watch_guide', name: 'Guia: Onde Assistir', icon: 'live_tv', color: 'bg-rose-500', desc: 'Agenda de Transmissão', tone: 'Direto e Prático', audience: 'Torcedores / Público de TV' },
            { id: 'anti_gambi', name: 'Filtro Anti-Gambi', icon: 'gpp_bad', color: 'bg-orange-700', desc: 'Manu: Reviews Sinceros', tone: 'Sarcástico e Sincero (SP)', audience: 'Consumidores Savvy / Anti-Cilada' },
            { id: 'vlog', name: 'Vlog Master', icon: 'videocam', color: 'bg-red-500', desc: 'Roteiros YouTube', tone: 'Dinâmico e Envolvente', audience: 'Espectadores de YT / Social Media' },
            { id: 'dark_review', name: 'Dark Review Script', icon: 'shopping_bag', color: 'bg-emerald-600', desc: 'YouTube Shopping', tone: 'Direto e Conversivo', audience: 'Compradores Online / Review Hunters' }
        ];
    }

    saveState() {
        localStorage.setItem('escritor_master_state', JSON.stringify(this.state));
    }

    init() {
        console.log("Escritor Master Engine Initialized.");
        this.switchModule('growth');
        
        // Ativar animações de entrada
        document.body.classList.add('animate-in');
    }

    switchModule(moduleId) {
        this.state.currentModule = moduleId;
        
        // Atualizar Navegação
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if(item.getAttribute('data-module') === moduleId) {
                item.classList.add('active');
            }
        });

        // Atualizar Título no Topo
        const titles = {
            'dashboard': 'Painel Estratégico',
            'editor': 'Editor de Conteúdo Soberano',
            'monetization': 'Fluxo de Monetização',
            'growth': 'Growth Hub & Distribuição',
            'backlinks': 'Fábrica de Autoridade (Backlinks)'
        };
        document.getElementById('module-title-top').innerText = titles[moduleId] || 'Blog Master';

        // Renderizar Módulo
        this.renderModule(moduleId);
    }

    renderModule(moduleId) {
        const container = document.getElementById('main-content');
        container.innerHTML = ''; // Limpar container

        switch(moduleId) {
            case 'dashboard':
                container.innerHTML = this.getDashboardHTML();
                break;
            case 'architect':
                container.innerHTML = this.getArchitectHTML();
                break;
            case 'library':
                container.innerHTML = this.getLibraryHTML();
                break;
            case 'growth':
                container.innerHTML = this.getGrowthHubHTML();
                break;
            case 'editor':
                container.innerHTML = this.getEditorHTML();
                break;
            case 'monetization':
                container.innerHTML = this.getMonetizationHTML();
                break;
            case 'backlinks':
                container.innerHTML = this.getBacklinksHTML();
                break;
            default:
                container.innerHTML = `
                    <div class="h-full flex flex-col items-center justify-center text-center p-12 space-y-4">
                        <div class="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center">
                            <span class="material-symbols-outlined text-4xl text-text-secondary">construction</span>
                        </div>
                        <h3 class="text-xl font-bold uppercase tracking-widest">Em Construção</h3>
                        <p class="text-text-secondary max-w-md">O módulo ${moduleId.toUpperCase()} está sendo otimizado pela nossa IA de arquitetura.</p>
                        <button onclick="engine.switchModule('growth')" class="px-6 py-2 bg-primary/20 text-primary border border-primary/30 rounded-lg text-xs font-bold uppercase">Voltar ao Growth Hub</button>
                    </div>
                `;
        }
    }

    getGrowthHubHTML() {
        return `
            <div class="max-w-7xl mx-auto p-8 space-y-12 animate-in">
                <!-- Header Section -->
                <section class="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div class="space-y-2">
                        <h2 class="text-4xl font-bold font-headline tracking-tight text-text-primary">Growth Hub</h2>
                        <p class="text-text-secondary font-body text-xl max-w-xl leading-relaxed">
                            Amplify your voice. Distribute your sovereign content across the digital landscape with surgical precision.
                        </p>
                    </div>
                    <div class="flex gap-3">
                        <div class="flex items-center gap-2 bg-secondary/10 px-4 py-2 rounded-full text-secondary font-bold text-sm border border-secondary/20">
                            <span class="material-symbols-outlined text-lg">bolt</span>
                            Momentum Viral: +24%
                        </div>
                    </div>
                </section>

                <!-- Bento Grid -->
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div class="lg:col-span-8 bg-surface/40 border border-border rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
                        <div class="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <div class="flex items-center justify-between mb-8 relative z-10">
                            <h3 class="text-xl font-headline font-bold">Content Distribution Queue</h3>
                            <div class="flex gap-2">
                                <button class="p-2 rounded-xl bg-white/5 text-text-secondary hover:text-white transition-all"><span class="material-symbols-outlined">chevron_left</span></button>
                                <button class="p-2 rounded-xl bg-white/5 text-text-secondary hover:text-white transition-all"><span class="material-symbols-outlined">chevron_right</span></button>
                            </div>
                        </div>
                        <div class="grid grid-cols-7 gap-4 mb-4 text-center relative z-10">
                            ${['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map(d => `<span class="text-[10px] font-bold text-text-secondary/40 uppercase tracking-widest">${d}</span>`).join('')}
                        </div>
                        <div class="grid grid-cols-7 gap-4 h-[350px] relative z-10">
                            <div class="bg-white/[0.01] rounded-2xl p-2 flex flex-col items-center justify-center opacity-20 border border-border">12</div>
                            <div class="bg-white/[0.01] rounded-2xl p-2 flex flex-col items-center justify-center opacity-20 border border-border">13</div>
                            <div class="bg-white/[0.03] border-2 border-dashed border-border rounded-2xl p-4 flex flex-col items-center justify-start group hover:bg-white/[0.05] transition-all">
                                <span class="text-xs font-bold text-text-secondary mb-3">14</span>
                                <div class="w-full bg-primary/20 border border-primary/30 p-2 rounded-lg text-[9px] text-primary font-bold">BLOG LAUNCH</div>
                            </div>
                            <div class="bg-white/[0.03] border border-border rounded-2xl p-4 flex flex-col items-center justify-start">
                                <span class="text-xs font-bold text-text-primary mb-3">15</span>
                                <div class="w-full bg-secondary/20 border border-secondary/30 p-2 rounded-lg text-[9px] text-secondary font-bold mb-2">PINTEREST BLAST</div>
                                <div class="w-full bg-blue-500/20 border border-blue-500/30 p-2 rounded-lg text-[9px] text-blue-300 font-bold">TIKTOK POST</div>
                            </div>
                            <div class="bg-white/[0.05] ring-2 ring-primary/50 rounded-2xl p-4 flex flex-col items-center justify-center">
                                <span class="text-xs font-bold text-primary mb-3">16</span>
                                <span class="material-symbols-outlined text-primary text-3xl">add_circle</span>
                            </div>
                            <div class="bg-white/[0.01] rounded-2xl p-2 flex flex-col items-center justify-center border border-border opacity-20">17</div>
                            <div class="bg-white/[0.01] rounded-2xl p-2 flex flex-col items-center justify-center border border-border opacity-20">18</div>
                        </div>
                    </div>

                    <div class="lg:col-span-4 bg-primary rounded-[2.5rem] p-8 overflow-hidden relative min-h-[400px] shadow-2xl group flex flex-col justify-between">
                        <div class="relative z-10">
                            <h3 class="text-2xl font-headline font-bold text-white mb-2">Local SEO Targeting</h3>
                            <p class="text-white/60 text-sm font-body italic">Regional influence for 'The Sovereign Editor'</p>
                        </div>
                        <div class="relative z-10 space-y-4">
                            <div class="bg-white/10 backdrop-blur-xl p-5 rounded-2xl flex items-center justify-between border border-white/20 hover:bg-white/20 transition-all cursor-pointer">
                                <div>
                                    <p class="text-[10px] text-white/40 uppercase tracking-widest mb-1">Região Atual</p>
                                    <p class="font-bold text-white">São Paulo, SP</p>
                                </div>
                                <span class="material-symbols-outlined text-white">my_location</span>
                            </div>
                            <div class="flex flex-wrap gap-2">
                                <span class="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold text-white border border-white/10">Tech Hubs</span>
                                <span class="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold text-white border border-white/10">European Markets</span>
                            </div>
                        </div>
                        <div class="absolute inset-0 opacity-20 mt-20 scale-125 group-hover:scale-150 transition-transform duration-[15s]">
                            <img src="https://picsum.photos/seed/map/800/800" class="w-full h-full object-cover grayscale invert" alt="map">
                        </div>
                        <div class="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent"></div>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="bg-white/5 border border-border rounded-[2.5rem] p-10 shadow-xl group hover:border-primary/30 transition-all">
                        <div class="flex items-center gap-4 mb-8">
                             <div class="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-red-500/20">
                                <span class="material-symbols-outlined">push_pin</span>
                            </div>
                            <h3 class="text-2xl font-headline font-bold">Pinterest Assets</h3>
                        </div>
                        <div class="space-y-4">
                            <div class="p-6 bg-white/[0.02] border border-border rounded-2xl flex justify-between items-start group-hover:bg-white/[0.04]">
                                <div>
                                    <p class="text-[10px] font-bold text-primary mb-2 uppercase tracking-widest">Variation 01</p>
                                    <p class="font-body text-xl text-text-primary">10 Ways to Master the Art of Sovereign Writing in 2024</p>
                                </div>
                                <button class="p-3 bg-white/5 rounded-xl hover:bg-primary transition-all"><span class="material-symbols-outlined text-sm">content_copy</span></button>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white/5 border border-border rounded-[2.5rem] p-10 shadow-xl group hover:border-primary/30 transition-all">
                        <div class="flex items-center gap-4 mb-8">
                             <div class="w-12 h-12 bg-black rounded-2xl border border-white/20 flex items-center justify-center text-white">
                                <span class="material-symbols-outlined">movie</span>
                            </div>
                            <h3 class="text-2xl font-headline font-bold">TikTok Scripts</h3>
                        </div>
                        <div class="bg-white/[0.03] p-8 rounded-3xl border border-border relative">
                            <div class="absolute -top-3 left-6 bg-secondary text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase">Hooks That Sell</div>
                            <p class="font-body text-lg italic text-text-secondary mt-4 leading-relaxed line-clamp-2">"Ever feel like your writing is lost in a sea of AI noise?"</p>
                            <button class="mt-6 flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest hover:text-white transition-all">
                                <span class="material-symbols-outlined text-sm">content_copy</span> Copy Full Script
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getEditorHTML() {
        return `
            <div class="h-full flex flex-col animate-in">
                <div class="flex-1 flex overflow-hidden">
                    <!-- Editor Sidebar -->
                    <aside class="w-[450px] border-r border-border bg-surface/30 overflow-y-auto p-10 space-y-12">
                        <section class="space-y-8">
                            <div>
                                <h3 class="text-[10px] font-bold text-text-secondary uppercase tracking-[0.3em] mb-6">01. Persona Master</h3>
                                <div class="grid grid-cols-2 gap-4">
                                    ${this.personasData.map(p => `
                                        <div onclick="engine.setPersona('${p.id}')" 
                                             class="persona-card p-4 rounded-2xl border ${this.state.config.persona === p.id ? 'border-primary bg-primary/5' : 'border-border bg-white/[0.02]'} flex flex-col gap-3 cursor-pointer hover:border-primary/50 transition-all relative overflow-hidden group">
                                            ${this.state.config.persona === p.id ? '<div class="absolute top-0 right-0 w-8 h-8 bg-primary rounded-bl-xl flex items-center justify-center animate-in"><span class="material-symbols-outlined text-white text-xs">done</span></div>' : ''}
                                            <div class="flex items-center gap-3">
                                                <div class="w-10 h-10 ${p.color} rounded-lg flex items-center justify-center text-white shadow-lg shadow-black/20 shrink-0">
                                                    <span class="material-symbols-outlined">${p.icon}</span>
                                                </div>
                                                <div>
                                                    <p class="text-xs font-bold text-text-primary group-hover:text-primary transition-colors">${p.name}</p>
                                                    <p class="text-[9px] text-text-secondary uppercase tracking-widest">${p.desc}</p>
                                                </div>
                                            </div>
                                            <div class="flex flex-wrap gap-1">
                                                <span class="text-[7px] font-bold px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-text-secondary uppercase tracking-tighter">${p.tone}</span>
                                                <span class="text-[7px] font-bold px-1.5 py-0.5 rounded bg-primary/10 border border-primary/10 text-primary uppercase tracking-tighter">${p.audience}</span>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>

                            <div class="space-y-4">
                                <div class="flex items-center justify-between p-6 bg-primary/10 border border-primary/20 rounded-2xl mb-4 group cursor-pointer" onclick="engine.toggleDiscover()">
                                    <div class="flex items-center gap-3">
                                        <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-lg">
                                            <span class="material-symbols-outlined text-sm">trending_up</span>
                                        </div>
                                        <div>
                                            <p class="text-[10px] font-bold uppercase tracking-widest text-primary">Modo Discover 2026</p>
                                            <p class="text-[8px] text-text-secondary uppercase">Textos Curtos & Virais (600 palavras)</p>
                                        </div>
                                    </div>
                                    <div class="w-12 h-6 bg-border rounded-full relative p-1 transition-all ${this.state.config.discoverMode ? 'bg-primary' : ''}">
                                        <div class="w-4 h-4 bg-white rounded-full transition-all ${this.state.config.discoverMode ? 'translate-x-6' : ''}"></div>
                                    </div>
                                </div>
                                <div class="border-2 border-dashed border-border rounded-[2rem] p-10 flex flex-col items-center justify-center gap-4 hover:border-primary/50 transition-all cursor-pointer group bg-white/[0.01]">
                                    <span class="material-symbols-outlined text-4xl text-text-secondary group-hover:text-primary">video_library</span>
                                    <div class="text-center">
                                        <p class="text-xs font-bold">Análise Visual Gemini</p>
                                        <p class="text-[10px] text-text-secondary mt-1">Transforme vídeos em artigos</p>
                                    </div>
                                </div>
                                <textarea id="topic-input" class="w-full bg-white/[0.03] border border-border rounded-2xl p-6 text-sm text-text-primary placeholder:text-text-secondary/30 focus:ring-2 focus:ring-primary/50 h-40 transition-all resize-none" placeholder="Qual será o tema do artigo soberano de hoje?"></textarea>
                            </div>

                            <button id="generate-btn" onclick="engine.generateContent()" class="w-full py-5 bg-primary text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl shadow-xl shadow-primary/20 hover:scale-[0.98] transition-all glow-primary">
                                Gerar Obra-Prima SEO
                            </button>

                            <div id="editor-actions" class="hidden flex flex-col gap-3 mt-6 animate-in">
                                <p class="text-[9px] font-bold text-emerald-500 uppercase tracking-widest text-center mb-1">Página Pronta para Publicar</p>
                                <div class="flex gap-3">
                                    <button onclick="engine.exportAsHTML()" class="flex-1 py-4 bg-emerald-600 text-white font-bold text-[10px] uppercase tracking-widest rounded-2xl hover:bg-emerald-500 transition-all flex items-center justify-center gap-2">
                                        <span class="material-symbols-outlined text-sm">download</span> Baixar Página
                                    </button>
                                    <button class="px-6 py-4 bg-white/5 border border-border text-white rounded-2xl hover:bg-white/10 transition-all">
                                        <span class="material-symbols-outlined text-sm">share</span>
                                    </button>
                                </div>
                            </div>
                        </section>
                    </aside>

                    <!-- Preview Area -->
                    <main id="editor-preview" class="flex-1 bg-black/40 overflow-y-auto p-12 relative">
                         <div id="editor-placeholder" class="h-full flex flex-col items-center justify-center text-center space-y-8 opacity-40">
                            <div class="w-24 h-24 bg-white/[0.02] border border-border rounded-[2.5rem] flex items-center justify-center">
                                <span class="material-symbols-outlined text-5xl">edit_document</span>
                            </div>
                            <div class="space-y-2">
                                <h3 class="text-2xl font-headline font-bold text-text-primary">Aguardando Brainstorm</h3>
                                <p class="text-sm text-text-secondary max-w-sm mx-auto">Configure os dados à esquerda para iniciar o processo de síntese textual.</p>
                            </div>
                         </div>
                    </main>
                </div>
            </div>
        `;
    }

    setPersona(id) {
        this.state.config.persona = id;
        this.saveState();
        this.renderModule('editor');
    }

    toggleDiscover() {
        this.state.config.discoverMode = !this.state.config.discoverMode;
        this.saveState();
        this.renderModule('editor');
    }

    generateContent() {
        const topic = document.getElementById('topic-input').value;
        if(!topic) return alert("Por favor, digite um tema.");

        document.getElementById('generate-btn').innerText = "Gerando Artigo...";
        document.getElementById('generate-btn').disabled = true;

        const preview = document.getElementById('editor-preview');
        const selectedPersona = this.state.config.persona;
        const personaData = this.personasData.find(p => p.id === selectedPersona) || { tone: 'Geral', audience: 'Geral' };

        preview.innerHTML = `
            <div class="h-full flex flex-col items-center justify-center text-center space-y-6">
                <div class="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <div class="space-y-4">
                   <div>
                    <h3 class="text-xl font-bold uppercase tracking-widest text-primary">Sintetizando...</h3>
                    <p class="text-text-secondary text-xs uppercase tracking-[0.2em] mt-2">Aplicando Regras de SEO e GEO 2026</p>
                   </div>
                   <div class="flex items-center justify-center gap-3">
                        <div class="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[9px] text-text-secondary uppercase tracking-widest">Tom: ${personaData.tone}</div>
                        <div class="px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-[9px] text-primary uppercase tracking-widest">Público: ${personaData.audience}</div>
                   </div>
                </div>
            </div>
        `;

        // Simulando delay de geração
        setTimeout(() => {
            const isDiscover = this.state.config.discoverMode;
            const isVlog = this.state.config.persona === 'vlog' || this.state.config.persona === 'dark_review';
            const articleLength = isDiscover ? 'APROX. 600 PALAVRAS (FOCO EM HYPE)' : 'APROX. 1500 PALAVRAS (FOCO EM SEO)';
            const articleContent = isDiscover ? 
                `[CONTEÚDO VIRAL DISCOVER ATIVADO]\n\nEste artigo foi sintetizado com gatilhos de curiosidade, frases curtas e foco em leitura mobile ultra-rápida. Extensão ideal para o feed do Google: 580 palavras.\n\nLink Afiliado Sugerido: link.amazon.com/produto-nicho-hype` :
                `[CONTEÚDO SOBERANO SEO ATIVADO]\n\nEste guia completo de 1550 palavras cobre todos os aspectos técnicos e atemporais do tema, garantindo autoridade máxima no ranking orgânico a longo prazo.\n\nEstrutura H1-H2-H3 completa e tabelas de dados incluídas.`;

            this.state.lastGenerated = {
                title: topic.toUpperCase(),
                content: articleContent + (isVlog ? "\n\n[ROTEIRO DE VÍDEO COMPLIANT GERADO]" : ""),
                shoppingTags: isVlog ? "01:45 - Mercado Livre | 05:20 - Shopee" : "",
                mode: isDiscover ? 'DISCOVER' : 'SEO'
            };
            
            // Adicionar ao Histórico
            this.state.history.unshift({
                id: Date.now(),
                title: topic.toUpperCase(),
                content: this.state.lastGenerated.content,
                persona: this.state.config.persona,
                date: new Date().toLocaleDateString()
            });

            // Atualizar Stats
            this.state.stats.totalPosts++;
            this.state.stats.projectedClicks += 1500;
            this.state.stats.estimatedRevenue += 12.5; 
            
            if(this.state.config.persona === 'dark_review') {
                this.state.stats.affiliateSales += 1;
                this.state.stats.affiliateRevenue += 75.00; // Média Mentoria (10% de R$ 750)
            }
            this.saveState();

            document.getElementById('generate-btn').innerText = "Gerar Novo Artigo";
            document.getElementById('generate-btn').disabled = false;
            document.getElementById('editor-actions').classList.remove('hidden');

            const shoppingHTML = isVlog ? `
                <div class="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-2">
                    <p class="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">YouTube Shopping Tags Sugeridas</p>
                    <div class="flex gap-4">
                        <div class="flex-1 text-[10px] text-white"><b>01:45</b> - Taggear: ${topic} (Mercado Livre)</div>
                        <div class="flex-1 text-[10px] text-white"><b>05:20</b> - Taggear: Complemento (Shopee)</div>
                    </div>
                </div>
            ` : '';

            preview.innerHTML = `
                <div class="max-w-3xl mx-auto space-y-8 animate-in pb-20">
                    <div class="flex items-center gap-2 text-[10px] font-bold text-secondary uppercase tracking-[0.3em]">
                        <span class="material-symbols-outlined text-sm">check_circle</span> Conteúdo YouTube Shopping Ready
                    </div>
                    ${shoppingHTML}
                    <h1 class="text-5xl font-headline font-bold leading-tight text-white">${topic.toUpperCase()}</h1>
                    <div class="p-8 bg-white/5 border border-border rounded-3xl space-y-6 font-body text-xl text-text-secondary leading-relaxed">
                        <p>${articleContent}</p>
                        <div class="p-6 bg-primary/10 border border-dashed border-primary/30 rounded-2xl text-center">
                            <p class="text-[10px] uppercase font-bold text-primary tracking-widest">[ ANÚNCIO ADSENSE AQUI - ALTO CTR ]</p>
                        </div>
                        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-6">
                        <div class="p-6 bg-surface border border-border rounded-2xl space-y-4">
                             <div class="flex items-center justify-between">
                                <h4 class="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Estratégia de Backlinks (80% ROI)</h4>
                                <span class="bg-primary/20 text-primary text-[8px] px-2 py-0.5 rounded-full font-bold">ESSENCIAL</span>
                             </div>
                             <div class="space-y-3">
                                <div class="bg-white/5 p-3 rounded-lg">
                                    <p class="text-[9px] text-text-secondary uppercase mb-1">Texto Âncora Ideal:</p>
                                    <p class="text-xs font-bold text-text-primary">"melhor curso de ${topic} 2026"</p>
                                </div>
                                <div class="bg-white/5 p-3 rounded-lg">
                                    <p class="text-[9px] text-text-secondary uppercase mb-1">Página de Destino:</p>
                                    <p class="text-xs font-bold text-primary">/lp-${topic.toLowerCase().replace(/ /g, '-')}</p>
                                </div>
                             </div>
                        </div>
                        <div class="p-6 bg-surface border border-border rounded-2xl space-y-4">
                             <h4 class="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Ativos de Distribuição</h4>
                             <div class="space-y-2">
                                <div class="flex items-center gap-2 text-[10px] text-text-primary">
                                    <span class="material-symbols-outlined text-red-500 text-xs">push_pin</span> 3 Títulos Pinterest Prontos
                                </div>
                                <div class="flex items-center gap-2 text-[10px] text-text-primary">
                                    <span class="material-symbols-outlined text-white text-xs">movie</span> Roteiro TikTok (Gancho + Loop)
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            `;
        }, 2000);
    }

    exportAsHTML() {
        this.saveState();
        const { title, content } = this.state.lastGenerated;
        if(!title) return;
        
        const template = `
            <!DOCTYPE html>
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <title>${title}</title>
                <style>
                    body { font-family: sans-serif; line-height: 1.6; max-width: 800px; margin: 40px auto; padding: 20px; }
                    h1 { color: #333; }
                </style>
            </head>
            <body>
                <h1>${title}</h1>
                <div>${content}</div>
                <hr>
                <p>Gerado por Escritor Blog Master (v2.0 Soberana)</p>
            </body>
            </html>
        `;

        const blob = new Blob([template], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title.toLowerCase().replace(/ /g, '-')}.html`;
        a.click();
        URL.revokeObjectURL(url);
    }

    getDashboardHTML() {
        const totalProfitR$ = (this.state.stats.estimatedRevenue * 5.1).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        
        return `
            <div class="p-12 space-y-12 animate-in max-w-7xl mx-auto">
                <header class="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div class="space-y-2">
                        <h2 class="text-4xl font-headline font-bold text-text-primary">Centro de Operações</h2>
                        <p class="text-text-secondary font-body text-xl">Visão executiva das suas propriedades digitais soberanas.</p>
                    </div>
                </header>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="glass-panel p-8 space-y-4 border-l-4 border-l-primary">
                        <p class="text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em]">Poder de Fogo</p>
                        <h3 class="text-5xl font-headline font-bold text-primary">${this.state.stats.totalPosts} <span class="text-base text-text-secondary">Posts</span></h3>
                        <p class="text-[10px] text-emerald-500 font-bold">● Ativo em GitHub Pages</p>
                    </div>
                    <div class="glass-panel p-8 space-y-4 border-l-4 border-l-secondary">
                        <p class="text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em]">Alcance Projetado</p>
                        <h3 class="text-5xl font-headline font-bold text-secondary">${this.state.stats.projectedClicks.toLocaleString()} <span class="text-base text-text-secondary">Acessos</span></h3>
                        <p class="text-[10px] text-text-secondary italic">Benchmark Jorge Torres v1.2</p>
                    </div>
                    <div class="glass-panel p-8 space-y-4 border-l-4 border-l-orange-500 bg-orange-500/5">
                        <p class="text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em]">Lucro Líquido AdSense</p>
                        <h3 class="text-4xl font-headline font-bold text-orange-500">$${this.state.stats.estimatedRevenue.toFixed(2)}</h3>
                        <p class="text-2xl font-bold text-white">${totalProfitR$}</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="glass-panel p-8 flex items-center justify-between border-t-4 border-t-emerald-500 bg-emerald-500/5">
                        <div class="space-y-1">
                            <p class="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">YouTube Shopping & Afiliados</p>
                            <h4 class="text-3xl font-headline font-bold text-white">${(this.state.stats.affiliateRevenue || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h4>
                            <p class="text-[10px] text-text-secondary uppercase">${this.state.stats.affiliateSales || 0} Conversões Projetadas</p>
                        </div>
                        <span class="material-symbols-outlined text-4xl text-emerald-500">shopping_cart_checkout</span>
                    </div>
                    <div class="glass-panel p-8 flex items-center justify-between border-t-4 border-t-primary bg-primary/5">
                         <div class="space-y-1">
                            <p class="text-[10px] font-bold text-primary uppercase tracking-widest">Métrica v2.0 Soberana (ROI Total)</p>
                            <h4 class="text-3xl font-headline font-bold text-white">${(this.state.stats.estimatedRevenue * 5.1 + (this.state.stats.affiliateRevenue || 0)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h4>
                            <p class="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Aprovação 2026 Ready</p>
                        </div>
                        <span class="material-symbols-outlined text-4xl text-primary">analytics</span>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div class="glass-panel p-10 bg-surface/50">
                        <h4 class="text-xl font-headline font-bold mb-6">Roadmap de Crescimento (7 Meses)</h4>
                        <div class="space-y-6">
                            <div class="flex items-center gap-4">
                                <div class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">M1</div>
                                <div class="flex-1 h-2 bg-white/5 rounded-full overflow-hidden"><div class="w-[15%] h-full bg-primary"></div></div>
                                <span class="text-[10px] text-text-secondary uppercase">Sandbox</span>
                            </div>
                            <div class="flex items-center gap-4">
                                <div class="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold text-xs">M4</div>
                                <div class="flex-1 h-2 bg-white/5 rounded-full overflow-hidden"><div class="w-[60%] h-full bg-secondary"></div></div>
                                <span class="text-[10px] text-text-secondary uppercase">Aprovação</span>
                            </div>
                            <div class="flex items-center gap-4 opacity-50">
                                <div class="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 font-bold text-xs">M7</div>
                                <div class="flex-1 h-2 bg-white/5 rounded-full overflow-hidden"><div class="w-[100%] h-full bg-orange-500"></div></div>
                                <span class="text-[10px] text-text-secondary uppercase tracking-widest">Lucro Total</span>
                            </div>
                        </div>
                    </div>
                    <div class="glass-panel p-10 flex flex-col justify-between">
                         <div>
                            <h4 class="text-xl font-headline font-bold mb-2 text-primary">Custo Zero de Operação</h4>
                            <p class="text-text-secondary text-sm">Sua infraestrutura está otimizada para o modo Bootstrap.</p>
                         </div>
                         <div class="space-y-3 mt-8">
                            <div class="flex justify-between text-xs py-2 border-b border-white/5"><span>Hospedagem (GitHub)</span> <span class="text-emerald-500 font-bold">R$ 0,00</span></div>
                            <div class="flex justify-between text-xs py-2 border-b border-white/5"><span>Motor de Artigos</span> <span class="text-emerald-500 font-bold">R$ 0,00</span></div>
                            <div class="flex justify-between text-xs py-2 border-b border-white/5"><span>Plugins / Ferramentas</span> <span class="text-emerald-500 font-bold">R$ 0,00</span></div>
                         </div>
                         <div class="mt-6 p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 flex items-center gap-3">
                            <span class="material-symbols-outlined text-emerald-500">verified</span>
                            <p class="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Estratégia Anti-Crise Ativada</p>
                         </div>
                    </div>
                </div>
            </div>
        `;
    }

    getMonetizationHTML() {
        return `
            <div class="p-12 animate-in max-w-4xl mx-auto space-y-12">
                <header class="space-y-2">
                    <h2 class="text-4xl font-headline font-bold">Painel de Monetização</h2>
                    <p class="text-text-secondary font-body">Configure onde e como seu dinheiro será gerado.</p>
                </header>

                <div class="space-y-8">
                    <section class="glass-panel p-10 space-y-6">
                        <div class="flex items-center gap-4 mb-4">
                             <div class="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center text-white"><span class="material-symbols-outlined">payments</span></div>
                             <div>
                                <h3 class="text-xl font-bold">Google AdSense</h3>
                                <p class="text-xs text-text-secondary tracking-widest uppercase">ID do Publicador</p>
                             </div>
                        </div>
                        <input type="text" id="adsense-id" value="${this.state.config.adsenseId}" class="w-full bg-white/5 border border-border rounded-xl p-4 text-white focus:ring-2 focus:ring-primary" placeholder="pub-xxxxxxxxxxxxxxxx">
                        <button onclick="engine.saveMonetization()" class="w-full py-4 bg-primary text-white font-bold rounded-xl hover:scale-[0.98] transition-all">Salvar Configurações</button>
                    </section>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div class="glass-panel p-8 space-y-4">
                            <h4 class="font-bold text-primary">Mapa de Calor AdSense</h4>
                            <p class="text-xs text-text-secondary leading-relaxed">Nossos templates já incluem placeholders no topo e no meio do conteúdo para maximizar o CTR.</p>
                        </div>
                        <div class="glass-panel p-8 space-y-4">
                            <h4 class="font-bold text-secondary">Afiliação Soberana</h4>
                            <p class="text-xs text-text-secondary leading-relaxed">Use links do Amazon ou Hotmart dentro do Editor para diversificar sua fonte de ganhos.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    saveMonetization() {
        this.state.config.adsenseId = document.getElementById('adsense-id').value;
        this.saveState();
        alert("Configurações financeiras salvas na memória local!");
    }

    getArchitectHTML() {
        const lastTitle = this.state.lastGenerated ? this.state.lastGenerated.title : '';
        const lastContent = this.state.lastGenerated ? this.state.lastGenerated.content : '';

        return `
            <div class="p-12 animate-in max-w-6xl mx-auto space-y-12 pb-40">
                <header class="space-y-4">
                    <h2 class="text-4xl font-headline font-bold">Arquiteto de Design</h2>
                    <p class="text-text-secondary font-body text-xl">Cole seu design visual e revise seu conteúdo antes da injeção final.</p>
                </header>

                <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <!-- Discovery Booster (NEW) -->
                    <div class="lg:col-span-4 space-y-8">
                         <div class="bg-surface/40 border border-border rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
                             <div class="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                             <div class="relative z-10 space-y-6">
                                 <div class="flex items-center justify-between">
                                     <h3 class="text-xl font-headline font-bold">Discover Booster</h3>
                                     <div class="px-3 py-1 bg-primary/20 text-primary text-[10px] font-bold rounded-full border border-primary/30">SCORE: <span id="discover-score">85</span></div>
                                 </div>
                                 
                                 <div class="space-y-4">
                                     <div class="flex items-center gap-3">
                                         <div class="w-6 h-6 rounded bg-emerald-500/20 flex items-center justify-center"><input type="checkbox" checked class="accent-emerald-500"></div>
                                         <p class="text-[10px] text-text-primary uppercase font-bold">Hero Image 1200px+</p>
                                     </div>
                                     <div class="flex items-center gap-3">
                                         <div class="w-6 h-6 rounded bg-emerald-500/20 flex items-center justify-center"><input type="checkbox" checked class="accent-emerald-500"></div>
                                         <p class="text-[10px] text-text-primary uppercase font-bold">Palavras no Título < 100</p>
                                     </div>
                                     <div class="flex items-center gap-3">
                                         <div class="w-6 h-6 rounded bg-emerald-500/20 flex items-center justify-center"><input type="checkbox" id="check-affiliate" class="accent-emerald-500"></div>
                                         <p class="text-[10px] text-text-primary uppercase font-bold">Links de Afiliação Inseridos</p>
                                     </div>
                                     <div class="flex items-center gap-3">
                                         <div class="w-6 h-6 rounded bg-emerald-500/20 flex items-center justify-center"><input type="checkbox" checked class="accent-emerald-500"></div>
                                         <p class="text-[10px] text-text-primary uppercase font-bold">Mobile First (HTML Puro)</p>
                                     </div>
                                 </div>

                                 <div class="p-6 bg-white/5 border border-border rounded-2xl">
                                     <p class="text-[9px] text-text-secondary uppercase mb-2">Sugestão Jorge Torres:</p>
                                     <p class="text-[11px] text-primary italic leading-relaxed">
                                         "Insira um 'Achadinho' Amazon ou Elo7 no meio do texto para monetizar além do AdSense."
                                     </p>
                                 </div>
                             </div>
                         </div>

                         <div class="bg-indigo-600/10 border border-indigo-500/20 rounded-[2rem] p-6 space-y-3">
                             <div class="flex items-center gap-2 text-indigo-400">
                                 <span class="material-symbols-outlined text-sm">auto_awesome</span>
                                 <span class="text-[10px] font-bold uppercase tracking-widest">Web Stories Ready</span>
                             </div>
                             <p class="text-[10px] text-text-secondary">Seu conteúdo foi estruturado para rápida conversão em Stories horizontais.</p>
                         </div>
                    </div>

                    <!-- Painel de Revisão -->
                    <div class="lg:col-span-4 space-y-6 bg-surface/30 p-8 rounded-3xl border border-border">
                        <div class="flex items-center justify-between border-b border-border pb-4">
                            <h3 class="text-sm font-bold uppercase tracking-widest text-primary">Painel de Revisão (Finalização)</h3>
                            <div class="flex flex-col items-end">
                                <span class="bg-emerald-500/20 text-emerald-500 text-[8px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <span class="material-symbols-outlined text-[10px]">verified_user</span> YT COMPLIANT
                                </span>
                                ${this.state.lastGenerated && this.state.lastGenerated.shoppingTags ? `
                                    <span class="bg-primary/20 text-primary text-[8px] font-bold px-2 py-0.5 rounded-full mt-1 uppercase tracking-tighter">Shopping Tags Ativas</span>
                                ` : ''}
                            </div>
                        </div>
                        
                        <div class="space-y-4">
                            <div class="space-y-2">
                                <label class="text-[9px] font-bold text-text-secondary uppercase">Título da Obra</label>
                                <input type="text" id="review-title" value="${lastTitle}" class="w-full bg-white/5 border border-border rounded-xl p-3 text-white">
                            </div>
                            <div class="space-y-2">
                                <label class="text-[9px] font-bold text-text-secondary uppercase">Conteúdo / Roteiro</label>
                                <textarea id="review-content" class="w-full h-48 bg-white/5 border border-border rounded-xl p-4 text-xs text-text-secondary leading-relaxed">${lastContent}</textarea>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                             <div class="space-y-1">
                                <label class="text-[8px] font-bold text-text-secondary uppercase italic">Foto do Post</label>
                                <input type="text" id="template-image" class="w-full bg-white/5 border border-border rounded-lg p-2 text-[10px] text-white" placeholder="ex: imagens/capa.jpg">
                             </div>
                             <div class="space-y-1">
                                <label class="text-[8px] font-bold text-text-secondary uppercase italic">Link Vídeo (YT)</label>
                                <input type="text" id="template-video" class="w-full bg-white/5 border border-border rounded-lg p-2 text-[10px] text-white" placeholder="Link do YouTube">
                             </div>
                        </div>
                    </div>

                    <!-- Importador de Design -->
                    <div class="lg:col-span-4 space-y-6">
                        <label class="text-[10px] font-bold text-text-secondary uppercase tracking-[0.3em]">Design Source (HTML/CSS)</label>
                        <textarea id="template-input" class="w-full h-[380px] bg-black/40 border border-border rounded-3xl p-6 font-mono text-[10px] text-primary focus:ring-2 focus:ring-primary outline-none" placeholder="Cole aqui o código estrutural da sua página (ex: Google Sites, Stitch)..."></textarea>
                        
                        <button onclick="engine.processTemplate()" class="w-full py-5 bg-primary text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl shadow-xl shadow-primary/20 hover:scale-[0.98] transition-all glow-primary">
                            Injetar & Ver Obra Final
                        </button>
                    </div>
                </div>

                <div id="architect-preview-container" class="hidden space-y-8 animate-in pb-20">
                         <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div class="flex items-center justify-between bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20">
                                 <div class="flex items-center gap-3">
                                    <span class="material-symbols-outlined text-emerald-500">done_all</span>
                                    <div>
                                        <p class="text-[10px] font-bold text-emerald-500 uppercase tracking-widest leading-none mb-1">Obra Pronta</p>
                                        <p class="text-[8px] text-emerald-500/70 uppercase">Caminho sugido: /${this.state.config.discoverMode ? 'viral' : 'blog'}/</p>
                                    </div>
                                 </div>
                                 <button onclick="engine.exportArchitectHTML()" class="px-6 py-2.5 bg-emerald-600 text-white font-bold text-[10px] uppercase rounded-xl hover:bg-emerald-500 transition-all flex items-center gap-2">
                                     <span class="material-symbols-outlined text-sm">download</span> Baixar HTML
                                 </button>
                            </div>

                            <button onclick="engine.toggleDeployGuide()" class="flex items-center justify-between bg-white/5 p-6 rounded-2xl border border-border hover:bg-white/10 transition-all group">
                                <div class="flex items-center gap-3 text-left">
                                    <div class="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                        <span class="material-symbols-outlined text-sm">rocket_launch</span>
                                    </div>
                                    <div>
                                        <p class="text-[10px] font-bold text-white uppercase tracking-widest leading-none mb-1">Como Publicar?</p>
                                        <p class="text-[8px] text-text-secondary uppercase">Passo a passo simplificado</p>
                                    </div>
                                </div>
                                <span class="material-symbols-outlined text-text-secondary group-hover:translate-x-1 transition-all">chevron_right</span>
                            </button>
                         </div>

                         <!-- Guia de Deploy Dinâmico -->
                         <div id="deploy-guide" class="hidden bg-surface/60 border border-primary/30 rounded-3xl p-8 animate-in shadow-2xl space-y-8">
                             <div class="flex items-center justify-between border-b border-white/5 pb-4">
                                 <div class="flex items-center gap-3">
                                     <div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white">
                                         <span class="material-symbols-outlined">${this.state.config.discoverMode ? 'cloud_upload' : 'folder_shared'}</span>
                                     </div>
                                     <div>
                                         <h4 class="text-xl font-headline font-bold">Hospedagem Sabor ${this.state.config.discoverMode ? 'Explosivo' : 'Soberano'}</h4>
                                         <p class="text-[10px] text-primary uppercase font-bold tracking-[0.2em] italic">Estratégia: ${this.state.config.discoverMode ? 'Alta Velocidade (Discover)' : 'Autoridade (Blog / SEO)'}</p>
                                     </div>
                                 </div>
                                 <button onclick="engine.toggleDeployGuide()" class="text-text-secondary hover:text-white transition-all">
                                     <span class="material-symbols-outlined">close</span>
                                 </button>
                             </div>

                             <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                 <div class="space-y-4">
                                     <h5 class="text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-2">
                                         <span class="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center text-[10px]">1</span>
                                         Plataforma Ideal
                                     </h5>
                                     <div class="p-4 bg-white/5 rounded-xl border border-border flex items-center gap-4">
                                         <div class="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-white font-black text-xs">
                                             ${this.state.config.discoverMode ? 'GIT' : 'VERCEL'}
                                         </div>
                                         <div>
                                             <p class="text-xs font-bold text-white">${this.state.config.discoverMode ? 'GitHub Pages' : 'Vercel / Netlify'}</p>
                                             <p class="text-[9px] text-text-secondary uppercase">Recomendado para esta pauta</p>
                                         </div>
                                     </div>
                                 </div>

                                 <div class="space-y-4">
                                     <h5 class="text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-2">
                                         <span class="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center text-[10px]">2</span>
                                         Onde Soltar o Arquivo?
                                     </h5>
                                     <div class="p-4 bg-primary/5 rounded-xl border border-primary/20">
                                         <p class="text-[11px] text-text-primary leading-relaxed">
                                             ${this.state.config.discoverMode ? 
                                                'Como esta pauta é para o <b>Discover</b>, suba direto na pasta <b>/viral/</b> do seu GitHub para garantir velocidade máxima.' : 
                                                'Como esta pauta é para o <b>Blog</b>, jogue este arquivo dentro da pasta <b>/blog/</b> para o Google entender sua autoridade.'}
                                         </p>
                                     </div>
                                 </div>
                             </div>

                             <div class="space-y-4">
                                 <h5 class="text-[10px] font-bold text-white uppercase tracking-widest mb-4">Tutorial "Tiazinha-Proof" (Passo a Passo)</h5>
                                 <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
                                     ${(this.state.config.discoverMode ? [
                                         { icon: 'ads_click', text: 'Abra seu GitHub' },
                                         { icon: 'upload_file', text: 'Arraste o HTML' },
                                         { icon: 'check_circle', text: 'Clique em Comitar' },
                                         { icon: 'language', text: 'Link Pronto!' }
                                     ] : [
                                         { icon: 'folder_zip', text: 'Pegue a Pasta' },
                                         { icon: 'drag_pan', text: 'Arraste na Vercel' },
                                         { icon: 'hourglass_top', text: '5 Segundos...' },
                                         { icon: 'celebration', text: 'Blog no Ar!' }
                                     ]).map(step => `
                                         <div class="flex flex-col items-center gap-3 p-4 bg-white/[0.02] border border-border rounded-2xl text-center">
                                             <span class="material-symbols-outlined text-primary text-xl">${step.icon}</span>
                                             <p class="text-[10px] text-text-secondary font-bold uppercase">${step.text}</p>
                                         </div>
                                     `).join('')}
                                 </div>
                             </div>
                         </div>

                    <div id="architect-preview" class="w-full border-4 border-white/5 rounded-[40px] overflow-hidden bg-white shadow-2xl">
                        <!-- Preview injetado aqui -->
                    </div>
                </div>
            </div>
        `;
    }

    processTemplate() {
        const template = document.getElementById('template-input').value;
        const imageUrl = document.getElementById('template-image').value || 'https://picsum.photos/seed/sovereign/1200/600';
        const videoUrl = document.getElementById('template-video').value || '';
        const title = document.getElementById('review-title').value;
        const content = document.getElementById('review-content').value;
        
        if(!template) return alert("Por favor, cole um código de design primeiro.");
        if(!title || !content) return alert("Certifique-se de que o título e o conteúdo estão preenchidos no painel de revisão.");

        // Transformar link do youtube em embed se necessário
        let finalVideoEmbed = videoUrl;
        if(videoUrl.includes('youtube.com/watch?v=')) {
            const vidId = videoUrl.split('v=')[1].split('&')[0];
            finalVideoEmbed = `https://www.youtube.com/embed/${vidId}?autoplay=0`;
        } else if(videoUrl.includes('youtu.be/')) {
            const vidId = videoUrl.split('be/')[1].split('?')[0];
            finalVideoEmbed = `https://www.youtube.com/embed/${vidId}?autoplay=0`;
        }

        let processed = template
            .replace(/{{TITULO}}/g, title)
            .replace(/{{CONTEUDO}}/g, content)
            .replace(/{{FOTO}}/g, imageUrl)
            .replace(/{{VIDEO}}/g, finalVideoEmbed);

        const previewContainer = document.getElementById('architect-preview-container');
        const previewFrame = document.getElementById('architect-preview');
        
        previewContainer.classList.remove('hidden');
        previewFrame.innerHTML = processed;
        this.state.currentProcessedTemplate = processed;
        
        previewContainer.scrollIntoView({ behavior: 'smooth' });
    }

    toggleDeployGuide() {
        const guide = document.getElementById('deploy-guide');
        guide.classList.toggle('hidden');
        if(!guide.classList.contains('hidden')) {
            guide.scrollIntoView({ behavior: 'smooth' });
        }
    }

    getLibraryHTML() {
        if(this.state.history.length === 0) {
            return `
                <div class="h-full flex flex-col items-center justify-center text-center p-20 space-y-6 opacity-30">
                    <span class="material-symbols-outlined text-7xl">history_edu</span>
                    <h3 class="text-2xl font-bold uppercase tracking-widest">Sua Biblioteca está Vazia</h3>
                    <p class="text-sm max-w-xs mx-auto">Comece a gerar artigos no Escritor Master para vê-los arquivados aqui com segurança.</p>
                </div>
            `;
        }

        return `
            <div class="p-12 animate-in max-w-6xl mx-auto space-y-8">
                <header class="space-y-2">
                    <h2 class="text-4xl font-headline font-bold">Minha Biblioteca</h2>
                    <p class="text-text-secondary font-body">Todos as suas obras-primas arquivadas localmente.</p>
                </header>

                <div class="grid grid-cols-1 gap-4">
                    ${this.state.history.map(post => `
                        <div class="glass-panel p-6 flex items-center justify-between hover:border-primary/50 transition-all group">
                            <div class="flex items-center gap-6">
                                <div class="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-text-secondary font-bold text-xs">
                                    ${post.persona.substring(0,3).toUpperCase()}
                                </div>
                                <div>
                                    <h4 class="font-bold text-lg text-text-primary group-hover:text-primary transition-colors">${post.title}</h4>
                                    <p class="text-[10px] text-text-secondary uppercase tracking-[0.2em] mt-1">${post.date} • ${post.persona} Mode</p>
                                </div>
                            </div>
                            <div class="flex gap-2">
                                <button onclick="engine.loadFromLibrary(${post.id})" class="p-3 bg-white/5 rounded-xl text-text-secondary hover:text-white hover:bg-primary transition-all flex items-center gap-2">
                                     <span class="material-symbols-outlined text-sm">visibility</span>
                                </button>
                                <button class="p-3 bg-white/5 rounded-xl text-text-secondary hover:text-red-500 transition-all">
                                     <span class="material-symbols-outlined text-sm">delete</span>
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    getBacklinksHTML() {
        return `
            <div class="p-12 animate-in max-w-7xl mx-auto space-y-12 pb-40">
                <header class="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div class="space-y-4">
                        <div class="flex items-center gap-2 text-primary">
                            <span class="material-symbols-outlined shrink-0">workspace_premium</span>
                            <span class="text-[10px] font-bold uppercase tracking-[0.3em]">SEO Power Strategy (v2026)</span>
                        </div>
                        <h2 class="text-5xl font-headline font-bold text-text-primary tracking-tight">Fábrica de Autoridade</h2>
                        <p class="text-text-secondary font-body text-xl max-w-2xl">
                            "Um Backlink tem a capacidade de gerar até <span class="text-primary font-bold italic">80% do resultado</span> de um site." - Jorge Torres
                        </p>
                    </div>
                    <div class="bg-primary/10 border border-primary/20 p-6 rounded-[2rem] flex items-center gap-4">
                        <div class="text-right">
                            <p class="text-[9px] font-bold text-text-secondary uppercase">Sites Analisados</p>
                            <p class="text-2xl font-black text-primary">700+</p>
                        </div>
                        <div class="w-px h-10 bg-primary/20"></div>
                        <div class="text-right">
                            <p class="text-[9px] font-bold text-text-secondary uppercase">Alcance Máximo</p>
                            <p class="text-2xl font-black text-secondary">DA 94+</p>
                        </div>
                    </div>
                </header>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <!-- Calculadora de Rateio -->
                    <div class="lg:col-span-1 glass-panel p-10 space-y-8 bg-gradient-to-b from-primary/10 to-transparent relative overflow-hidden group">
                        <div class="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span class="material-symbols-outlined text-8xl">calculate</span>
                        </div>
                        <div class="space-y-2 relative z-10">
                            <h3 class="text-xl font-bold font-headline">Calculadora de Rateio</h3>
                            <p class="text-[10px] text-text-secondary uppercase tracking-widest">Economia Compartilhada Sincronizada</p>
                        </div>
                        
                        <div class="space-y-6 relative z-10">
                            <div class="p-4 bg-white/5 rounded-2xl border border-white/5">
                                <p class="text-[10px] font-bold text-text-secondary uppercase mb-3">Portal Selecionado (Exemplo)</p>
                                <div class="flex items-center justify-between">
                                    <span class="text-lg font-bold">Portal IG / Terra / R7</span>
                                    <span class="text-orange-500 font-bold">R$ 1.000,00</span>
                                </div>
                            </div>
                            
                            <div class="flex items-center gap-4">
                                <div class="flex-1 h-px bg-border"></div>
                                <span class="material-symbols-outlined text-text-secondary text-sm">divide</span>
                                <div class="flex-1 h-px bg-border"></div>
                            </div>

                            <div class="p-6 bg-secondary/10 rounded-3xl border border-secondary/30 border-dashed text-center space-y-2">
                                <p class="text-[9px] font-bold text-secondary uppercase tracking-[0.2em]">Custo por Mentorista (Rateio x10)</p>
                                <h4 class="text-4xl font-black text-white">R$ 100,00</h4>
                                <p class="text-[9px] text-emerald-500/60 font-medium italic">Aceleração progressiva garantida</p>
                            </div>
                        </div>

                                <button onclick="window.open('https://chat.whatsapp.com/seu-link-aqui', '_blank')" class="w-full py-4 bg-primary text-white font-bold text-[10px] uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 hover:scale-[0.98] transition-all flex items-center justify-center gap-3 group">
                            Me Garantir no Próximo Rateio
                            <span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">bolt</span>
                        </button>
                        <p class="text-[8px] text-text-secondary text-center italic">"Fase 1: Exclusivo para Alunos e Mentorados"</p>
                    </div>

                    <!-- Portais de Elite -->
                    <div class="lg:col-span-2 glass-panel p-10 space-y-8">
                        <div class="flex items-center justify-between">
                            <div class="space-y-1">
                                <h3 class="text-xl font-bold font-headline">Portais de Elite (Sua Aceleração)</h3>
                                <p class="text-[10px] text-text-secondary uppercase tracking-widest">Domínios com Autoridade DA 90+</p>
                            </div>
                            <span class="bg-emerald-500/20 text-emerald-500 text-[8px] font-bold px-3 py-1 rounded-full uppercase">Links Contextuais Ready</span>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            ${[
                                { name: 'Portal R7 (Elite)', da: 92, speed: 'Alta', status: 'Disponível' },
                                { name: 'Portal IG (Soberano)', da: 89, speed: 'Média', status: 'Rateio Ativo' },
                                { name: 'Terra / UOL', da: 94, speed: 'Máxima', status: 'Mentoria Only' },
                                { name: 'Grandes Verticais', da: 35, speed: 'Foco Local', status: 'Escalável' }
                            ].map(p => `
                                <div class="p-5 bg-white/[0.02] border border-border rounded-2xl flex items-center justify-between hover:bg-white/[0.04] transition-all cursor-pointer group">
                                    <div class="flex items-center gap-4">
                                        <div class="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center font-bold text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                            ${p.da}
                                        </div>
                                        <div>
                                            <p class="text-xs font-bold text-text-primary group-hover:text-primary transition-all">${p.name}</p>
                                            <p class="text-[9px] text-text-secondary uppercase tracking-widest">Escala: ${p.speed}</p>
                                        </div>
                                    </div>
                                    <span class="text-[8px] font-bold uppercase text-emerald-500 border border-emerald-500/20 px-2 py-0.5 rounded-full bg-emerald-500/5">
                                        ${p.status}
                                    </span>
                                </div>
                            `).join('')}
                        </div>

                        <div class="p-6 bg-blue-500/5 border border-blue-500/20 rounded-2xl">
                             <div class="flex gap-4">
                                <span class="material-symbols-outlined text-blue-400">info</span>
                                <div class="space-y-1">
                                    <p class="text-xs font-bold text-white">O Papel da Cadeia de Comando</p>
                                    <p class="text-[10px] text-text-secondary leading-relaxed">
                                        Jorge e a equipe criam artigos contextuais para distribuir os links do rateio. Isso garante que o Google veja a lincagem como uma indicação real de autoridade, e não apenas spam.
                                    </p>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>

                <!-- Estratégias Complementares -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="glass-panel p-8 bg-surface/40 border-l-4 border-l-primary flex items-start gap-6">
                        <div class="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shrink-0">
                            <span class="material-symbols-outlined">diversity_3</span>
                        </div>
                        <div class="space-y-2">
                            <h4 class="font-bold font-headline text-lg">Troca Orgânica (Grátis)</h4>
                            <p class="text-[10px] text-text-secondary leading-relaxed uppercase">Use nossa base de 800+ alunos para parcerias manuais. Dá trabalho, mas é o cimento do seu castelo.</p>
                        </div>
                    </div>
                     <div class="glass-panel p-8 bg-surface/40 border-l-4 border-l-secondary flex items-start gap-6">
                        <div class="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary shrink-0">
                            <span class="material-symbols-outlined">radar</span>
                        </div>
                        <div class="space-y-2">
                            <h4 class="font-bold font-headline text-lg">SEO Local Guerrilha</h4>
                            <p class="text-[10px] text-text-secondary leading-relaxed uppercase">Utilize backlinks de grandes portais para ranquear no Google Maps em menos de 60 dias (Case Psicóloga).</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

// Global instance
const engine = new EscritorEngine();
