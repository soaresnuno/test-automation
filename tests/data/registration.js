export const FORM_DATA = {
  valid: {
    name: "John Doe",
    email: "john.doe@example.com",
    password: "SecurePass123!",
    country: "United States of America",
    gender: "Male",
    hobbies: ["Video Games", "Movies"],
  },
  validWithAllHobbies: {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    password: "AnotherPass456!",
    country: "Portugal",
    gender: "Female",
    hobbies: [
      "Read books",
      "Travel",
      "Video Games",
      "Sports",
      "Movies",
      "Board Games",
    ],
  },
  validMinimal: {
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    password: "MinimalPass789!",
    country: "Canada",
    gender: "Other",
    hobbies: [],
  },
  invalidEmail: {
    name: "Invalid Email User",
    email: "invalid-email",
    password: "ValidPass123!",
    country: "Brazil",
    gender: "Male",
    hobbies: [],
  },
  emptyFields: {
    name: "",
    email: "",
    password: "",
    country: "",
    gender: "",
    hobbies: [],
  },
};

export const MESSAGES = {
  successfulRegistration: "The form has been submitted successfully.",
  successHeading: "Success!",
  requiredFieldError: "This field is required",
  invalidEmailError: "Please enter a valid email address",
};

export const SELECTORS = {
  nameInput: "Type your name",
  emailInput: "Type your e-mail",
  passwordInput: "Type your password",
  countrySelect: "country",
  genderMale: "Male",
  genderFemale: "Female",
  genderOther: "Other",
  submitButton: "Send",
  formHeading: "Form",
};

export const COUNTRIES = [
  "Brazil",
  "Canada",
  "United States of America",
  "Mexico",
  "Portugal",
];

export const HOBBIES = [
  "Read books",
  "Travel",
  "Video Games",
  "Sports",
  "Movies",
  "Board Games",
];
