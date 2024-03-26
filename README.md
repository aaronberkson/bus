
# Bus: Live Data via API

This project illustrates connecting to live API data from the public transportation system of Boston, which then shows that live bus data using the Google Maps API, for Route 1, between Harvard and MIT.


## How to Install and Run the Project
To install and run the project you need the following files in the same directory:

    blue.png

    index.html

    marker.png

    red.png

You can see where the blue and red markers appear every 15 seconds, based on the live API feed.


## How to Use the Project
You can change the look of the markers by swapping out different png files.

There is an added part of styling logic, which changes the map to dark-mode display if it is past 8pm. To change the range that determines day vs night, you can change that on line 16 in the script tag in index.html. 

You can alter the look of the dark mode per feature type in the code that follows.

You will also need to replace the map key with your own, as overuse of this key will result in the key getting deactivated, on line 16.



## Credits
This project is part of the MIT xPRO: Professional Certificate in Coding: Full Stack Development with MERN. 