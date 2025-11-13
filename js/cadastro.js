// js/cadastro.js
document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector("#tabelaUsuarios tbody");
  const API_URL = "http://localhost:8000/users"; // <-- MUDANÇA AQUI

  async function carregar() {
    localStorage.removeItem("usuarios");
    tbody.innerHTML = '<tr><td colspan="4">Carregando usuários do Active Directory...</td></tr>';

    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Erro ao buscar usuários: ${response.statusText}`);
      }
      const usuarios = await response.json();
      
      tbody.innerHTML = ""; 

      if (usuarios.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4">Nenhum usuário encontrado no Active Directory.</td></tr>';
        return;
      }

      usuarios.forEach((u, i) => {
        const tr = document.createElement("tr");
        tr.className = u.status === "Inativo" ? "muted" : "";
        
        tr.innerHTML = `
          <td>${u.nome}</td>
          <td>${u.cpf}</td>
          <td>${u.status}</td>
          <td>
            <button class="btn small" data-cpf="${u.cpf}" onclick="editarUsuario('${u.cpf}')">Editar</button>
            <button class="btn small" data-cpf="${u.cpf}" onclick="excluirUsuario('${u.cpf}', '${u.nome}')">Excluir</button>
          </td>
        `;
        tbody.appendChild(tr);
      });

    } catch (error) {
      console.error("Falha ao carregar usuários:", error);
      tbody.innerHTML = `<tr><td colspan="4" style="color: red;">${error.message}</td></tr>`;
    }
  }

  window.excluirUsuario = async (cpf, nome) => {
    if (!confirm(`Tem certeza que deseja excluir o usuário ${nome} (CPF: ${cpf})?`)) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${cpf}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Erro desconhecido");
      }
      
      alert(`Usuário ${nome} excluído com sucesso!`);
      carregar(); 
      
    } catch (error) {
      alert(`Falha ao excluir usuário: ${error.message}`);
    }
  };

  window.editarUsuario = (cpf) => {
    alert("A função de Editar ainda precisa ser conectada ao back-end.");
  };

  carregar();
});