// Function to add a marker
async function addMarker() {
    const address = document.getElementById('address').value;
    const description = document.getElementById('description').value;

    if (address && description) {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': address }, async (results, status) => {
            if (status === 'OK') {
                const latitude = results[0].geometry.location.lat();
                const longitude = results[0].geometry.location.lng();

                try {
                    const response = await fetch('/api/markers', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ address, description, latitude, longitude })
                    });

                    if (response.ok) {
                        document.getElementById('address').value = '';
                        document.getElementById('description').value = '';
                        fetchMarkers(); // Refresh markers on the map
                    } else {
                        alert('Failed to add marker.');
                    }
                } catch (error) {
                    console.error('Error adding marker:', error);
                    alert('An error occurred while adding the marker.');
                }
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    } else {
        alert('Please enter a valid address and description.');
    }
}

// Function to fetch and display markers
async function fetchMarkers() {
    try {
        const response = await fetch('/api/markers');
        const markers = await response.json();
        markers.forEach(marker => {
            const position = { lat: marker.latitude, lng: marker.longitude };
            const mapMarker = new google.maps.Marker({
                position: position,
                map: map,
                title: marker.description
            });

            const infowindow = new google.maps.InfoWindow({
                content: marker.description
            });

            mapMarker.addListener('click', function() {
                infowindow.open(map, mapMarker);
            });
        });
    } catch (error) {
        console.error('Error fetching markers:', error);
        alert('An error occurred while fetching markers.');
    }
}

document.addEventListener('DOMContentLoaded', fetchMarkers);