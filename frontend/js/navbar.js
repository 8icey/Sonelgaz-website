function renderNavbar() {
  const role = localStorage.getItem("role");

  const nav = document.getElementById("navbar");

  nav.innerHTML = `
    <a href="dashboard.html">Dashboard</a>
    <a href="interventions.html">Interventions</a>
    <a href="clients.html">Clients</a>
  `;

  if (role === "Admin") {
    nav.innerHTML += `
      
      <a href="projects.html">Projects</a>
      <a href="users.html">Users</a>
    `;
  }

  if (role === "Manager") {
    nav.innerHTML += `
    
      <a href="projects.html">Projects</a>
    `;
  }

  nav.innerHTML += `
    <button id="logoutBtn">Logout</button>
  `;

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "index.html";
  });
}
