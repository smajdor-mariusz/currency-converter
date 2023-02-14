export async function getCurrencies() {
  try {
    const response = await fetch('https://api.exchangerate.host/latest');
    const data = await response.json();
    return data.rates;
  } catch (err) {
    return `Could not load the currencies, please try again later! ${err}`;
  }
}
