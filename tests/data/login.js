import dotenv from "dotenv";

dotenv.config();

export const CREDENTIALS = {
  valid: {
    username: process.env.VALID_USERNAME,
    password: process.env.VALID_PASSWORD,
  },
  blocked: {
    username: process.env.BLOCKED_USERNAME,
    password: process.env.BLOCKED_PASSWORD,
  },
  invalid: {
    username: "invaliduser",
    password: "anypassword",
  },
  wrongPassword: {
    username: process.env.VALID_USERNAME,
    password: "wrongpassword",
  },
};

export const MESSAGES = {
  successfulLogin: "User successfully logged in! Redirecting...",
  userAuthenticated: "User test authenticated",
  blockedUser: "User blocked!",
  userNotFound: "User not found!",
  incorrectCredentials: "Incorrect username or password!",
  temporaryBlock: "User temporarily blocked!",
  loggedOut: "You have been logged out. Please log in.",
};

export const SELECTORS = {
  usernameInput: "Type your username",
  passwordInput: "Type your password",
  loginButton: "Login",
  logoutButton: "Logout",
  loginHeading: "Login",
};
