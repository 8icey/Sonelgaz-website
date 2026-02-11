// =====================================
// ROLE + GLOBALS
// =====================================
const role = localStorage.getItem("role");
const table = document.getElementById("clientsTable");
const createBtn = document.getElementById("createBtn");

let clientsCache = [];

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

    table.innerHTML = "";

    clients.forEach(c => {
      let actions = "";

      // MANAGER + ADMIN → can edit
      if (role === "Admin" || role === "Manager") {
        actions += `
          <button class="secondary"
            onclick="editClient(${c.id_client})">
            Edit
          </button>
        `;
      }

      // ADMIN → can delete
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
          <td>${actions || "<span style='color:#888'>Read Only</span>"}</td>
        </tr>
      `;
    });

  } catch (err) {
    console.error(err);
    alert(err.message || "Failed to load clients");
  }
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

// =====================================
// INIT
// =====================================
loadClients();
