// js/novo-usuario.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formUsuario");
  const nomeEl = document.getElementById("nome");
  const cpfEl = document.getElementById("cpf");
  const inicioEl = document.getElementById("inicio"); 
  const fimEl = document.getElementById("fim");       
  const senhaEl = document.getElementById("senha");
  
  const API_URL = "https://localhost:8000/users"; // <-- MUDANÇA AQUI

  localStorage.removeItem("editarIndex");

  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    
    const novoUsuario = {
      nome: nomeEl.value.trim(),
      cpf: cpfEl.value.trim(),
      inicio: inicioEl.value, 
      fim: fimEl.value,       
      senha: senhaEl.value
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoUsuario)
      });
      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Erro desconhecido");
      }

      alert("Usuário salvo com sucesso!");
      window.location.href = "cadastro.html";
      
    } catch (error) {
      alert(`Falha ao salvar usuário: ${error.message}`);
    }
  });
});