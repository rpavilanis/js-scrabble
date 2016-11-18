var Scrabble = function() {};

  var letterValues = {
  "A": 1, "E" : 1, "I": 1, "O": 1, "U": 1, "L": 1, "N": 1, "R": 1, "S": 1, "T": 1,
  "D": 2, "G": 2,
  "B": 3, "C": 3, "M": 3, "P": 3,
  "F": 4, "H": 4, "V": 4, "W": 4, "Y": 4,
  "K": 5,
  "J": 8, "X": 8,
  "Q": 10, "Z": 10
  };

  /* create an array of strings (letters) from word and then loop through letters array in order to determine total score (by referencing letterValues function) */
Scrabble.score = function(word) {
    if (word) {
      var wordToScore = word.toUpperCase();
      var total = 0;
      var lettersLength = wordToScore.length;
      lettersLength >= 7 ? total = 50 : total = 0;

      for (var i = 0; i < lettersLength; i++) {
        total += letterValues[wordToScore.charAt(i)];
      }
      return total;
    }
  };

  /* initialize two variables in order to hold max_score and max_scoring_word then iterate through the array_of_words and use if statements to determine when the word and score are stored in the local variables
  use tie-breaking logic in if statements to determine when to score word/score into variable */
  Scrabble.highestScore = function(array_of_words) {
    var max_score = 0;
    var max_scoring_word = "";


    for (var i = 0; i < array_of_words.length; i++) {
      word = this.score(array_of_words[i]);
      if (word > max_score) {
        max_score = word;
        max_scoring_word = array_of_words[i];
      } else if (word == max_score) {
          if (word.length >= 7) {
            max_score = word;
            max_scoring_word = array_of_words[i];
          }
            else if (word.length < max_scoring_word.length) {
            max_score = word;
            max_scoring_word = array_of_words[i];
          }
      }
    }
      return max_scoring_word;
    };



Player = function(name) {
  this.name = name;
  this.wordScore = 0;
  this.totalScore = 0;
  this.wordsByPlayer = ["kitten", "robot", "mistake", "dancer", "liar", "cat"];
  this.pickedTiles = [];
};

Player.prototype.plays = function() {
  return this.wordsByPlayer;
};

Player.prototype.play = function(word) {
  if (this.totalScore >= 100) {
    return false;
  }
    else {
      var lettersLength = word.length;
      for (var i = 0; i < lettersLength; i++) {
        if (this.pickedTiles.includes(word.charAt(i))) {
          this.pickedTiles.splice(this.pickedTiles.word.charAt(i), 1);
        }
          this.wordsByPlayer.push(word);
          this.wordScore = Scrabble.score(word);
          return this.wordScore;
      }
  }
};

Player.prototype.total = function() {
  // var playersScore = new Scrabble();
  for (var i = 0; i < this.wordsByPlayer.length; i++) {
    this.totalScore += Scrabble.score(this.wordsByPlayer[i]);
  }
  return this.totalScore;
};

Player.prototype.hasWon = function() {
  if (this.totalScore >= 100) {
    return true;
  } else {
      return false;
  }
};

Player.prototype.highestScoringWord  = function() {
  return Scrabble.highestScore(this.wordsByPlayer);
};

Player.prototype.highestWordScore = function() {
  high_score_word = this.highestScoringWord();
  highest_score = Scrabble.score(high_score_word);
  return highest_score;

};

Player.prototype.tiles = function() {
  return this.pickedTiles;
};

Player.prototype.tiles = function() {
  this.pickedTiles.push(tileBag.drawTiles(7 - this.pickedTiles.length));
  return this.pickedTiles;
};

TileBag = function() {
  this.defaultTileBag = [
    "A", "A", "A", "A", "A", "A", "A", "A", "A",
    "B", "B","C", "C", "D", "D", "D", "D",
    "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "F", "G", "G", "G", "H", "H", "I", "I", "I", "I", "I", "I", "I", "I", "I", "J", "K", "L", "L", "L", "L", "M", "M", "N", "N", "N", "N", "N", "N","O", "O", "O", "O", "O", "O", "O", "O", "P", "P", "Q", "R", "R", "R", "R", "R", "R", "S", "S", "S", "S", "T", "T", "T", "T", "T", "T", "U", "U", "U", "U", "V", "V", "V", "V", "W", "W", "X", "Y", "Y","Z"
  ];
  this.pickedTiles = [];
};

TileBag.prototype.drawTiles = function(num) {
  var index = Math.floor(Math.random() * this.defaultTileBag.length);

  if (this.defaultTileBag.length < num || num > 7 || num + this.pickedTiles.length > 7) {
    return "This is a friendly reminder that you can't pick more than 7 tiles";
  } else {
      for (var i = 0; i < num; i++) {
        var tile = this.defaultTileBag[index];
        this.pickedTiles.push(tile);
        this.defaultTileBag.splice(tile, 1);
      }
      return this.pickedTiles;
  }
};

TileBag.prototype.tilesRemaining = function() {
  var tilesRemaining = this.defaultTileBag.length;
  return tilesRemaining;
};

// TESTING SCRABBLE

// test normal word
console.log(Scrabble.score("hippo"));
// test 7-letter word
console.log(Scrabble.score("created"));
// test normal array with no 7-letter words or ties
console.log(Scrabble.highestScore(["hippo", "crayon", "cat"]));
// test array with a 7-letter words
console.log(Scrabble.highestScore(["created", "crayon", "cat"]));
// test array with a tie
console.log(Scrabble.highestScore(["waves", "crayon", "cat"]));

// TESTING PLAYER
var player1 = new Player("Rachel");
// get an array of words played by player
console.log(player1.plays());
// get score of a word and add to wordsByPlayer array
console.log(player1.play("hello"));
// get total score
console.log(player1.total());
// has player won?
console.log(player1.hasWon());
// player's highest scoring word
console.log(player1.highestScoringWord());
// player's highest word score
console.log(player1.highestWordScore());

// TESTING TILE BAG

var tilebag = new TileBag();
// draw normal number of tiles
console.log(tilebag.drawTiles(4));
// draw too many tiles
console.log(tilebag.drawTiles(8));
// determine remaining letter tiles
console.log(tilebag.tilesRemaining());





// Scrabble.prototype.Player = function() {
//   return 'hello world!';
// };
//
// module.exports = Scrabble;
