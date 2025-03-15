"use strict";

let calculateBtn = document.getElementById("calc-marks-btn");
let main_container = document.getElementById("main-container");
let percentageDisplay = document.createElement("div");
let gradeDisplay = document.createElement("div");
let resetBtn = document.getElementById("reset-btn");

// Function for fetching personal Details
function getPersonalDetails() {
  let existingResult = document.querySelector(".resultDivStyle");
  if (existingResult) {
    existingResult.remove();
  }
  let studentName = document.getElementById("stud_name").value;
  let collegeName = document.getElementById("clg_name").value;
  let registrationNumber = document.getElementById("reg_no").value;
  // Adding fetched Total marks that are calculated dynamically through js...

  let totalMarksValue = document
    .getElementById("calc-marks")
    .textContent.split(": ")[1];

  // creating elements dynamically using js to show the resulting marksheet on the click of Calculate Marks button

  let resultDiv = document.createElement("div");
  resultDiv.innerHTML = `
    <div>Final Marksheet</div>
    <div>Student Name : ${studentName}</div>
    <div>College Name : ${collegeName}</div>
    <div>Registration No : ${registrationNumber}</div>
    <div>Total Marks : ${totalMarksValue}</div>
  `;

  // adding fetched personal details to resulting marksheet...

  resultDiv.classList.add("resultDivStyle");
  resultDiv.appendChild(percentageDisplay);
  resultDiv.appendChild(gradeDisplay);
  main_container.appendChild(resultDiv);
}

document.addEventListener("DOMContentLoaded", function () {
  let inputs = document.querySelectorAll(".marks-input");
  let totalMarksDisplay = document.getElementById("calc-marks");

  function calculateMarks() {
    let total = 0;
    const maxMarks = 500;
    inputs.forEach((input) => {
      const value = parseInt(input.value) || 0;
      console.log(value);
      total += value;
    });
    totalMarksDisplay.textContent = `Total Marks: ${total}/500`;
    let percentage = (total / maxMarks) * 100;
    percentage = percentage.toFixed(2);
    percentageDisplay.textContent = `Percentage: ${percentage}%`;

    let grade;
    if (percentage >= 90) grade = "A+ 🎉";
    else if (percentage >= 80) grade = "A";
    else if (percentage >= 70) grade = "B";
    else if (percentage >= 60) grade = "C";
    else if (percentage >= 50) grade = "D";
    else grade = "Fail ❌";
    gradeDisplay.textContent = `Grade: ${grade}`;
  }

  inputs.forEach((input) => {
    input.addEventListener("input", calculateMarks);
  });
});

function resetInputs() {
  document.getElementById("stud_name").value = "";
  document.getElementById("clg_name").value = "";
  document.getElementById("reg_no").value = "";
  let inputs = document.querySelectorAll(".marks-input");
  inputs.forEach((input) => {
    input.value = "";
  });
  document.getElementById("calc-marks").innerHTML = `Total Marks: 0/500`;
  percentageDisplay.textContent = "";
  gradeDisplay.textContent = "";
  let existingResult = document.querySelector(".resultDivStyle");
  if (existingResult) {
    existingResult.remove();
  }
}

calculateBtn.addEventListener("click", getPersonalDetails);
resetBtn.addEventListener("click", resetInputs);
