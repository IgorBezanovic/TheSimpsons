import * as yup from "yup";

export const checkoutValidationSchema = yup.object({
  firstname: yup.string()
    .min(3, "Name should be length between 3 and 30 characters length.")
    .max(30, "Name should be length between 3 and 30 characters length.")
    .required("Name is required."),
  lastname: yup.string()
    .min(3, "Last Name should be length between 3 and 20 characters length.")
    .max(20, "Last Name should be length between 3 and 20 characters length.")
    .required("Name is required."),
  street: yup.string()
    .min(3, "Street should be length between 3 and 30 characters length.")
    .max(30, "Street should be length between 3 and 30 characters length.")
    .required("Name is required."),
  city: yup.string()
    .min(3, "City should be length between 3 and 20 characters length.")
    .max(20, "City should be length between 3 and 20 characters length.")
    .required("Name is required."),
  zipcode: yup.number()
    .positive('Zipcode must be greater than zero.')
    .test('len', 'Must be exactly 5 characters.', val => val!.toString().length === 5)
    .required("Zip code is required."),
  phone: yup.number()
    .test('len', 'Must be between 5 and 30 characters length.', val => val!.toString().length >= 5 && val!.toString().length <= 30)
    .required("Phone is required."),
  email: yup.string()
    .min(5, "Email should be length between 5 and 30 characters length.")
    .max(30, "Email should be length between 5 and 30 characters length.")
    .email('Not a proper email.')
    .required("Email is required."),
});
