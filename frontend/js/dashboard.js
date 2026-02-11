// const role = localStorage.getItem("role");
// const name = localStorage.getItem("username");

// if (!role || !name) {
//   alert("Session expired");
//   window.location.href = "index.html";
// }

// document.getElementById("welcome").innerText =
//   `Welcome ${name} (${role})`;

// const menu = document.getElementById("menu");

// menu.innerHTML = `
//   <li><a href="interventions.html">View Interventions</a></li>
// `;

// if (role === "ADMIN") {
//   menu.innerHTML += `
//     <li><a href="clients.html">Manage Clients</a></li>
//     <li><a href="project-edit.html">Manage Projects</a></li>
//   `;
// }

// if (role === "MANAGER") {
//   menu.innerHTML += `
//     <li><a href="project-edit.html">Manage Projects</a></li>
//   `;
// }

// // ✅ LOGOUT
// document.getElementById("logoutBtn").addEventListener("click", () => {
//   localStorage.clear();
//   window.location.href = "index.html";
// });
renderNavbar();

const role = localStorage.getItem("role");
const menu = document.getElementById("menu");

menu.innerHTML = `
  <li><a href="interventions.html">📋 Interventions</a></li>
`;

if (role === "Admin") {
  menu.innerHTML += `<li><a href="clients.html">👥 Manage Clients</a></li>`;
}

async function loadStats() {
  const interventions = await apiFetch("/interventions");

  const total = interventions.length;
  const completed = interventions.filter(i => i.Status?.name === "Completed").length;
  const pending = interventions.filter(i => i.Status?.name === "Pending").length;

  document.getElementById("stats").innerHTML = `
    <div class="card">
      <h3>Statistics</h3>
      <p>Total Interventions: ${total}</p>
      <p>Completed: ${completed}</p>
      <p>Pending: ${pending}</p>
    </div>
  `;
}
loadStats();

async function loadStatusChart() {
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

  const ctx = document.getElementById("statusChart").getContext("2d");

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: Object.keys(counts),
      datasets: [{
        data: Object.values(counts),
        backgroundColor: [
          "#f9a825",
          "#1e88e5",
          "#43a047",
          "#e53935"
        ]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom"
        }
      }
    }
  });
}
loadStatusChart();
