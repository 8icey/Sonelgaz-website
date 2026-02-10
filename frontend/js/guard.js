(function () {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || !role) {
    alert("You must be logged in");
    window.location.href = "index.html";
  }
})();
