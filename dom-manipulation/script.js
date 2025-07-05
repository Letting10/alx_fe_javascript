let quotes = [];

function loadQuotes() {
  const saved = localStorage.getItem("quotes");
  if (saved) {
    quotes = JSON.parse(saved);
  } else {
    quotes = [
      { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
      { text: "Be yourself; everyone else is already taken.", category: "Inspiration" },
      { text: "Life is what happens when you're busy making other plans.", category: "Life" }
    ];
    saveQuotes();
  }
}

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function showRandomQuote(filteredList = quotes) {
  if (filteredList.length === 0) {
    document.getElementById("quoteDisplay").innerHTML = "No quotes found in this category.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredList.length);
  const selectedQuote = filteredList[randomIndex];

  document.getElementById("quoteDisplay").innerHTML = `"${selectedQuote.text}" — (${selectedQuote.category})`;
  sessionStorage.setItem("lastQuote", JSON.stringify(selectedQuote));
}

function addQuote(text, category) {
  if (text && category) {
    quotes.push({ text, category });
    saveQuotes();
    populateCategories(); 
    showRandomQuote();   
  }
}

function createAddQuoteForm() {
  const formDiv = document.createElement("div");

  const inputText = document.createElement("input");
  inputText.type = "text";
  inputText.placeholder = "Enter a new quote";
  inputText.id = "newQuoteText";

  const inputCategory = document.createElement("input");
  inputCategory.type = "text";
  inputCategory.placeholder = "Enter quote category";
  inputCategory.id = "newQuoteCategory";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.addEventListener("click", () => {
    const text = inputText.value.trim();
    const category = inputCategory.value.trim();
    if (text && category) {
      addQuote(text, category);
      inputText.value = "";
      inputCategory.value = "";
    } else {
      alert("Please enter both quote text and category.");
    }
  });

  formDiv.appendChild(inputText);
  formDiv.appendChild(inputCategory);
  formDiv.appendChild(addButton);

  document.body.appendChild(formDiv);
}


function populateCategories() {
  const categorySelect = document.getElementById("categoryFilter");
  const currentValue = localStorage.getItem("selectedCategory") || "all";

  categorySelect.innerHTML = `<option value="all">All Categories</option>`;

  const categories = quotes
    .map(q => q.category)
    .filter((cat, i, self) => self.indexOf(cat) === i);

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });

  categorySelect.value = currentValue;
}


function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selectedCategory); 

  const filteredQuotes = selectedCategory === "all"
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  showRandomQuote(filteredQuotes);
}


function exportToJsonFile() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}


function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        populateCategories();
        filterQuotes(); 
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid JSON format.");
      }
    } catch (err) {
      alert("Error reading file.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}


window.onload = () => {
  loadQuotes();
  createAddQuoteForm();
  populateCategories();

  const selected = localStorage.getItem("selectedCategory") || "all";
  document.getElementById("categoryFilter").value = selected;
  filterQuotes(); 
};


document.getElementById("newQuote").addEventListener("click", filterQuotes);
