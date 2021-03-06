const GECKO_BASE_URL = "https://api.coingecko.com/api/v3";

/**
 * Format the value in the provided currency
 * We use en-US as locale for consistency accross users
 */
function formatCurrency(value, currency) {
  return value.toLocaleString("en-US", { style: "currency", currency: currency });
}

function clearResult() {
  $("#coin-mc-diff").text("");
  $("#coin-mc-diff").removeClass("error");
  $("#coin-mc-diff").removeClass("positive");
  $("#coin-mc-diff").removeClass("negtive");
}

/**
 * Render the market cap data in the provided currency
 */
function renderResult(value, currency) {
  clearResult();

  if (value > 0) {
    $("#coin-mc-diff").addClass("positive");
    $("#coin-mc-diff").text("+" + formatCurrency(value, currency));
  } else if (value < 0) {
    $("#coin-mc-diff").addClass("negative");
    $("#coin-mc-diff").text(formatCurrency(value, currency));
  } else {
    $("#coin-mc-diff").text(formatCurrency(value, currency));
  }
}

/**
 * Render a generic error message
 */
function renderError() {
  clearResult();

  $("#coin-mc-diff").text("Oops something went wrong");
  $("#coin-mc-diff").addClass("error");
}

/**
 * Render the title based on the fetch arguments
 */
function renderTitle(id, days) {
  $("#title").text("Market cap change of " + id + " the last " + days + " days");
}

/**
 * Fetches historic market data for the coin(id) in the provided currency fot the duration(days)
 */
function getMarketChart(id, currency, days) {
  const url = GECKO_BASE_URL + "/coins/" + id + "/market_chart?vs_currency=" + currency + "&days=" + days;

  return fetch(url).then(function (response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }

    return response.json();
  });
}

/**
 * Fetches historic market data for the coin(id) in the provided currency fot the duration(days)
 */
function getCoinMarketCapDifference(id, currency, days) {
  return getMarketChart(id, currency, days).then(function (data) {
    const currentMarketCap = data.market_caps[data.market_caps.length - 1][1];
    const oldMarketCap = data.market_caps[0][1];

    const differenceMarketCap = currentMarketCap - oldMarketCap;

    return differenceMarketCap;
  });
}

/**
 * Fetches data for the provided coin(id) and renders it
 */
function fetchAndUpdate(id, currency, days) {
  renderTitle(id, days);

  getCoinMarketCapDifference(id, currency, days)
    .then(function (differenceMarketCap) {
      renderResult(differenceMarketCap, currency);
    })
    .catch(function () {
      renderError();
    });
}

fetchAndUpdate("ethereum", "eur", 7);
