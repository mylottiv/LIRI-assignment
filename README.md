# LIRI-assignment

This is a command line language interface designed to give the user easy access to music and film related online APIs, namely Spotify, Bandsintown, and OMDB.

## Usage

The interface accepts one of four commands:
Command | Fucntion
--------|--------
* spotify-this-song | Searches Spotify API for given song
* concert-this | Searches Bandsintown API for concerts for given artist
* movie-this | Returns the OMDB API entry for given movie
* do-what-it-says | Reads in and executes command written in random.txt

### spotify-this-song

This command will take user inputted arguments and search the Spotify API for any songs that match given arguments. The command will print to the console a list of results including the name, artist, and album of each track found, and a 30 second preview link (if available).

![Single Argument](/screenshots/spotify-this-song_single_argument.PNG)
![Multiple Arguments](/screenshots/spotify-this-song_multiple_arguments.PNG)

As many arguments as are entered after the command are passed as part of the query. If no arguments are given, the interface defaults to searching for "The Sign."

![Default](/screnshots/spotify-this-song_default.PNG)

### concert-this

This command searches Bandsintown for an artist's upcoming concerts. Again, a list of results is returned, providing the name and location of the concert venue, as well as the scheduled date of the show. The default search, if no artist name is provided by the user, is for the greatest band that was, is, or ever will be, Smashmouth. Otherwise, user provided artist names can be composed of as many arguments as neccessary.

![Default and Single Argument](/screenshots/concert-this.PNG)
![Multiple ARguments](/screenshots/concert-this_multiple_arguments.PNG)

### movie-this

Unlike the previous two commands, this command does not return a list of results, instead returning the specific entry for the movie provided by the user. Again, in case of no provided arguments, Mr. Nobody is passed as the query to OMDB.

![All Possible Arguments](/screenshots/movie-this.PNG)

### do-what-it-says

This command will not actually call any external technologies itself, instead it will read in the text from random.txt, parsing out a command and arguments to be passed to the command, and will then recall the command handler to execute this newly inputted command.

![spotify-this-song,"I Want it That Way"](/screenshots/do-what-it-says.PNG)
