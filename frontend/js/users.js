// ==============================
// FRONTEND RBAC (ADMIN ONLY)
// ==============================
if (localStorage.getItem("role") !== "Admin") {
  alert("Access denied");
  window.location.href = "dashboard.html";
}

const table = document.getElementById("usersTable");

// ==============================
// UI HELPERS
// ==============================
function showCreate() {
  document.getElementById("createForm").style.display = "block";
}

// ==============================
// LOAD USERS
// ==============================
async function loadUsers() {
  try {
    const users = await apiFetch("/users");

    table.innerHTML = "";

    users.forEach(u => {
      table.innerHTML += `
        <tr>
          <td>${u.id_user}</td>
          <td>${u.first_name} ${u.last_name}</td>
          <td>${u.email}</td>
          <td>${u.Role?.name || "-"}</td>
          <td>
            <button onclick="deleteUser(${u.id_user})">
              Delete
            </button>
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

  // Basic frontend validation
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

    // Reset form
    document.getElementById("createForm").reset();

    loadUsers();

  } catch (err) {
    // THIS is the important fix 👇
    alert(err.message || "Failed to create user");
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

// ==============================
// INIT
// ==============================
loadUsers();
