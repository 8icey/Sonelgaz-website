const role = localStorage.getItem("role");
const table = document.getElementById("interventionsTable");



// ======================
// LOAD INTERVENTIONS
// ======================
let interventionsCache = [];
let currentPage = 1;
const rowsPerPage = 5;
async function loadInterventions() {
  try {
    const interventions = await apiFetch("/interventions");

    interventionsCache = interventions;
    renderInterventions(interventions);

  } catch (err) {
    showToast(err.message, "error");
  }
}


function renderInterventions(list) {

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginated = list.slice(start, end);

  table.innerHTML = "";

  paginated.forEach(i => {

    const assignedUsers =
      i.Users?.length
        ? i.Users.map(u => `${u.first_name} ${u.last_name}`).join(", ")
        : "—";

    table.innerHTML += `
      <tr>
        <td>${i.id_intervention}</td>
        <td>${i.title}</td>
        <td>${i.Project?.title || "-"}</td>
        <td>${i.Client?.name || "-"}</td>
        <td>${i.Status?.name || "-"}</td>
        <td>${assignedUsers}</td>
        <td>${formatDate(i.scheduled_date)}</td>
        <td>
          <button class="secondary"
            onclick="window.location.href='intervention.html?id=${i.id_intervention}'">
            Manage
          </button>
        </td>
      </tr>
    `;
  });
}



// ======================
// LOAD PROJECTS + CLIENTS
// ======================
async function loadDropdowns() {
  const projects = await apiFetch("/projects");
  const clients  = await apiFetch("/clients");

  const projectSelect = document.getElementById("projectSelect");
  const clientSelect  = document.getElementById("clientSelect");

  projectSelect.innerHTML = `<option value="">-- Select Project --</option>`;
  clientSelect.innerHTML  = `<option value="">-- Select Client --</option>`;

  projects.forEach(p => {
    projectSelect.innerHTML += `
      <option value="${p.id_project}">${p.title}</option>
    `;
  });

  clients.forEach(c => {
    clientSelect.innerHTML += `
      <option value="${c.id_client}">${c.name}</option>
    `;
  });
}

// ======================
// CREATE INTERVENTION
// ======================
async function createIntervention() {
  try {
    await apiFetch("/interventions", {
      method: "POST",
      body: JSON.stringify({
        title: title.value,
        description: description.value,
        id_project: projectSelect.value,
        id_client: clientSelect.value,
        id_status: statusSelect.value,
        scheduled_date: scheduledDate.value
      })
    });

    closeModal();
    loadInterventions();

  } catch (err) {
    alert(err.message);
  }
}

// ======================
// MODAL
// ======================
function showCreate() {
  document.getElementById("interventionModal").style.display = "block";
  loadDropdowns();
}

function closeModal() {
  document.getElementById("interventionModal").style.display = "none";
}

// ======================
function formatDate(date) {
  if (!date) return "-";
  return date.split("T")[0];
}

// INIT
loadInterventions();
document.getElementById("searchInput")
  ?.addEventListener("input", applyFilters);

document.getElementById("filterStatus")
  ?.addEventListener("change", applyFilters);

function applyFilters() {

  const search = document.getElementById("searchInput").value.toLowerCase();
  const status = document.getElementById("filterStatus").value;

  const filtered = interventionsCache.filter(i => {

    const matchesSearch =
      i.title.toLowerCase().includes(search);

    const matchesStatus =
      status ? i.Status?.name === status : true;

    return matchesSearch && matchesStatus;
  });

  currentPage = 1;
  renderInterventions(filtered);
}
function nextPage() {
  currentPage++;
  renderInterventions(interventionsCache);
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderInterventions(interventionsCache);
  }
}
function updatePagination(totalItems) {
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  document.getElementById("pageInfo").innerText =
    `Page ${currentPage} of ${totalPages}`;
}
