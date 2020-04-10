// -----------------------------------------------------------------------------
// Functionality Of All Popups -------------------------------------------------
// -----------------------------------------------------------------------------

// Currency Exchange Rates  ----------------------------------------------------

$("#closeCurrencyExchangeRatesPopup").click(function(){
  let currencyExchangeRatesPopup = document.querySelector(".currencyExchangeRatesPopup");
  currencyExchangeRatesPopup.style.display = "none";

  // Allows user to scoll again (desktop/laptop)
  $('body').removeClass('popup-stop-scroll');
});

// Currency Conversion ---------------------------------------------------------

$("#closeNotNumberPopup").click(function(){
  let notNumberPopup = document.querySelector(".notNumberPopup");
  notNumberPopup.style.display = "none";

  // Allows user to scoll again (desktop/laptop)
  $('body').removeClass('popup-stop-scroll');
});

// Currency Graph --------------------------------------------------------------

$("#closeCurrencyRatePopup").click(function(){
  let currencyRatePopup = document.querySelector(".currencyRatePopup");
  currencyRatePopup.style.display = "none";

  // Allows user to scoll again (desktop/laptop)
  $('body').removeClass('popup-stop-scroll');
});

// Currency History Exchange Rates  --------------------------------------------

$("#closeCurrencyHistoryPopup").click(function(){
  let currencyHistoryPopup = document.querySelector(".currencyHistoryPopup");
  currencyHistoryPopup.style.display = "none";

  // Allows user to scoll again (desktop/laptop)
  $('body').removeClass('popup-stop-scroll');
});
