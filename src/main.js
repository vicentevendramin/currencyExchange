import './style.css';
import Swal from 'sweetalert2';

const coinInput = document.querySelector('#coin');
const searchButton = document.querySelector('#search-coin');
const h2 = document.querySelector('h2');
const liContainer = document.querySelector('.li-container');

const BASE_URL = 'https://api.exchangerate.host/latest?base=';
const SYMBOLS_URL = 'https://api.exchangerate.host/symbols';

const fetchSymbols = await fetch(SYMBOLS_URL);
const dataSymbols = await fetchSymbols.json();
const symbols = Object.keys(dataSymbols.symbols);

function renderCoins(data) {
  h2.innerHTML = '';
  liContainer.innerHTML = '';

  const coins = Object.entries(data.rates);

  h2.innerHTML = `Amounts referring to ${data.base}`;

  coins.forEach((coin) => {
    const [coinName, value] = coin;
    const li = document.createElement('li');
    li.innerHTML = `${coinName} - ${value.toFixed(2)}`;
    liContainer.appendChild(li);
  });
}

const checkCoin = (coin) => symbols.some((symbol) => symbol === coin.toUpperCase());

async function fetchAPI() {
  const coin = coinInput.value;
  coinInput.value = '';

  if (coin.length > 0) {
    if (checkCoin(coin)) {
      const result = await fetch(`${BASE_URL}${coin}`);
      const data = await result.json();

      return renderCoins(data);
    }
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'The currency does not exist',
    });
  }
  return Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'You need to enter a currency',
  });
}

searchButton.addEventListener('click', fetchAPI);
