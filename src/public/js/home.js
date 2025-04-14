const destinationInput = document.getElementById('destinationInput');
const destinationSearchBtn = document.getElementById('destinationSearch');

destinationSearchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  
  const destination = destinationInput.value.trim(); 
  
  if (destination) {
    window.location.href = `/destination?place=${encodeURIComponent(destination)}`;
  } else {
    alert("Please enter a destination!");
  }
});







document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('.enquiry-tab');
  const forms = document.querySelectorAll('.enquiry-form');



  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      forms.forEach(f => f.classList.remove('active'));

      tab.classList.add('active');
      document.querySelector(`.${target}-form`).classList.add('active');
    });
  });

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Add animation on scroll using Intersection Observer
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('appear');
        appearOnScroll.unobserve(entry.target);
      }
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

  $(function () {
    var card = $(".card");
  
    card.on("mousemove", function (e) {
      var x = e.clientX + $(window).scrollLeft() - $(this).offset().left;
      var y = e.clientY + $(window).scrollTop() - $(this).offset().top;
  
      var rY = map(x, 0, $(this).width(), -8, 8);
      var rX = map(y, 0, $(this).height(), -8, 8);
  
      $(this)
        .children(".image")
        .css(
          "transform",
          "rotateY(" + rY + "deg)" + " " + "rotateX(" + -rX + "deg)"
        );
    });
  
    card.on("mouseenter", function () {
      $(this)
        .children(".image")
        .css({
          transition: "all " + 0.05 + "s" + " linear",
          WebkitTransition: "all " + 0.05 + "s" + " linear"
        });
    });
  
    card.on("mouseleave", function () {
      $(this)
        .children(".image")
        .css({
          transition: "all " + 0.2 + "s" + " linear",
          WebkitTransition: "all " + 0.2 + "s" + " linear"
        });
  
      $(this)
        .children(".image")
        .css(
          "transform",
          "rotateY(" + 0 + "deg)" + " " + "rotateX(" + 0 + "deg)"
        );
    });
  
    function map(x, in_min, in_max, out_min, out_max) {
      return ((x - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
    }
  });
  
});
