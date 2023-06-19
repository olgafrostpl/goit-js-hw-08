import throttle from 'lodash.throttle';

const FORM_STATE = 'feedback-form-state';
let formData = {
  email: '',
  message: '',
};

const formEl = document.querySelector('.feedback-form');

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(onTextareaInput, 500));

updateForm();

function onFormSubmit(e) {
  if (formEl.email.value === '' || formEl.message.value === '') {
    return alert('Please make sure all fields are filled!');
  }
  console.log(localStorage.getItem(FORM_STATE));
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem(FORM_STATE);
}

function onTextareaInput(e) {
  formData[e.target.name] = e.target.value;
  const inputedValue = JSON.stringify(formData);
  localStorage.setItem(FORM_STATE, inputedValue);
}

function updateForm() {
  const savedValue = JSON.parse(localStorage.getItem(FORM_STATE));
  if (savedValue) {
    formEl.email.value = savedValue.email;
    formEl.message.value = savedValue.message;
  }
}
