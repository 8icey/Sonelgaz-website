// =====================================
// ROLE + GLOBALS
// =====================================
const role = localStorage.getItem("role");
const table = document.getElementById("clientsTable");
const createBtn = document.getElementById("createBtn");

let clientsCache = [];
let currentPage = 1;
const rowsPerPage = 5;


// Hide create button for Technician
if (role === "Technician" && createBtn) {
  createBtn.style.display = "none";
}

// =====================================
// LOAD CLIENTS
// =====================================
async function loadClients() {
  try {
    const clients = await apiFetch("/clients");
    clientsCache = clients;
    renderClients(clients);

  } catch (err) {
    showToast(err.message, "error");
  }
}

function renderClients(list = clientsCache) {


  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginated = list.slice(start, end);

  table.innerHTML = "";

  paginated.forEach(c => {

    let actions = "";

    if (role === "Admin" || role === "Manager") {
      actions += `
        <button class="secondary"
          onclick="editClient(${c.id_client})">
          Edit
        </button>
      `;
    }

    if (role === "Admin") {
      actions += `
        <button class="danger"
          onclick="deleteClient(${c.id_client})">
          Delete
        </button>
      `;
    }

    table.innerHTML += `
      <tr>
        <td>${c.id_client}</td>
        <td>${c.name}</td>
        <td>${c.email}</td>
        <td>${actions || "-"}</td>
      </tr>
    `;
  });

  // const paginated = list.slice(start, end);
updatePagination(list.length);

}

// =====================================
// CREATE CLIENT
// =====================================
async function createClient() {
  const name = document.getElementById("clientName").value.trim();
  const email = document.getElementById("clientEmail").value.trim();

  if (!name || !email) {
    alert("Please fill all fields");
    return;
  }

  try {
    const res = await apiFetch("/clients", {
      method: "POST",
      body: JSON.stringify({ name, email })
    });

    alert(res.message || "Client created successfully");

    document.getElementById("clientForm").reset();
    closeModal();
    loadClients();

  } catch (err) {
    alert(err.message || "Failed to create client");
  }
}

// =====================================
// DELETE CLIENT
// =====================================
async function deleteClient(id) {
  if (!confirm("Delete this client?")) return;

  try {
    const res = await apiFetch(`/clients/${id}`, {
      method: "DELETE"
    });

    alert(res.message || "Client deleted successfully");
    loadClients();

  } catch (err) {
    alert(err.message || "Failed to delete client");
  }
}

// =====================================
// EDIT CLIENT
// =====================================
function editClient(id) {
  const client = clientsCache.find(c => c.id_client === id);
  if (!client) return;

  document.getElementById("editClientId").value = client.id_client;
  document.getElementById("editClientName").value = client.name;
  document.getElementById("editClientEmail").value = client.email;

  document.getElementById("editModal").style.display = "block";
}

function closeEditModal() {
  document.getElementById("editModal").style.display = "none";
}

async function updateClient() {
  const id = document.getElementById("editClientId").value;
  const name = document.getElementById("editClientName").value.trim();
  const email = document.getElementById("editClientEmail").value.trim();

  if (!name || !email) {
    alert("Please fill all fields");
    return;
  }

  try {
    const res = await apiFetch(`/clients/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name, email })
    });

    alert(res.message || "Client updated successfully");

    closeEditModal();
    loadClients();

  } catch (err) {
    alert(err.message || "Failed to update client");
  }
}

// =====================================
// MODAL CONTROLS
// =====================================
function showCreate() {
  document.getElementById("clientModal").style.display = "block";
}

function closeModal() {
  document.getElementById("clientModal").style.display = "none";
}
function nextPage() {
  const totalPages = Math.ceil(clientsCache.length / rowsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderClients(clientsCache);
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderClients(clientsCache);
  }
}

function updatePagination(totalItems) {
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  document.getElementById("pageInfo").innerText =
    `Page ${currentPage} of ${totalPages}`;
}

function searchClients() {
  const value = document.getElementById("searchInput").value.toLowerCase();

  const filtered = clientsCache.filter(c =>
    c.name.toLowerCase().includes(value)
  );

  currentPage = 1;
  renderClients(filtered);
}

// =====================================
// INIT
// =====================================
loadClients();
