

document.addEventListener('DOMContentLoaded', function() {
    const itineraryForm = document.getElementById('itinerary-form');
    const itineraryDetails = document.getElementById('itinerary-details');
    const interestSelect = document.getElementById('interestSelect');
    const interestContainer = document.getElementById('interestContainer');
    const generateItineraryBtn = document.getElementById('generateItineraryBtn');
    const itineraryOutput = document.getElementById('itinerary-output');

    // Handle interest selection
    interestSelect.addEventListener('change', function() {
        const selectedInterest = interestSelect.value;
        if (selectedInterest) {
            addInterestChip(selectedInterest);
        }
    });

    function addInterestChip(interest) {
        const chip = document.createElement('div');
        chip.className = 'interest-chip';
        chip.dataset.value = interest;
        chip.innerHTML = `${interest} <button class="remove-btn">&times;</button>`;
        interestContainer.appendChild(chip);

        chip.querySelector('.remove-btn').addEventListener('click', function() {
            removeInterestChip(chip);
        });

        // Remove the selected option from the dropdown
        interestSelect.querySelector(`option[value="${interest}"]`).style.display = 'none';
        interestSelect.value = '';
    }



    function removeInterestChip(chip) {
        const interest = chip.dataset.value;
        chip.remove();

        // Re-enable the option in the dropdown
        interestSelect.querySelector(`option[value="${interest}"]`).style.display = 'block';
    }


    // document.querySelectorAll('.remove-btn').forEach(btn => {
    //     btn.addEventListener('click', function() {
    //         this.parentElement.outerHTML = '';
    //     });
    // });
    



    // Handle form submission
    itineraryForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get user input
        const destination = document.getElementById('destination').value;
        const days = document.getElementById('days').value || null;
        const hours = document.getElementById('hours').value || null;
        const selectedInterests = Array.from(interestContainer.children).map(chip => chip.dataset.value);

        document.getElementById('viewDestination').addEventListener('click', () => {window.location.href = `/destination?place=${destination}`});
        
        const data = {
            destination: destination,
            days: days,
            hours: hours,
            interests: selectedInterests
        };
        generateItineraryBtn.disabled = true;
        generateItineraryBtn.innerHTML = 'AI at work...';
        

        // Generate itinerary based on user input
        fetch('/tripplan/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => data.data)
        .then(data => {
            // console.log('Success:', data);
            document.getElementById('sidebar').style.display = 'block';
            itineraryDetails.innerHTML = '';
            itineraryOutput.style.display = 'block';
            // console.log(data);
            
            const generateItineraryHTML = (data) => {
                let html = '';
            
                data.itinerary.forEach(dayPlan => {
                    html += `<div class="day-section">
                                <h3>Day ${dayPlan.day}</h3>`;
            
                    dayPlan.activities.forEach(activity => {
                        html += `<div class="activity">
                                    <span class="activity-time">${activity.time}</span>
                                    <div class="activity-details">
                                    <span class="activity-place">${activity.place}</span>
                                    <span class="activity-description">${activity.description}</span>
                                    </div>
                                    
                                 </div>`;
                    });
                    // <button onclick="parentElement.outerHTML = ''" class="remove-btn">Remove</button>
            
                    html += `</div>`;
                });
            
                return html;
            };
            const itineraryHTML = generateItineraryHTML(data);

            itineraryDetails.innerHTML = `${itineraryHTML}`;

            generateItineraryBtn.innerHTML = 'Generate Itinerary';
            generateItineraryBtn.disabled = false;

            // Reset form
            itineraryForm.reset();  

            
            // Generate the map
            let markers = [];
    data.itinerary.forEach(day => {
        day.activities.forEach(activity => {
            let ponit = {coords: [activity.coordinates.latitude, activity.coordinates.longitude], title: activity.place};
                markers.push(ponit);
                    
                    
            
        });
    });

    // Initialize variables to find the farthest points
    var minLat = Infinity, maxLat = -Infinity, minLng = Infinity, maxLng = -Infinity;

    markers.forEach(function(marker) {
        var lat = marker.coords[0];
        var lng = marker.coords[1];
        
        if (lat < minLat) minLat = lat;
        if (lat > maxLat) maxLat = lat;
        if (lng < minLng) minLng = lng;
        if (lng > maxLng) maxLng = lng;
    });

    // Calculate the center using the midpoint of the farthest points
    var centerLat = (minLat + maxLat) / 2;
    var centerLng = (minLng + maxLng) / 2;
    var center = [centerLat, centerLng];

    // Initialize the map and set its view to the calculated center
    var map = L.map('map').setView(center, 2); // Default zoom level

    // Adjust zoom based on the bounds
    var bounds = [[minLat, minLng], [maxLat, maxLng]];
    map.fitBounds(bounds); // Adjusts the zoom to fit all markers

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add markers to the map
    markers.forEach(function(marker) {
        if (marker.coords && marker.coords.length === 2) {
            L.marker(marker.coords).addTo(map).bindPopup(marker.title);
        } else {
            console.error("Invalid coordinates for marker:", marker);
        }
    });
           

        })
        .catch(error => {
            console.log('Error:', error);
            generateItineraryBtn.innerHTML = 'Generate Itinerary';
            alert('An error occurred while generating the itinerary. Please try again later.');
        });
        
    });


});