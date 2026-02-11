const role = localStorage.getItem("role");
const table = document.getElementById("interventionsTable");

// ======================
// LOAD INTERVENTIONS
// ======================
async function loadInterventions() {
  try {
    const interventions = await apiFetch("/interventions");

    table.innerHTML = "";

    interventions.forEach(i => {

      const assignedUsers =
        i.Users && i.Users.length > 0
          ? i.Users.map(u => `${u.first_name} ${u.last_name}`).join(", ")
          : "—";

      table.innerHTML += `
        <tr>
          <td>${i.id_intervention}</td>
          <td>${i.title}</td>
          <td>${i.Project?.title || "-"}</td>
          <td>${i.Client?.name || "-"}</td>
          <td>
            <span class="status-badge status-${i.Status?.name?.toLowerCase().replace(" ", "-")}">
              ${i.Status?.name || "-"}
            </span>
          </td>
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

  } catch (err) {
    alert(err.message);
  }
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
