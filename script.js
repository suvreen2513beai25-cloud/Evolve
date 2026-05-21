// Load data
let habits = JSON.parse(localStorage.getItem("habits")) || [];

// Save data
const saveData = () => {
  localStorage.setItem("habits", JSON.stringify(habits));
};

// Load data (used in pages)
const loadData = () => {
  habits = JSON.parse(localStorage.getItem("habits")) || [];
};

// Add habit
const addHabit = () => {
  const input = document.getElementById("habitInput");

  if (!input.value.trim()) {
    alert("Enter a habit");
    return;
  }

  habits.push({
    name: input.value,
    streak: 0,
    history: []
  });

  input.value = "";

  saveData();
  renderHabits();
};

// Render habits (habits.html)
const renderHabits = () => {
  const grid = document.getElementById("habitsGrid");
  if (!grid) return;

  grid.innerHTML = "";

  if (habits.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <h3>No habits yet</h3>
        <p>Add your first habit to start tracking!</p>
      </div>
    `;
    return;
  }

  habits.forEach((habit, index) => {
    const card = document.createElement("div");
    card.className = "habit-card";

    card.innerHTML = `
      <div class="habit-header">
        <div class="habit-name">${habit.name}</div>
        <button class="delete-btn" onclick="deleteHabit(${index})">×</button>
      </div>

      <div class="streak-info">
        <div class="streak">🔥 ${habit.streak} days</div>
      </div>

      <button onclick="markDone(${index})" class="add-btn">Mark Done</button>
    `;

    grid.appendChild(card);
  });
};

// Mark habit done
const markDone = (index) => {
  const today = new Date().toLocaleDateString();

  if (!habits[index].history.includes(today)) {
    habits[index].history.push(today);
    habits[index].streak += 1;
  }

  saveData();
  renderHabits();
  updateDashboardStats();
};

// Delete habit
const deleteHabit = (index) => {
  habits.splice(index, 1);
  saveData();
  renderHabits();
};

// Dashboard stats
const updateDashboardStats = () => {
  const total = habits.length;
  const bestStreak = Math.max(...habits.map(h => h.streak), 0);

  const totalDays = habits.reduce((sum, h) => sum + h.history.length, 0);

  const completionRate =
    total === 0 ? 0 : Math.round((totalDays / (total * 7)) * 100);

  if (document.getElementById("totalHabits"))
    document.getElementById("totalHabits").innerText = total;

  if (document.getElementById("bestStreak"))
    document.getElementById("bestStreak").innerText = bestStreak;

  if (document.getElementById("totalDays"))
    document.getElementById("totalDays").innerText = totalDays;

  if (document.getElementById("completionRate"))
    document.getElementById("completionRate").innerText =
      completionRate + "%";
};
document.addEventListener("DOMContentLoaded", function () {
    loadData();
    updateDashboardStats();
    showTodayHabits();
});
// Show today's habits (dashboard)
const showTodayHabits = () => {
  const container = document.getElementById("todayHabits");
  if (!container) return;

  const today = new Date().toLocaleDateString();

  container.innerHTML = "";

  habits.forEach(habit => {
    const done = habit.history.includes(today);

    const div = document.createElement("div");
    div.innerHTML = `
      <p>
        ${done ? "✅" : "⬜"} ${habit.name}
      </p>
    `;

    container.appendChild(div);
  });
};




//new
const renderStats = () => {
  const performanceDiv = document.getElementById("habitPerformance");
  const overallDiv = document.getElementById("overallCompletion");

  if (!performanceDiv || !overallDiv) return;

  performanceDiv.innerHTML = "";

  if (habits.length === 0) {
    performanceDiv.innerHTML = "<p>No data available</p>";
    overallDiv.innerText = "0%";
    return;
  }

  let totalDays = 0;

  habits.forEach(habit => {
    totalDays += habit.history.length;

    const percent = Math.min(
      Math.round((habit.history.length / 7) * 100),
      100
    );

    const div = document.createElement("div");
    div.className = "habit-performance-item";

    div.innerHTML = `
      <div>
        <strong>${habit.name}</strong>
        <div class="performance-bar" style="width:${percent}%"></div>
      </div>
      <div>${percent}%</div>
    `;

    performanceDiv.appendChild(div);
  });

  const overall = Math.round(
    (totalDays / (habits.length * 7)) * 100
  );

  overallDiv.innerText = overall + "%";
};



//export data
function exportData() {
  if (habits.length === 0) {
    alert("No data to export");
    return;
  }

  const dataStr = JSON.stringify(habits, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "habits-data.json";

  document.body.appendChild(a); // ✅ IMPORTANT
  a.click();
  document.body.removeChild(a); // cleanup

  URL.revokeObjectURL(url);
}

//reset data
function resetAllData() {
  if (confirm("Are you sure you want to delete all data?")) {
    localStorage.removeItem("habits");
    habits = [];
    location.reload();
  }
}