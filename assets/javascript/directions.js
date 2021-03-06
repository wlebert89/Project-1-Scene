$(document).ready(function () {

    var userOrigin;
    var busAddress;

    // code to get the userLocation
    $(document).on("click", ".fa-location-arrow", locationConsent)
    function locationConsent() {
        var thisKey = $(this).attr("data-item");
        navigator.geolocation.getCurrentPosition(success);

        function success(pos) {
            var crd = pos.coords;
            var lat = crd.latitude;
            var lon = crd.longitude;
            acc = crd.accuracy;

            userOrigin = (lat + "," + lon);
            clickedForDirections(thisKey);
        }
    }

    function clickedForDirections(key) {
        //display hiden directions div
        $("#directions-container" + key).removeClass("hide")

        // gets the adress of the business directly from the display card
        var BusStreetAddress = $("#address-display" + key).text().trim();

        $("#directions-container" + key).removeClass("hide");

        // add the city and state to the BusStreeAddress
        busAddress = BusStreetAddress.replace(/\s#/g, '%23') + "+Austin" + "+TX"
        // generating the queryURL for the AJAX call
        var directionsQueryURL = "https://cors-ut-bootcamp.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=" + userOrigin + "&destination=" + busAddress + "&mode=walking&key=AIzaSyAWVvEMYJEt9Bq0oqqA1FE156FHs86msTg"

        // ajax call
        $.ajax({
            url: directionsQueryURL,
            method: "GET"
        }).then(function (response) {
            // creating the directions div to hold each leg of the journey
            var walkingJourney = $("<div id='journey-legs'>");

            var routeArray = response.routes[0].legs[0].steps

            // this for loop, cycles through the array and pulls out the HTML walking directions 
            for (var i = 0; i < routeArray.length; i++) {

                // puts each of the legs into a <p> tag so that they can be display one-by-one rather than as an entire string
                var directionsToBusiness = $("<p>" + routeArray[i].html_instructions + "</p>");

                // appends each leg with a <p> to the walkingJourney div created up top
                walkingJourney.append(directionsToBusiness);

                // calls the HTML id to display the directions on the DOM                
                $("#directions" + key).html(walkingJourney);
            }

            var linkToGoogleMaps = "https://www.google.com/maps/dir/?api=1&origin=" + userOrigin + "&destination=" + busAddress + "&mode=walking"

            var displayHyperlink = `<p><a href="${linkToGoogleMaps}" target='_blank'>Open in Google Maps</a></p>`

            walkingJourney.append(displayHyperlink);

        });
    };

});





