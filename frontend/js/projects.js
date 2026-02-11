// RBAC (Admin + Manager)
const role = localStorage.getItem("role");
if (role !== "Admin" && role !== "Manager") {
  alert("Access denied");
  window.location.href = "dashboard.html";
}

const table = document.getElementById("projectsTable");
let projectsCache = [];

// =========================
// LOAD PROJECTS
// =========================
async function loadProjects() {
  try {
    const projects = await apiFetch("/projects");
    projectsCache = projects;

    table.innerHTML = "";

    projects.forEach(p => {
      table.innerHTML += `
        <tr>
          <td>${p.id_project}</td>
          <td>${p.title}</td>
          <td>${p.description || "-"}</td>
          <td>${formatDate(p.start_date)}</td>
          <td>${formatDate(p.end_date)}</td>
          <td>
            <button class="secondary" onclick="editProject(${p.id_project})">Edit</button>
            <button class="danger" onclick="deleteProject(${p.id_project})">Delete</button>
          </td>
        </tr>
      `;
    });

  } catch (err) {
    alert(err.message);
  }
}

// =========================
// CREATE PROJECT
// =========================
async function createProject() {
  try {
    await apiFetch("/projects", {
      method: "POST",
      body: JSON.stringify({
        title: title.value,
        description: description.value,
        start_date: startDate.value,
        end_date: endDate.value
      })
    });

    closeModal();
    loadProjects();

  } catch (err) {
    alert(err.message);
  }
}

// =========================
// DELETE PROJECT
// =========================
async function deleteProject(id) {
  if (!confirm("Delete this project?")) return;

  try {
    await apiFetch(`/projects/${id}`, {
      method: "DELETE"
    });

    loadProjects();

  } catch (err) {
    alert(err.message);
  }
}

// =========================
// EDIT PROJECT
// =========================
function editProject(id) {
  const project = projectsCache.find(p => p.id_project === id);

  editProjectId.value = project.id_project;
  editTitle.value = project.title;
  editDescription.value = project.description || "";
  editStartDate.value = project.start_date?.split("T")[0] || "";
  editEndDate.value = project.end_date?.split("T")[0] || "";

  document.getElementById("editProjectModal").style.display = "block";
}

function closeEditModal() {
  document.getElementById("editProjectModal").style.display = "none";
}

// =========================
// UPDATE PROJECT
// =========================
async function updateProject() {
  try {
    await apiFetch(`/projects/${editProjectId.value}`, {
      method: "PUT",
      body: JSON.stringify({
        title: editTitle.value,
        description: editDescription.value,
        start_date: editStartDate.value,
        end_date: editEndDate.value
      })
    });

    closeEditModal();
    loadProjects();

  } catch (err) {
    alert(err.message);
  }
}

// =========================
// MODAL HELPERS
// =========================
function showCreate() {
  document.getElementById("projectModal").style.display = "block";
}
function closeModal() {
  document.getElementById("projectModal").style.display = "none";
}

// =========================
// UTIL
// =========================
function formatDate(date) {
  if (!date) return "-";
  return date.split("T")[0];
}

// INIT
loadProjects();
