const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//show input error message

const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
};

//show input success message

const showSuccess = input => {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
};

//check if Email is valid

const checkEmail = input => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
};

// get field name

const getFieldName = input => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

//check required field

const checkRequired = inputArray => {
  inputArray.forEach(input => {
    if (input.value.trim() !== "") {
      showSuccess(input);
    }
    showError(input, `${getFieldName(input)} is required`);
  });
};

//check inputlength
const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be at no more than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
};

//check password match

const checkPasswordsMatch = (input1, input2) => {
  if (input1.value === input2.value) {
    showSuccess(input2);
  } else {
    showError(input2, "Password does not match");
  }
};

//Event Listeners

form.addEventListener("submit", event => {
  event.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});
