import Validator from 'validator';
import isEmpty from 'is-empty';

const validateLoginInput = (data) => {
  let errors = {};
  data.userID = !isEmpty(data.userID) ? data.userID : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (Validator.isEmpty(data.userID)) {
    errors.name = 'ID field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateLoginInput;
