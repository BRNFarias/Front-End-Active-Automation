// js/novo-usuario.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formUsuario");
  const nomeEl = document.getElementById("nome");
  const cpfEl = document.getElementById("cpf");
  const inicioEl = document.getElementById("inicio"); // <-- Novo
  const fimEl = document.getElementById("fim");       // <-- Novo
  const senhaEl = document.getElementById("senha");
  
  const API_URL = "http://localhost:8000/users"; // A nossa nova rota de back-end

  // Não precisamos mais da lógica de "Editar" do localStorage
  localStorage.removeItem("editarIndex");

  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    
    const novoUsuario = {
      nome: nomeEl.value.trim(),
      cpf: cpfEl.value.trim(),
      inicio: inicioEl.value, // (Formato AAAA-MM-DD)
      fim: fimEl.value,       // (Formato AAAA-MM-DD)
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
      window.location.href = "cadastro.html"; // Volta para a lista
      
    } catch (error) {
      alert(`Falha ao salvar usuário: ${error.message}`);
    }
  });
});