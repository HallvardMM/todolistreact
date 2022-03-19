// regex to validate emails on client side. It is also checked on server side
// Gathered from here:
// https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export default validateEmail;
