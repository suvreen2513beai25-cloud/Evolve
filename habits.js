// Change the very top of habits.js to this:
loadData(); 

// Make sure this file can read the input box by grabbing its ID correctly:
const input = document.getElementById("habitInput");

function addHabit() {
  const text = input.value.trim();
  if (text === "") {
    alert("Please enter a valid habit name!");
    return;
  }

  habits.push({
    name: text,
    streak: 0,
    createdAt: new Date().toLocaleDateString(),
    history: []
  });

  input.value = "";
  saveData();
  renderHabits();
}

function renderHabits() {
  const grid = document.getElementById("habitsGrid");
  if (!grid) return;
  grid.innerHTML = "";

  if (habits.length === 0) {
    grid.innerHTML = `
      <div class="empty">
        <h3>No habits added yet. Type one above to get started!</h3>
      </div>
    `;
    return;
  }

  const today = new Date().toLocaleDateString();

  habits.forEach(function(habit, index) {
    const card = document.createElement("div");
    card.className = "habit-card";
    
    const isDoneToday = habit.history && habit.history.includes(today);

    card.innerHTML = `
      <h2>${habit.name}</h2>
      <div class="habit-info">
        <p>📅 Created: <span>${habit.createdAt}</span></p>
        <p>🔥 Current Streak: <span>${habit.streak} days</span></p>
      </div>
      <div class="card-buttons">
        <button 
          onclick="markDone(${index})" 
          class="btn primary ${isDoneToday ? 'disabled-btn' : ''}"
          ${isDoneToday ? 'disabled' : ''}
        >
          ${isDoneToday ? '✓ Done Today' : 'Mark Done'}
        </button>
        <button onclick="deleteHabit(${index})" class="btn danger">
          Delete
        </button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function markDone(index) {
  const today = new Date().toLocaleDateString();

  if (!habits[index].history) {
    habits[index].history = [];
  }

  if (!habits[index].history.includes(today)) {
    habits[index].history.push(today);
    habits[index].streak += 1;
    saveData();
    renderHabits();
  }
}

function deleteHabit(index) {
  if(confirm(`Remove "${habits[index].name}"?`)) {
    habits.splice(index, 1);
    saveData();
    renderHabits();
  }
}

// CAPTURE CARRIAGE RETURN KEYPRESS EVENTS
if (input) {
  input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
      addHabit();
    }
  });
}

// INITIAL SCREEN DISPATCH
document.addEventListener("DOMContentLoaded", function() {
  loadData();
  renderHabits();
});
// 1. IMPROVED ADD HABIT FUNCTION WITH VALIDATION
function addHabit() {
  const text = input.value.trim();
  
  // Validation Check A: Empty text or just spaces
  if (text === "") {
    alert("❌ Habit name cannot be empty!");
    return;
  }

  // Validation Check B: Prevent exact duplicate habit names
  const isDuplicate = habits.some(h => h.name.toLowerCase() === text.toLowerCase());
  if (isDuplicate) {
    alert("❌ You are already tracking this habit!");
    return;
  }

  // If validation passes, push the data safely
  habits.push({
    name: text,
    streak: 0,
    createdAt: new Date().toLocaleDateString(),
    history: []
  });

  input.value = "";
  saveData();
  renderHabits();
}

// 2. NEW FEATURE: ADVANCED SORTING METHOD (Teachers love array transformations!)
function sortHabits(criteria) {
  if (criteria === "streak") {
    habits.sort((a, b) => b.streak - a.streak); // Sort highest streak to lowest
  } else if (criteria === "name") {
    habits.sort((a, b) => a.name.localeCompare(b.name)); // Alphabetical order
  }
  
  saveData();
  renderHabits();
}