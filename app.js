// Initialize AOS
AOS.init();

// Custom prompt function using SweetAlert
async function customPrompt(title, text, inputType = "number") {
  const { value } = await Swal.fire({
    title: title,
    text: text,
    input: inputType,
    inputAttributes: {
      min: 1,
      step: 1,
    },
    background: "#FED8B1",
    confirmButtonColor: "#6F4E37",
    showCancelButton: false,
    inputValidator: (value) => {
      if (!value) {
        return "Please enter a number!";
      }
      if (isNaN(value)) {
        return "You need to enter a number!";
      }
      if (value <= 0) {
        return "Please enter a positive number!";
      }
    },
  });
  return value;
}

// Main function
async function generateTable() {
  try {
    const userNumber = await customPrompt(
      "Enter a number",
      "Enter a number to show its multiplication table:"
    );
    const userTableLength = await customPrompt(
      "Enter table length",
      "Enter length of multiplication table:"
    );

    const tableContainer = document.getElementById("tableOutput");
    tableContainer.innerHTML = "";

    // Create table header
    const header = document.createElement("h3");
    header.textContent = `Multiplication Table of ${userNumber}`;
    header.style.color = "#6F4E37";
    header.style.marginBottom = "15px";
    tableContainer.appendChild(header);

    // Generate table items
    for (let i = 1; i <= userTableLength; i++) {
      const tableItem = document.createElement("div");
      tableItem.className = "table-item";
      tableItem.innerHTML = `${userNumber} × ${i} = ${userNumber * i}`;
      tableContainer.appendChild(tableItem);
    }

    // Success message
    Swal.fire({
      title: "Success!",
      text: `Multiplication table for ${userNumber} generated!`,
      icon: "success",
      confirmButtonColor: "#6F4E37",
      background: "#FED8B1",
    });
  } catch (error) {
    // User canceled the prompt
    Swal.fire({
      title: "Oops...",
      text: "You need to enter numbers to generate the table!",
      icon: "error",
      confirmButtonColor: "#6F4E37",
      background: "#FED8B1",
    }).then(() => {
      // Retry if user wants
      generateTable();
    });
  }
}

// Start the process when page loads
window.onload = generateTable;
