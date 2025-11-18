document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formUsuario");
    
    // Campos do formulário
    const nomeEl = document.getElementById("nome");
    const cpfEl = document.getElementById("cpf"); // Username
    const passwordEl = document.getElementById("senha");
    const fimEl = document.getElementById("fim"); // Data de expiração
  
    // Atualizado para a rota que criamos no backend
    const API_URL = "http://localhost:8000/users/create"; 
  
    form.addEventListener("submit", async (ev) => {
      ev.preventDefault();
  
      // Monta o objeto conforme o UserCreate do Python (user_routes.py)
      const payload = {
        nome: nomeEl.value.trim(),
        username: cpfEl.value.trim(),
        password: passwordEl.value,
        fim_data: fimEl.value // Envia a data YYYY-MM-DD direto do input type="date"
      };
  
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
        
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.detail || "Erro ao processar solicitação.");
        }
  
        alert("Operação realizada com sucesso! (Usuário criado ou reativado)");
        window.location.href = "cadastro.html";
        
      } catch (error) {
        alert(`Falha: ${error.message}`);
      }
    });
});