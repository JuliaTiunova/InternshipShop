import { getElement } from "../assets";
import {
  removeError,
  showErrorMessage,
  transformFirstLetter,
} from "./errorMessage";

const email = getElement(".checkout-mail");
const firstName = getElement(".first-name");
const lastName = getElement(".last-name");
const address = getElement(".address");
const apartment = getElement(".apartment");
const postalCode = getElement(".postal-code");
const phoneNumber = getElement(".phone");
const novaNumber = getElement(".novaPost");
const city = getElement(".city");
const pickUpAdress = getElement(".pickupAddress");

// form validation for personal info and shipping

email.addEventListener("input", function() {
  let emailValue = email.value.split("@");
  let beforeDot;
  if (emailValue[1]) {
    beforeDot = emailValue[1].split(".");
  }

  if (email.value === "") {
    showErrorMessage("Please enter an e-mail", email);
  } else if (!emailValue[1] || !beforeDot[1] || beforeDot[1].length < 2) {
    showErrorMessage("Please enter a valid e-mail", email);
  } else {
    removeError(email);
  }
});

firstName.addEventListener("input", function() {
  let regExp = /^[a-zA-Z]+$/;

  if (firstName.value === "") {
    showErrorMessage("Please enter your name", firstName);
  } else if (firstName.validity.tooShort) {
    transformFirstLetter(firstName);
    showErrorMessage(
      `Please enter your real name, must be at least ${firstName.minLength} characters`,
      firstName
    );
  } else if (!regExp.test(firstName.value)) {
    transformFirstLetter(firstName);
    showErrorMessage(`Be sure to enter only letters`, firstName);
  } else {
    transformFirstLetter(firstName);
    removeError(firstName);
  }
});

lastName.addEventListener("input", function() {
  let regExp = /^[a-zA-Z]+$/;

  if (lastName.value === "") {
    showErrorMessage("Please enter your last name", lastName);
  }
  if (lastName.validity.tooShort) {
    transformFirstLetter(lastName);
    showErrorMessage(
      `Please enter your last name, must be at least ${lastName.minLength} characters`,
      lastName
    );
  } else if (!regExp.test(lastName.value)) {
    transformFirstLetter(lastName);
    showErrorMessage(`Be sure to enter only letters`, lastName);
  } else {
    transformFirstLetter(lastName);
    removeError(lastName);
  }
});

pickUpAdress.addEventListener("change", function() {
  if (pickUpAdress.value !== "") {
    removeError(pickUpAdress);
  }
});

address.addEventListener("input", function() {
  if (address.value === "") {
    showErrorMessage(`Please enter an address`);
  } else {
    removeError(address);
  }
});

novaNumber.addEventListener("input", function() {
  if (novaNumber.value === "") {
    showErrorMessage(`Please enter Nova Poshta number`);
  } else {
    removeError(novaNumber);
  }
});

address.addEventListener("input", function() {
  if (address.value === "") {
    showErrorMessage(`Please enter an address`);
  } else {
    removeError(address);
  }
});

city.addEventListener("input", function() {
  if (city.value === "") {
    showErrorMessage(`Please enter an city`);
  } else {
    removeError(city);
  }
});

apartment.addEventListener("input", function() {
  if (apartment.value === "") {
    showErrorMessage(`Please enter an apartment`);
  } else {
    removeError(apartment);
  }
});

postalCode.addEventListener("input", function() {
  if (postalCode.value === "") {
    showErrorMessage(`Please enter a postcode`, postalCode);
  } else if (postalCode.validity.tooShort) {
    showErrorMessage(
      `Postcode must be at least ${postalCode.minLength} digits long`,
      postalCode
    );
  } else {
    removeError(postalCode);
  }
});

phoneNumber.addEventListener("input", function() {
  let phoneLength = phoneNumber.value
    .split("+")
    .join("")
    .split("(")
    .join("")
    .split(")")
    .join("")
    .split(" ")
    .join("");

  if (phoneNumber.value === "") {
    showErrorMessage(`Please enter a phone number`, phoneNumber);
  } else if (phoneLength.length < phoneNumber.minLength) {
    showErrorMessage(`Please enter a valid phone number`, phoneNumber);
  } else {
    removeError(phoneNumber);
  }
});
