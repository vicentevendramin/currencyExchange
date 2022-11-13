import './style.css';

const coinInput = document.querySelector('#coin');
const searchButton = document.querySelector('#search-coin');
const main = document.querySelector('main');

const BASE_URL = 'https://api.exchangerate.host/latest?base=';

function renderCoins(data) {
  main.innerHTML = '';
  const coins = Object.entries(data.rates);

  const h2 = document.createElement('h2');
  h2.innerHTML = `Amounts referring to ${data.base}`;
  main.appendChild(h2);

  coins.forEach((coin) => {
    const [coinName, value] = coin;
    const li = document.createElement('li');
    li.innerHTML = `${coinName} - ${value}`;
    main.appendChild(li);
  });
}

async function fetchAPI() {
  const coin = coinInput.value;
  coinInput.value = '';

  const result = await fetch(`${BASE_URL}${coin}`);
  const data = await result.json();

  console.log(data);
  return renderCoins(data);
}

searchButton.addEventListener('click', fetchAPI);
