
# Bus: Live Data via API

This project illustrates connecting to live API data from the public transportation system of Boston, which then shows that live bus data using the Google Maps API, for Route 1, between MIT and Harvard. Additionally, it allows for an animated marker showing the bus stops between MIT and Harvard.

## How to Install and Run the Project
To install and run the project you need the following files in the same directory:

    images/blue.png
    
    images/marker.png
    
    images/red.png
    
    index.html
    
    mapanimation.js
    
    styles.css

You can see where the blue and red markers appear every 15 seconds, based on the live API feed.

## How to Use the Project
You can change the look of the markers by swapping out different png files.

There is an added part of styling logic, which changes the map to dark-mode display if it is past 8pm. To change the range that determines day vs night, you can change that on line 26 in mapanimation.js. 

You can alter the look of the dark mode per feature type in the code that follows.

You will also need to replace the map key with your own, as overuse of this key will result in the key getting deactivated, on line 10 of index.html.

For animating the route between MIT and Harvard, that marker is initialized on line 133 of mapanimation.js.
The code that executes once the button is pressed starts at line 219 of mapanimation.js.

## Credits
This project is part of the MIT xPRO: Professional Certificate in Coding: Full Stack Development with MERN; It combines two exercises a "map animation" exercise and a "real time bus tracker" exercise into a single project.
Please note I originally only uploaded the "real time bus tracker" and then upon re-reading the instructions which required the files fo the other "map animation" exercise I combined the functionality of both. 