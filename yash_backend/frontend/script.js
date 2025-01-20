

// this script is index.html
// Role check for admin functionality
// Get role from localStorage
const role = localStorage.getItem("role");

// Show admin-specific elements
if (role === "admin") {
  document.getElementById("career-link").style.display = "inline-block";

  document.getElementById("addQueryButton").style.display = "inline-block";
  document.getElementById("admin_dashboard").style.display = "inline-block";
  document.getElementById("form-link").style.display = "inline-block";



  // document.getElementById("about-link").style.display = "inline-block";
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
          <strong>Skills:</strong> ${query.Skills}<br>
          <strong> Work_experience:</strong> ${query.Work_experience}<br>
          <strong> qualification:</strong> ${query.qualification}<br>
          <strong>Annual_salary_range:</strong> ${query.Annual_salary_range}<br>
      <strong>Role and Responsibility:</strong> ${query.roleandresponsibilty}<br>
      <strong>Location:</strong> ${query.location}<br>

    
       ${role === "admin"
   ? `<strong  >replacementDetails:</strong> ${query.replacementDetails}<br>
      <strong  >vacancy nature: </strong>${query.vacancynature}<br>
      <strong  >otherQualifications:</strong> ${query.otherQualifications}<br>
      <strong  >department:${query.department}</strong> <br>
      <strong  >SubDepartment: </strong>${query.SubDepartment}<br>
      <strong  >interveiwer designation: </strong>${query.interveiwerdesignation} <br>
      <strong  >interveiwer name: </strong> ${query.interveiwername}<br>
      <strong  >interveiwer code: </strong>${query.interveiwercode}<br>
      <strong  >old employeeid: </strong>${query.oldemployeeid}<br>
     
       
        <strong >Card No:</strong> ${query.cardNo}`
        : ""
      }
     
      </div>

      ${role === "admin"
        ? `<button  class="delete-button" onclick="deleteQuery(${index})">Delete</button>`
        // `  <button class="modify-button" onclick="modifyQuery(${index})">Modify</button>`
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


    const replacementDetails = document.getElementById("queryreplacementDetails").value;
    const otherQualifications = document.getElementById("queryotherQualifications").value;
    const qualification = document.getElementById("queryqualification").value;
    const Annual_salary_range = document.getElementById("queryAnnual_salary_range").value;
    const Work_experience = document.getElementById("queryWork_experience").value;
    const SubDepartment = document.getElementById("querySubDepartment").value;
    const department = document.getElementById("querydepartment").value;
    const interveiwerdesignation = document.getElementById("queryinterveiwerdesignation").value;
    const interveiwername = document.getElementById("queryinterveiwername").value;
    const interveiwercode = document.getElementById("queryinterveiwercode").value;
    const oldemployeeid = document.getElementById("queryoldemployeeid").value;
    const vacancynature = document.getElementById("queryvacancynature").value;
    const jobTitle = document.getElementById("queryJobTitle").value;
    const Skills = document.getElementById("querySkills").value;
    const location = document.getElementById("queryLocation").value;
    const requirements = document.getElementById("queryRequirements").value;
    const roleandresponsibilty = document.getElementById("queryRoleandresponsibilty").value;
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
      department: department,

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
      console.log(data);
      // Handle response
      if (response.status === 201) {
        alert("Vacancy created successfully!");




        // Save query to localStorage for offline access
        const query = { vacancynature, oldemployeeid, interveiwercode, interveiwername, interveiwerdesignation, department, SubDepartment, Work_experience, Annual_salary_range, qualification, otherQualifications, replacementDetails, requirements, roleandresponsibilty, location, Skills, jobTitle, cardNo };
        const storedQueries = JSON.parse(localStorage.getItem("queries")) || [];
        storedQueries.push(query);
        localStorage.setItem("queries", JSON.stringify(storedQueries));

        // Refresh the query list
        loadQueries();

        // Clear form and close modal
        document.getElementById("queryForm").reset();
        closeAddQueryForm();
      } else {
        alert(`Error: ${data.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create a vacancy. Please check your connection and try again.");
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
  const fileInput = document.getElementById("fileInput").files[0];

  if (fileInput) {
    const reader = new FileReader();

    reader.onload = function (e) {
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
        resume: e.target.result, // Save file as Base64
        resumeName: fileInput.name, // Save file name
      };

      const applications = JSON.parse(localStorage.getItem("applications")) || [];
      applications.push(formData);
      localStorage.setItem("applications", JSON.stringify(applications));

      // Call handleSubmit to display the notification
      handleSubmit();
    };

    reader.readAsDataURL(fileInput); // Read file as Base64
  } else {
    alert("Please upload a file!");
  }
}

// Clear the form fields
document.querySelector("form").reset();


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



// drop down button
function toggleDropdown() {
  const dropdown = document.getElementById("dropdownContent");
  if (dropdown.style.display === "none" || dropdown.style.display === "") {
    dropdown.style.display = "block"; // Show dropdown
  } else {
    dropdown.style.display = "none"; // Hide dropdown
  }
}

// Optional: Close the dropdown if the user clicks outside of it
document.addEventListener("click", function (event) {
  const dropdown = document.getElementById("dropdownContent");
  const dropbtn = document.querySelector(".dropbtn");

  if (!dropdown.contains(event.target) && !dropbtn.contains(event.target)) {
    dropdown.style.display = "none"; // Hide dropdown
  }
});

// ............................................................................................................



// scrolling css  of query box
function scrollToTop() {
  const modal = document.getElementById('queryModal');
  modal.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToBottom() {
  const modal = document.getElementById('queryModal');
  modal.scrollTo({ top: modal.scrollHeight, behavior: 'smooth' });
}


// ...........................................................................................................



// // open input box other job Title
// function handleOtherSelection() {
//   const jobTitleDropdown = document.getElementById("queryJobTitle");
//   const queryotherJobTitleDiv = document.getElementById("queryotherJobTitleDiv");

//   if (jobTitleDropdown.value === "other") {
//     queryotherJobTitleDiv.style.display = "block"; // Show the input field when "Other" is selected
//   } else {
//     queryotherJobTitleDiv.style.display = "none"; // Hide the input field for other selections
//     document.getElementById("queryotherJobTitle").value = ""; // Clear the input field
//   }
// }

// ...........................................................................................................


// ....................open  input box click other  Qualification..........................................
const queryqualificationSelect = document.getElementById('queryqualification');
const otherQualificationDiv = document.getElementById('otherQualification');
const queryotherQualifications = document.getElementById('queryotherQualifications');

// Listen for changes on the dropdown
queryqualificationSelect.addEventListener('change', () => {
  if (queryqualificationSelect.value === 'Others') {
    otherQualificationDiv.style.display = 'block'; // Show the input field
    queryotherQualifications.required = true; // Make the input required
  } else {
    otherQualificationDiv.style.display = 'none'; // Hide the input field
    queryotherQualifications.required = false; // Remove the required attribute
    queryotherQualifications.value = ''; // Clear the input value
  }
});

// ...........................................................................................................

// ....................click replacement open input ..........................................

function handleVacancySelection() {
  const select = document.getElementById("queryoldemployeeid");
  const queryreplacementInput = document.getElementById("queryreplacementInput");


  // Show the input field if "Replacement" is selected
  if (select.value === "Replacement") {
    queryreplacementInput.style.display = "block";
  } else {
    queryreplacementInput.style.display = "none"; // Hide it for other selections
  }
}



   // Function to filter jobs based on search input
   function searchJobs() {
    const input = document.getElementById("searchBar").value.toLowerCase();
    const vacancies = document.querySelectorAll(".vacancy");

    vacancies.forEach((vacancy) => {
      const title = vacancy.getAttribute("data-title").toLowerCase();
      if (title.includes(input)) {
        vacancy.style.display = "list-item";
      } else {
        vacancy.style.display = "none";
      }
    });
  }