document.getElementById("editProjectForm").addEventListener("submit", async e => {
  e.preventDefault();

  const id = document.getElementById("projectId").value;
  const title = document.getElementById("projectTitle").value;

  try {
    await apiFetch(`/projects/${id}`, "PUT", { title });
    document.getElementById("message").innerText = "Project updated successfully";
  } catch (err) {
    document.getElementById("message").innerText = err.message;
  }
});
