// Dados simulados para o sistema funcionar
const USUARIO_TESTE = {
    email: "admin@gmail.com",
    senha: "123",
    nome: "Pai de Santo / Dirigente",
    cargo: "Administrador"
};

const DADOS_DASHBOARD = {
    totalFilhos: 42,
    totalConsulentes: 156,
    entradas: "R$ 2.450,00",
    saidas: "R$ 890,00",
    aniversariantes: [
        { nome: "Maria de Oxum", dia: "05/10" },
        { nome: "João de Ogum", dia: "12/10" },
        { nome: "Carlos de Oxóssi", dia: "28/10" }
    ]
};

// Executa assim que a página carrega
document.addEventListener("DOMContentLoaded", () => {
    configurarMenuLateral();
});

// 1. FUNÇÃO DE LOGIN
function realizarLogin() {
    const emailInput = document.getElementById("login-email").value;
    const passwordInput = document.getElementById("login-password").value;

    // Validação simples (use admin@gmail.com e senha 123)
    if (emailInput === USUARIO_TESTE.email && passwordInput === USUARIO_TESTE.senha) {
        // Esconde a tela de login
        document.getElementById("login-screen").style.display = "none";
        
        // Preenche dados do usuário no topo da página
        document.getElementById("header-user-name").innerText = USUARIO_TESTE.nome;
        document.getElementById("header-user-cargo").innerText = USUARIO_TESTE.cargo;
        
        // Carrega as informações iniciais e abre a primeira página
        carregarDadosDashboard();
        navegarPara("page-dashboard");
    } else {
        alert("E-mail ou senha incorretos! Use admin@gmail.com e senha 123.");
    }
}

// 2. FUNÇÃO DE LOGOUT
function fazerLogout() {
    // Limpa os campos de texto do login
    document.getElementById("login-email").value = "";
    document.getElementById("login-password").value = "";
    
    // Mostra a tela de login novamente
    document.getElementById("login-screen").style.display = "flex";
}

// 3. CONTROLE DE NAVEGAÇÃO DOS MENUS
function configurarMenuLateral() {
    const menu = document.getElementById("menu-lateral");
    
    // Itens que vão aparecer no menu lateral de forma dinâmica
    const itensMenu = [
        { texto: "📊 Dashboard", paginaId: "page-dashboard" },
        { texto: "📝 Cadastro / Atualizações", paginaId: "page-cadastro" },
        { texto: "💰 Financeiro", paginaId: "page-financeiro" }
    ];

    menu.innerHTML = "";
    
    itensMenu.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("nav-item");
        if (index === 0) div.classList.add("active"); // Deixa o primeiro ativo por padrão
        div.innerText = item.texto;
        
        div.onclick = () => {
            // Remove classe ativa de todos
            document.querySelectorAll(".nav-item").forEach(el => el.classList.remove("active"));
            // Adiciona classe ativa no clicado
            div.classList.add("active");
            // Muda a página visível
            navegarPara(item.paginaId);
        };
        
        menu.appendChild(div);
    });
}

function navegarPara(paginaId) {
    // Esconde todas as páginas do bloco principal
    document.querySelectorAll(".page").forEach(pag => pag.classList.remove("active"));
    
    // Mostra apenas a página selecionada
    const paginaAlvo = document.getElementById(paginaId);
    if (paginaAlvo) {
        paginaAlvo.classList.add("active");
    }
}

// 4. ALIMENTAR OS DADOS NA TELA
function carregarDadosDashboard() {
    document.getElementById("dash-total-filhos").innerText = DADOS_DASHBOARD.totalFilhos;
    document.getElementById("dash-total-consulentes").innerText = DADOS_DASHBOARD.totalConsulentes;
    document.getElementById("dash-total-entradas").innerText = DADOS_DASHBOARD.entradas;
    document.getElementById("dash-total-saidas").innerText = DADOS_DASHBOARD.saidas;

    // Lista de aniversariantes
    const listaAniv = document.getElementById("lista-aniversariantes");
    listaAniv.innerHTML = "";
    DADOS_DASHBOARD.aniversariantes.forEach(aniv => {
        const item = document.createElement("div");
        item.classList.add("list-item-aniv");
        item.innerHTML = `<span>${aniv.nome}</span><span class="date">${aniv.dia}</span>`;
        listaAniv.appendChild(item);
    });
}
