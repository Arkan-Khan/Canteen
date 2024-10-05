export default function validate(values) {
  let errors = {};

  // Validate item selection
  if (!values.item_select) {
    errors.item_select = "Select Item";
  }

  // Validate price
  if (!values.price) {
    errors.price = "Enter Price"; // Corrected to assign error to 'errors.price'
  } else if (!/^\d+$/.test(values.price)) {
    errors.price = "Invalid price"; // Updated to correct key
  }

  return errors;
}
