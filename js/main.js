// js/main.js

function getLogado() {
  return JSON.parse(localStorage.getItem("logado") || "null");
}

if (document.getElementById("loginBtn")) {
  document.getElementById("loginBtn").addEventListener("click", (e) => {
    
    const username = document.getElementById("username").value.trim();
    const senha = document.getElementById("senha").value.trim();
    
    const API_URL = "https://localhost:8000/auth/login"; // <-- MUDANÇA AQUI

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

document.querySelectorAll("#logoutBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    localStorage.removeItem("logado");
    window.location.href = "index.html";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const logado = getLogado();
  if (logado) {
    const nameEl = document.getElementById("userName");
    const emailEl = document.getElementById("userEmail");
    if (nameEl) nameEl.textContent = logado.nome; 
    if (emailEl) emailEl.textContent = logado.email || "";
  } else {
    const path = window.location.pathname;
    const isLoginPage = path.endsWith("/index.html") || path.endsWith("/");
    
    if (!isLoginPage) {
        window.location.href = "index.html";
    }
  }
});