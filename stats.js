function renderStats() {
  const performance = document.getElementById("habitPerformance");
  const overall = document.getElementById("overallCompletion");
  
  if(!performance || !overall) return;
  performance.innerHTML = "";

  if (habits.length === 0) {
    performance.innerHTML = "<p class='empty-text'>No data logged yet. Track habits to see analysis here!</p>";
    overall.innerText = "0%";
    return;
  }

  let totalDaysLogged = 0;

  habits.forEach(function(habit) {
    const logs = habit.history ? habit.history.length : 0;
    totalDaysLogged += logs;

    // Calculate percent based on a 7-day target tracker view matrix capped at 100%
    const percent = Math.min(Math.round((logs / 7) * 100), 100);

    const div = document.createElement("div");
    div.className = "performance-item";

    div.innerHTML = `
      <div class="performance-meta">
        <h3>${habit.name}</h3>
        <span>${percent}% (${logs}/7 days)</span>
      </div>
      <div class="bar">
        <div class="fill" style="width: ${percent}%"></div>
      </div>
    `;
    performance.appendChild(div);
  });

  const overallPercent = Math.round((totalDaysLogged / (habits.length * 7)) * 100);
  overall.innerText = (overallPercent > 100 ? 100 : overallPercent) + "%";
}

// INITIALIZE METRICS LAYOUT VIEW
document.addEventListener("DOMContentLoaded", function() {
  loadData();
  renderStats();
});