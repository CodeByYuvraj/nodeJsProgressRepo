const slec = document.getElementById('sel1');
const other = document.getElementById('other');
const blood = document.getElementById('blood');
other.style.display = 'none';
blood.style.display = 'none'
function slecFun() {
    if(slec.value == 'other'){
        other.style.display = '';
        blood.style.display = 'none';
    } else if(slec.value == 'plasma') {
      blood.style.display = '';
      other.style.display = 'none';
    }
     else {
        blood.style.display = 'none';
        other.style.display = 'none';
    }
}

$(document).ready(function(){
    // Add scrollspy to <body>
    $('body').scrollspy({target: ".navbar", offset: 50});   
  
    // Add smooth scrolling on all links inside the navbar
    $("#collapsibleNavbar a").on('click', function(event) {
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();
  
        // Store hash
        var hash = this.hash;
  
        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, function(){
     
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      }  // End if
    });
  });
