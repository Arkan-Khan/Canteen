export default function validate(values) {
  let errors = {};

  // Email validation
  if (!values.email) {
    errors.email = "Email address is required"; // Error if email is empty
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid"; // Error for invalid email format
  }

  // Password validation
  if (!values.password) {
    errors.password = "Password is required"; // Error if password is empty
  } else if (values.password.length < 8) {
    errors.password = "Password must be 8 or more characters"; // Error for short password
  }

  // Optional: You could add more validations, like checking for special characters or numbers
  // else if (!/[!@#$%^&*(),.?":{}|<>]/.test(values.password)) {
  //   errors.password = "Password must contain at least one special character";
  // }
  // else if (!/\d/.test(values.password)) {
  //   errors.password = "Password must contain at least one number";
  // }

  return errors; // Return the errors object
}
