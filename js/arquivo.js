// arquivo.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formUpload");
  const input = document.getElementById("arquivo");
  const tbody = document.querySelector("#tabelaCSV tbody"); // Usamos isto para feedback
  
  // O URL do seu back-end (API em Docker)
  const API_URL = "http://localhost:8000/jobs/upload";

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Impede o recarregamento da página

    const file = input.files[0];
    if (!file) {
      alert("Por favor, selecione um ficheiro .xlsx ou .xls");
      return;
    }

    // 1. Criar o FormData (necessário para enviar ficheiros)
    const formData = new FormData();
    // A 'key' deve ser "file", pois é o que o seu back-end espera
    formData.append("file", file); 

    // Limpa a tabela de feedback anterior
    tbody.innerHTML = '<tr><td colspan="3">Enviando...</td></tr>';

    // 2. Enviar o ficheiro para a API
    fetch(API_URL, {
      method: "POST",
      body: formData,
      // Não defina 'Content-Type', o navegador fá-lo-á por si com o 'boundary' correto
    })
    .then(response => {
      // Se o servidor responder com um erro (ex: 400, 500)
      if (!response.ok) {
        // Tenta ler a resposta de erro do FastAPI (ex: {"error": "..."})
        return response.json().then(err => {
            throw new Error(err.error || `Erro do servidor: ${response.statusText}`);
        });
      }
      // Se a resposta for OK (ex: 200)
      return response.json();
    })
    .then(data => {
      // 'data' é a resposta do seu back-end: {job_id: 1, rows: X, status: "ok"}
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
      form.reset(); // Limpa o input do ficheiro
    })
    .catch(error => {
      // Apanha erros de rede ou os erros que lançámos (ex: "Planilha invalida")
      console.error("Erro no upload:", error);
      tbody.innerHTML = `
        <tr>
          <td colspan="3" style="color: red;">Erro no upload: ${error.message}</td>
        </tr>
      `;
    });
  });

  // A função parseCSV(text) foi removida pois não é mais necessária.
});