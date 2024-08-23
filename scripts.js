let map;
let geocoder;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
    });

    geocoder = new google.maps.Geocoder();

    // Example of adding a marker
    const marker = new google.maps.Marker({
        position: { lat: -34.397, lng: 150.644 },
        map: map,
        title: 'Crime Location'
    });
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