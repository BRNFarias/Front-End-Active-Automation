// main.js - login + helpers used across pages

// Se não existir, popula um usuário padrão para teste
if (!localStorage.getItem("usuarios")) {
  const padrao = [
    { nome: "Administrador SENAI", cpf: "000.000.000-00", status: "Ativo", email: "admin@senai.local", senha: "123" }
  ];
  localStorage.setItem("usuarios", JSON.stringify(padrao));
}

// Função para obter usuário logado
function getLogado() {
  return JSON.parse(localStorage.getItem("logado") || "null");
}

// Verifica login e redireciona (usado em index.html)
if (document.getElementById("loginBtn")) {
  document.getElementById("loginBtn").addEventListener("click", (e) => {
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const user = usuarios.find(u => u.email === email && u.senha === senha);
    if (user) {
      localStorage.setItem("logado", JSON.stringify(user));
      window.location.href = "cadastro.html";
    } else {
      alert("Credenciais inválidas. Verifique e tente novamente.");
    }
  });
}

// Logout comum: vinculado aos botões com id logoutBtn
document.querySelectorAll("#logoutBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    localStorage.removeItem("logado");
    window.location.href = "index.html";
  });
});

// Em páginas que mostram o nome/email do usuário, preenche
document.addEventListener("DOMContentLoaded", () => {
  const logado = getLogado();
  if (logado) {
    const nameEl = document.getElementById("userName");
    const emailEl = document.getElementById("userEmail");
    if (nameEl) nameEl.textContent = logado.nome;
    if (emailEl) emailEl.textContent = logado.email || "";
  } else {
    // Se não estiver logado e não estiver em index.html, redireciona ao login
    if (!location.pathname.endsWith("/index.html") && !location.pathname.endsWith("/")) {
      if (!location.pathname.endsWith("index.html")) {
        // permitir acesso direto ao index; para demais páginas, força login
        if (location.pathname.endsWith("cadastro.html") || location.pathname.endsWith("arquivo.html") || location.pathname.endsWith("novo-usuario.html")) {
          window.location.href = "index.html";
        }
      }
    }
  }
});
