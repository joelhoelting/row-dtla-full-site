const validateForm = (values, targetName) => {
  let errors = {};
  const { email, inquiryType, firstName, lastName, phone } = values;

  const checkFirstName = () => {
    if (!firstName) {
      errors.firstName = true;
    }
  };

  const checkLastName = () => {
    if (!lastName) {
      errors.lastName = true;
    }
  };

  const checkPhone = () => {
    if (!phone) {
      errors.phone = true;
    }
  };

  const checkEmail = () => {
    if (!email) {
      errors.email = true;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = true;
    }
  };

  const checkInquiryType = () => {
    if (!inquiryType) {
      errors.inquiryType = true;
    }
  };

  if (!targetName) {
    checkEmail();
    checkInquiryType();
    checkFirstName();
    checkLastName();
    checkPhone();
  }
  if (targetName === 'email') {
    checkEmail();
  }
  if (targetName === 'firstName') {
    checkFirstName();
  }
  if (targetName === 'lastName') {
    checkLastName();
  }
  if (targetName === 'phone') {
    checkPhone();
  }
  if (targetName === 'inquiryType') {
    checkInquiryType();
  }
  return errors;
};

export default validateForm;
