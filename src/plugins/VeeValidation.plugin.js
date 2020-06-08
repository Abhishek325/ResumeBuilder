import { Validator } from "vee-validate";

const dictionary = {
  en: {
    messages: {
      required: () => "This field is required",
      regex: () => "The value entered in this field is invalid",
      date_format: () => "The entered date is not in valid format",
      digits: () =>
        "This field should be numeric and contain minimum number of digits",
      email: () => "Invalid email id",
      numeric: () => "This field is numeric",
      url: () => "Invalid URL",
      alpha_spaces: () => "Only alphabets and spaces allowed",
      length: () => "The value entered in this field is invalid",
    },
  },
};
Validator.localize(dictionary);
