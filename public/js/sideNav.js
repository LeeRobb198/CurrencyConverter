// -----------------------------------------------------------------------------
// Side Nav JS -----------------------------------------------------------------
// -----------------------------------------------------------------------------

function openNav() {
  document.getElementById("sideNav").style.width = "250px";
}

function closeNav() {
  document.getElementById("sideNav").style.width = "0";
}

// Buttons ---------------------------------------------------------------------

$("#openSideNav").click(function(){
  openNav();
});
