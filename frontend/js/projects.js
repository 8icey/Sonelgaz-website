// =============================
// RBAC (Admin + Manager)
// =============================
const role = localStorage.getItem("role");
if (role !== "Admin" && role !== "Manager") {
  window.location.href = "dashboard.html";
}

let projectsCache = [];
let currentPage = 1;
const rowsPerPage = 5;

const table = document.getElementById("projectsTable");

// =============================
// LOAD PROJECTS
// =============================
async function loadProjects() {
  try {
    const projects = await apiFetch("/projects");
    projectsCache = projects;
    renderProjects();
  } catch (err) {
    showToast(err.message, "error");
  }
}

// =============================
// RENDER PROJECTS
// =============================
function renderProjects(list = projectsCache) {
  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginated = list.slice(start, end);

  table.innerHTML = "";

  paginated.forEach(p => {
    table.innerHTML += `
      <tr>
        <td>${p.id_project}</td>
        <td>${p.title}</td>
        <td>${p.description ? p.description : "-"}</td>
        <td>${formatDate(p.start_date)}</td>
        <td>${formatDate(p.end_date)}</td>
        <td>
          <button onclick="editProject(${p.id_project})">Edit</button>
          <button onclick="deleteProject(${p.id_project})">Delete</button>
        </td>
      </tr>
    `;
  });

  updatePagination(list.length);
}

// =============================
// CREATE
// =============================
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

    showToast("Project created successfully", "success");
    closeModal();
    loadProjects();

  } catch (err) {
    showToast(err.message, "error");
  }
}

// =============================
// DELETE
// =============================
async function deleteProject(id) {
  if (!confirm("Delete this project?")) return;

  try {
    await apiFetch(`/projects/${id}`, { method: "DELETE" });
    showToast("Project deleted", "success");
    loadProjects();
  } catch (err) {
    showToast(err.message, "error");
  }
}

// =============================
// EDIT
// =============================
function editProject(id) {
  const project = projectsCache.find(p => p.id_project === id);

  document.getElementById("editProjectId").value = project.id_project;
  document.getElementById("editTitle").value = project.title;
  document.getElementById("editDescription").value = project.description || "";
  document.getElementById("editStartDate").value =
    project.start_date ? project.start_date.split("T")[0] : "";
  document.getElementById("editEndDate").value =
    project.end_date ? project.end_date.split("T")[0] : "";

  document.getElementById("editProjectModal").style.display = "block";
}

function closeEditModal() {
  document.getElementById("editProjectModal").style.display = "none";
}

// =============================
// UPDATE
// =============================
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

    showToast("Project updated successfully", "success");
    closeEditModal();
    loadProjects();

  } catch (err) {
    showToast(err.message, "error");
  }
}

// =============================
// PAGINATION
// =============================
function nextPage() {
  const totalPages = Math.ceil(projectsCache.length / rowsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderProjects();
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderProjects();
  }
}

function updatePagination() {
  const totalPages = Math.ceil(projectsCache.length / rowsPerPage);
  document.getElementById("pageInfo").innerText =
    `Page ${currentPage} of ${totalPages}`;
}

// =============================
// UTIL
// =============================
function formatDate(date) {
  if (!date) return "-";
  return date.split("T")[0];
}

function showCreate() {
  document.getElementById("projectModal").style.display = "block";
}

function closeModal() {
  document.getElementById("projectModal").style.display = "none";
}
function searchProjects() {
  const value = document.getElementById("searchInput").value.toLowerCase();

  const filtered = projectsCache.filter(p =>
    p.title.toLowerCase().includes(value)
  );

  currentPage = 1;
  renderProjects(filtered);
}

// INIT
loadProjects();
