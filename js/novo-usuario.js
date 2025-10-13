// novo-usuario.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formUsuario");
  const nomeEl = document.getElementById("nome");
  const cpfEl = document.getElementById("cpf");
  const statusEl = document.getElementById("status");
  const senhaEl = document.getElementById("senha");

  // Se veio editarIndex, preenche o formulário
  const editarIndex = localStorage.getItem("editarIndex");
  if (editarIndex !== null) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const u = usuarios[Number(editarIndex)];
    if (u) {
      nomeEl.value = u.nome || "";
      cpfEl.value = u.cpf || "";
      statusEl.value = u.status || "Ativo";
      senhaEl.value = u.senha || "";
    }
  }

  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const novo = {
      nome: nomeEl.value.trim(),
      cpf: cpfEl.value.trim(),
      status: statusEl.value,
      email: (nomeEl.value.trim().toLowerCase().replace(/\s+/g, ".") + "@senai.local"),
      senha: senhaEl.value
    };

    if (editarIndex !== null) {
      usuarios[Number(editarIndex)] = { ...usuarios[Number(editarIndex)], ...novo };
      localStorage.removeItem("editarIndex");
    } else {
      usuarios.push(novo);
    }
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    alert("Usuário salvo.");
    window.location.href = "cadastro.html";
  });
});
