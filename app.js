document.write("<h3>Multiplication Table:</h3>" + "</br>");

let userNumber = +prompt("Enter a number to show its multiplication table:");

let userTableLength = +prompt("Enter length of multiplication table:");

for (let i = 1 ; i <= userTableLength ; i++) {
    document.write(userNumber + " x " + i + " = " + userNumber * i + "<br>");
}