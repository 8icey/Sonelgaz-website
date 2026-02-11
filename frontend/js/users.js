// ==============================
// FRONTEND RBAC (ADMIN ONLY)
// ==============================
if (localStorage.getItem("role") !== "Admin") {
  alert("Access denied");
  window.location.href = "dashboard.html";
}

const table = document.getElementById("usersTable");

let usersCache = [];

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

    table.innerHTML = "";

    users.forEach(u => {
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

  } catch (err) {
    alert(err.message || "Failed to load users");
  }
}

// ==============================
// CREATE USER
// ==============================
async function createUser() {
  const firstName = document.getElementById("firstName").value.trim();
  const lastName  = document.getElementById("lastName").value.trim();
  const email     = document.getElementById("email").value.trim();
  const password  = document.getElementById("password").value;
  const role      = document.getElementById("role").value;

  if (!firstName || !lastName || !email || !password || !role) {
    alert("Please fill in all fields");
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

    alert(res.message || "User created successfully");

    document.getElementById("createForm").reset();
    closeModal();
    loadUsers();

  } catch (err) {
    alert(err.message || "Failed to create user");
  }
}

// ==============================
// EDIT USER
// ==============================
function editUser(id) {
  const user = usersCache.find(u => u.id_user === id);
  if (!user) return;

  document.getElementById("editUserId").value = user.id_user;
  document.getElementById("editFirstName").value = user.first_name;
  document.getElementById("editLastName").value = user.last_name;
  document.getElementById("editEmail").value = user.email;
  document.getElementById("editRole").value = user.id_role;

  document.getElementById("editModal").style.display = "block";
}

// ==============================
// UPDATE USER
// ==============================
async function updateUser() {
  const id = document.getElementById("editUserId").value;

  const first_name = document.getElementById("editFirstName").value.trim();
  const last_name  = document.getElementById("editLastName").value.trim();
  const email      = document.getElementById("editEmail").value.trim();
  const id_role    = document.getElementById("editRole").value;

  if (!first_name || !last_name || !email || !id_role) {
    alert("Please fill all fields");
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

    alert(res.message || "User updated successfully");

    closeEditModal();
    loadUsers();

  } catch (err) {
    alert(err.message || "Failed to update user");
  }
}

// ==============================
// DELETE USER
// ==============================
async function deleteUser(id) {
  if (!confirm("Are you sure you want to delete this user?")) return;

  try {
    const res = await apiFetch(`/users/${id}`, {
      method: "DELETE"
    });

    alert(res.message || "User deleted");
    loadUsers();

  } catch (err) {
    alert(err.message || "Failed to delete user");
  }
}

loadUsers();
