// -----------------------------------------------------------------------------
// Dropdown JS -----------------------------------------------------------------
// -----------------------------------------------------------------------------

// Variables
var allDropdowns, selectElement, newDivSelected, newDivOptionList, newDivOptionItem;

// Index
var i, j,

// All dropdowns in the app with class currencyDropdown
allDropdowns = document.getElementsByClassName("currencyDropdown");

for (i = 0; i < allDropdowns.length; i++) { // Start outer for statement
  selectElement = allDropdowns[i].getElementsByTagName("select")[0];

  // For each element create new div. Act as the selected item
  newDivSelected = document.createElement("DIV");
  newDivSelected.setAttribute("class", "currency-selected");
  newDivSelected.innerHTML = selectElement.options[selectElement.selectedIndex].innerHTML;
  allDropdowns[i].appendChild(newDivSelected);

  // For each element create new div. Will contain the option list
  newDivOptionList = document.createElement("DIV");
  newDivOptionList.setAttribute("class", "currency-options options-hide");

  for (j = 1; j < selectElement.length; j++) { // Start centre for statement

    // For each option in the original select element create new div. Will act as an option item
    newDivOptionItem = document.createElement("DIV");
    newDivOptionItem.innerHTML = selectElement.options[j].innerHTML;

    // When item clicked update the original select box and selected item
    newDivOptionItem.addEventListener("click", function(e) {

      // Variables
      var sameSelected, select, previousSibling;
      // Index
      var i, k,

      select = this.parentNode.parentNode.getElementsByTagName("select")[0];
      previousSibling = this.parentNode.previousSibling;

      for (i = 0; i < select.length; i++) { // Start inner for statement
        if (select.options[i].innerHTML == this.innerHTML) {
          select.selectedIndex = i;
          previousSibling.innerHTML = this.innerHTML;
          sameSelected = this.parentNode.getElementsByClassName("same-as-selected");
          for (k = 0; k < sameSelected.length; k++) {
            sameSelected[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      } // End inner for statement
      previousSibling.click();
    }); // End on click
    newDivOptionList.appendChild(newDivOptionItem);
  } // End centre for statement

  allDropdowns[i].appendChild(newDivOptionList);
  newDivSelected.addEventListener("click", function(e) {
    // When select box is clicked close any other select boxes and open/close the current select box
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("options-hide");
    this.classList.toggle("arrow-active");
  });
} // End outer for statement

// Function to close all select boxes in document except current select box
function closeAllSelect(element) {

  // Variables
  var currencyOptions, currencySelected
  var selectBoxesToClose = [];

  // Index
  var i;

  currencyOptions = document.getElementsByClassName("currency-options");
  currencySelected = document.getElementsByClassName("currency-selected");
  for (i = 0; i < currencySelected.length; i++) {
    if (element == currencySelected[i]) {
      selectBoxesToClose.push(i)
    } else {
      currencySelected[i].classList.remove("arrow-active");
    }
  }
  for (i = 0; i < currencyOptions.length; i++) {
    if (selectBoxesToClose.indexOf(i)) {
      currencyOptions[i].classList.add("options-hide");
    }
  }
}

// Click outside the select box closes all select boxes
document.addEventListener("click", closeAllSelect);
