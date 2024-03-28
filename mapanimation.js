
var map;
var markers = [];
var route_marker;

// This array contains the coordinates for all bus stops between MIT and Harvard
const busStops = [
    [-71.093729, 42.359244],
    [-71.094915, 42.360175],
    [-71.0958, 42.360698],
    [-71.099558, 42.362953],
    [-71.103476, 42.365248],
    [-71.106067, 42.366806],
    [-71.108717, 42.368355],
    [-71.110799, 42.369192],
    [-71.113095, 42.370218],
    [-71.115476, 42.372085],
    [-71.117585, 42.373016],
    [-71.118625, 42.374863],
  ];

// load map
function init(){
	//set style of map depending on whether it is day or night
	const hours = new Date().getHours()
	const isDayTime = hours > 6 && hours < 20;
	
	if(isDayTime){
  		// use default style if it is daytime
		var myOptions = {
			zoom      : 14,
			// center    : { lat:42.353350,lng:-71.091525},
            // Adjusted latitude to show both Harvard and MIT on map
			center    : { lat:42.364000,lng:-71.091525},
            mapTypeId : google.maps.MapTypeId.ROADMAP,		
		};
	} else {
		// use custom dark style if it is nighttime
		var myOptions = {
			zoom      : 14,
			// center    : { lat:42.353350,lng:-71.091525},
            // Adjusted latitude to show both Harvard and MIT on map
			center    : { lat:42.364000,lng:-71.091525},
			mapTypeId : google.maps.MapTypeId.ROADMAP,
			styles: [
			{ elementType: "geometry", stylers: [{ color: "#242f3e" }] },
			{ elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
			{ elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
			{
				featureType: "administrative.locality",
				elementType: "labels.text.fill",
				stylers: [{ color: "#d59563" }],
			},
			{
				featureType: "poi",
				elementType: "labels.text.fill",
				stylers: [{ color: "#d59563" }],
			},
			{
				featureType: "poi.park",
				elementType: "geometry",
				stylers: [{ color: "#263c3f" }],
			},
			{
				featureType: "poi.park",
				elementType: "labels.text.fill",
				stylers: [{ color: "#6b9a76" }],
			},
			{
				featureType: "road",
				elementType: "geometry",
				stylers: [{ color: "#38414e" }],
			},
			{
				featureType: "road",
				elementType: "geometry.stroke",
				stylers: [{ color: "#212a37" }],
			},
			{
				featureType: "road",
				elementType: "labels.text.fill",
				stylers: [{ color: "#9ca5b3" }],
			},
			{
				featureType: "road.highway",
				elementType: "geometry",
				stylers: [{ color: "#746855" }],
			},
			{
				featureType: "road.highway",
				elementType: "geometry.stroke",
				stylers: [{ color: "#1f2835" }],
			},
			{
				featureType: "road.highway",
				elementType: "labels.text.fill",
				stylers: [{ color: "#f3d19c" }],
			},
			{
				featureType: "transit",
				elementType: "geometry",
				stylers: [{ color: "#2f3948" }],
			},
			{
				featureType: "transit.station",
				elementType: "labels.text.fill",
				stylers: [{ color: "#d59563" }],
			},
			{
				featureType: "water",
				elementType: "geometry",
				stylers: [{ color: "#17263c" }],
			},
			{
				featureType: "water",
				elementType: "labels.text.fill",
				stylers: [{ color: "#515c6d" }],
			},
			{
				featureType: "water",
				elementType: "labels.text.stroke",
				stylers: [{ color: "#17263c" }],
			},
			],		
		};
	}

	var element = document.getElementById('map');
  	map = new google.maps.Map(element, myOptions);
  	addMarkers();

    // Initialize route marker
    route_marker = new google.maps.Marker({
    position: {
        lat: 42.359244,
        lng: -71.093729
    },
    map: map,
    icon: './images/marker.png',
    });
}

// Add bus markers to map
async function addMarkers(){
	// get bus data
	var locations = await getBusLocations();

	// loop through data, add bus markers
	locations.forEach(function(bus){
		var marker = getMarker(bus.id);		
		if (marker){
			moveMarker(marker,bus);
		}
		else{
			addMarker(bus);			
		}
	});

	// timer
	setTimeout(addMarkers,15000);
}

// Request bus data from MBTA
async function getBusLocations(){
	var url = 'https://api-v3.mbta.com/vehicles?api_key=ca34f7b7ac8a445287cab52fb451030a&filter[route]=1&include=trip';	
	var response = await fetch(url);
	var json     = await response.json();
	return json.data;
}

function addMarker(bus){
	var icon = getIcon(bus);
	var marker = new google.maps.Marker({
	    position: {
	    	lat: bus.attributes.latitude, 
	    	lng: bus.attributes.longitude
	    },
	    map: map,
	    icon: icon,
	    id: bus.id
	});
	markers.push(marker);
}

function getIcon(bus){
	// select icon based on bus direction
	if (bus.attributes.direction_id === 0) {
		return './images/red.png';
	}
	return './images/blue.png';	
}

function moveMarker(marker,bus) {
	// change icon if bus has changed direction
	var icon = getIcon(bus);
	marker.setIcon(icon);

	// move icon to new lat/lon
    marker.setPosition( {
    	lat: bus.attributes.latitude, 
    	lng: bus.attributes.longitude
	});
    console.log ('moveMarker: lat = ' + bus.attributes.latitude + ' lng = ' + bus.attributes.longitude + 
    'bus id is ' + bus.id);
}

function getMarker(id){
	var marker = markers.find(function(item){
		return item.id === id;
	});
	return marker;
}

window.onload = init;

// Code for: Show stops between MIT & Harvard

// counter here represents the index of the current bus stop
let counter = 0;

function move(){
    console.log('calling move');
    setTimeout(()=>{
        if (counter >= busStops.length) return;
    	// move icon to new lat/lon
        route_marker.setPosition( {
            lat: busStops[counter][1], 
            lng: busStops[counter][0]
        });
        counter++;
        move();
      },1000);
}

function moveAndReset(){
    move();
    counter = 0;
}
