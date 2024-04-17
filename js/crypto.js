/**
 * JavaScript for the News Container
 * Uses fetch() to retrieve API info
 * courtesy of newsapi.org (free)
 */

const key = '0a73c464-7da5-4574-8bea-a657cb6c34d8';

/**
 * Helper function used to generate a random category to display news for
 */
function setBackground (num) {
  let background = '';
  let posNeg = num.substring(0);
  if (posNeg === '-') {
    background = '#Ad2013';
  }
  else if (posNeg === '0.00') {
    background = 'gray';
  }
  else {
    background = '#248c0d';
  }
  return background;
}

/**
 * Function used to create and append a crypto block to the container
 */
function appendCryptoBlock(data) {
  const container = document.getElementById('cryptoContainer');

  //entire list block
  const listBlock = document.createElement('div');
  listBlock.classList.add('listBlock');

  //crypto symbol (ex. BTC)
  const symbol = document.createElement('div');
  symbol.classList.add('listBlockSymbol');
  symbol.textContent = data.symbol;

  //crypto name (ex. Bitcoin)
  const name = document.createElement('span');
  name.classList.add('listBlockName');
  name.textContent = `${data.name}`;

  symbol.appendChild(name);


  //crypto price
  const price = document.createElement('div');
  price.classList.add('listBlockPrice');
  price.textContent = `$${data.quote.USD.price.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`;

  //div for price, 1h price change, 24h price change
  const pricesDiv = document.createElement('div');
  pricesDiv.classList.add('listBlockPriceChanges');
  //crypto price change for 1h
  const percentChange1h = document.createElement('div');
  percentChange1h.classList.add('listBlock1h');
  const oneHourChange = data.quote.USD.percent_change_1h.toFixed(2);
  const formatted1hChange = oneHourChange >= 0 ? `+${oneHourChange}` : oneHourChange;
  percentChange1h.textContent = `${formatted1hChange}%`;
  //crypto price change for 24h
  const percentChange24h = document.createElement('div');
  percentChange24h.classList.add('listBlock24h');
  const TwentyFourHourChange = data.quote.USD.percent_change_24h.toFixed(2);
  const formatted24hChange = TwentyFourHourChange >= 0 ? `+${TwentyFourHourChange}` : TwentyFourHourChange;
  percentChange24h.textContent = `${formatted24hChange}%`;
  //crypto price change for 7d
  const percentChange7d = document.createElement('div');
  percentChange24h.classList.add('listBlock24h');
  const SevenDayChange = data.quote.USD.percent_change_7d.toFixed(2);
  const formatted7dChange = SevenDayChange >= 0 ? `+${SevenDayChange}` : SevenDayChange;
  percentChange7d.textContent = `${formatted7dChange}%`;

  pricesDiv.appendChild(percentChange1h);
  pricesDiv.appendChild(percentChange24h);
  pricesDiv.appendChild(percentChange7d);

  let background = setBackground(TwentyFourHourChange.substring(0,1));
  listBlock.style.background = background;

  listBlock.appendChild(symbol);
  listBlock.appendChild(price)
  listBlock.appendChild(pricesDiv);
  container.appendChild(listBlock);
}

fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC,ETH,XRP,SOL,XLM,USDT,ADA', {
    headers: {
        'X-CMC_PRO_API_KEY': key 
    }
})
.then(response => response.json())
.then(data => {
    const bitcoinData = data.data.BTC;
    const ethereumData = data.data.ETH;
    const xrpData = data.data.XRP;
    const solanaData = data.data.SOL;
    const xlmData = data.data.XLM;
    const cardanoData = data.data.ADA;

    appendCryptoBlock(xrpData);
    appendCryptoBlock(bitcoinData);
    appendCryptoBlock(ethereumData);
    appendCryptoBlock(solanaData);
    appendCryptoBlock(xlmData);
    appendCryptoBlock(cardanoData);
})
.catch(error => {
    // Handle other errors here
    console.error('Error:', error);
});
