import { isValidUrl } from "./checkURL"; // Importing the URL validation function

// Wait for the DOM to be fully loaded before executing
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("URI");

  // Handle input change
  input.addEventListener("change", (e) => {
    e.preventDefault();
    hideError();
    showResults(false);
  });

  // Handle form submission
  const form = document.querySelector("form");
  form.addEventListener("submit", handleSubmit); // Attach handleSubmit to the form submit event
});

// Handle form submission
async function handleSubmit(e) {
  e.preventDefault();

  const form = document.querySelector("form");
  const input = document.getElementById("URI");

  // Validate the URL
  if (!isValidUrl(input.value)) {
    showError();
    document.getElementById("error").innerHTML = "Please, enter a valid URL";
    input.value = "";
    return;
  }

  loading(true);

  // Send the form data to the server using fetch
  const response = await fetch("http://localhost:8000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ URI: input.value }), // Sending URL in the request body
  });

  const data = await response.json();

  // Display the results
  displayResults(data);
}

// Display the analysis results
const displayResults = (data) => {
  loading(false);

  if (data.msg) {
    showError();
    showResults(false);
    document.getElementById("error").innerHTML = `${data.msg}`;
    return;
  }

  hideError();
  showResults(true);

  // Display the general sentiment values
  document.getElementById(
    "agreement"
  ).innerHTML = `Agreement: ${data.agreement}`;
  document.getElementById("subjectivity").innerHTML = `Subjectivity: ${
    data.subjectivity || "N/A"
  }`;
  document.getElementById(
    "confidence"
  ).innerHTML = `Confidence: ${data.confidence}`;
  document.getElementById("irony").innerHTML = `Irony: ${data.irony}`;
  document.getElementById("polarity").innerHTML = `Polarity: ${data.score_tag}`;
};

// Show loader
const loading = (bool) => {
  const loader = document.getElementById("loader");
  loader.style.display = bool ? "block" : "none";
};

// Toggle results display
const showResults = (bool) => {
  const listItems = document.querySelectorAll("ul li");
  listItems.forEach((item) => {
    item.style.display = bool ? "block" : "none";
  });
};

// Show error message
const showError = () => {
  document.getElementById("error").style.display = "block";
};

// Hide error message
const hideError = () => {
  document.getElementById("error").style.display = "none";
};

// Export the handleSubmit function for use in the HTML form
export { handleSubmit };
