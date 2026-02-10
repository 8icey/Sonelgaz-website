// FRONTEND RBAC
const role = localStorage.getItem("role");
if (role !== "Admin") {
  alert("Access denied");
  window.location.href = "dashboard.html";
}

renderNavbar();

async function loadClients() {
  const clients = await apiFetch("/clients");

  const table = document.getElementById("clientsTable");
  table.innerHTML = "";

  clients.forEach(client => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${client.id_client}</td>
      <td>${client.name}</td>
      <td>${client.email}</td>
      <td>
        <button onclick="deleteClient(${client.id_client})">
          Delete
        </button>
      </td>
    `;

    table.appendChild(row);
  });
}

async function deleteClient(id) {
  if (!confirm("Are you sure you want to delete this client?")) return;

  await apiFetch(`/clients/${id}`, {
    method: "DELETE"
  });

  alert("Client deleted");
  loadClients();
}

loadClients();
