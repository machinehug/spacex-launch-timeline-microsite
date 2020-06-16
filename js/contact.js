const contactForm = document.querySelector("#contactForm");

contactForm.addEventListener("submit", validateContactForm);

function validateContactForm(input) {

  input.preventDefault();

  //SUBJECT
  const subjectWrapper = document.querySelector(".contact-subject-wrapper");
  const subject = document.querySelector("#subject");
  const subjectValue = subject.value;
  const subjectError = subjectWrapper.nextElementSibling;
  const subjectValidated = valueIsNotEmpty(subjectValue);

  if (subjectValidated) {
    subjectError.setAttribute("style", "display: none;");
  } else {
    subjectError.setAttribute("style", "display: block;");
  };

  //EMAIL
  const emailWrapper = document.querySelector(".contact-email-wrapper");
  const email = document.querySelector("#email");
  let emailValue = email.value;
  const emailError = emailWrapper.nextElementSibling;
  const emailNotValidError = emailError.nextElementSibling;
  const emailValidated = valueIsNotEmpty(emailValue);
  const emailFormatValidated = isValidEmailFormat(emailValue);

  if (emailValidated) {
    emailError.setAttribute("style", "display: none;");
  } else {
    emailError.setAttribute("style", "display: block;");
  };

  if (emailFormatValidated) {
    emailNotValidError.setAttribute("style", "display: none;");
  } else {
    emailNotValidError.setAttribute("style", "display: block;");
  };

  //MESSAGE
  const message = document.querySelector("#message");
  let messageValue = message.value;
  const messageError = message.nextElementSibling;
  const messageValidated = valueIsNotEmpty(messageValue);

  if (messageValidated) {
    messageError.setAttribute("style", "display: none;");
  } else {
    messageError.setAttribute("style", "display: block;");
  };

  if (subjectValidated &&
    emailValidated &&
    messageValidated) {

    const myEmail = window.atob("dmljdG9yaWEuY2hhcmxvdHRlLnBldHRlcnNlbkBnbWFpbC5jb20=");

    window.location.href = `mailto:${myEmail}?subject=${subjectValue}&body=${messageValue}`;

    const validationSuccessMessageTop = "Your email draft should have opened in a new window in your email application.";
    const validationSuccessMessageBottom = "If not, please check to see if the pop up window was blocked by your browser.";

    const validationSuccessTagTop = document.createElement("p");
    const validationSuccessTagBottom = document.createElement("p");

    validationSuccessTagTop.classList.add("txt", "validation-success-message", "validation-success-message-top");
    validationSuccessTagBottom.classList.add("txt", "validation-success-message");

    const validationSuccessFinalMessageTop = document.createTextNode(validationSuccessMessageTop);
    const validationSuccessFinalMessageBottom = document.createTextNode(validationSuccessMessageBottom);

    validationSuccessTagTop.appendChild(validationSuccessFinalMessageTop);
    validationSuccessTagBottom.appendChild(validationSuccessFinalMessageBottom);

    const submitBtn = document.querySelector("#submit");
    submitBtn.parentNode.insertBefore(validationSuccessTagTop, submitBtn.nextSibling);
    validationSuccessTagTop.parentNode.insertBefore(validationSuccessTagBottom, validationSuccessTagTop.nextSibling);

    //disabled after opening the email application
    submitBtn.disabled = true;
    submitBtn.style.backgroundColor = "rgba(255, 255, 255, 0.24)";
    submitBtn.style.cursor = "auto";
  };
};

function valueIsNotEmpty(input) {

  if (input.trim().length > 0) {
    return true;
  };
};

function isValidEmailFormat(input) {

  const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailFormat.test(input);
};
