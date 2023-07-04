// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Retrieve generated passwords from local storage
var generatedPasswords = JSON.parse(localStorage.getItem("generatedPasswords")) || [];

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Write password to the #password input
function writePassword() {
  var passwordLength = getPasswordLength();
  var includeLowercase = confirm("Do you want to include lowercase characters?");
  var includeUppercase = confirm("Do you want to include uppercase characters?");
  var includeNumeric = confirm("Do you want to include numeric characters?");
  var includeSpecial = confirm("Do you want to include special characters?");

  // Validate that at least one character type is selected
  if (!(includeLowercase || includeUppercase || includeNumeric || includeSpecial)) {
    alert("Please select at least one character type.");
    return;
  }

  var password = generateUniquePassword(passwordLength, includeLowercase, includeUppercase, includeNumeric, includeSpecial);
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Prompt for password length and validate the input
function getPasswordLength() {
  var length = parseInt(prompt("Enter the length of the password (between 8 and 128 characters):"));

  // Validate the input
  while (isNaN(length) || length < 8 || length > 128) {
    length = parseInt(prompt("Invalid length. Please enter a number between 8 and 128:"));
  }

  return length;
}

// Generate a unique password based on the specified criteria
function generateUniquePassword(length, includeLowercase, includeUppercase, includeNumeric, includeSpecial) {
  var password;

  do {
    password = generatePassword(length, includeLowercase, includeUppercase, includeNumeric, includeSpecial);
  } while (generatedPasswords.includes(password));

  generatedPasswords.push(password);
  localStorage.setItem("generatedPasswords", JSON.stringify(generatedPasswords));

  // Clear the generated passwords from local storage if all possible passwords have been generated
  if (generatedPasswords.length === Math.pow(62, length)) {
    generatedPasswords = [];
    localStorage.removeItem("generatedPasswords");
  }

  return password;
}

// Generate a password based on the specified criteria
function generatePassword(length, includeLowercase, includeUppercase, includeNumeric, includeSpecial) {
  var characterPool = "";

  if (includeLowercase) {
    characterPool += "abcdefghijklmnopqrstuvwxyz";
  }
  if (includeUppercase) {
    characterPool += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  if (includeNumeric) {
    characterPool += "0123456789";
  }
  if (includeSpecial) {
    characterPool += "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
  }

  var password = "";

  for (var i = 0; i < length; i++) {
    var randomIndex = Math.floor(Math.random() * characterPool.length);
    password += characterPool.charAt(randomIndex);
  }

  return password;
}
