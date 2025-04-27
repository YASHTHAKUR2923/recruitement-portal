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
}

if (role === "manager") {
  document.getElementById("addQueryButton").style.display = "inline-block";
  document.getElementById("form-link").style.display = "inline-block";
  document.getElementById("career-link").style.display = "inline-block";
}
if (role === "hr") {
  document.getElementById("career-link").style.display = "inline-block";
  document.getElementById("form-link").style.display = "inline-block";
  document.getElementById("addQueryButton").style.display = "inline-block";
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


         ${
           role === "admin"
             ? `   <h3 style="font-size:20px; color:#008089; margin-top:0; text-align: center;">VacancyCode: ${query.refcode}</h3>
          <h2 style="font-size:15px; color:#008089"> CREATED FOR (JD) :  </h2>
         `
             : ""
         }
         

         ${
           role === "manager"
             ? `   <h3 style="font-size:20px; color:#008089; margin-top:0; text-align: center;">VacancyCode: ${query.refcode}</h3>
          <h2 style="font-size:15px; color:#008089"> CREATED FOR (JD) :  </h2>
           `
             : ""
         }
         
      ${
        role === "hr"
          ? `   <h3 style="font-size:20px; color:#008089; margin-top:0; text-align: center;">VacancyCode: ${query.refcode}</h3>
        <h2 style="font-size:15px; color:#008089"> CREATED FOR (JD) :  </h2>
`
          : ""
      }
          <strong>Job Title:</strong> ${query.jobTitle}<br>
          <strong>Work Title:</strong> ${query.otherJobTitle}<br>
          <strong>Required Skills:</strong> ${query.Skills}<br>
          <strong> Prefered Work_experience:</strong> ${
            query.Work_experience
          }<br>
          <strong>Salary :</strong> ${query.Annual_salary_range}<br>
          <strong>Role and Responsibility:</strong> ${
            query.roleandresponsibilty
          }<br>
          <strong>requirements:</strong> ${query.requirements}<br>
         
          <strong>Location:</strong> ${query.location}<br>

        
       ${
         role === "admin"
           ? `
        <div style="border-top: 2px solid black; margin: 10px 0;"></div>
         <h2 style="font-size:15px; color:#008089">VACANCY DETAILS : </h2>
   

      <strong  >qualification:</strong> ${query.qualification}<br>
      <strong  >vacancynature:</strong> ${query.vacancynature}<br>
      <strong  >Vacancy Type: </strong>${query.oldemployeeid}<br>
      <strong  >replacementDetails:</strong> ${query.replacementDetails}<br>
      <strong  >department:</strong>${query.department}<br>
      <strong  >SubDepartment: </strong>${query.SubDepartment}<br>
        <strong >Card No:</strong> ${query.cardNo}

      <div style="border-top: 2px solid black; margin: 10px 0;"></div>
         <h2 style="font-size:15px; color:#008089">INTERVIEW TAKEN BY :</h2>

      <strong  >interveiwer designation: </strong>${
        query.interveiwerdesignation
      }<br>
      <strong  >interveiwer name: </strong> ${query.interveiwername}<br>
      <strong  >interveiwer code: </strong>${query.interveiwercode}<br>



          <div style="border-top: 2px solid black; margin: 10px 0;"></div>
          <h2 style="font-size:15px; color:#008089">CREATED BY :</h2>

        
          <strong>Name:</strong> ${query.employeeName || "Not Available"}<br>
          <strong>Designation:</strong> ${
            query.employeeDesignation || "Not Available"
          }<br>
          <strong>Department:</strong> ${
            query.employeeDepartment || "Not Available"
          }<br>
          <strong>Mobile No:</strong> ${
            query.employeeMobileNo || "Not Available"
          }<br>
          <strong>Email:</strong> ${query.employeeEmail || "Not Available"}<br>
      </div>`
           : ""
       }
         
        ${
          role === "manager"
            ? `     
         

        
        
 <div style="border-top: 2px solid black; margin: 10px 0;"></div>
         <h2 style="font-size:15px; color:#008089">VACANCY DETAILS : </h2>
   

      <strong  >qualification:</strong> ${query.qualification}<br>
      <strong  >vacancynature:</strong> ${query.vacancynature}<br>
      <strong  >Vacancy Type: </strong>${query.oldemployeeid}<br>
      <strong  >replacementDetails:</strong> ${query.replacementDetails}<br>
      <strong  >department:</strong>${query.department}<br>
      <strong  >SubDepartment: </strong>${query.SubDepartment}<br>
        <strong >Card No:</strong> ${query.cardNo}

      <div style="border-top: 2px solid black; margin: 10px 0;"></div>
         <h2 style="font-size:15px; color:#008089">INTERVIEW TAKEN BY :</h2>

      <strong  >interveiwer designation: </strong>${
        query.interveiwerdesignation
      }<br>
      <strong  >interveiwer name: </strong> ${query.interveiwername}<br>
      <strong  >interveiwer code: </strong>${query.interveiwercode}<br>



          <div style="border-top: 2px solid black; margin: 10px 0;"></div>
          <h2 style="font-size:15px; color:#008089">CREATED BY :</h2>

        
          <strong>Name:</strong> ${query.employeeName || "Not Available"}<br>
          <strong>Designation:</strong> ${
            query.employeeDesignation || "Not Available"
          }<br>
          <strong>Department:</strong> ${
            query.employeeDepartment || "Not Available"
          }<br>
          <strong>Mobile No:</strong> ${
            query.employeeMobileNo || "Not Available"
          }<br>
          <strong>Email:</strong> ${query.employeeEmail || "Not Available"}<br>


`
            : ""
        }
        ${
          role === "hr"
            ? `     
         

        
        
 <div style="border-top: 2px solid black; margin: 10px 0;"></div>
         <h2 style="font-size:15px; color:#008089">VACANCY DETAILS : </h2>
   

      <strong  >qualification:</strong> ${query.qualification}<br>
      <strong  >vacancynature:</strong> ${query.vacancynature}<br>
      <strong  >Vacancy Type: </strong>${query.oldemployeeid}<br>
      <strong  >replacementDetails:</strong> ${query.replacementDetails}<br>
      <strong  >department:</strong>${query.department}<br>
      <strong  >SubDepartment: </strong>${query.SubDepartment}<br>
        <strong >Card No:</strong> ${query.cardNo}

      <div style="border-top: 2px solid black; margin: 10px 0;"></div>
         <h2 style="font-size:15px; color:#008089">INTERVIEW TAKEN BY :</h2>

      <strong  >interveiwer designation: </strong>${
        query.interveiwerdesignation
      }<br>
      <strong  >interveiwer name: </strong> ${query.interveiwername}<br>
      <strong  >interveiwer code: </strong>${query.interveiwercode}<br>



          <div style="border-top: 2px solid black; margin: 10px 0;"></div>
          <h2 style="font-size:15px; color:#008089">CREATED BY :</h2>

        
          <strong>Name:</strong> ${query.employeeName || "Not Available"}<br>
          <strong>Designation:</strong> ${
            query.employeeDesignation || "Not Available"
          }<br>
          <strong>Department:</strong> ${
            query.employeeDepartment || "Not Available"
          }<br>
          <strong>Mobile No:</strong> ${
            query.employeeMobileNo || "Not Available"
          }<br>
          <strong>Email:</strong> ${query.employeeEmail || "Not Available"}<br>

<button  class="delete-button" onclick="deleteQuery(${index})">Delete</button>
       <button class="approve-button" id="approveButton" onclick="approvebackendVacany(${
         query.vacancy_id
       })">Approve</button>
`
            : ""
        }


      ${
        role === "admin"
          ? `<button  class="delete-button" onclick="deleteQuery(${index})">Delete</button>
       <button class="approve-button" id="approveButton" onclick="approvebackendVacany(${query.vacancy_id})">Approve</button>

  <!-- Loading indicator -->
  <div id="loading" class="loading-indicator" style="display: none;">
    <div class="spinner"></div>
    <span>Loading...</span>
  </div>`
          : ""
      }
      <button class="apply-button" onclick="applyNow()">Apply Now</button>
    `;

    queryList.appendChild(queryCard);
  });
}

// ...........................................................................................................................

// Function to approve the vacancy
async function approvebackendVacany(vacancyId) {
  console.log(`vacancyId_ ${vacancyId}`);
  const url = `http://localhost:8000/approve_vacancy/${vacancyId}/`; // Adjust the URL if needed

  try {
    const response = await fetch(url, {
      method: "POST",
    });
    // Debugging step: log the response
    const text = await response.text();
    console.log(text); // Log raw response text
    // Try to parse as JSON if possible
    const data = JSON.parse(text);

    //const data = await response.json();
    if (response.status === 200) {
      alert("Vacancy approved successfully!");
      loadQueries(); // Refresh the list of queries
    } else {
      alert("Error approving vacancy: " + data.message);
    }
  } catch (error) {
    alert("Error: " + error.message);
  }
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

    const button = document.getElementById("submitButton");
    const loadingIndicator = document.getElementById("loadingIndicator");

    // Show the loading indicator
    loadingIndicator.style.display = "inline";

    try {
      // Simulate async operation (e.g., form submission)
      await new Promise((resolve) => setTimeout(resolve, 10000));

      // Perform your form submission logic here
      console.log("Form submitted!");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      // Hide the loading indicator
      loadingIndicator.style.display = "none";
    }

    // Get form data
    const replacementDetails = document.getElementById(
      "queryreplacementDetails"
    ).value;
    const qualification = document.getElementById("queryqualification").value;
    const Annual_salary_range = document.getElementById(
      "queryAnnual_salary_range"
    ).value;
    const Work_experience = document.getElementById(
      "queryWork_experience"
    ).value;
    const SubDepartment = document.getElementById("querySubDepartment").value;
    const department = document.getElementById("querydepartment").value;
    const interveiwerdesignation = document.getElementById(
      "queryinterveiwerdesignation"
    ).value;
    const interveiwername = document.getElementById(
      "queryinterveiwername"
    ).value;
    const interveiwercode = document.getElementById(
      "queryinterveiwercode"
    ).value;
    const oldemployeeid = document.getElementById("queryoldemployeeid").value;
    const vacancynature = document.getElementById("queryvacancynature").value;
    const jobTitle = document.getElementById("queryJobTitle").value;
    const otherJobTitle = document.getElementById("queryotherJobTitle").value;
    const Skills = document.getElementById("querySkills").value;
    const location = document.getElementById("queryLocation").value;
    const requirements = document.getElementById("queryrequirements").value;
    const roleandresponsibilty = document.getElementById(
      "queryRoleandresponsibilty"
    ).value;
    const cardNo = document.getElementById("queryCardNo").value;
    // const employeeName = document.getElementById("query.employeeName").value;

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
        const query = {
          replacementDetails,
          oldemployeeid,
          interveiwercode,
          interveiwername,
          interveiwerdesignation,
          department,
          SubDepartment,
          Work_experience,
          vacancynature,
          Annual_salary_range,
          qualification,
          requirements,
          roleandresponsibilty,
          location,
          Skills,
          jobTitle,
          otherJobTitle,
          cardNo,

          // Include employee details from the response
          employeeName: data.name,
          employeeDesignation: data.designation,
          employeeDepartment: data.department,
          employeeMobileNo: data.mobile_no,
          employeeEmail: data.email,
          vacancy_id: data.vacancy_id,
          // Generate refcode
          refcode: `V_${data.department || ""}_${data.vacancy_id || ""}`, // Add refcode to the data object
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
        alert(`Error: ${data.message || "Something went wrong"}`);
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

      const applications =
        JSON.parse(localStorage.getItem("applications")) || [];
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
  const modal = document.getElementById("queryModal");
  modal.scrollTo({ top: 0, behavior: "smooth" });
}

function scrollToBottom() {
  const modal = document.getElementById("queryModal");
  modal.scrollTo({ top: modal.scrollHeight, behavior: "smooth" });
}

// ...........................................................................................................

function toggleInputField() {
  var select = document.getElementById("queryJobTitle");
  var otherInputDiv = document.getElementById("otherJobTitleDiv");
  if (select.value === "other") {
    otherInputDiv.style.display = "block";
  } else {
    otherInputDiv.style.display = "none";
  }
}

// ...........................................................................................................

// ....................open  input box click other  Qualification..........................................

// ...........................................................................................................

// ....................click replacement open input ..........................................

function handleVacancySelection() {
  const select = document.getElementById("queryoldemployeeid");
  const queryreplacementInput = document.getElementById(
    "queryreplacementInput"
  );

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

function approveVacancy(vacancyId) {
  // Show the loading indicator and disable the button
  document.getElementById("loading").style.display = "block";
  document.getElementById("approveButton").disabled = true;

  // Simulate the approval process (replace with actual logic like API call)
  approveVacancyAsync(vacancyId)
    .then(() => {
      // Hide the loading indicator after approval is complete
      document.getElementById("loading").style.display = "none";
      document.getElementById("approveButton").disabled = false; // Re-enable button
      alert("Vacancy approved!");
    })
    .catch((error) => {
      // Handle any errors
      console.error("Approval failed:", error);
      document.getElementById("loading").style.display = "none"; // Hide loading on error
      document.getElementById("approveButton").disabled = false; // Re-enable button
      alert("Failed to approve vacancy.");
    });
}

// Simulate async approval (replace this with actual API call or approval logic)
function approveVacancyAsync(vacancyId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Vacancy ${vacancyId} approved!`); // Replace with actual approval logic
      resolve();
    }, 2000); // Simulate 2-second delay for approval process
  });
}
