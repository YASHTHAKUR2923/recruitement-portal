// this script is index.html
// Role check for admin functionality
// Get role from localStorage
const role = localStorage.getItem("role");

// Show admin-specific elements
if (role === "admin") {
  document.getElementById("career-link").style.display = "inline-block";
  document.getElementById("addQueryButton").style.display = "inline-block";
  document.getElementById("admin_dashboard").style.display = "inline-block";
}

// Open and close modal for adding a query
function openAddQueryForm() {
  document.getElementById("modalOverlay").style.display = "block";
  document.getElementById("queryModal").style.display = "block";
}

function closeAddQueryForm() {
  document.getElementById("modalOverlay").style.display = "none";
  document.getElementById("queryModal").style.display = "none";
}

// Retrieve stored queries and display them
function loadQueries() {
  const storedQueries = JSON.parse(localStorage.getItem("queries")) || [];
  const queryList = document.getElementById("queryList");
  queryList.innerHTML = ""; // Clear existing queries

  storedQueries.forEach((query, index) => {
    const queryCard = document.createElement("div");
    queryCard.className = "query-card";
    queryCard.innerHTML = `
      <div class="query-details">
        <strong>Job Title:</strong> ${query.jobTitle}<br>
        <strong>Location:</strong> ${query.location}<br>
        <strong>Role and Responsibility:</strong> ${
          query.roleandresponsibilty
        }<br>
        <strong>Requirements:</strong> ${query.requirments}<br>
        <strong>Card No:</strong> ${query.cardNo}<br>
      </div>
      ${
        role === "admin"
          ? `<button class="delete-button" onclick="deleteQuery(${index})">Delete</button>`
          : ""
      }
      <button class="apply-button" onclick="applyNow()">Apply Now</button>
    `;
    queryList.appendChild(queryCard);
  });
}

// Function to redirect to the form page for applying
function applyNow() {
  window.location.href = "form.html"; // Open the form.html when Apply Now button is clicked
}

// Add query to the backend and update the UI
document
  .getElementById("queryForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    // Get form data
    const jobTitle = document.getElementById("queryJobTitle").value;
    const location = document.getElementById("queryLocation").value;
    const requirements = document.getElementById("queryRequirments").value;
    const roleandresponsibilty = document.getElementById(
      "queryRoleandresponsibilty"
    ).value;
    const cardNo = document.getElementById("queryCardNo").value;

    // API endpoint
    const url = "http://localhost:8000/create_vacancy";

    // Request payload
    const payload = {
      card_no: cardNo,
      job_title: jobTitle,
      location: location,
      roles_and_responsibility: roleandresponsibilty,
      requirements: requirements,
    };

    try {
      // Send POST request to add the query to the backend
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log(data.Message);

      // Handle response
      if (response.status === 201) {
        console.log(data);
        document.querySelector("");
        alert("Vacancy created successfully!");

        // Save query to localStorage for offline access
        const query = {
          requirements,
          roleandresponsibilty,
          location,
          jobTitle,
          cardNo,
        };
        const storedQueries = JSON.parse(localStorage.getItem("queries")) || [];
        storedQueries.push(query);
        localStorage.setItem("queries", JSON.stringify(storedQueries));

        // Refresh the query list
        loadQueries();

        // Clear form and close modal
        document.getElementById("queryForm").reset();
        closeAddQueryForm();
      } else {
        console.log(`${data.message}`);
        // alert(`Error: ${data.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        "Failed to create a vacancy. Please check your connection and try again."
      );
    }
  });

// Delete a query from the list
function deleteQuery(index) {
  let storedQueries = JSON.parse(localStorage.getItem("queries")) || [];
  storedQueries.splice(index, 1); // Remove query at the specified index
  localStorage.setItem("queries", JSON.stringify(storedQueries)); // Update localStorage
  loadQueries(); // Refresh the query list
}

// Logout functionality
function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("role");
  window.location.href = "login.html";
}

// Redirect if not logged in
if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "login.html";
}

// Load queries on page load
window.onload = loadQueries;

// ............................................................................................................

// form script
function handleSubmit() {
  alert("Thank you for submitting!");
}

function saveFormData(event) {
  event.preventDefault();

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    gender: document.getElementById("gender").value,
    age: document.getElementById("age").value,
    qualification: document.getElementById("qualification").value,
    experience: document.getElementById("experience").value,
    jobPosition: document.getElementById("job-position").value,
    currentCompany: document.getElementById("currentCompany").value,
    currentDesignation: document.getElementById("currentDesignation").value,
    currentRole: document.getElementById("currentRole").value,
    currentCTC: document.getElementById("currentCTC").value,
    expectedCTC: document.getElementById("expectedCTC").value,
    reasonLeaving: document.getElementById("reasonLeaving").value,
    currentLocation: document.getElementById("currentLocation").value,
    belongsTo: document.getElementById("belongsTo").value,
    noticePeriod: document.getElementById("noticePeriod").value,
    otherDetails: document.getElementById("otherDetails").value,
  };

  const applications = JSON.parse(localStorage.getItem("applications")) || [];
  applications.push(formData);
  localStorage.setItem("applications", JSON.stringify(applications));

  // Call handleSubmit to display the notification
  handleSubmit();

  // Clear the form fields
  document.querySelector("form").reset();
}

// Logout functionality
function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("role");
  window.location.href = "login.html";
}

// Redirect if not logged in
if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "login.html";
}

// Load queries on page load
window.onload = loadQueries;

// ............................................................................................................
