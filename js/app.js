import { getCurrencies } from './getCurrencies.js';

const formEl = document.querySelector('[data-form]');
const amountEl = document.querySelector('[data-amount]');
const convertFromEl = document.querySelector('[data-convert-from]');
const convertToEl = document.querySelector('[data-convert-to]');
const infoEl = document.querySelector('[data-info]');

async function renderCurrencies() {
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
    optionEl.name = currency[0];
    optionEl.innerText = currency[0];

    selectEl.appendChild(optionEl);
  });
}

function createResultEl(result) {
  const getOptionName = selectEl =>
    selectEl.options[selectEl.selectedIndex].name;

  if (infoEl.childElementCount === 2) {
    infoEl.firstChild.remove();
  }

  const resultEl = document.createElement('span');
  resultEl.innerHTML = `<strong>${amountEl.value}</strong> ${getOptionName(
    convertFromEl
  )} = <strong>${result}</strong> ${getOptionName(convertToEl)}`;

  return resultEl;
}

function init() {
  formEl.addEventListener('submit', e => {
    e.preventDefault();

    const result = (amountEl.value * convertToEl.value) / convertFromEl.value;
    infoEl.prepend(createResultEl(result));
    amountEl.value = null;
    amountEl.focus();
  });

  renderCurrencies();
}

init();
