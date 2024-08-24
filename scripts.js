let map;
let geocoder;

function initMap() {
    // Initialize the map
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng:-58.6 },
        zoom: 8
    });

    // Initialize the geocoder
    geocoder = new google.maps.Geocoder();
}

function addMarker() {
    const address = document.getElementById('address').value;
    const description = document.getElementById('description').value;

    if (address && description) {
        geocoder.geocode({ 'address': address }, function(results, status) {
            if (status === 'OK') {
                const position = results[0].geometry.location;
                const marker = new google.maps.Marker({
                    position: position,
                    map: map,
                    title: description
                });

                const infowindow = new google.maps.InfoWindow({
                    content: description
                });

                marker.addListener('click', function() {
                    infowindow.open(map, marker);
                });

                // Clear the form
                document.getElementById('address').value = '';
                document.getElementById('description').value = '';
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    } else {
        alert('Please enter a valid address and description.');
    }
}

document.addEventListener('DOMContentLoaded', initMap);
