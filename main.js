const openModal = () =>
  document.getElementById("modal").classList.add("active");

const closeModal = () => {
  document.getElementById("modal").classList.remove("active");
};

const tempClient = {
  name: "Eric",
  email: "raulpassos@gmail.com",
  celular: "85999999999",
  cidade: "Fortaleza",
};
const getLocalStorage = () =>
  JSON.parse(localStorage.getItem("db_client")) || [];
const setLocalStorage = (dbClient) =>
  localStorage.setItem("db_client", JSON.stringify(dbClient));
// CRUD - create read update delete
const deleteClient = (index) => {
  const dbClient = readClient();
  dbClient.splice(index, 1);
  setLocalStorage(dbClient);
};

const updateClient = (index, client) => {
  const dbClient = readClient();
  dbClient[index] = client;
  setLocalStorage(dbClient);
};

const readClient = () => getLocalStorage();

const createClient = (client) => {
  const dbClient = getLocalStorage();
  dbClient.push(client);
  setLocalStorage(dbClient);
};
/*Linha 14: Está transformando o que está em localStorage em JSON e depois armazena em uma variável.
  Linha 18: Está 'acrescentando' um objeto novo.
  Linha 16: Mandando novamente para o meu banco.*/

//Eventos
document
  .getElementById("cadastrarCliente")
  .addEventListener("click", openModal);
document.getElementById("modalClose").addEventListener("click", closeModal);
