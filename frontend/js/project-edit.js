const params = new URLSearchParams(window.location.search);
const projectId = params.get("id");

const form = document.getElementById("projectForm");
const titleInput = document.getElementById("title");
const descInput = document.getElementById("description");

function goBack() {
  window.location.href = "projects.html";
}

async function loadProject() {
  const projects = await apiFetch("/projects");
  const project = projects.find(p => p.id_project == projectId);

  if (!project) {
    alert("Project not found");
    return;
  }

  titleInput.value = project.title;
  descInput.value = project.description || "";
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  await apiFetch(`/projects/${projectId}`, {
    method: "PUT",
    body: JSON.stringify({
      title: titleInput.value,
      description: descInput.value
    })
  });

  alert("Project updated");
  goBack();
});

loadProject();
