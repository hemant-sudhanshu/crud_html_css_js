// Message constants
const FIRST_NAME_REQUIRED =
"First Name is required and should be at least 3 characters long.";
const LAST_NAME_REQUIRED =
  "Last Name is required and should be at least 3 characters long.";
const INVALID_EMAIL = "Please enter a valid email address.";
const INVALID_DATE = "Please select a valid date.";

// Regular expressions for input validation
const nameRegex = /^[A-Za-z'-]+$/; // Matches alphabetical characters, hyphens, and apostrophes
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Matches email addresses
const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // Matches date strings in the format YYYY-MM-DD
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/; // Matches passwords with specific criteria

// Error message for password validation
const passwordError =
  "Password must contain a minimum of 8 characters, 1 uppercase, 1 lowercase, 1 numeric, and 1 special character.";

// Array to store user data
let studentsList = [
    {
        fName: "Hemant",
        lName: "Sudhanshu",
        email: "test@gmail.com",
        dob: "1994-09-27",
        gender: "Male",
        studentClass: "10th"
    }
];

// Elements
let fName = document.getElementById("fname");
let lName = document.getElementById("lname");
let email = document.getElementById("email");
let dob = document.getElementById("dob");
let studentClass = document.getElementById("student-class");

const form = document.getElementsByClassName("form-container");

let fNameError = document.getElementsByClassName("fname-error");
let lNameError = document.getElementsByClassName("lname-error");
let emailError = document.getElementsByClassName("email-error");
let dobError = document.getElementsByClassName("dob-error");
let classError = document.getElementsByClassName("dob-error");

const submitBtn = document.getElementsByClassName("submit-btn");

// Event Listeners
fName.addEventListener("blur", handleFirstNameBlur);
lName.addEventListener("blur", handleLastNameBlur);
email.addEventListener("blur", handleEmailBlur);
dob.addEventListener("blur", handleDobBlur);

fName.addEventListener("input", validateForm);
lName.addEventListener("input", validateForm);
email.addEventListener("input", validateForm);
dob.addEventListener("input", validateForm);

// Initial validation in case the form is pre-filled
validateForm();

// Validate form on submit action
function validateForm() {
    const isFirstNameValid = fName.value.trim().length >= 3;
    const isLastNameValid = lName.value.trim().length >= 3;
    const isEmailValid = emailRegex.test(email.value.trim());
    const isDobValid = dateRegex.test(dob.value.trim());
  
    submitBtn[0].disabled = !(isFirstNameValid && isLastNameValid && isEmailValid && isDobValid);
}

// First Name Validation
function handleFirstNameBlur() {
    if (fName.value.trim().length < 3) {
      fNameError[0].textContent = FIRST_NAME_REQUIRED;
    } else {
      fNameError[0].textContent = "";
    }
}

// Last Name Validation
function handleLastNameBlur() {
    if (lName.value.trim().length < 3) {
      lNameError[0].textContent = LAST_NAME_REQUIRED;
    } else {
      lNameError[0].textContent = "";
    }
}
  
// Email Validation
function handleEmailBlur() {
    if (!emailRegex.test(email.value.trim())) {
        emailError[0].textContent = INVALID_EMAIL;
    } else {
        emailError[0].textContent = "";
    }
}

// DOB Validation
function handleDobBlur() {
    if (!(dateRegex.test(dob.value.trim()))) {
        dobError[0].textContent = INVALID_DATE;
    } else {
        dobError[0].textContent = "";
    }
}
  
// Get the selected gender
function getSelectedGender() {
    const genderRadios = document.getElementsByName("Gender");
    // Iterate through the radio buttons
    for (let i = 0; i < genderRadios.length; i++) {
        // Check if the current radio button is checked
        if (genderRadios[i].checked) {
            // Return the value of the checked radio button
            return genderRadios[i].value;
        }
    }
    // Return null if no radio button is checked
    return null;
}

// Submit button action
function onClickSubmit() {
    const studentData = {
        fName: fName.value.trim(),
        lName: lName.value.trim(),
        email: email.value.trim(),
        dob: dob.value ? dob.value : "NA",
        gender: getSelectedGender() ? getSelectedGender() : "NA",
        studentClass: studentClass.value,
    };

    const index = studentsList.findIndex(
      (item) => item.email === email.value.trim()
    );
  
    if (index !== -1) {
        studentsList[index] = studentData;
    } else if (
        fName.value.trim().length >= 3 && 
        lName.value.trim().length >= 3 && 
        emailRegex.test(email.value.trim())
    ) {
        studentsList.push(studentData);
    }
    // Update the table with the new data
    udateTableData();
  
    form[0].reset();
    validateForm();
}

// Update Table data
function udateTableData() {
    // Get the table body (`<tbody>`) element
    const tableBody = document.getElementById("table-body");

    // Clear existing rows (if any) to prevent duplicates
    tableBody.innerHTML = "";

    // Iterate through the data array
    studentsList.forEach((data) => {
        // Create a row (`<tr>`) element
        const row = document.createElement("tr");

        // Create and append cell (`<td>`) elements for each data property
        Object.values(data).forEach((value) => {
            // Create a cell (`<td>`) element
            const cell = document.createElement("td");
    
            // Set the cell's text content to the data value
            cell.textContent = value;
    
            // Append the cell to the row
            row.appendChild(cell);
        });

        // Create an action cell (`<td>`) for edit and delete buttons
        const actionCell = document.createElement("td");

        // Create the edit button
        const editButton = document.createElement("button");
        editButton.classList.add("icon-button");

        // Add an image icon to the edit button
        const editIcon = document.createElement("img");
        editIcon.src = "./images/pencil.png";
        editIcon.alt = "Edit";
        editIcon.width = 16;
        editIcon.height = 16;
        editButton.appendChild(editIcon);

        // Add a click event listener to the edit button
        editButton.addEventListener("click", () => onEdit(data));

        // Create the delete button
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("icon-button");
        deleteButton.classList.add("margin-left");

        // Add an image icon to the delete button
        const deleteIcon = document.createElement("img");
        deleteIcon.src = "./images/delete.png"; // Replace with the path to your delete icon image
        deleteIcon.alt = "Delete"; // Provide alt text for accessibility
        deleteIcon.width = 16; // Adjust the size of the icon as needed
        deleteIcon.height = 16;
        deleteButton.appendChild(deleteIcon);

        // Add a click event listener to the delete button
        deleteButton.addEventListener("click", () => onDelete(data));

        // Append the edit and delete buttons to the action cell
        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

        // Append the action cell to the row
        row.appendChild(actionCell);

        // Append the row to the table body
        tableBody.appendChild(row);
    });
}


// Delete button action.
function onDelete(data) {
    // Display a browser alert asking the user to confirm the deletion
    const confirmation = confirm(
      "Are you sure you want to delete this context data?"
    );
  
    if (confirmation) {
      if (studentsList.length === 1) {
        studentsList = [];
      } else {
        // Find the index of the object to delete using findIndex()
        const indexToDelete = studentsList.findIndex(
          (student) => student.email === data.email
        );
        // Check if the object was found
        if (indexToDelete !== -1) {
            studentsList.splice(indexToDelete, 1);
        }
      }
      udateTableData(studentsList);
    }
}
  
// Edit button action.
function onEdit(data) {
    const maleRadioButton = document.getElementById("Male");
    const femaleRadioButton = document.getElementById("Female");
  
    fName.value = data.fName;
    lName.value = data.lName;
    email.value = data.email;
    dob.value = data.dob;

    if (data.gender === "Male") {
        maleRadioButton.checked = true;
    } else if (data.gender === "Female") {
        femaleRadioButton.checked = true;
    }

    switch (data.studentClass) {
      case "8th":
        studentClass.selectedIndex = 0;
        break;
      case "9th":
        studentClass.selectedIndex = 1;
        break;
      case "10th":
        studentClass.selectedIndex = 2;
        break;
      case "11th":
        studentClass.selectedIndex = 3;
      case "12th":
        studentClass.selectedIndex = 4;
        break;
    }
    validateForm();
}