// arquivo.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formUpload");
  const input = document.getElementById("arquivo");
  const tbody = document.querySelector("#tabelaCSV tbody");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const file = input.files[0];
    if (!file) { alert("Selecione um arquivo .csv"); return; }
    const reader = new FileReader();
    reader.onload = function(ev) {
      const text = ev.target.result;
      parseCSV(text);
    };
    reader.readAsText(file, "UTF-8");
  });

  function parseCSV(text) {
    tbody.innerHTML = "";
    // split por linhas - aceita CRLF e LF
    const rows = text.split(/\r?\n/).filter(r => r.trim() !== "");
    // tenta detectar header (nome,cpf,status) na primeira linha
    const header = rows[0].split(",").map(h => h.trim().toLowerCase());
    const hasHeader = header.includes("nome") && header.includes("cpf");
    const start = hasHeader ? 1 : 0;

    for (let i = start; i < rows.length; i++) {
      const cols = rows[i].split(",").map(c => c.trim());
      // tenta mapear por header se existir
      let nome = cols[0] || "";
      let cpf = cols[1] || "";
      let status = cols[2] || "";
      if (hasHeader) {
        const idxNome = header.indexOf("nome");
        const idxCpf = header.indexOf("cpf");
        const idxStatus = header.indexOf("status");
        nome = cols[idxNome] || nome;
        cpf = cols[idxCpf] || cpf;
        status = idxStatus >= 0 ? (cols[idxStatus] || "") : status;
      }
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${nome}</td><td>${cpf}</td><td>${status}</td>`;
      tbody.appendChild(tr);
    }
  }
});
