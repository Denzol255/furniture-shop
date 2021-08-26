const successMessage = 'Спасибо, наш менеджер с вами скоро свяжется!',
  errorMessage = 'Что-то пошло не так',
  loadMessage = 'Загрузка...';

const statusMessage = document.createElement('div');
statusMessage.classList.add('message-default');

const postData = (body) => {
  return fetch('./server.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'aplication/json',
    },
    body: JSON.stringify(body),
  });
};

const checkFields = (target, selector, reg, warning, warnText) => {
  let flag = true;
  document.querySelectorAll(`[name = ${selector}]`).forEach((item) => {
    if (item.id.split('-')[0] === target.id) {
      if (!reg.test(item.value)) {
        target.appendChild(warning);
        warning.classList.add('message-default error');
        warning.textContent = warnText;
        flag = false;
      } else {
        flag = true;
      }
    }
  });
  if (flag) {
    return true;
  } else {
    return false;
  }
};

document.addEventListener('submit', (event) => {
  const target = event.target,
    warnForPhone =
      "Полe phone может начинаться с '+' и должно содержать от 7 до 13 символов",
    warnForEmail = 'Полe email не должно быть пустым',
    warnForName = 'Полe name должно содержать минимум 2 символа';

  if (target.matches('form')) {
    event.preventDefault();
    const checkPhone = checkFields(
      target,
      'user_phone',
      /\+?\d{7,13}/g,
      statusMessage,
      warnForPhone
    );
    const checkEmail = checkFields(
      target,
      'user_email',
      /[^]/,
      statusMessage,
      warnForEmail
    );
    const checkName = checkFields(
      target,
      'user_name',
      /.{2,}/g,
      statusMessage,
      warnForName
    );
    if (checkPhone && checkEmail && checkName) {
      target.appendChild(statusMessage);
      const formData = new FormData(target);
      statusMessage.textContent = loadMessage;
      const body = {};

      formData.forEach((val, key) => {
        body[key] = val;
      });

      postData(body)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error('status network is not 200');
          }
          statusMessage.textContent = successMessage;
          setTimeout(() => {
            statusMessage.remove();
          }, 2000);
          // setTimeout(() => {
          //   document.querySelector('.popup').style.display = 'none';
          //   document.querySelector('body').classList.remove('scroll--lock');
          // }, 3000);
          // target.reset();
        })
        .catch((error) => {
          statusMessage.textContent = errorMessage;
          statusMessage.classList.add('error');
          console.error(error);
        });
    }
  }
});
