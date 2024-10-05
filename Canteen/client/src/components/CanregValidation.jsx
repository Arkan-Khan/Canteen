export default function validate(values) {
  const errors = {};

  // Validate Email
  if (!values.email) {
    errors.email = 'Email address is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }

  // Validate Password
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be 8 or more characters';
  }

  // Validate Phone Number
  if (!values.phone_num) {
    errors.phone_num = 'Phone Number not entered';
  } else if (!/^\d+$/.test(values.phone_num) || values.phone_num.length !== 10) {
    errors.phone_num = 'Invalid Phone number';
  }

  // Validate Location
  if (!values.location) {
    errors.location = 'Enter location';
  } else if (values.location.length >= 45) {
    errors.location = 'Enter a smaller address';
  }

  // Validate Canteen Name
  if (!values.canteen_name) {
    errors.canteen_name = 'Enter name';
  } else if (values.canteen_name.length >= 45) {
    errors.canteen_name = 'Enter a smaller name';
  }

  // Validate Type
  if (!values.type) {
    errors.type = 'Enter type';
  }

  return errors;
}
