const openModal = () =>
  document.getElementById("modal").classList.add("active");

const closeModal = () => {
  document.getElementById("modal").classList.remove("active");
  document.getElementById("salvar").classList.add("active");
  document.getElementById("editar").classList.remove("active");
  document.getElementById("editar").classList.add("hiden");
  clearFields();
  setCurrentUserEdit("");
};

const showEditButton = () => {
  document.getElementById("editar").classList.add("active");
  document.getElementById("salvar").classList.remove("active");
  document.getElementById("salvar").classList.add("hiden");
  document.getElementById("editar").classList.remove("hiden");
};
const editClient = (id, data) => {
  const dbClient = getLocalStorage();
  const index = dbClient.findIndex((client) => client.id === id);
  updateClient(index, data);
  update();
  closeModal();
};
//Eventos
document
  .getElementById("cadastrarCliente")
  .addEventListener("click", openModal);
document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("salvar").addEventListener("click", saveClient);
document.getElementById("editar").addEventListener("click", () => {
  const user = JSON.parse(localStorage.getItem("edit_client"));

  if (user.id) {
    console.log(user);
    const client = {
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      celular: document.getElementById("celular").value,
      cidade: document.getElementById("cidade").value,
    };
    editClient(user.id, { ...client, id: user.id });
  } else {
    console.log("ID do usuário não encontrado no localStorage");
  }
});
document.getElementById("cancelar").addEventListener("click", closeModal);

const tableBody = document.getElementById("table-body");

const getLocalStorage = () =>
  JSON.parse(localStorage.getItem("db_client")) || [];
const setLocalStorage = (dbClient) =>
  localStorage.setItem("db_client", JSON.stringify(dbClient));

const getCurrentUserEdit = () => {
  JSON.parse(localStorage.getItem("edit_client")) || {};
};
const setCurrentUserEdit = (Client) =>
  localStorage.setItem("edit_client", JSON.stringify(Client));
// CRUD - create read update delete

const updateClient = (index, client) => {
  const dbClient = readClient();
  dbClient[index] = client;
  setLocalStorage(dbClient);
};

const readClient = () => getLocalStorage();

const createClient = (client) => {
  const dbClient = getLocalStorage();
  const newClient = { ...client, id: Date.now() };
  dbClient.push(newClient);
  setLocalStorage(dbClient);
};
/*Linha 14: Está transformando o que está em localStorage em JSON e depois armazena em uma variável.
  Linha 18: Está 'acrescentando' um objeto novo.
  Linha 16: Mandando novamente para o meu banco.*/

const validFields = () => {
  return document.getElementById("form").reportValidity();
};
//Interação com o layout

const clearFields = () => {
  const fields = document.querySelectorAll(".modal-field");
  fields.forEach((field) => (field.value = ""));
};

function saveClient(type, id) {
  if (validFields()) {
    const client = {
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      celular: document.getElementById("celular").value,
      cidade: document.getElementById("cidade").value,
    };

    createClient(client);

    update();
    closeModal();
  }
}
const deleteClientById = (id) => {
  const dbClient = getLocalStorage();
  const updatedDbClient = dbClient.filter((client) => client.id !== id);
  setLocalStorage(updatedDbClient);
  return updatedDbClient;
};

const setInputForm = (id) => {
  const dbClient = getLocalStorage();
  const data = dbClient.find((client) => client.id === id);
  setCurrentUserEdit(data);
  document.getElementById("nome").value = data.nome;
  document.getElementById("email").value = data.email;
  document.getElementById("celular").value = data.celular;
  document.getElementById("cidade").value = data.cidade;
  console.log(data);
};

const handleClick = (action, id) => {
  if (action === "editar") {
    // Aqui você pode chamar a função de edição
    showEditButton();
    openModal();
    setInputForm(id);
  } else if (action === "excluir") {
    // Aqui você pode chamar a função de exclusão
    deleteClientById(id);
    update();
  }
};

const createRow = (dbClient) => {
  // Limpa o conteúdo atual do corpo da tabela
  if (!tableBody) return;

  tableBody.innerHTML = "";

  // Itera sobre os objetos -> para cada objeto, cria uma nova linha.
  dbClient.forEach((item) => {
    // Cria uma nova linha
    const row = document.createElement("tr");

    // Cria e adiciona para cada propriedade do item
    Object.values(item).forEach((text) => {
      const cell = document.createElement("td");
      cell.textContent = text;
      row.appendChild(cell);
    });

    // Cria para os botões
    const actionCell = document.createElement("td");

    // Cria o botão de editar
    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.onclick = () => handleClick("editar", item.id);
    actionCell.appendChild(editButton);

    // Cria o botão de excluir
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Excluir";
    deleteButton.onclick = () => handleClick("excluir", item.id);
    actionCell.appendChild(deleteButton);

    // Adiciona ação à linha
    row.appendChild(actionCell);

    // Adiciona a linha ao corpo da tabela
    tableBody.appendChild(row);
  });
};

const clearTable = () => {
  const rows = document.querySelectorAll("#tabeClient>tbody tr");
  rows.forEach((row) => row.parentNode.removeChild(row));
};
function update() {
  const dbClient = readClient();
  createRow(dbClient);
  console.log(dbClient);
}

update();
