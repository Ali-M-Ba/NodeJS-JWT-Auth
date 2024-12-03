// controllers/auth.controller.js

export const showSignupForm = (req, res) => { 
  res.render("signup");
};

export const processSignup = (req, res) => {
  res.send("Processing Signup");
};

export const showLoginForm = (req, res) => {
  res.render("login");
};

export const processLogin = (req, res) => {
  res.send("Processing Login");
};
