// Initialize program
const fs = require('fs');
const axios = require('axios');
const moment = require('moment');

// Initialize Spotify API and relevant keys
require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);

// Capture user input
const inputCommand = process.argv[2];
const inputQuery = process.argv.slice(3).join(' ')

// Parse user input
commandHandler(inputCommand, inputQuery);


function commandHandler(command, searchTerms){
  // If spotify command
  if (command === 'spotify-this-song'){
    songSearch(searchTerms);
  }

  // If bands command
  else if (command === 'concert-this'){
    concertSearch(searchTerms);
  }
  
  // If movie command
  else if (command === 'movie-this'){
    movieSearch(searchTerms);
  }

  // If random command
  else if (command === 'do-what-it-says'){

    // Read in a command and search terms from random.txt
    fs.readFile('random.txt', {encoding: 'utf-8'}, function(err, contents){

      // Check for Error
      if (err) throw err;

      // Parses input from file
      let randomCommand = '';
      let randomSearchTerms = '';
      [randomCommand, randomSearchTerms] = contents.replace(/"/g, '').split(',');
      
      // Pass the new command and search terms to the handler
      commandHandler(randomCommand, randomSearchTerms);
    })
  }
}

function songSearch(song){

    // If no song given, fill in default
    if (!song){
      song = 'The Sign'
    }

    // Searches spotify API for given song
    spotify.search({ type: 'track', query: song })
    .then(function(response) {
      output = response.tracks.items.map(function (track){
        let artists = 'Artists: ' + track.artists.map(a => a.name).join(', ') + '\n';
        let name = 'Name: ' + track.name + '\n';
        let link = 'Preview Link: ' + ((track.preview_url) ? track.preview_url : 'No preview available') + '\n';
        let album = 'Album: ' + track.album.name + '\n';
        return artists + name + link + album + '---------------------------';
      })
      console.log(output.join('\n'));
    })
    .catch(function(err) {
      console.log(err);
    });

}

function concertSearch(artist){

  let formattedArtist = artist;

  // Defaults to smashmouth if no artist given
  if (!artist){
    formattedArtist = 'smashmouth';
  }
  
  // Otherwise replaces spaces in artist query with %20
  else {
    formattedArtist = artist.replace(/ /g, '%20');
  }
    
  // Assemble queryURL
  const queryURL = ("https://rest.bandsintown.com/artists/" + formattedArtist + "/events?app_id=codingbootcamp");

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
      return name + location + date + '---------------------------';
    })

    // Print out formatted result to console
    console.log(output.join('\n'));
  })
  .catch(err => console.log('Error: ', err));

}

function movieSearch(movie){

    // Format movie input
    let formattedMovie = '';
    if (movie){
      formattedMovie = movie.replace(/-/g, '+')
    }
    else {
      formattedMovie = 'mr+nobody';
    }
    // Assemble queryURL
    const queryURL = 'http://www.omdbapi.com/?apikey=trilogy&t=' + formattedMovie;

    // Call Bands in Town API
    axios.get(queryURL)
  
    // Parse response object into desired output fields
    .then(function(response){

      let data = response.data;      
      
      let output = 'Movie Title: ' + data.Title + '\n';
      
      output += 'IMDB Rating: ' + data.Ratings[0].Value + '\n';

      output += 'Rotten Tomatoes Rating: ' + data.Ratings[2].Value + '\n';

      output += 'Country: ' + data.Country + '\n';

      output += 'Language: ' + data.Language + '\n';

      output += 'Plot: ' + data.Plot + '\n';

      output += 'Actors: ' + data.Actors + '\n' + '-----------------';
  
      // Print out formatted result to console
      console.log(output);
    })
    .catch(err => console.log('Error: ', err));

}