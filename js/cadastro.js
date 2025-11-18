document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector("#tabelaUsuarios tbody");
  const API_URL = "http://localhost:8000/users";

  async function carregar() {
    // Limpa dados antigos
    localStorage.removeItem("usuarios");
    
    // Ajuste o colspan para 3 (pois removemos a coluna Ações)
    tbody.innerHTML = '<tr><td colspan="3">Carregando usuários do Active Directory...</td></tr>';

    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Erro ao buscar usuários: ${response.statusText}`);
      }
      
      // === AQUI ESTÁ A CORREÇÃO ===
      const data = await response.json();
      
      // O Back-End agora manda { "users": [...] }, então precisamos acessar .users
      // Se data.users não existir, usamos uma lista vazia [] para evitar o erro
      const usuarios = data.users || []; 
      
      tbody.innerHTML = ""; 

      if (usuarios.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3">Nenhum usuário encontrado no Active Directory.</td></tr>';
        return;
      }

      usuarios.forEach((u) => {
        const tr = document.createElement("tr");
        // Aplica cor cinza se estiver Inativo
        tr.className = u.status === "Inativo" ? "muted" : "";
        
        // Monta a linha SEM os botões de ação
        tr.innerHTML = `
          <td>${u.nome}</td>
          <td>${u.cpf}</td>
          <td>${u.status}</td>
        `;
        tbody.appendChild(tr);
      });

    } catch (error) {
      console.error("Falha ao carregar usuários:", error);
      tbody.innerHTML = `<tr><td colspan="3" style="color: red;">${error.message}</td></tr>`;
    }
  }

  carregar();
});