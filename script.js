/* 
    JavaScript 6h Edition
    Midterm 1

    Functions
    Author: Audrey Bernier Larose
    Date: 2-25-2021

    Modified by Julio Vinicius for Midterm Exam
    Date: 2-22-2023

    Filename: script.js
*/
"use strict"

// variables for storing input in billing address
const sameAddressCheckbox = document.getElementById("sameAddr");
const billingFirstName = document.getElementById("bFirstName");
const billingLastName = document.getElementById("bLastName");
const billingStreetAddress = document.getElementById("bStreetAddress");
const billingGender = document.getElementById("bGender");
const billingPhoneNumber = document.getElementById("bPhoneNumber");
const billingYear = document.getElementById("bYear");
const shippingFirstName = document.getElementById("sFirstName");
const shippingLastName = document.getElementById("sLastName");
const shippingStreetAddress = document.getElementById("sStreetAddress");
const shippingGender = document.getElementById("sGender");
const shippingPhoneNumber = document.getElementById("sPhoneNumber");
const shippingYear = document.getElementById("sYear");

// copying billing address to shipping 
function copyBillingToShipping() {
  if (sameAddressCheckbox.checked) {
    shippingFirstName.value = billingFirstName.value;
    shippingLastName.value = billingLastName.value;
    shippingStreetAddress.value = billingStreetAddress.value;
    shippingGender.value = billingGender.value;
    shippingPhoneNumber.value = billingPhoneNumber.value;
    shippingYear.value = billingYear.value;
  } else {
    shippingFirstName.value = "";
    shippingLastName.value = "";
    shippingStreetAddress.value = "";
    shippingGender.value = "";
    shippingPhoneNumber.value = "";
    shippingYear.value = "";
  }
}

sameAddressCheckbox.addEventListener("change", copyBillingToShipping);

document.getElementsByName("select")
const selectElements = document.querySelectorAll("select");
selectElements.forEach(selectElement => {
  selectElement.selectedIndex = -1;
})

selectElements = document.querySelectorAll("select");
selectElements.forEach(selectElement => {
  if (selectElement.value === "") {
    setValidationMessage(selectElement, "choose a value");
  } else {
    clearValidationMessage(lastNameInput);
  }
});
// idk why the select elements dont render the valid and invalid css properties
// the code seems to be right maybe im missing something 



const form = document.getElementById("myForm");
const firstNameInput = document.getElementById("bFirstName");
const lastNameInput = document.getElementById("bLastName");

// set custom validation 
function setValidationMessage(input, message) {
  input.setCustomValidity(message);
  input.classList.add("invalid"); 
}

// clear validation 
function clearValidationMessage(input) {
  input.setCustomValidity("");
  input.classList.remove("invalid"); 
}

firstNameInput.addEventListener("input", () => {
  if (firstNameInput.value.trim() === "") {
    setValidationMessage(firstNameInput, "First name is required.");
  } else {
    clearValidationMessage(firstNameInput);
  }
});
  
lastNameInput.addEventListener("input", () => {
  if (lastNameInput.value.trim() === "") {
    setValidationMessage(lastNameInput, "Last name is required.");
  } else {
    clearValidationMessage(lastNameInput);
  }
});

form.addEventListener("submit", (event) => {
  if (!form.checkValidity()) {
    event.preventDefault(); 
    alert("enter correct values and resubmit form.");
  }
});



