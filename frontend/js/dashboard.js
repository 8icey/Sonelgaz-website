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
const name = localStorage.getItem("username");
const role = localStorage.getItem("role");

document.getElementById("welcome").innerText =
  `Welcome ${name} (${role})`;

renderNavbar();
