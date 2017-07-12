# General Information
This project purpose is to fetch images from:
1. Pixabay API
2. Flicker API
3. To perform history actions on user history searches.

This  project uses React and Redux.

## Running the project

The user should cd to the root directory of the project and then run:
```
npm install
```
and then run the command
```
npm run
```

This will open a browser on http://localhost:3000

## Project features:

1. Ability to click and search for images and fetch merged results from the 2 API for this howeowrk.
   This project uses  universal [isomorpfic fetch](http://andrewhfarmer.com/ajax-libraries/)
2. The ability to click on an image abd to open it in a modal with the full details of the image.
3. History table that shows all the last searches the user performed with the following data info: search term, service, time of search and number of results.
4. Clicking on a history table line reruns that search.
5. Clicking on clear button will clear history table results
6. eslint integration with airbnb-configuration of rules (not all rules)
7. Some components with inline styling with [reactcss](http://reactcss.com/)
8. The page support chrome/firefox/safari/ie9+

### Creator
Tal Avissar   talaviss@gmail.com

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
