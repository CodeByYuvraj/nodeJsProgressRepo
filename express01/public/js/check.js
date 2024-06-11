const form = document.querySelector("#form");
const loder = document.querySelector("#loder");
var loc = window.localStorage;

if (loc.getItem("hide")) {
  loder.style.display = "block";
  form.style.display = "none";
  setTimeout(() => {
    document.querySelector("form").reset();
    form.style.display = "";
    loder.style.display = "none";
    loc.removeItem('hide')
    // loc.setItem("hide", false);
  }, 30000);
}


var twee = document.querySelector("#UserTwee");
var tweeLenght = twee.children.length - 2;
var moreBtn = document.querySelector("#moreBtn");
var tweeLoder = document.querySelector("#tweeLoder");
var num = 10;
for(var i = num; i < tweeLenght; i++){
  twee.children[i].style.display = 'none';
}

function displayMore(){
  if(num < tweeLenght-2){
    num = num + 10;
    console.log(num);
    moreBtn.style.display = "none";
    tweeLoder.style.display = "block";

    setTimeout(() => {
      for (var i = 0; i < num && i < tweeLenght-2 ; i++) {
        twee.children[i].style.display = "";
      }
      moreBtn.style.display = "";
      tweeLoder.style.display = "";
    }, 5000);
  }
}

if(window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}