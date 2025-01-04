  
  // this script is index.html
  // Role check for admin functionality
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
  const role = localStorage.getItem("role"); // Assume the role is stored in localStorage
  queryList.innerHTML = ""; // Clear existing queries

  storedQueries.forEach((query, index) => {
    const queryCard = document.createElement("div");
    queryCard.className = "query-card";
    queryCard.innerHTML = `
      <div class="query-details">
      
        <strong>Job Title:</strong> ${query.jobTitle}<br>
        <strong>Location:</strong> ${query.location}<br>
        <strong>Role and responsibilty:</strong> ${query.roleandresponsibilty}<br>
         <strong>Requirments:</strong> ${query.requirments}<br>
         <strong>CardNo:</strong> ${query.cardNo}<br>

       
       
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
    window.location.href = "form.html";  // Open the form.html when Apply Now button is clicked
  }

  // Add query to the list and store it
  document.getElementById("queryForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const jobTitle = document.getElementById("queryJobTitle").value;
    const location = document.getElementById("queryLocation").value;
    const requirments = document.getElementById("queryRequirments").value;
    const roleandresponsibilty = document.getElementById("queryRoleandresponsibilty").value;
    const cardNo = document.getElementById("queryCardNo").value;

   
  
    // Create a new query box (div)
    const queryItem = document.createElement('div');
    queryItem.classList.add('query-item');

    // Add content to the query box
    queryItem.innerHTML = `
      <h4>${requirments}</h4>
      <p><strong>Job Title:</strong> ${jobTitle}</p>
      <p><strong>Location:</strong> ${location}</p>
      <p><strong>Roleandresponsibilty:</strong> ${roleandresponsibilty}</p>
      <p><strong>CardNo:</strong> ${cardNo}</p>

      
      <button onclick="applyNow()">Apply Now</button>
    `;

    // Append the new query item to the query list
    document.getElementById('queryList').appendChild(queryItem);

    // Save the query in local storage
    const query = { requirments, roleandresponsibilty, location,  jobTitle,cardNo };
    const storedQueries = JSON.parse(localStorage.getItem("queries")) || [];
    storedQueries.push(query);
    localStorage.setItem("queries", JSON.stringify(storedQueries));

    // Refresh the query list
    loadQueries();

    // Clear form and close modal
    document.getElementById("queryForm").reset();
    closeAddQueryForm();
  });

  // Delete a query from the list
  function deleteQuery(index) {
    let storedQueries = JSON.parse(localStorage.getItem("queries")) || [];
    storedQueries.splice(index, 1); // Remove query at the specified index
    localStorage.setItem("queries", JSON.stringify(storedQueries)); // Update storage
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







    