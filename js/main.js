// js/main.js

function getLogado() {
  return JSON.parse(localStorage.getItem("logado") || "null");
}

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. LÓGICA DE LOGIN (Index.html) ---
  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) {
    loginBtn.addEventListener("click", (e) => {
      const username = document.getElementById("username").value.trim();
      const senha = document.getElementById("senha").value.trim();
      // ATENÇÃO: Se estiver usando HTTPS com certificado autoassinado,
      // talvez precise usar https://localhost:8000 ou aceitar o risco no navegador.
      const API_URL = "http://localhost:8000/auth/login"; 

      e.target.disabled = true;
      e.target.textContent = "Aguarde...";

      fetch(API_URL, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
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
        localStorage.setItem("logado", JSON.stringify(user));
        window.location.href = "cadastro.html";
      })
      .catch(error => {
        alert(error.message);
        e.target.disabled = false;
        e.target.textContent = "Entrar";
      });
    });
  }

  // --- 2. LÓGICA DE LOGOUT (Todas as páginas internas) ---
  // Usamos getElementById pois o ID deve ser único na página
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
          localStorage.removeItem("logado");
          window.location.href = "index.html";
      });
  }

  // --- 3. VERIFICAÇÃO DE AUTENTICAÇÃO ---
  const logado = getLogado();
  if (logado) {
    const nameEl = document.getElementById("userName");
    const emailEl = document.getElementById("userEmail");
    if (nameEl) nameEl.textContent = logado.nome; 
    if (emailEl) emailEl.textContent = logado.email || "";
  } else {
    // Se não estiver logado e tentar acessar uma página interna, redireciona para o login
    const path = window.location.pathname;
    // Verifica se NÃO é a página de login
    const isLoginPage = path.endsWith("index.html") || path === "/" || path.endsWith("login.html"); // ajuste conforme necessário
    
    if (!isLoginPage && !document.getElementById("loginBtn")) {
         window.location.href = "index.html";
    }
  }
});