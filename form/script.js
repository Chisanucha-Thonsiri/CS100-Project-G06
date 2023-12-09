/*
  File: script.js
  Author: CS100 Team
  Date Created: 23 July 2023
  Copyright: CSTU
  Description: JS code of CSTU Passport that validate with JS
*/

const config = {
    backendUrl: "http://localhost:8000/", // Default backend URL
  };
  const port = 8000;
  
  // Function to validate Firstname and Lastname
  function validateName() {
    const fullnameInput = document.getElementById("fullname");
    const names = fullnameInput.value.trim().split(" ");
    const errorElement = document.getElementById("fullnameError");
  
    if (names.length !== 2) {
      errorElement.textContent = "Please enter both your Firstname and Lastname.";
      return false;
    } else {
      errorElement.textContent = ""; // Clear the error message when valid
    }
   
    const Meelek = /\d/.test(fullnameInput.value);

    if (Meelek) {
      errorElement.textContent = "Name should not contain any number.";
      return false;
    } else {
      errorElement.textContent = ""; // Clear the error message when valid
    }
  
    return true;
  }
  
  // Function to validate Student ID
  function validateStudentID() {
    const studentIDInput = document.getElementById("studentID");
    const studentIDPattern = /^(58|59|60|61|62|63|64|65|66)(01|02|03|04|05|06|07|08|09|10|11|12|13|14|15|16|17|18|19|20|21)\d{6}$/;
    const errorElement = document.getElementById("studentIDError");
  
    if (!studentIDPattern.test(studentIDInput.value)) {
      if (studentIDInput.value.length !== 10) {
        errorElement.textContent = "Student ID must be exactly 10 digits.";
      } else if (!/^(58|59|60|61|62|63|64|65|66)/.test(studentIDInput.value.substring(0, 2))) {
        errorElement.textContent = "The first two digits must be between 58 and 66.";
      } else if (!/^(01|02|03|04|05|06|07|08|09|10|11|12|13|14|15|16|17|18|19|20|21)/.test(studentIDInput.value.substring(2, 4))) {
        errorElement.textContent = "The third and fourth digits must be between 01 and 21.";
      } else {
        errorElement.textContent = "Invalid Student ID.";
      }
      return false;
    } else {
      errorElement.textContent = ""; // Clear the error message when valid
    }
    return true;
  }
  
  // Function to validate University Email
  function validateEmail() {
    const emailInput = document.getElementById("email");
    const emailPattern = /^.+@dome\.tu\.ac\.th$/;
    const errorElement = document.getElementById("emailError");
    const Meelek = /\d/.test(emailInput.value);
  
    if (!emailPattern.test(emailInput.value)) {
      errorElement.textContent =
        "Please provide a valid university email in the format 'xxx.yyy@dome.tu.ac.th'.";
      return false;
    } else {
      errorElement.textContent = ""; // Clear the error message when valid
    }
    if (Meelek) {
      errorElement.textContent =
        "Please provide a valid email 'It should not contain any number!'.";
      return false;
    } else {
      errorElement.textContent = ""; // Clear the error message when valid
    }
    return true;
  }
  
  // Function to validate form inputs on user input
  function validateFormOnInput() {
    validateName();
    validateStudentID();
    validateEmail();
  }
  
  // Function to fetch activity types from the backend
async function fetchActivityTypes() {
  try {
    const response = await fetch('http://${window.location.hostname}:${port}/getActivityType');
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch activity types.");
      return [];
    }
  } catch (error) {
    console.error("An error occurred while fetching activity types:", error);
    return [];
  }
}
  
 // Function to populate activity types in the select element
function populateActivityTypes(activityTypes) {
  const activityTypeSelect = document.getElementById("activityType");

  for (const type of activityTypes) {
    const option = document.createElement("option");
    option.value = type.id;
    option.textContent = type.value;
    activityTypeSelect.appendChild(option);
  }
}
  
  // Event listener when the page content has finished loading
  document.addEventListener("DOMContentLoaded", async () => {
    const activityTypes = await fetchActivityTypes();
    populateActivityTypes(activityTypes);
  });
  

  // Function to submit the form
  async function submitForm(event) {
    event.preventDefault();
  
    // Validate form inputs before submission
    if (!validateName() || !validateStudentID() || !validateEmail()) {
      return;
    }
  
    const startDateInput = document.getElementById("startDate").value;
    const endDateInput = document.getElementById("endDate").value;
    const startDate = new Date(startDateInput);
    const endDate = new Date(endDateInput);
  
    if (endDate <= startDate) {
      alert("End datetime should be after the start datetime.");
      return;
    }
  
    // Create the data object to send to the backend
    const formData = new FormData(event.target);
    const data = {
      first_name: formData.get("fullname").split(" ")[0],
      last_name: formData.get("fullname").split(" ")[1],
      student_id: parseInt(formData.get("studentID")),
      email: formData.get("email"),
      title: formData.get("workTitle"),
      type_of_work_id: parseInt(formData.get("activityType")),
      academic_year: parseInt(formData.get("academicYear")) - 543,
      semester: parseInt(formData.get("semester")),
      start_date: formData.get("startDate"),
      end_date: formData.get("endDate"),
      location: formData.get("location"),
      description: formData.get("description")
    };
  
    console.log(data);
  
    try {
      // Send data to the backend using POST request
      const response = await fetch(`http://${window.location.hostname}:${port}/record`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log("Form data submitted successfully!");
  
        // Format JSON data for display
        const formattedData = Object.entries(responseData.data)
          .map(([key, value]) => `"${key}": "${value}"`)
          .join("\n");
  
        // Display success message with formatted data
        alert(responseData.message + "\n" + formattedData);
  
        document.getElementById("myForm").reset();
      } else {
        console.error("Failed to submit form data.");
  
        // Display error message
        alert("Failed to submit form data. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred while submitting form data:", error);
    }
  }
  const submitinfo = document.getElementById("infoDisplayContainer");
  // Event listener for form submission
  document.getElementById("myForm").addEventListener("submit", submitForm);
  
  // Event listeners for input validation on user input
  document.getElementById("fullname").addEventListener("input", validateName);
  document
    .getElementById("studentID")
    .addEventListener("input", validateStudentID);
  document.getElementById("email").addEventListener("input", validateEmail);
  document.addEventListener("DOMContentLoaded", function () {
    // Your existing code
  
    const infoDisplayContainer = document.getElementById("infoDisplayContainer");
    const displayedInfo = document.getElementById("displayedInfo");
  
    const myForm = document.getElementById("myForm");
  
    myForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the form from submitting normally
  
      // Get form data
      const formData = new FormData(myForm);
      const formObject = {};
      formData.forEach((value, key) => {
        formObject[key] = value;
      });
  
      // Build HTML to display the information
      const infoHTML = `
        <h3>Submitted Information:</h3>
        <p><strong>Full Name: <span class="highlight">${formObject.fullname}</span></p>
        <p>Student ID: <span class="highlight">${formObject.studentID}</span></p>
        <p>Email: <span class="highlight">${formObject.email}</span></p>
        <p>Work/Activity Title: <span class="highlight">${formObject.workTitle}</span></p>
        <p>Type of Work/Activity: <span class="highlight">${formObject.activityType}</span></p>
        <p>Academic Year: <span class="highlight">${formObject.academicYear}</span></p>
        <p>Semester: <span class="highlight">${formObject.semester}</span></p>
        <p>Start Date/Time: <span class="highlight">${formObject.startDate}</span></p>
        <p>End Date/Time: <span class="highlight">${formObject.endDate}</span></p>
        <p>Location: <span class="highlight">${formObject.location}</span></p>
        <p>Description: <span class="highlight">${formObject.description}</strong></span></p>
      `;
  
      // Update the displayed information container
      displayedInfo.innerHTML = infoHTML;
      

      
  
      // Show the information display container
      infoDisplayContainer.style.display = "block";
      document.getElementById("submitnoti").style.transform = "scale(1)";
      setTimeout(() => {
        document.getElementById("submitnoti").style.transform = "scale(0.0000000001)";
      },2000);
    });
  });
  function clearForm() {
    document.getElementById("myForm").reset();
    document.getElementById("displayedInfo").innerHTML = "";
    document.getElementById("infoDisplayContainer").style.display = "none";
  }