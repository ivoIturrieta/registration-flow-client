import { Dispatch } from "react";
import { Input, FormType } from "./types";

export const validatePassword = (
  input: Input,
  setErrors: Dispatch<React.SetStateAction<Partial<Input> | undefined>>,
  formType: FormType
): boolean => {
  const letter = /[a-zA-Z]/;
  const number = /[0-9]/;
  let isValid = true;
  const errors = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  if (formType === "register" && input["name"].length < 5) {
    isValid = false;
    errors.name = "The full name should be at least 5 characters long.";
  }

  if (!input["email"]) {
    isValid = false;
    errors.email = "Please enter your email Address.";
  }

  if (typeof input["email"] !== "undefined") {
    const pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!pattern.test(input["email"])) {
      isValid = false;
      errors.email = "Please enter valid email address.";
    }
  }

  if (
    input["password"].length < 8 ||
    !letter.test(input["password"]) ||
    !number.test(input["password"])
  ) {
    isValid = false;
    errors["password"] =
      "The password should be minimum 8 characters long with at least one letter and one number";
  }

  if (formType === "register" && !input["confirmPassword"]) {
    isValid = false;
    errors["confirmPassword"] = "Please enter your confirm password.";
  }

  if (
    formType === "register" &&
    typeof input["password"] !== "undefined" &&
    typeof input["confirmPassword"] !== "undefined"
  ) {
    if (input["password"] !== input["confirmPassword"]) {
      isValid = false;
      errors["password"] = "Passwords don't match.";
    }
  }
  setErrors(errors);

  return isValid;
};
