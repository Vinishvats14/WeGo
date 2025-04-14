const initialData = {
  description:
    "New Delhi, India's capital, is a vibrant and bustling metropolis that seamlessly blends ancient history with modern dynamism. A city of contrasts, it boasts magnificent Mughal-era monuments alongside sleek skyscrapers, chaotic street markets juxtaposed with upscale shopping malls. The air is thick with the aroma of spices from countless street food vendors, the sounds of car horns and conversations creating a symphony of urban life. Exploring Delhi involves immersing yourself in its rich cultural tapestry, from the grandeur of the Red Fort to the spiritual serenity of its numerous temples and mosques. It's a city that can overwhelm the senses, but rewards those who take the time to discover its hidden gems and experience its unique energy.",
  attractions: [
    "Red Fort (Lal Qila): A UNESCO World Heritage site, the imposing Mughal fort is a symbol of India's rich history.",
    "Humayun's Tomb: A precursor to the Taj Mahal, this magnificent tomb showcases stunning Mughal architecture.",
    "Qutub Minar: A towering minaret, a testament to the early Indo-Islamic architectural style.",
    "India Gate: A war memorial dedicated to Indian soldiers who died in World War I.",
    "Jama Masjid: One of India's largest mosques, known for its impressive architecture and serene atmosphere.",
    "Akshardham Temple: A sprawling temple complex showcasing stunning architecture and intricate details.",
    "Lotus Temple: A Baha'i House of Worship, known for its unique lotus flower-shaped design.",
    "Rajpath: A ceremonial boulevard lined with impressive government buildings.",
    "National Museum: Houses a vast collection of Indian art and artifacts.",
    "Chandni Chowk: A bustling market offering a vibrant display of goods and street food.",
  ],
  reviews: [
    {
      user: "Sarah J.",
      rating: 4.0,
      comment:
        "Delhi is an incredible city, but be prepared for the chaos! The traffic is intense, and the crowds can be overwhelming, but the history and culture are truly captivating. I loved visiting the Red Fort and Jama Masjid.",
    },
    {
      user: "David L.",
      rating: 4.5,
      comment:
        "Delhi exceeded my expectations. The food is amazing, so diverse and flavorful. I particularly enjoyed exploring the street food scene. The historical sites are breathtaking, and the city has a vibrant energy that's hard to find anywhere else.",
    },
    {
      user: "Maria R.",
      rating: 3.5,
      comment:
        "Delhi is a sensory overload! While the historical sites are impressive, I found the air quality and traffic to be challenging. It's definitely a city that requires careful planning and a bit of patience.",
    },
  ],
  emergency_contacts: {
    police: "100",
    hospital:
      "Emergency services can be reached through 108 (National Ambulance Service). Specific hospital numbers will vary.",
    mechanic:
      "There is no single emergency number for car mechanics. Roadside assistance services are available, and many garages will have 24/7 services. It's recommended to check your hotel or accommodation for local mechanic recommendations.",
  },
  weather: {
    temperature: "20.09°C",
    condition: "Mist",
  },
  images: [
    "https://images.pexels.com/photos/14520365/pexels-photo-14520365.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    "https://images.pexels.com/photos/17609960/pexels-photo-17609960.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    "https://images.pexels.com/photos/20123633/pexels-photo-20123633.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  ],
};

// Sample data for Mumbai as an example when searching
const mumbaiData = {
  description:
    "Mumbai, formerly known as Bombay, is India's financial powerhouse and entertainment capital. This coastal metropolis pulsates with an infectious energy, combining colonial-era architecture with modern skyscrapers. Home to Bollywood and some of Asia's largest slums, Mumbai embodies stark contrasts and relentless ambition. The Arabian Sea creates a stunning backdrop to landmarks like the Gateway of India and Marine Drive, while bustling markets, vibrant street food scenes, and ornate temples add cultural depth. Despite challenging infrastructure and crowding, Mumbai's spirit of resilience and opportunity draws millions who come seeking to fulfill their dreams in the 'City of Dreams.'",
  attractions: [
    "Gateway of India: The iconic arch monument built during the British Raj, overlooking the Arabian Sea.",
    "Marine Drive: A 3.6-kilometer-long boulevard along the coastline, also known as the 'Queen's Necklace'.",
    "Elephanta Caves: Ancient cave temples dedicated to Lord Shiva, located on Elephanta Island.",
    "Chhatrapati Shivaji Terminus: A historic railway station and UNESCO World Heritage Site featuring Victorian Gothic architecture.",
    "Haji Ali Dargah: A mosque and tomb located on an islet off the coast of Worli.",
    "Juhu Beach: A popular beach and recreational spot frequented by locals and tourists alike.",
    "Sanjay Gandhi National Park: A large protected area within the city limits, home to leopards and ancient Kanheri Caves.",
    "Colaba Causeway: A bustling market street known for shopping and cafes.",
    "Siddhivinayak Temple: A revered Hindu temple dedicated to Lord Ganesha.",
    "Dharavi: One of Asia's largest slums, known for its thriving small-scale industries.",
  ],
  reviews: [
    {
      user: "Michael T.",
      rating: 4.2,
      comment:
        "Mumbai's energy is infectious! From the moment I arrived, I was swept up in the rhythm of the city. The contrast between colonial architecture and modern development is fascinating. Don't miss walking along Marine Drive at sunset!",
    },
    {
      user: "Priya K.",
      rating: 5.0,
      comment:
        "As a local, I'm biased, but Mumbai truly has something for everyone. The food scene is incredible - from street food at Chowpatty to high-end restaurants in Bandra. The city never sleeps and neither will you want to!",
    },
    {
      user: "James R.",
      rating: 3.8,
      comment:
        "Mumbai is intense but rewarding. The traffic and crowds can be overwhelming at first, but once you adjust, you'll appreciate the city's charm. The colonial architecture is stunning, and the people are incredibly friendly and helpful.",
    },
  ],
  emergency_contacts: {
    police: "100",
    hospital:
      "Emergency services can be reached through 108 (National Ambulance Service). Major hospitals include Lilavati Hospital (022 2675 1000) and Kokilaben Hospital (022 4269 6969).",
    mechanic:
      "For roadside assistance, contact Mumbai Highway Police at 022-2388 1098. Many garages offer 24/7 services, or check with your accommodation for local recommendations.",
  },
  weather: {
    temperature: "28.5°C",
    condition: "Partly Cloudy",
  },
  images: [
    "https://images.pexels.com/photos/2409953/pexels-photo-2409953.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    "https://images.pexels.com/photos/2387871/pexels-photo-2387871.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    "https://images.pexels.com/photos/4134644/pexels-photo-4134644.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  ],
  events: [
    {
      name: "Kala Ghoda Arts Festival",
      date: "February 2-10, 2025",
      description:
        "An annual nine-day arts festival showcasing visual arts, dance, music, and literature.",
    },
    {
      name: "Mumbai Film Festival",
      date: "October 18-25, 2025",
      description:
        "International film festival featuring independent cinema from around the world.",
    },
  ],
};

// DOM Elements
const loadingIndicator = document.getElementById("loadingIndicator");
const destinationTitle = document.getElementById("destinationTitle");
const destinationDescription = document.getElementById(
  "destinationDescription"
);
const attractionsList = document.getElementById("attractionsList");
const reviewsContainer = document.getElementById("reviewsContainer");
const carouselInner = document.getElementById("carouselInner");
const carouselIndicators = document.getElementById("carouselIndicators");
const weatherInfo = document.getElementById("weatherInfo");
const emergencyContacts = document.getElementById("emergencyContacts");
const eventsSection = document.getElementById("eventsSection");
const eventsList = document.getElementById("eventsList");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

// Carousel Controls
const carouselPrev = document.getElementById("carouselPrev");
const carouselNext = document.getElementById("carouselNext");

let currentSlide = 0;
let totalSlides = 0;

// Intersection Observer for Fade-in Animation
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Initialize fade-in animations
function initAnimations() {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    observer.observe(section);
  });
}

// Update carousel display
function updateCarousel() {
  carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;

  // Update indicators
  const indicators = document.querySelectorAll(".carousel-indicator");
  indicators.forEach((indicator, index) => {
    if (index === currentSlide) {
      indicator.classList.add("active");
    } else {
      indicator.classList.remove("active");
    }
  });
}

// Carousel navigation
carouselPrev.addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateCarousel();
});

carouselNext.addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateCarousel();
});

// Render star rating
function renderStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  let stars = "";
  for (let i = 0; i < fullStars; i++) {
    stars += "★";
  }
  if (halfStar) {
    stars += "½";
  }
  for (let i = 0; i < emptyStars; i++) {
    stars += "☆";
  }

  return stars;
}

// Update UI with destination data
async function updateUI(data) {
  // Clear current data
  destinationDescription.innerHTML = "";
  attractionsList.innerHTML = "";
  reviewsContainer.innerHTML = "";
  carouselInner.innerHTML = "";
  carouselIndicators.innerHTML = "";
  weatherInfo.innerHTML = "";
  emergencyContacts.innerHTML = "";
  eventsList.innerHTML = "";

  // Update destination name
  const destinationName = searchInput.value
    ? searchInput.value.charAt(0).toUpperCase() + searchInput.value.slice(1)
    : "New Delhi";
  destinationTitle.textContent = `About ${destinationName}`;

  // Update description
  const descriptionP = document.createElement("p");
  descriptionP.textContent = data.description;
  destinationDescription.appendChild(descriptionP);

  // Update attractions
  data.attractions.forEach((attraction) => {
    const item = document.createElement("li");
    item.className = "attraction-item";

    const iconSpan = document.createElement("span");
    iconSpan.className = "attraction-icon";
    iconSpan.textContent = "✦";

    const textSpan = document.createElement("span");
    textSpan.textContent = attraction;

    item.appendChild(iconSpan);
    item.appendChild(textSpan);
    attractionsList.appendChild(item);
  });

  // Update reviews
  data.reviews.forEach((review) => {
    const reviewCard = document.createElement("div");
    reviewCard.className = "review-card";

    const reviewHeader = document.createElement("div");
    reviewHeader.className = "review-header";

    const reviewUser = document.createElement("span");
    reviewUser.className = "review-user";
    reviewUser.textContent = review.user;

    const reviewRating = document.createElement("span");
    reviewRating.className = "review-rating";
    reviewRating.textContent = renderStars(review.rating);

    reviewHeader.appendChild(reviewUser);
    reviewHeader.appendChild(reviewRating);

    const reviewComment = document.createElement("p");
    reviewComment.className = "review-comment";
    reviewComment.textContent = review.comment;

    reviewCard.appendChild(reviewHeader);
    reviewCard.appendChild(reviewComment);
    reviewsContainer.appendChild(reviewCard);
  });

  // Update carousel
  totalSlides = data.images.length;
  currentSlide = 0;

  data.images.forEach((image, index) => {
    // Create carousel item
    const item = document.createElement("div");
    item.className = "carousel-item";

    const img = document.createElement("img");
    img.src = image;
    img.alt = `Destination image ${index + 1}`;

    item.appendChild(img);
    carouselInner.appendChild(item);

    // Create indicator
    const indicator = document.createElement("div");
    indicator.className = `carousel-indicator ${index === 0 ? "active" : ""}`;
    indicator.dataset.index = index;
    indicator.addEventListener("click", () => {
      currentSlide = index;
      updateCarousel();
    });

    carouselIndicators.appendChild(indicator);
  });

  // Update weather
  const weatherTemp = document.createElement("div");
  weatherTemp.className = "weather-temp";
  weatherTemp.textContent = data.weather.temperature;

  const weatherCondition = document.createElement("div");
  weatherCondition.className = "weather-condition";
  weatherCondition.textContent = data.weather.condition;

  weatherInfo.appendChild(weatherTemp);
  weatherInfo.appendChild(weatherCondition);

  // Update emergency contacts
  for (const [label, value] of Object.entries(data.emergency_contacts)) {
    const contactItem = document.createElement("div");
    contactItem.className = "contact-item";

    const contactLabel = document.createElement("span");
    contactLabel.className = "contact-label";
    contactLabel.textContent =
      label.charAt(0).toUpperCase() + label.slice(1) + ":";

    const contactValue = document.createElement("span");
    contactValue.className = "contact-value";
    contactValue.textContent = value;

    contactItem.appendChild(contactLabel);
    contactItem.appendChild(document.createElement("br"));
    contactItem.appendChild(contactValue);

    emergencyContacts.appendChild(contactItem);
  }

  // Update events (if available)
  if (data.events && data.events.length > 0) {
    eventsSection.style.display = "block";

    data.events.forEach((event) => {
      const eventItem = document.createElement("li");
      eventItem.className = "event-item";

      const eventName = document.createElement("div");
      eventName.className = "event-name";
      eventName.textContent = event.name;

      const eventDate = document.createElement("div");
      eventDate.className = "event-date";
      eventDate.textContent = event.date;

      const eventDescription = document.createElement("div");
      eventDescription.className = "event-description";
      eventDescription.textContent = event.description;

      eventItem.appendChild(eventName);
      eventItem.appendChild(eventDate);
      eventItem.appendChild(eventDescription);

      eventsList.appendChild(eventItem);
    });
  } else {
    eventsSection.style.display = "none";
  }

  // Initialize carousel
  updateCarousel();

  // Initialize animations
  initAnimations();
}

// Handle search form submission
searchForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const searchTerm = searchInput.value.trim().toLowerCase();

  // Show loading indicator
  loadingIndicator.style.display = "flex";

  // Simulate API call with timeout
  setTimeout(() => {
    let data;

    // Simple matching for the demo
    if (searchTerm === "mumbai") {
      data = mumbaiData;
    } else {
      // Default to New Delhi for any other search
      data = initialData;
    }

    // Update UI with new data
    updateUI(data);

    // Hide loading indicator
    loadingIndicator.style.display = "none";

    // Scroll to top of page
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, 1500); // Simulate loading delay of 1.5 seconds
});

// Auto advance carousel every 5 seconds
setInterval(() => {
  if (document.visibilityState === "visible") {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
  }
}, 5000);

// Handle keyboard navigation for carousel
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
  } else if (e.key === "ArrowRight") {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
  }
});

// Initialize the page with default data
document.addEventListener("DOMContentLoaded", function () {
    
  updateUI(initialData);

  // Add swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  const carousel = document.getElementById("imageCarousel");

  carousel.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  carousel.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      // Swipe left, go to next slide
      currentSlide = (currentSlide + 1) % totalSlides;
      updateCarousel();
    } else if (touchEndX > touchStartX + 50) {
      // Swipe right, go to previous slide
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateCarousel();
    }
  }
});
