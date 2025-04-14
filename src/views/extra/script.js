// Sample data for demonstration
const samplePostedTrips = [
  {
    id: "p1",
    destination: "Varanasi, UP",
    startDate: "2025-03-15",
    endDate: "2025-03-23",
    companionsNeeded: 2,
    description: "Long-distance walking required.",
    status: "upcoming",
    interestedUsers: [
      { userId: "u1", name: "Kunal Singh", comment: "I love long trips." },
      {
        userId: "u2",
        name: "Priya Sharma",
        comment: "This sounds interesting!",
      },
    ],
  },
  {
    id: "p2",
    destination: "Mumbai, Maharashtra",
    startDate: "2025-04-10",
    endDate: "2025-04-17",
    companionsNeeded: 3,
    description: "City exploration and food tour.",
    status: "upcoming",
    interestedUsers: [
      {
        userId: "u3",
        name: "Rahul Patel",
        comment: "I know the best food spots!",
      },
    ],
  },
  {
    id: "p3",
    destination: "Goa",
    startDate: "2025-01-05",
    endDate: "2025-01-12",
    companionsNeeded: 4,
    description: "Beach vacation and water sports.",
    status: "completed",
    interestedUsers: [],
  },
];

const sampleAvailableTrips = [
  {
    id: "a1",
    destination: "Shimla, Himachal Pradesh",
    startDate: "2025-03-20",
    endDate: "2025-03-27",
    companionsNeeded: 3,
    description: "Mountain hiking and snow activities.",
    postedBy: "Amit Gupta",
    postedDate: "2025-02-15",
  },
  {
    id: "a2",
    destination: "Jaipur, Rajasthan",
    startDate: "2025-04-05",
    endDate: "2025-04-12",
    companionsNeeded: 2,
    description: "Cultural exploration and historical sites.",
    postedBy: "Neha Khanna",
    postedDate: "2025-02-20",
  },
  {
    id: "a3",
    destination: "Kochi, Kerala",
    startDate: "2025-03-10",
    endDate: "2025-03-18",
    companionsNeeded: 4,
    description: "Backwater tour and beach relaxation.",
    postedBy: "Vikram Reddy",
    postedDate: "2025-02-10",
  },
];

// DOM Elements
const postedTripsContainer = document.getElementById("posted-trips-container");
const availableTripsContainer = document.getElementById(
  "available-trips-container"
);
const tripFlipper = document.getElementById("trip-flipper");
const postTripBtn = document.getElementById("post-trip-btn");
const backToAvailableBtn = document.getElementById("back-to-available-btn");
const postTripForm = document.getElementById("post-trip-form");
const searchInput = document.getElementById("search-input");
const tabs = document.querySelectorAll(".tab");

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  renderPostedTrips("upcoming");
  renderAvailableTrips();
  setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
  // Flip card functionality
  postTripBtn.addEventListener("click", () => {
    tripFlipper.classList.add("flipped");
  });

  backToAvailableBtn.addEventListener("click", () => {
    tripFlipper.classList.remove("flipped");
  });

  // Tab switching
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const tabName = tab.getAttribute("data-tab");
      renderPostedTrips(tabName);
    });
  });

  // Post trip form submission
  postTripForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newTrip = {
      id: "p" + (samplePostedTrips.length + 1),
      destination: document.getElementById("destination").value,
      startDate: document.getElementById("start-date").value,
      endDate: document.getElementById("end-date").value,
      companionsNeeded: parseInt(
        document.getElementById("companions-needed").value
      ),
      description: document.getElementById("description").value,
      status: "upcoming",
      interestedUsers: [],
    };

    samplePostedTrips.unshift(newTrip);
    renderPostedTrips("upcoming");
    postTripForm.reset();
    tripFlipper.classList.remove("flipped");

    // Show a notification (can be enhanced in a real app)
    alert("Trip posted successfully!");
  });

  // Search functionality
  searchInput.addEventListener("input", () => {
    renderAvailableTrips();
  });

  // Sort buttons
  document.querySelectorAll(".sort-options .btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const sortType = btn.getAttribute("data-sort");
      sortAvailableTrips(sortType);
    });
  });
}

// Render Posted Trips
function renderPostedTrips(status) {
  const filteredTrips = samplePostedTrips.filter(
    (trip) => trip.status === status
  );
  postedTripsContainer.innerHTML = "";

  if (filteredTrips.length === 0) {
    postedTripsContainer.innerHTML = `<p>No ${status} trips found.</p>`;
    return;
  }

  filteredTrips.forEach((trip) => {
    const tripCard = document.createElement("div");
    tripCard.className = "trip-card";

    // Format dates
    const startDate = new Date(trip.startDate).toLocaleDateString();
    const endDate = new Date(trip.endDate).toLocaleDateString();

    tripCard.innerHTML = `
                    <div class="trip-destination">${trip.destination}</div>
                    <div class="trip-dates">${startDate} - ${endDate}</div>
                    <div class="trip-companions">Companions needed: ${trip.companionsNeeded}</div>
                    <p>${trip.description}</p>
                    <div class="trip-actions">
                        ${
                          status === "upcoming"
                            ? `<button class="btn btn-small btn-secondary mark-completed" data-trip-id="${trip.id}">Mark as Completed</button>`
                            : ""
                        }
                        <button class="btn btn-small btn-secondary delete-trip" data-trip-id="${trip.id}">Delete</button>
                        ${
                          trip.interestedUsers.length > 0
                            ? `<button class="btn btn-small btn-primary view-interested" data-trip-id="${trip.id}">
                                View Interested (${trip.interestedUsers.length})
                            </button>`
                            : "<span>No interested companions yet</span>"
                        }
                    </div>
                    <div class="interested-users" id="interested-${trip.id}">
                        ${trip.interestedUsers
                          .map(
                            (user) => `
                            <div class="interested-user">
                                <div>
                                    <strong>${user.name}</strong>
                                    <p>${user.comment}</p>
                                </div>
                                <button class="btn btn-small btn-primary contact-user" data-user-id="${user.userId}">
                                    Contact
                                </button>
                            </div>
                        `
                          )
                          .join("")}
                    </div>
                `;

    postedTripsContainer.appendChild(tripCard);
  });

  // Add event listeners to the newly created buttons
  document.querySelectorAll(".mark-completed").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tripId = btn.getAttribute("data-trip-id");
      const trip = samplePostedTrips.find((t) => t.id === tripId);
      if (trip) {
        trip.status = "completed";
        renderPostedTrips("upcoming");
      }
    });
  });

  document.querySelectorAll(".delete-trip").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tripId = btn.getAttribute("data-trip-id");
      const index = samplePostedTrips.findIndex((t) => t.id === tripId);
      if (index !== -1) {
        if (confirm("Are you sure you want to delete this trip?")) {
          samplePostedTrips.splice(index, 1);
          renderPostedTrips(status);
        }
      }
    });
  });

  document.querySelectorAll(".view-interested").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tripId = btn.getAttribute("data-trip-id");
      const interestedUsers = document.getElementById(`interested-${tripId}`);
      if (interestedUsers.style.display === "block") {
        interestedUsers.style.display = "none";
      } else {
        interestedUsers.style.display = "block";
      }
    });
  });

  document.querySelectorAll(".contact-user").forEach((btn) => {
    btn.addEventListener("click", () => {
      const userId = btn.getAttribute("data-user-id");
      alert(
        `Contacting user ${userId}. This would open a messaging interface in a real app.`
      );
    });
  });
}

// Render Available Trips
function renderAvailableTrips() {
  const searchTerm = searchInput.value.toLowerCase();
  let filteredTrips = sampleAvailableTrips;

  if (searchTerm) {
    filteredTrips = sampleAvailableTrips.filter((trip) =>
      trip.destination.toLowerCase().includes(searchTerm)
    );
  }

  availableTripsContainer.innerHTML = "";

  if (filteredTrips.length === 0) {
    availableTripsContainer.innerHTML = `<p>No trips found matching "${searchTerm}".</p>`;
    return;
  }

  filteredTrips.forEach((trip) => {
    const tripCard = document.createElement("div");
    tripCard.className = "trip-card";

    // Format dates
    const startDate = new Date(trip.startDate).toLocaleDateString();
    const endDate = new Date(trip.endDate).toLocaleDateString();
    const postedDate = new Date(trip.postedDate).toLocaleDateString();

    tripCard.innerHTML = `
                    <div class="trip-destination">${trip.destination}</div>
                    <div class="trip-dates">${startDate} - ${endDate}</div>
                    <div class="trip-companions">Companions needed: ${trip.companionsNeeded}</div>
                    <p>${trip.description}</p>
                    <div style="margin-top: 0.5rem; font-size: 0.8rem;">
                        Posted by ${trip.postedBy} on ${postedDate}
                    </div>
                    <div class="trip-actions" style="margin-top: 1rem;">
                        <button class="btn btn-primary interested-btn" data-trip-id="${trip.id}">
                            I am Interested
                        </button>
                        <button class="btn btn-secondary add-to-planner-btn" data-trip-id="${trip.id}">
                            Add to Planner
                        </button>
                    </div>
                `;

    availableTripsContainer.appendChild(tripCard);
  });

  // Add event listeners to the newly created buttons
  document.querySelectorAll(".interested-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tripId = btn.getAttribute("data-trip-id");
      alert(
        `You've expressed interest in this trip! In a real app, you would be prompted to add a comment.`
      );
      btn.textContent = "Interested ✓";
      btn.disabled = true;
    });
  });

  document.querySelectorAll(".add-to-planner-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tripId = btn.getAttribute("data-trip-id");
      alert(`Trip added to your planner! You can view it later.`);
      btn.textContent = "Added to Planner ✓";
      btn.disabled = true;
    });
  });
}

// Sort Available Trips
function sortAvailableTrips(sortType) {
  let sortedTrips = [...sampleAvailableTrips];

  switch (sortType) {
    case "date-new":
      sortedTrips.sort(
        (a, b) => new Date(b.postedDate) - new Date(a.postedDate)
      );
      break;
    case "date-old":
      sortedTrips.sort(
        (a, b) => new Date(a.postedDate) - new Date(b.postedDate)
      );
      break;
    case "this-month":
      const today = new Date();
      const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
      sortedTrips = sortedTrips.filter((trip) => {
        const tripStart = new Date(trip.startDate);
        return tripStart >= today && tripStart < nextMonth;
      });
      break;
  }

  sampleAvailableTrips.length = 0;
  sampleAvailableTrips.push(...sortedTrips);
  renderAvailableTrips();
}
