// ==============================
// RBAC (ADMIN ONLY)
// ==============================
if (localStorage.getItem("role") !== "Admin") {
  window.location.href = "dashboard.html";
}

let usersCache = [];
let currentPage = 1;
const rowsPerPage = 5;

const table = document.getElementById("usersTable");

// ==============================
// MODAL CONTROLS
// ==============================
function showCreate() {
  document.getElementById("userModal").style.display = "block";
}

function closeModal() {
  document.getElementById("userModal").style.display = "none";
}

function closeEditModal() {
  document.getElementById("editModal").style.display = "none";
}

// ==============================
// LOAD USERS
// ==============================
async function loadUsers() {
  try {
    const users = await apiFetch("/users");
    usersCache = users;
    currentPage = 1;
    renderUsers();
  } catch (err) {
    showToast(err.message, "error");
  }
}

function renderUsers() {
  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginated = usersCache.slice(start, end);

  table.innerHTML = "";

  paginated.forEach(u => {
    table.innerHTML += `
      <tr>
        <td>${u.id_user}</td>
        <td>${u.first_name} ${u.last_name}</td>
        <td>${u.email}</td>
        <td>${u.Role?.name || "-"}</td>
        <td>
          <button onclick="editUser(${u.id_user})">Edit</button>
          <button onclick="deleteUser(${u.id_user})">Delete</button>
        </td>
      </tr>
    `;
  });

  updatePagination();
}

// ==============================
// CREATE USER
// ==============================
async function createUser() {
  const firstName = firstNameInput.value.trim();
  const lastName  = lastNameInput.value.trim();
  const email     = emailInput.value.trim();
  const password  = passwordInput.value;
  const role      = roleSelect.value;

  if (!firstName || !lastName || !email || !password || !role) {
    showToast("Please fill in all fields", "error");
    return;
  }

  try {
    const res = await apiFetch("/users", {
      method: "POST",
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        id_role: role
      })
    });

    showToast(res.message || "User created successfully", "success");

    document.getElementById("createForm").reset();
    closeModal();
    loadUsers();

  } catch (err) {
    showToast(err.message || "Failed to create user", "error");
  }
}

// ==============================
// EDIT USER
// ==============================
function editUser(id) {
  const user = usersCache.find(u => u.id_user === id);
  if (!user) return;

  editUserId.value = user.id_user;
  editFirstName.value = user.first_name;
  editLastName.value = user.last_name;
  editEmail.value = user.email;
  editRole.value = user.id_role;

  document.getElementById("editModal").style.display = "block";
}

// ==============================
// UPDATE USER
// ==============================
async function updateUser() {
  const id = editUserId.value;

  const first_name = editFirstName.value.trim();
  const last_name  = editLastName.value.trim();
  const email      = editEmail.value.trim();
  const id_role    = editRole.value;

  if (!first_name || !last_name || !email || !id_role) {
    showToast("Please fill all fields", "error");
    return;
  }

  try {
    const res = await apiFetch(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        id_role
      })
    });

    showToast(res.message || "User updated successfully", "success");

    closeEditModal();
    loadUsers();

  } catch (err) {
    showToast(err.message || "Failed to update user", "error");
  }
}

// ==============================
// DELETE USER
// ==============================
async function deleteUser(id) {
  if (!confirm("Delete this user?")) return;

  try {
    const res = await apiFetch(`/users/${id}`, {
      method: "DELETE"
    });

    showToast(res.message || "User deleted", "success");
    loadUsers();

  } catch (err) {
    showToast(err.message || "Failed to delete user", "error");
  }
}

// ==============================
// PAGINATION
// ==============================
function nextPage() {
  const totalPages = Math.ceil(usersCache.length / rowsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderUsers();
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderUsers();
  }
}

function updatePagination() {
  const totalPages = Math.ceil(usersCache.length / rowsPerPage);
  document.getElementById("pageInfo").innerText =
    `Page ${currentPage} of ${totalPages}`;
}

// INIT
loadUsers();
