[![Netlify Status](https://api.netlify.com/api/v1/badges/fb14b164-e2c6-4b6f-a6dd-c7c12d8b4b78/deploy-status)](https://app.netlify.com/sites/market-cap/deploys)

Website: [https://market-cap.netlify.app/](https://market-cap.netlify.app/)

# Marketcap

Fetches and shows the marketcap of Ethereum (or any other coin that you want). Data is fetched from CoinGecko

Part of Ivan on Tech [Ivan on Tech Academy](https://academy.ivanontech.com/) bootcamp.


## Scripts
There are 2 scripts, both implement the same logic
- `script.js` uses ES5 style of coding
- `scriptES6.js` uses ES6+ style of coding using async/await and a few other changes

`fetchAndUpdate(coin,currency,days)` is called to fetch the data, it has 3 parameters:
- `coin`: the coin id (specified by coinGecko)
- `currency` (default = `'eur'`): to display the value in (must be supported by coinGecko)
- `days` (default = `7`):number of days to calculate the difference from
