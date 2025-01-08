// Regular expression for name validation
const nameRegex = /^[A-Za-z\s-]{2,50}$/;

// Function to validate input fields
function validateNameField(inputField, fieldName) {
  const value = inputField.value.trim();
  const errorId = `${inputField.id}-error`;
  let errorDiv = document.getElementById(errorId);

  // Create error div if it doesn't exist
  if (!errorDiv) {
    errorDiv = document.createElement("div");
    errorDiv.id = errorId;
    errorDiv.className = "error-message";
    errorDiv.style.color = "red";
    errorDiv.style.fontSize = "12px";
    errorDiv.style.marginTop = "5px";
    inputField.parentNode.appendChild(errorDiv);
  }

  // Validation checks
  if (value.length === 0) {
    errorDiv.textContent = `${fieldName} is required.`;
    inputField.style.borderColor = "red";
    return false;
  } else if (value.length < 2) {
    errorDiv.textContent = `${fieldName} must be at least 2 characters long.`;
    inputField.style.borderColor = "red";
    return false;
  } else if (value.length > 50) {
    errorDiv.textContent = `${fieldName} must not exceed 50 characters.`;
    inputField.style.borderColor = "red";
    return false;
  } else if (!nameRegex.test(value)) {
    errorDiv.textContent = `${fieldName} can only contain letters, spaces, and hyphens.`;
    inputField.style.borderColor = "red";
    return false;
  } else {
    errorDiv.textContent = "";
    inputField.style.borderColor = "initial";
    return true;
  }
}

// Add event listeners when the document loads
document.addEventListener("DOMContentLoaded", function () {
  const nameInput = document.getElementById("name");
  const surnameInput = document.getElementById("surname");
  const passwordInput=document.getElementById("password");  
  const confirmPasswordInput=document.getElementById("confirm-password");  
  const form = document.querySelector("form");

  // Real-time validation
  nameInput.addEventListener("input", function () {
    validateNameField(this, "Name");
  });

  surnameInput.addEventListener("input", function () {
    validateNameField(this, "Surname");
  });

  passwordInput.addEventListener("input", function(){
    validatePasswordFields(passwordInput, confirmPasswordInput);
  });

  confirmPasswordInput.addEventListener("input", function(){
    validatePasswordFields(passwordInput, confirmPasswordInput);
  });



  function  validatePasswordFields(passwordInput, confirmPasswordInput){
    const password=passwordInput.value.trim();
    const confirmPassword=confirmPasswordInput.value.trim();
    const errorId=`${confirmPasswordInput.id}-error`;
    let errorDiv=document.getElementById(errorId);

    if(!errorDiv){
      errorDiv=document.createElement("div");
      errorDiv.id=errorId;
      errorDiv.className="error-message";
      errorDiv.style.color="red";
      errorDiv.style.fontSize="12px";
      errorDiv.style.marginTop="5px";
      confirmPasswordInput.parentNode.appendChild(errorDiv);

  
    }

    if(password.length===0 || confirmPassword.length===0){
      errorDiv.textContent="Password and Confirm password are required";
      confirmPasswordInput.style.borderColor="red";
      return false;
    }
    else if(password.length<6){
      errorDiv.textContent="Password must be atleast 6 characters long";
      passwordInput.style.borderColor="red";
      return false;
    }
    else if(password.length>12){
      errorDiv.textContent="Password must not exceed 12 characters";
      confirmPasswordInput.style.borderColor="red";
      return false;
    }
    else if(password!==confirmPassword){
      errorDiv.textContent="Passwords do not match";
      confirmPasswordInput.style.borderColor="red";
      return false;
    }
    else{
      errorDiv.textContent="";
      passwordInput.style.borderColor="initial";
      confirmPasswordInput.style.borderColor="initial";
      return true;
    }
  }

  

  // Form submission validation
  form.addEventListener("submit", function (event) {
    const isNameValid = validateNameField(nameInput, "Name");
    const isSurnameValid = validateNameField(surnameInput, "Surname");
    const isPasswordValid=validatePasswordFields(passwordInput, confirmPasswordInput);

    if (!isNameValid || !isSurnameValid || !isPasswordValid) {
      event.preventDefault();
    }
  });


});
