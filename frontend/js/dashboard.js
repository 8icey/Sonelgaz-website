const role = localStorage.getItem("role");
const userId = localStorage.getItem("userId");

const statsContainer = document.getElementById("statsContainer");
const statusSummary = document.getElementById("statusSummary");

// ==============================
// LOAD DASHBOARD
// ==============================
async function loadDashboard() {
  try {

    const [projects, interventions, clients, users] = await Promise.all([
      apiFetch("/projects"),
      apiFetch("/interventions"),
      role === "Admin" ? apiFetch("/clients") : Promise.resolve([]),
      role === "Admin" ? apiFetch("/users") : Promise.resolve([])
    ]);

    renderStats(projects, interventions, clients, users);
    renderStatusSummary(interventions);

  } catch (err) {
    alert(err.message || "Failed to load dashboard");
  }
}

// ==============================
// RENDER STATS CARDS
// ==============================
function renderStats(projects, interventions, clients, users) {

  statsContainer.innerHTML = "";

  // ADMIN
  if (role === "Admin") {
    createCard("Users", users.length);
    createCard("Clients", clients.length);
    createCard("Projects", projects.length);
    createCard("Interventions", interventions.length);
  }

  // MANAGER
  if (role === "Manager") {
    createCard("Projects", projects.length);
    createCard("Interventions", interventions.length);
  }

  // TECHNICIAN
  if (role === "Technician") {
    const myInterventions = interventions.filter(i =>
      i.Users?.some(u => u.id_user == userId)
    );

    const completed = myInterventions.filter(i =>
      i.Status?.name === "Completed"
    );

    const pending = myInterventions.filter(i =>
      i.Status?.name === "Pending"
    );

    createCard("My Interventions", myInterventions.length);
    createCard("Completed", completed.length);
    createCard("Pending", pending.length);
  }
}

// ==============================
// CARD CREATOR
// ==============================
function createCard(title, value) {
  statsContainer.innerHTML += `
    <div class="stat-card">
      <h3>${value}</h3>
      <p>${title}</p>
    </div>
  `;
}

// ==============================
// STATUS SUMMARY
// ==============================
function renderStatusSummary(interventions) {

  const statusCounts = {};

  interventions.forEach(i => {
    const status = i.Status?.name || "Unknown";
    statusCounts[status] = (statusCounts[status] || 0) + 1;
  });

  let html = `<h3>Intervention Status Overview</h3><ul>`;

  for (let status in statusCounts) {
    html += `<li>${status}: ${statusCounts[status]}</li>`;
  }

  html += "</ul>";

  statusSummary.innerHTML = html;
}
async function loadChart() {
  const interventions = await apiFetch("/interventions");

  const counts = {
    Pending: 0,
    "In Progress": 0,
    Completed: 0,
    Cancelled: 0
  };

  interventions.forEach(i => {
    if (counts[i.Status?.name] !== undefined) {
      counts[i.Status.name]++;
    }
  });

  const ctx = document.getElementById("statusChart");

  new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: Object.keys(counts),
    datasets: [{
      data: Object.values(counts),
      backgroundColor: [
        "#ff9800",
        "#2196f3",
        "#4caf50",
        "#f44336"
      ]
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false
  }
});

}

loadChart();

// INIT
loadDashboard();
