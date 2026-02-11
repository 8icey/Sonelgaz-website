const params = new URLSearchParams(window.location.search);
const interventionId = params.get("id");

const detailsDiv = document.getElementById("details");
const userSelect = document.getElementById("userSelect");
const statusSelect = document.getElementById("statusSelect");
const assignedUsersList = document.getElementById("assignedUsersList");

function goBack() {
  window.location.href = "interventions.html";
}

// ======================
// LOAD INTERVENTION
// ======================
async function loadIntervention() {
  const interventions = await apiFetch("/interventions");

  const intervention = interventions.find(
    i => i.id_intervention == interventionId
  );

  if (!intervention) {
    detailsDiv.innerHTML = "<p>Intervention not found</p>";
    return;
  }

  detailsDiv.innerHTML = `
    <p><strong>ID:</strong> ${intervention.id_intervention}</p>
    <p><strong>Title:</strong> ${intervention.title}</p>
    <p><strong>Project:</strong> ${intervention.Project?.title}</p>
    <p><strong>Client:</strong> ${intervention.Client?.name}</p>
  `;

  statusSelect.value = intervention.id_status;

  renderAssignedUsers(intervention.Users);
  loadUsersDropdown();
}

// ======================
// RENDER ASSIGNED USERS
// ======================
function renderAssignedUsers(users) {
  assignedUsersList.innerHTML = "";

  if (!users || users.length === 0) {
    assignedUsersList.innerHTML = "<p>No users assigned</p>";
    return;
  }

  users.forEach(u => {
    assignedUsersList.innerHTML += `
      <span class="user-badge">
        ${u.first_name} ${u.last_name}
        <button onclick="unassignUser(${u.id_user})">✖</button>
      </span>
    `;
  });
}

// ======================
// LOAD ALL USERS
// ======================
async function loadUsersDropdown() {
  try {
    const users = await apiFetch("/users");

    userSelect.innerHTML = `<option value="">-- Select Technician --</option>`;

    // Filter only Technicians
    const technicians = users.filter(
      u => u.Role && u.Role.name === "Technician"
    );

    technicians.forEach(u => {
      userSelect.innerHTML += `
        <option value="${u.id_user}">
          ${u.first_name} ${u.last_name}
        </option>
      `;
    });

  } catch (err) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    console.error(err);
  }
}

// ======================
// ASSIGN
// ======================
async function assignUser() {
  const userId = userSelect.value;

  if (!userId) {
    alert("Select a user");
    return;
  }

  await apiFetch(`/interventions/${interventionId}/assign`, {
    method: "POST",
    body: JSON.stringify({ userId })
  });

  loadIntervention();
}

// ======================
// UNASSIGN
// ======================
async function unassignUser(userId) {
  await apiFetch(`/interventions/${interventionId}/unassign/${userId}`, {
    method: "DELETE"
  });

  loadIntervention();
}

// ======================
// UPDATE STATUS
// ======================
async function updateStatus() {
  await apiFetch(`/interventions/${interventionId}`, {
    method: "PUT",
    body: JSON.stringify({ id_status: statusSelect.value })
  });

  alert("Status updated");
}

loadIntervention();
