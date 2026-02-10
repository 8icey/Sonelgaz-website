const params = new URLSearchParams(window.location.search);
const interventionId = params.get("id");
const role = localStorage.getItem("role");
const statusSection = document.getElementById("statusSection");
const statusSelect = document.getElementById("statusSelect");

const detailsDiv = document.getElementById("details");
const assignSection = document.getElementById("assignSection");
const userSelect = document.getElementById("userSelect");

function goBack() {
  window.location.href = "interventions.html";
}

async function loadIntervention() {
  const interventions = await apiFetch("/interventions");

  const intervention = interventions.find(
    i => i.id_intervention == interventionId
  );

  if (!intervention) {
    detailsDiv.innerHTML = "<p>Intervention not found</p>";
    return;
  }

  const usersAssigned =
    intervention.Users?.map(u => `${u.first_name} ${u.last_name}`).join(", ")
    || "None";

  detailsDiv.innerHTML = `
    <p><strong>ID:</strong> ${intervention.id_intervention}</p>
    <p><strong>Project:</strong> ${intervention.Project?.title}</p>
    <p><strong>Client:</strong> ${intervention.Client?.name}</p>
    <p><strong>Status:</strong> ${intervention.Status?.name}</p>
    <p><strong>Assigned Users:</strong> ${usersAssigned}</p>
  `;

  if (role === "Admin") {
    assignSection.style.display = "block";
    loadUsersFromInterventions(interventions);
  }

  if (role === "Admin" || role === "Manager") {
  statusSection.style.display = "block";

  // Preselect current status
  if (intervention.Status?.id_status) {
    statusSelect.value = intervention.Status.id_status;
  }
}

}

function loadUsersFromInterventions(interventions) {
  const userMap = {};

  interventions.forEach(i => {
    i.Users?.forEach(u => {
      userMap[u.id_user] = u;
    });
  });

  userSelect.innerHTML = `<option value="">-- Select a user --</option>`;

  Object.values(userMap).forEach(u => {
    userSelect.innerHTML += `
      <option value="${u.id_user}">
        ${u.first_name} ${u.last_name}
      </option>
    `;
  });
}

async function assignUser() {
  const userId = userSelect.value;
  if (!userId) {
    alert("Please select a user");
    return;
  }

  await apiFetch(`/interventions/${interventionId}/assign`, {
    method: "POST",
    body: JSON.stringify({ userId })
  });

  alert("User assigned successfully");
  loadIntervention();
}

async function updateStatus() {
  const newStatusId = statusSelect.value;

  if (!newStatusId) {
    alert("Please select a status");
    return;
  }

  await apiFetch(`/interventions/${interventionId}`, {
    method: "PUT",
    body: JSON.stringify({ id_status: newStatusId })
  });

  alert("Status updated successfully");
  loadIntervention();
}


loadIntervention();
