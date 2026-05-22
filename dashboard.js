// ==========================================
// 🛠️ BULLETPROOF DASHBOARD ENGINE
// ==========================================

// FORCE FRESH STORAGE SYNC
if (typeof loadData === "function") {
  loadData();
}

// 1. LIVE CLOCK ENGINE
function updateClock() {
  const clockEl = document.getElementById("clock");
  if (clockEl) {
    const now = new Date();
    clockEl.innerText = now.toLocaleTimeString();
  }
}

// 2. STATS OVERVIEW UPDATER (Crash-Proofed for Empty Arrays)
function updateDashboardStats() {
  let total = 0;
  let best = 0;
  let days = 0;
  let completion = 0;

  if (habits && habits.length > 0) {
    total = habits.length;
    
    const streaks = habits.map(function(h) { return h.streak || 0; });
    best = Math.max(...streaks, 0);
    
    days = habits.reduce(function(sum, h) { 
      return sum + (h.history ? h.history.length : 0); 
    }, 0);
    
    completion = Math.round((days / (total * 7)) * 100);
  }

  // Update DOM Nodes safely if present
  if (document.getElementById("totalHabits")) document.getElementById("totalHabits").innerText = total;
  if (document.getElementById("bestStreak")) document.getElementById("bestStreak").innerText = best;
  if (document.getElementById("totalDays")) document.getElementById("totalDays").innerText = days;
  if (document.getElementById("completionRate")) document.getElementById("completionRate").innerText = completion + "%";

  const ringElement = document.getElementById("visualRing");
  if (ringElement) {
    const rotationDegrees = (completion / 100) * 360;
    ringElement.style.transform = `rotate(${rotationDegrees}deg)`;
  }
}

// 3. TODAY'S HABITS ROW BUILDER
function showTodayHabits() {
  const container = document.getElementById("todayHabits");
  if (!container) return;
  
  container.innerHTML = "";
  const today = new Date().toLocaleDateString();

  if (!habits || habits.length === 0) {
    container.innerHTML = `<p class="empty-text" style="color: #94a3b8; font-style: italic; padding: 15px; text-align: center; width: 100%;">No habits assigned yet. Go to the Habits page to add some!</p>`;
    return;
  }

  habits.forEach(function(habit) {
    const done = habit.history && habit.history.includes(today);
    const div = document.createElement("div");
    div.className = `today-item ${done ? 'checked-off' : ''}`;
    div.innerHTML = `
      <span class="status-icon" style="margin-right: 12px;">${done ? "✅" : "⬜"}</span>
      <span class="habit-text">${habit.name || "Unnamed Habit"}</span>
    `;
    container.appendChild(div);
  });
}

// 4. OFFLINE MOTIVATIONAL ENGINE
function loadQuote() {
  const quoteEl = document.getElementById("quote");
  if (!quoteEl) return;

  const fallbackQuotes = [
    "Small daily improvements over time lead to stunning results.",
    "Consistency is far more important than perfection.",
    "Your habits will determine your future. Choose wisely.",
    "Atomic habits: 1% better every single day adds up fast."
  ];

  const randomIdx = Math.floor(Math.random() * fallbackQuotes.length);
  quoteEl.innerText = `"${fallbackQuotes[randomIdx]}"`;
}

// 5. SYSTEM ENVIRONMENT TRACKER
function displayBrowserInfo() {
  const browserEl = document.getElementById("browser");
  if (!browserEl) return;

  const ua = navigator.userAgent;
  let browserName = "Web Browser";
  if (ua.includes("Firefox")) browserName = "Mozilla Firefox";
  else if (ua.includes("Edge")) browserName = "Microsoft Edge";
  else if (ua.includes("Chrome")) browserName = "Google Chrome";
  else if (ua.includes("Safari")) browserName = "Apple Safari";

  browserEl.innerText = `Running smoothly via ${browserName}`;
}

// ==========================================
// 🚀 RUN ENGINE EXECUTIONS
// ==========================================
try {
  updateClock();
  setInterval(updateClock, 1000);
  loadQuote();
  displayBrowserInfo();
  updateDashboardStats();
  showTodayHabits();
} catch (error) {
  console.error("Dashboard engine fail warning: ", error);
}