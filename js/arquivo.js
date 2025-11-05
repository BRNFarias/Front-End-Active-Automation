// arquivo.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formUpload");
  const input = document.getElementById("arquivo");
  const tbody = document.querySelector("#tabelaCSV tbody");
  
  const API_URL = "https://localhost:8000/jobs/upload"; // <-- MUDANÇA AQUI

  form.addEventListener("submit", (e) => {
    e.preventDefault(); 

    const file = input.files[0];
    if (!file) {
      alert("Por favor, selecione um ficheiro .xlsx ou .xls");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); 

    tbody.innerHTML = '<tr><td colspan="3">Enviando...</td></tr>';

    fetch(API_URL, {
      method: "POST",
      body: formData,
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => {
            throw new Error(err.error || `Erro do servidor: ${response.statusText}`);
        });
      }
      return response.json();
    })
    .then(data => {
      console.log("Sucesso:", data);
      tbody.innerHTML = `
        <tr>
          <td colspan="3">Ficheiro enviado com sucesso!</td>
        </tr>
        <tr>
          <td>ID do Job:</td>
          <td colspan="2">${data.job_id}</td>
        </tr>
        <tr>
          <td>Linhas Processadas:</td>
          <td colspan="2">${data.rows}</td>
        </tr>
      `;
      form.reset();
    })
    .catch(error => {
      console.error("Erro no upload:", error);
      tbody.innerHTML = `
        <tr>
          <td colspan="3" style="color: red;">Erro no upload: ${error.message}</td>
        </tr>
      `;
    });
  });
});