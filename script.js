// GLOBAL HABITS DATA ARRAY
let habits = [];

// Saves habits specifically to the logged-in username
function saveData() {
  const currentUser = localStorage.getItem("currentUser") || "global";
  localStorage.setItem(currentUser + "_habits", JSON.stringify(habits));
}

// Loads habits specifically belonging to the logged-in username
function loadData() {
  const currentUser = localStorage.getItem("currentUser") || "global";
  habits = JSON.parse(localStorage.getItem(currentUser + "_habits")) || [];
}

// EXPORT DATA TO JSON FILE
function exportData() {
  if (habits.length === 0) {
    alert("No data available to export.");
    return;
  }

  const data = JSON.stringify(habits, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = "habit-tracker-backup.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// RESET ALL USER DATA ACCORDING TO SESSION LOGIN
function resetAllData() {
  const check = confirm("⚠️ Are you absolutely sure you want to delete all habits and data permanently?");
  if (check) {
    const currentUser = localStorage.getItem("currentUser") || "global";
    localStorage.removeItem(currentUser + "_habits");
    habits = [];
    window.location.reload();
  }
}

// Automatically execute global parsing structures
loadData();

// Set a personalized username banner on app layouts
document.addEventListener("DOMContentLoaded", function() {
  const activeUser = localStorage.getItem("currentUser");
  const banner = document.getElementById("userGreeting");
  if (activeUser && banner) {
    // Shorten if email address layout string is too massive
    const cleanName = activeUser.includes("@") ? activeUser.split("@")[0] : activeUser;
    banner.innerText = `👤 Hello, ${cleanName}`;
  }
});

// Clear runtime memory values and return back safely
function logoutUser() {
  localStorage.removeItem("currentUser");
  window.location.href = "auth.html";
}