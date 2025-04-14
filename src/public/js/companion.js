

const userId = document.getElementById("userID").textContent; // Sample user ID for demonstration

// Sample data for demonstration

const PostedTrips = [
  {
    id: "p1",
    destination: "Varanasi, UP",
    startDate: "2025-03-15",
    endDate: "2025-03-23",
    companionsNeeded: 2,
    description:
      "I need tour companions in between the age group of 22-27, both men and women can join. Note that we will cover most distance on foot, so companion must be comfortable with long distance walkings.",
    status: "upcoming",
    interestedUsers: [
      {
        userId: "u1",
        name: "Kunal Singh",
        contact: "9876543210",
        comment: "I love long trips.",
      },
      {
        userId: "u2",
        name: "Priya Sharma",
        contact: "9876543210",
        comment: "This sounds interesting!",
      },
    ],
  },
  {
    id: "p2",
    destination: "Mumbai, Maharashtra",
    startDate: "2025-03-10",
    endDate: "2025-03-17",
    companionsNeeded: 3,
    description: "City exploration and food tour.",
    status: "upcoming",
    interestedUsers: [
      {
        userId: "u3",
        name: "Rahul Patel",
        contact: "9876543210",
        comment: "I know the best food spots!",
      },
    ],
  },
  {
    id: "p3",
    destination: "Goa",
    startDate: "2025-03-05",
    endDate: "2025-03-12",
    companionsNeeded: 4,
    description: "Beach vacation and water sports.",
    status: "completed",
    interestedUsers: [],
  },
];


fetch(`/trippost/user/${userId}`, { method: "GET" })
  .then((response) => response.json())
  .then((data) => {
    console.log(data.data);
    const formattedPosts = data.data.map((post) => ({
      id: post._id,
      destination: post.destination,
      startDate: post.startDate,
      endDate: post.endDate,
      companionsNeeded: post.companionsNeeded,
      description: post.description,
      status: post.status,
      interestedUsers: post.interestedUsers.map((user) => ({
        userId: user._id,
        name: user.name,
        contact: user.contact,
        comment: user.comment,
      })),
    }));
    PostedTrips.push(...formattedPosts);
    renderPostedTrips("upcoming");
  })


const AvailableTrips = [
  {
    id: "a1",
    destination: "Shimla, Himachal Pradesh",
    startDate: "2025-03-20",
    endDate: "2025-03-27",
    companionsNeeded: 3,
    description: "Mountain hiking and snow activities.",
    postedBy: "Amit Gupta",
    postedDate: "2025-03-01",
    userInterested: false,
  },
  {
    id: "a2",
    destination: "Jaipur, Rajasthan",
    startDate: "2025-04-05",
    endDate: "2025-04-12",
    companionsNeeded: 2,
    description: "Cultural exploration and historical sites.",
    postedBy: "Neha Khanna",
    postedDate: "2025-03-01",
    userInterested: true,
  },
  {
    id: "a3",
    destination: "Kochi, Kerala",
    startDate: "2025-03-01",
    endDate: "2025-03-08",
    companionsNeeded: 4,
    description: "Backwater tour and beach relaxation.",
    postedBy: "Vikram Reddy",
    postedDate: "2025-03-01",
    userInterested: false,
  },
];

fetch("/trippost/available", { method: "GET" })
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch available trips");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data.data); // Log the fetched data for debugging
    const formattedPosts = data.data.map((post) => ({
      id: post.id,
      destination: post.destination,
      startDate: post.startDate,
      endDate: post.endDate,
      companionsNeeded: post.companionsNeeded,
      description: post.description,
      postedBy: post.postedBy,
      postedDate: post.postedDate,
      userInterested: post.userInterested, // Already calculated by the back-end
    }));
    AvailableTrips.push(...formattedPosts);
    renderAvailableTrips();
  })
  .catch((error) => {
    console.error("Error fetching available trips:", error);
    alert("Failed to load available trips. Please try again.");
  });

// Helper functions
function formatDate(dateString) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

// DOM Elements
const sidebarFlipper = document.getElementById("sidebar-flipper");
const postTripBtn = document.getElementById("post-trip-btn");
const joinTripBtn = document.getElementById("join-trip-btn");
const findTripsBtn = document.getElementById("find-trips-btn");
const postTripForm = document.getElementById("post-trip-form");
const searchInput = document.getElementById("search-input");
const tabs = document.querySelectorAll(".tab");
const availableTrips = document.getElementById("available-trips");
const postedTrips = document.getElementById("posted-trips");
const availableTripsContainer = document.getElementById("available-trips-container");
const postedTripsContainer = document.getElementById("posted-trips-container");

// Function to render available trips
function renderAvailableTrips(filteredTrips = AvailableTrips) {
  availableTripsContainer.innerHTML = "";

  if (filteredTrips.length === 0) {
    availableTripsContainer.innerHTML = `<h3 style="margin-top: 50px; text-align: center; font-weight: 600;">No trips found matching your criteria.</h3>`;
    return;
  }

  filteredTrips.forEach((trip) => {
    const tripCard = document.createElement("div");
    tripCard.className = "trip-card";

    // Format dates
    const startDate = formatDate(trip.startDate);
    const endDate = formatDate(trip.endDate);
    const postedDate = formatDate(trip.postedDate);

    tripCard.innerHTML = `
      <div class="trip-actions" style="margin-top: 1rem; float: right; top: 20px; margin-right: 20px;">
        <button class="btn ${trip.userInterested ? "btn-secondary" : "btn-primary"} interested-btn" data-trip-id="${trip.id}">
          ${trip.userInterested ? "Interest Shown ✓" : "I am Interested"}
        </button>
      </div>
      <div class="trip-destination">${trip.destination}</div>
      <div class="trip-dates">From ${startDate} to ${endDate}</div>
      <div class="trip-companions">Companions needed: ${trip.companionsNeeded}</div>
      <p>${trip.description}</p>
      <div style="margin-top: 0.5rem; font-size: 0.8rem;">
        Posted by ${trip.postedBy} on ${postedDate}
      </div>

      <!-- Modal for showing interest -->
      <div id="modal-${trip.id}" class="modal" style="display: none; position: fixed; z-index: 1; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.4);">
        <div style="background-color: #fefefe; margin: 15% auto; padding: 20px; border: 1px solid #888; width: 300px;">
          <h3>Express Interest</h3>
          <textarea id="comment-${trip.id}" placeholder="Write a comment (optional)" style="width: 100%; height: 100px; margin-bottom: 10px;"></textarea>
          <button id="confirm-interest-${trip.id}" class="btn btn-primary" style="margin-right: 10px;">Confirm</button>
          <button id="cancel-interest-${trip.id}" class="btn btn-secondary">Cancel</button>
        </div>
      </div>
    `;

    availableTripsContainer.appendChild(tripCard);

    // Add event listeners to the modal buttons
    addTripCardEventListeners(trip);
  });
}
function addTripCardEventListeners(trip) {
  const modal = document.getElementById(`modal-${trip.id}`);
  const confirmButton = document.getElementById(`confirm-interest-${trip.id}`);
  const cancelButton = document.getElementById(`cancel-interest-${trip.id}`);
  const commentInput = document.getElementById(`comment-${trip.id}`);
  const interestButton = document.querySelector(`[data-trip-id="${trip.id}"]`);

  // Open modal when the "I am Interested" button is clicked
  interestButton.addEventListener("click", () => {
    if (!trip.userInterested) {
      modal.style.display = "block";
    }
  });

  // Close modal when the "Cancel" button is clicked
  cancelButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Confirm interest and make API call
  confirmButton.addEventListener("click", async () => {
    const comment = commentInput.value.trim(); // Optional comment

    try {
      // Call the API to mark interest
      console.log(trip.id);
      console.log(userId);
      
      await fetch(`/trippost/join/${trip.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment }),
      });

      // Update the UI
      trip.userInterested = true;
      interestButton.textContent = "Interest Shown ✓";
      interestButton.classList.remove("btn-primary");
      interestButton.classList.add("btn-secondary");

      modal.style.display = "none"; // Close the modal
      alert("You've successfully expressed interest in this trip!");
    } catch (error) {
      console.error("Error marking interest:", error);
      alert("Failed to express interest. Please try again.");
    }
  });
}
// Function to render posted trips
function renderPostedTrips(status) {
  const filteredTrips = PostedTrips.filter(
    (trip) => trip.status === status
  );
  postedTripsContainer.innerHTML = "";

  if (filteredTrips.length === 0) {
    postedTripsContainer.innerHTML = `<p>No ${status} trip found.</p>`;
    return;
  }

  filteredTrips.forEach((trip) => {
    const tripCard = document.createElement("div");
    tripCard.className = "trip-card";

    // Format dates
    const startDate = formatDate(trip.startDate);
    const endDate = formatDate(trip.endDate);
    console.log(trip.interestedUsers);
    

    tripCard.innerHTML = `
                    <div class="trip-destination">${trip.destination}</div>
                    <div class="trip-dates">From ${startDate} to ${endDate}</div>
                    ${
                      status !== "completed"
                        ? `<div class="trip-companions">Companions needed: ${trip.companionsNeeded}</div>`
                        : ``
                    }
                    <p>${trip.description}</p>
                    <div class="trip-actions" style="margin-top: 1rem;">
                        ${
                          status === "upcoming"
                            ? `<button class="btn btn-primary view-interest" data-trip-id="${trip.id}">
                                View Interested (${trip.interestedUsers.length})
                            </button>
                            <button class="btn btn-secondary mark-completed" data-trip-id="${trip.id}">
                                Mark as Completed
                            </button>
                            <button class="btn btn-secondary delete-trip" data-trip-id="${trip.id}">
                                Delete Trip
                            </button>`
                            : ``
                        }
                    </div>
                    <div class="interested-users" id="interested-${trip.id}">
                        <h4>Interested Users</h4>
                        ${                        
                          trip.interestedUsers.length > 0
                            ? trip.interestedUsers
                                .map(
                                  (user) => `
                                <div class="interested-user">
                                    <div>
                                        <strong>${user.name}</strong>
                                        <p>${user.comment}</p>
                                    </div>
                                    <div>
                                    <button style="margin-right: 10px;" class="btn btn-small btn-primary contact-user" data-user-contact="${user.contact}" data-user-id="${user.userId}" data-trip-id="${trip.id}">
                                        Contact
                                    </button>
                                    </div>
                                </div>
                            `
                                )
                                .join("")
                            : "<p>No interested user yet.</p>"
                        }
                    </div>
                `;

    postedTripsContainer.appendChild(tripCard);
  });

  addPostedTripEventListeners();
}

// Function to add event listeners to posted trip cards
function addPostedTripEventListeners() {
  document.querySelectorAll(".mark-completed").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tripId = btn.getAttribute("data-trip-id");
      const trip = PostedTrips.find((t) => t.id === tripId);

      if (trip) {
        trip.status = "completed";
        btn.parentElement.parentElement.outerHTML = "";
        alert("Trip marked as completed!");
      }
    });
  });

  document.querySelectorAll(".delete-trip").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tripId = btn.getAttribute("data-trip-id");
      const tripIndex = PostedTrips.findIndex((t) => t.id === tripId);

      if (tripIndex !== -1) {
        if (confirm("Are you sure you want to delete this trip?")) {
          PostedTrips.splice(tripIndex, 1);
          btn.parentElement.parentElement.outerHTML = "";
        }
      }
    });
  });

  document.querySelectorAll(".view-interest").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tripId = btn.getAttribute("data-trip-id");
      const interestedDiv = document.getElementById(`interested-${tripId}`);

      if (interestedDiv.style.display === "block") {
        interestedDiv.style.display = "none";
        btn.textContent = `View Interested (${PostedTrips.find((t) => t.id === tripId).interestedUsers.length})`;
      } else {
        interestedDiv.style.display = "block";
        btn.textContent = "Hide Interested";
      }
    });
  });


  document.querySelectorAll(".contact-user").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tripId = btn.getAttribute("data-trip-id");
      const userId = btn.getAttribute("data-user-id");
      const phone = btn.getAttribute("data-user-contact");
      const trip = PostedTrips.find((t) => t.id === tripId);
      const user = trip?.interestedUsers.find((u) => u.userId === userId);

      if (trip && user) {
        window.open(`tel:+91${phone}`);
      }
    });
  });
}

// Function to filter trips based on search, sort, date and filter criteria
function filterTrips() {
  const searchTerm = searchInput.value.toLowerCase();

  // Get active filters
  const activeSortBtn = document.querySelector("[data-sort].btn-primary");
  const activeDateBtn = document.querySelector("[data-date].btn-primary");
  const activeFilterBtn = document.querySelector("[data-filter].btn-primary");

  const sortType = activeSortBtn
    ? activeSortBtn.getAttribute("data-sort")
    : null;
  const dateType = activeDateBtn
    ? activeDateBtn.getAttribute("data-date")
    : null;
  const filterType = activeFilterBtn
    ? activeFilterBtn.getAttribute("data-filter")
    : "all";

  let filteredTrips = [...AvailableTrips];

  // Apply search filter
  if (searchTerm) {
    filteredTrips = filteredTrips.filter((trip) =>
      trip.destination.toLowerCase().includes(searchTerm)
    );
  }

  // Apply sort filters
  if (sortType === "date-old") {
    filteredTrips.sort(
      (a, b) => new Date(a.postedDate) - new Date(b.postedDate)
    );
  } else if (sortType === "date-new") {
    filteredTrips.sort(
      (a, b) => new Date(b.postedDate) - new Date(a.postedDate)
    );
  }

  // Apply date filters
  const today = new Date();
  if (dateType === "within-week") {
    filteredTrips = filteredTrips.filter((trip) => {
      const tripDate = new Date(trip.startDate);
      const diffTime = tripDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays >= 0 && diffDays <= 7;
    });
  } else if (dateType === "after-15-days") {
    filteredTrips = filteredTrips.filter((trip) => {
      const tripDate = new Date(trip.startDate);
      const diffTime = tripDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 15;
    });
  } else if (dateType === "after-month") {
    filteredTrips = filteredTrips.filter((trip) => {
      const tripDate = new Date(trip.startDate);
      const diffTime = tripDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 30;
    });
  }

  // Apply interest filter
  if (filterType === "interested") {
    filteredTrips = filteredTrips.filter((trip) => trip.userInterested);
  }

  return filteredTrips;
}

// Event listeners
postTripBtn.addEventListener("click", () => {
  sidebarFlipper.classList.add("flipped");
  availableTrips.classList.add("faded");
  setTimeout(() => {
    availableTrips.style.display = "none";
    postedTrips.style.display = "block";
    setTimeout(() => postedTrips.classList.remove("faded"), 50);
  }, 200);
});

joinTripBtn.addEventListener("click", () => {
  sidebarFlipper.classList.remove("flipped");
  postedTrips.classList.add("faded");
  setTimeout(() => {
    postedTrips.style.display = "none";
    availableTrips.style.display = "block";
    setTimeout(() => availableTrips.classList.remove("faded"), 50);
  }, 200);
});

postTripForm.addEventListener("submit", (e) => {
  e.preventDefault();

  

  const destination = document.getElementById("destination").value;
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;
  const companionsNeeded = document.getElementById("companions-needed").value;
  const description = document.getElementById("description").value;

  if (endDate < startDate) {
    alert("End date can't come past starting date.");
    return;
  }

  const newTrip = {
    destination,
    startDate,
    endDate,
    companionsNeeded: parseInt(companionsNeeded),
    description,
  };

  console.log(newTrip);
  fetch("/trippost/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTrip),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    })

  PostedTrips.push(newTrip);

  // Show posted trips
  availableTrips.style.display = "none";
  postedTrips.style.display = "block";
  tabs[0].classList.add("active");
  tabs[1].classList.remove("active");
  renderPostedTrips("upcoming");

  // Reset form and flip back
  postTripForm.reset();
  alert(`Your trip to ${destination} has been posted!`);
});

// Filter and sort button events
searchInput.addEventListener("input", () => {
  const filteredTrips = filterTrips();
  renderAvailableTrips(filteredTrips);
});
document.querySelectorAll("[data-sort]").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("btn-primary")) {
      btn.classList.remove("btn-primary");
    } else {
      document
        .querySelectorAll("[data-sort]")
        .forEach((b) => b.classList.remove("btn-primary"));
      btn.classList.add("btn-primary");
    }
    const filteredTrips = filterTrips();
    renderAvailableTrips(filteredTrips);
  });
});
document.querySelectorAll("[data-date]").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("btn-primary")) {
      btn.classList.remove("btn-primary");
    } else {
      document
        .querySelectorAll("[data-date]")
        .forEach((b) => b.classList.remove("btn-primary"));
      btn.classList.add("btn-primary");
    }
    const filteredTrips = filterTrips();
    renderAvailableTrips(filteredTrips);
  });
});
document.querySelectorAll("[data-filter]").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("btn-primary")) {
      btn.classList.remove("btn-primary");
    } else {
      document
        .querySelectorAll("[data-filter]")
        .forEach((b) => b.classList.remove("btn-primary"));
      btn.classList.add("btn-primary");
    }
    const filteredTrips = filterTrips();
    renderAvailableTrips(filteredTrips);
  });
});

// Tab switching for posted trips
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const tabName = tab.getAttribute("data-tab");
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    renderPostedTrips(tabName);
  });
});

// Initial rendering
renderAvailableTrips();
renderPostedTrips("upcoming");
