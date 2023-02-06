import { getCurrencies } from './getCurrencies.js';

async function renderCurrencies() {
  const convertFromEl = document.querySelector('[data-convert-from]');
  const convertToEl = document.querySelector('[data-convert-to]');

  const currencies = await getCurrencies();

  if (typeof currencies === 'string') {
    const formEl = document.querySelector('[data-form]');
    while (formEl.firstChild) {
      formEl.firstChild.remove();
    }
    formEl.innerText = currencies;
  }

  createOptionEl(currencies, convertFromEl);
  createOptionEl(currencies, convertToEl);
}

function createOptionEl(currencies, selectEl) {
  Object.entries(currencies).forEach(currency => {
    const optionEl = document.createElement('option');
    optionEl.value = currency[1];
    optionEl.innerText = currency[0];

    selectEl.appendChild(optionEl);
  });
}

function init() {
  renderCurrencies();
}

init();
