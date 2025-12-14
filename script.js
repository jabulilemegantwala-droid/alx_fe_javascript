// Load quotes from localStorage or defaults
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "The journey of a thousand miles begins with a single step.", category: "Motivation" },
  { text: "In the middle of difficulty lies opportunity.", category: "Inspiration" },
  { text: "Code is like humor. When you have to explain it, it’s bad.", category: "Programming" }
];

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const addQuoteBtn = document.getElementById("addQuoteBtn");
const categoryFilter = document.getElementById("categoryFilter");

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Populate categories dynamically
function populateCategories() {
  const categories = ["all", ...new Set(quotes.map(q => q.category))];
  categoryFilter.innerHTML = "";
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    categoryFilter.appendChild(option);
  }

  // Restore last selected filter
  const savedFilter = localStorage.getItem("selectedCategory");
  if (savedFilter && categories.includes(savedFilter)) {
    categoryFilter.value = savedFilter;
  } else {
    categoryFilter.value = "all";
  }
}

// Show a random quote based on filter
function showRandomQuote() {
  let filteredQuotes = quotes;
  const selectedCategory = categoryFilter.value;

  if (selectedCategory !== "all") {
    filteredQuotes = quotes.filter(q => q.category === selectedCategory);
  }

  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = "No quotes available in this category.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[randomIndex];
  quoteDisplay.textContent = `"${quote.text}" — [${quote.category}]`;

  // Save last viewed quote in sessionStorage
  sessionStorage.setItem("lastQuote", JSON.stringify(quote));
}

// Add a new quote
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const newText = textInput.value.trim();
  const newCategory = categoryInput.value.trim();

  if (newText && newCategory) {
    quotes.push({ text: newText, category: newCategory });
    saveQuotes();
    populateCategories();

    textInput.value = "";
    categoryInput.value = "";

    quoteDisplay.textContent = `New quote added in category "${newCategory}"!`;
  } else {
    quoteDisplay.textContent = "Please enter both a quote and a category.";
  }
}

// Filter quotes when category changes
function filterQuotes() {
  const selectedCategory = categoryFilter.value;
  localStorage.setItem("selectedCategory", selectedCategory);
  showRandomQuote();
}

// Event listeners
newQuoteBtn.addEventListener("click", showRandomQuote);
addQuoteBtn.addEventListener("click", addQuote);
categoryFilter.addEventListener("change", filterQuotes);

// Initialize
populateCategories();
showRandomQuote();
