// cadastro.js
document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector("#tabelaUsuarios tbody");

  function carregar() {
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    tbody.innerHTML = "";
    usuarios.forEach((u, i) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${u.nome}</td>
        <td>${u.cpf}</td>
        <td>${u.status}</td>
        <td>
          <button class="btn small" data-index="${i}" onclick="editarUsuario(${i})">Editar</button>
          <button class="btn small" data-index="${i}" onclick="excluirUsuario(${i})">Excluir</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  window.excluirUsuario = (i) => {
    if (!confirm("Excluir este usuário?")) return;
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    usuarios.splice(i, 1);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    carregar();
  };

  // opção simples de editar: abre novo-usuario.html com ?edit=index (implementação mínima)
  window.editarUsuario = (i) => {
    localStorage.setItem("editarIndex", String(i));
    window.location.href = "novo-usuario.html";
  };

  carregar();
});
