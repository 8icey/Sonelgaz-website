const table = document.getElementById("projectsTable");

async function loadProjects() {
  const projects = await apiFetch("/projects");

  table.innerHTML = "";

  projects.forEach(p => {
    table.innerHTML += `
      <tr>
        <td>${p.id_project}</td>
        <td>${p.title}</td>
        <td>${p.description || "-"}</td>
        <td>
          <button onclick="editProject(${p.id_project})">
            Edit
          </button>
        </td>
      </tr>
    `;
  });
}

function editProject(id) {
  window.location.href = `project-edit.html?id=${id}`;
}

loadProjects();
