// js/cadastro.js
document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector("#tabelaUsuarios tbody");
  const API_URL = "http://localhost:8000/users"; // A nossa nova rota de back-end

  async function carregar() {
    // 1. Apaga o localStorage antigo (não precisamos mais dele)
    localStorage.removeItem("usuarios");
    tbody.innerHTML = '<tr><td colspan="4">Carregando usuários do Active Directory...</td></tr>';

    try {
      // 2. Chama a nossa API para buscar os usuários
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Erro ao buscar usuários: ${response.statusText}`);
      }
      const usuarios = await response.json(); // Pega a lista de [ {nome, cpf, status}, ... ]
      
      tbody.innerHTML = ""; // Limpa a tabela

      if (usuarios.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4">Nenhum usuário encontrado no Active Directory.</td></tr>';
        return;
      }

      // 3. Preenche a tabela com os dados reais do AD
      usuarios.forEach((u, i) => {
        const tr = document.createElement("tr");
        // O status "Inativo" recebe uma classe CSS especial
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

  // Ação de Excluir (Agora chama a API)
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
      carregar(); // Recarrega a lista
      
    } catch (error) {
      alert(`Falha ao excluir usuário: ${error.message}`);
    }
  };

  // Ação de Editar (Ainda usa localStorage - explicarei abaixo)
  window.editarUsuario = (cpf) => {
    // A API de Edição ainda não foi criada no back-end,
    // pois o formulário 'novo-usuario.html' não tem os campos 'Inicio' e 'Fim'.
    // Por enquanto, esta função está desabilitada:
    alert("A função de Editar ainda precisa ser conectada ao back-end.");
    
    // Lógica antiga do localStorage (não vai funcionar mais):
    // localStorage.setItem("editarIndex", String(i));
    // window.location.href = "novo-usuario.html";
  };

  carregar();
});