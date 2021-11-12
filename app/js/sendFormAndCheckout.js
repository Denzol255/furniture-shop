const modal = document.querySelector('.modal');
const loader = document.querySelector('._lds-default');
const successModal = document.querySelector('.success-modal');
const errorModal = document.querySelector('.error-modal');
const form = document.getElementById('form1');

const deleteOldErrorMessages = (target) => {
  const oldErrorMessages = target.querySelectorAll('.message-error');
  if (oldErrorMessages.length > 0) {
    for (let i = 0; i < oldErrorMessages.length; i++) {
      oldErrorMessages[i].remove();
    }
  }
};

const displayErrorMessage = (target, type) => {
  const errorMessage = document.createElement('div'),
    warnForEmail = 'Полe email имеет вид qwerty123@mail.com',
    warnForPhone =
      "Полe phone может начинаться с '+' и должно содержать от 7 до 13 символов",
    warnForName = 'Полe name должно содержать минимум 2 символа';

  errorMessage.classList.add('message-error');

  if (type === 'email') {
    errorMessage.textContent = warnForEmail;
  } else if (type === 'phone') {
    errorMessage.textContent = warnForPhone;
  } else if (type === 'name') {
    errorMessage.textContent = warnForName;
  }

  target.appendChild(errorMessage);
};

const showWindow = (
  success,
  form,
  loadingWindow,
  successWindow,
  errorWindow
) => {
  setTimeout(() => {
    loadingWindow.classList.remove('_active');
    success
      ? successWindow.classList.add('_active')
      : errorWindow.classList.add('_active');
    setTimeout(() => {
      success
        ? successWindow.classList.remove('_active')
        : errorWindow.classList.remove('_active');
      modal.classList.remove('_active');
      document.body.classList.remove('_scroll--lock');
    }, 3000);
  }, 3000);

  form.reset();
};

const postData = (body) => {
  return fetch('../assets/server.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'aplication/json',
    },
    body: JSON.stringify(body),
  });
};

const checkFields = (target, type, name, reg) => {
  const field = target.querySelector(`[name="${name}"]`);
  deleteOldErrorMessages(target);
  if (!reg.test(field.value)) {
    displayErrorMessage(target, type);
    return false;
  }
  return true;
};

form.addEventListener('click', (event) => {
  const target = event.target;
  if (target.matches('.subscribe-footer__btn')) {
    const checkEmail = checkFields(
      form,
      'email',
      'user_email',
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );
    if (checkEmail) {
      const formData = new FormData(form);
      const body = {};

      formData.forEach((val, key) => {
        body[key] = val;
      });

      modal.classList.add('_active');
      loader.classList.add('_active');
      document.body.classList.add('_scroll--lock');

      postData(body)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error('status network is not 200');
          }
          showWindow(true, form, loader, successModal, errorModal);
        })
        .catch((error) => {
          showWindow(false, form, loader, successModal, errorModal);
          console.error(error);
        });
    }
  }
});
