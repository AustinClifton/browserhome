/**
 * Austin Clifton
 * 
 * JavaScript for the Crypto Container
 * Uses fetch() to retrieve API info
 * courtesy of coinpaprika.com (free)
 * last updated in v1.1
 */

const cryptoIds = ['btc-bitcoin', 'eth-ethereum', 'xrp-xrp', 'sol-solana', 'usdc-usd-coin', 'ada-cardano', 'doge-dogecoin', 'dot-polkadot'];

/**
 * helper function used to generate a background color based on the price change.
 * @param {number} num - the price change percentage.
 * @returns {string} the background color.
 */
function setBackground(num) {
  let background = '';
  if (num < 0) {
    background = '#Ad2013'; // red for negative change
  } else if (num === 0) {
    background = 'gray'; // gray for no change
  } else {
    background = '#248c0d'; // green for positive change
  }
  return background;
}

/**
 * function used to create and append a crypto block to the container.
 * @param {Object} data - the cryptocurrency data.
 */
function appendCryptoBlock(data) {
  const container = document.getElementById('cryptoContainer');

  // entire list block
  const listBlock = document.createElement('div');
  listBlock.classList.add('listBlock');

  // crypto symbol (ex. BTC)
  const symbol = document.createElement('div');
  symbol.classList.add('listBlockSymbol');
  symbol.textContent = data.symbol;

  // crypto name (ex. Bitcoin)
  const name = document.createElement('span');
  name.classList.add('listBlockName');
  name.textContent = `${data.name}`;

  symbol.appendChild(name);

  // crypto price
  const price = document.createElement('div');
  price.classList.add('listBlockPrice');
  price.textContent = `$${data.quotes.USD.price.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`;

  // div for price, 1h price change, 24h price change
  const pricesDiv = document.createElement('div');
  pricesDiv.classList.add('listBlockPriceChanges');

  // crypto price change for 1h
  const percentChange1h = document.createElement('div');
  percentChange1h.classList.add('listBlock1h');
  const oneHourChange = data.quotes.USD.percent_change_1h.toFixed(2);
  const formatted1hChange = oneHourChange >= 0 ? `+${oneHourChange}` : oneHourChange;
  percentChange1h.textContent = `${formatted1hChange}%`;

  // crypto price change for 24h
  const percentChange24h = document.createElement('div');
  percentChange24h.classList.add('listBlock24h');
  const TwentyFourHourChange = data.quotes.USD.percent_change_24h.toFixed(2);
  const formatted24hChange = TwentyFourHourChange >= 0 ? `+${TwentyFourHourChange}` : TwentyFourHourChange;
  percentChange24h.textContent = `${formatted24hChange}%`;

  // crypto price change for 7d
  const percentChange7d = document.createElement('div');
  percentChange7d.classList.add('listBlock7d');
  const SevenDayChange = data.quotes.USD.percent_change_7d.toFixed(2);
  const formatted7dChange = SevenDayChange >= 0 ? `+${SevenDayChange}` : SevenDayChange;
  percentChange7d.textContent = `${formatted7dChange}%`;

  pricesDiv.appendChild(percentChange1h);
  pricesDiv.appendChild(percentChange24h);
  pricesDiv.appendChild(percentChange7d);

  let background = setBackground(parseFloat(TwentyFourHourChange));
  listBlock.style.background = background;

  listBlock.appendChild(symbol);
  listBlock.appendChild(price);
  listBlock.appendChild(pricesDiv);
  container.appendChild(listBlock);
}

/**
 * fetches cryptocurrency data for each ID in the cryptoIds array and appends it to the container.
 */
cryptoIds.forEach(id => {
  fetch(`https://api.coinpaprika.com/v1/tickers/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Crypto fetch failed for ${id}.`);
      }
      return response.json();
    })
    .then(data => {
      appendCryptoBlock(data);
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
});
