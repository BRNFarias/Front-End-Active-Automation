// js/main.js

// Função para obter usuário logado
function getLogado() {
  // Pega os dados do utilizador (nome, email) que o back-end enviou no login
  return JSON.parse(localStorage.getItem("logado") || "null");
}

// Lógica de Login (usada no index.html)
if (document.getElementById("loginBtn")) {
  document.getElementById("loginBtn").addEventListener("click", (e) => {
    
    // --- CORREÇÃO: Procura por 'username' em vez de 'email' ---
    const username = document.getElementById("username").value.trim();
    const senha = document.getElementById("senha").value.trim();
    
    const API_URL = "http://localhost:8000/auth/login";

    e.target.disabled = true;
    e.target.textContent = "Aguarde...";

    fetch(API_URL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      // Envia o 'username' na chave 'email' que o back-end espera
      body: JSON.stringify({ email: username, senha: senha }) 
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => {
          throw new Error(err.detail || "Credenciais inválidas");
        });
      }
      return response.json(); 
    })
    .then(user => {
      // Salva os detalhes REAIS do utilizador no localStorage
      localStorage.setItem("logado", JSON.stringify(user));
      window.location.href = "cadastro.html"; // Redireciona para a página principal
    })
    .catch(error => {
      alert(error.message);
      e.target.disabled = false;
      e.target.textContent = "Entrar";
    });
  });
}

// Logout (usado em todas as páginas)
document.querySelectorAll("#logoutBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    localStorage.removeItem("logado");
    window.location.href = "index.html";
  });
});

// Lógica de Cabeçalho (usada em todas as páginas, exceto index.html)
// Isto resolve o seu "Pedido 1"
document.addEventListener("DOMContentLoaded", () => {
  const logado = getLogado();
  if (logado) {
    // Se está logado, preenche o cabeçalho
    const nameEl = document.getElementById("userName");
    const emailEl = document.getElementById("userEmail");
    
    // (O seu 'cadastro.html' tem estes IDs)
    if (nameEl) nameEl.textContent = logado.nome; 
    if (emailEl) emailEl.textContent = logado.email || "";
  } else {
    // Se NÃO está logado, força o redirecionamento para o index.html
    const path = window.location.pathname;
    const isLoginPage = path.endsWith("/index.html") || path.endsWith("/");
    
    if (!isLoginPage) {
        window.location.href = "index.html";
    }
  }
});