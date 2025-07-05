const quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "Be yourself; everyone else is already taken.", category: "Inspiration" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" }
];

// Required function name
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const selectedQuote = quotes[randomIndex];

  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = `"${selectedQuote.text}" — (${selectedQuote.category})`;
}

// Required event listener
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);

// Required function name
function addQuote(text, category) {
  if (text && category) {
    quotes.push({ text, category });
    displayRandomQuote(); // show updated quote
  }
}

// Required function: create form with inputs and button
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

  document.body.appendChild(formDiv); // add form to page
}

// Call the function to generate the form when the page loads
createAddQuoteForm();
