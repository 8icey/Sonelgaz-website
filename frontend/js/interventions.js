const role = localStorage.getItem("role");
const table = document.getElementById("interventionsTable");

function goBack() {
  window.location.href = "dashboard.html";
}

async function loadInterventions() {
  const interventions = await apiFetch("/interventions");
  table.innerHTML = "";

  interventions.forEach(i => {
    const users = i.Users?.map(u => u.first_name).join(", ") || "-";

    let actionsHtml = `
      <button class="primary" onclick="viewIntervention(${i.id_intervention})">
        View
      </button>
    `;

    if (role === "Admin") {
      actionsHtml += `
        <button class="secondary" onclick="assignUser(${i.id_intervention})">
          Assign User
        </button>
      `;
    }

    table.innerHTML += `
      <tr>
        <td>${i.id_intervention}</td>
        <td>${i.Project?.title || "-"}</td>
        <td>${i.Status?.name || "-"}</td>
        <td>${i.Client?.name || "-"}</td>
        <td>${users}</td>
        <td>${actionsHtml}</td>
      </tr>
    `;
  });
}

function viewIntervention(id) {
  window.location.href = `intervention.html?id=${id}`;
}

async function assignUser(interventionId) {
  const userId = prompt("Enter User ID to assign:");
  if (!userId) return;

  await apiFetch(`/interventions/${interventionId}/assign`, {
    method: "POST",
    body: JSON.stringify({ userId })
  });

  alert("User assigned successfully");
  loadInterventions();
}

loadInterventions();
