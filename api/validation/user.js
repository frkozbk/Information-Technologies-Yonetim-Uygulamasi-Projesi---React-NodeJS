const Validator = require("validator");
const _ = require("lodash");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !_.isEmpty(data.tableName) ? data.tableName : "";
  data.password = !_.isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.tableName)) {
    errors.tableName = "Masa ismi alanı doldurulmalıdır.";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Şifre alanı doldurulmalıdır.";
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
