import { getCurrencies } from './getCurrencies.js';

async function renderCurrencies() {
  const convertFromEl = document.querySelector('[data-convert-from]');
  const convertToEl = document.querySelector('[data-convert-to]');

  const currencies = await getCurrencies();

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
