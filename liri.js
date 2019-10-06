/* ```js
require("dotenv").config();
```

​
  ```js
  var spotify = new Spotify(keys.spotify);
  ```

* `concert-this`
​
* `spotify-this-song`
​
* `movie-this`
​
* `do-what-it-says` */
  

// Initialize program
// require("dotenv").config();
// const keys = require("./keys.js");
const fs = require('fs');
const axios = require('axios');
const moment = require('moment');

  // Configure the environment variable
  
  // Load and initialize keys for

    // Spotify

  
// Capture user input
const inputCommand = process.argv[2];
const inputQuery = process.argv.slice(3).join(' ')

// Parse user input
commandHandler(inputCommand, inputQuery);


function commandHandler(command, searchTerms){
  // If spotify command
  if (command === 'song'){
    songSearch(searchTerms);
  }

  // If bands command
  else if (command === 'concert'){
    concertSearch(searchTerms);
  }
  
  // If movie command
  else if (command === 'movie'){
    movieSearch(searchTerms);
  }

  // If random command
  else if (command === 'do-what-it-says'){

    // Read in a command and search terms from random.txt
    fs.readFile('random.txt', 'utf8', function(contents){

      const randomCommand = '';
      const randomSearchTerms = '';
      [randomCommand, randomSearchTerms] = contents.split(',');
      
      // Pass the new command and search terms to the handler
      commandHandler(randomCommand, randomSearchTerms);
    })
  }
}

function songSearch(song){

      /* This will show the following information about the song in your terminal/bash window
​
      * Artist(s)
    ​
      * The song's name
    ​
      * A preview link of the song from Spotify
    ​
      * The album that the song is from
​
    * If no song is provided then your program will default to "The Sign" by Ace of Base. */

}

function concertSearch(artist){
    
  // Assemble queryURL
  const queryURL = ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp");

  // Call Bands in Town API
  axios.get(queryURL)

  // Parse response object into desired output fields
  .then(function(response){
    
    // Retrieve data from each concert returned
    const output = response.data.map(function (concert){


      let name = 'Venue Name: ' + concert.venue.name + '\n';
      
      // If there is no region given, no comma is added following it
      let location = 'Venue Location: ' + concert.venue.city + ', ' + concert.venue.region + 
        ((concert.venue.region !== '') ? ', ' : '') + concert.venue.country + '\n';

      let date = 'Show Date: ' + moment(concert.datetime).format('L') + '\n';

      // New output array will contain strings for each concert
      return name + location + date + '----------------------------';
    })

    // Print out formatted result to console
    console.log(output.join('\n'));
  })
  .catch(err => console.log('Error: ', err));

}

function movieSearch(movie){

    /* This will output the following information to your terminal/bash window:
​
     ```
       * Title of the movie.
       * Year the movie came out.]
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```
    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.' */

}