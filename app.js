/* global moment firebase */

// Initialize Firebase
 var config = {
    apiKey: "AIzaSyDGWLRftQAviaIduDTX-O52FkHw7F-8g30",
    authDomain: "gameone-45cfa.firebaseapp.com",
    databaseURL: "https://gameone-45cfa.firebaseio.com",
    projectId: "gameone-45cfa",
    storageBucket: "gameone-45cfa.appspot.com",
    messagingSenderId: "543402825425"
};

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

var connectionsRef = database.ref("/connections");

var connectedRef = database.ref(".info/connected");


// When the client's connection state changes...
connectedRef.on("value", function(snap) {

  // If they are connected..
  if (snap.val()) {

    // Add user to the connections list.
    var con = connectionsRef.push(true);

    // Remove user from the connection list when they disconnect.
    con.onDisconnect().remove();
  }
});

// When first loaded or when the connections list changes...
connectionsRef.on("value", function(snap) {

  // Display the viewer count in the html.
  // The number of online users is the number of children in the connections list.
  //$("#watchers").html(snap.numChildren());
  console.log("num connect" +snap.numChildren());
});

// -------------------------------------------------------------- (CRITICAL - BLOCK) --------------------------- //
// Set Initial Counter

var playerNameOne = "ariene",
    playerOneScore = 0,
    playerOneLosses = 1,
    playerOneTurn = true,
    playerOneChoices = '',
    playerNameSec = "eric",
    playerSecScore = 0,
    playerSecLosses = 1,
    playerSecTurn = false,
    playerTwoChoices = '',
    timesClicked = 0;
    scorePlayerOne = $('#score-PlayerOne');
    scorePlayerTwo = $('#score-PlayerTwo');
    


function choicesPlayersOne(choicesId, timesClicked){
//generate button based on array

//debugger;
    $(choicesId).on("click", "li", function(event) {
  //
   $("#choices1 li").removeClass("choice");
      $("#choices2 li").removeClass("choice");

    timesClicked++;

      if (timesClicked === 1) {

        $(this).unbind(event);
        playerOneChoices = $(this).text();

        $(this).addClass("choice");

        //push to array

        console.log("Player one choice: " + $(this).text());
        nextPlayer(playerOneChoices, timesClicked);
        
      }

    
});
}

function choicesPlayersTwo(choicesId, playerOneChoices){
//generate button based on array

//debugger;
    $(choicesId).on("click", "li", function(event) {
  //

    timesClicked++;

      if (timesClicked === 1) {

        $(this).unbind(event);
        playerTwoChoices = $(this).text();
        $(this).addClass("choice");
        console.log("Player two choice: " + playerTwoChoices);
        getScore(playerOneChoices, playerTwoChoices);
        
      }

});
}


//ebugger;
function initPlayerOne(timesClicked){
  if(playerOneTurn===true){
    var choicesId = $("#choices1");
    choicesPlayersOne(choicesId, timesClicked);
    playerSecTurn = true
    playerOneTurn = false

  }
}

function nextPlayer(playerOneChoices){
  var choicesId = $("#choices2");
  choicesPlayersTwo(choicesId, playerOneChoices);
  timesClicked = 0;


}

debugger;
function getScore(playerOneChoices, playerTwoChoices){
  console.log(playerOneChoices, playerTwoChoices );

  if (playerOneChoices === playerTwoChoices){
    console.log("Tied Game");
    newGame();

  }
  else if( playerOneChoices === 'Paper' && playerTwoChoices === 'Rock'){

    console.log("Player One won!! Paper!!!");
    playerOneScore = playerOneScore+1;
    console.log("Score Player one: " + playerOneScore);
    scorePlayerOne.text(playerOneScore);
    newGame();
  }

  else if( playerOneChoices === 'Rock' && playerTwoChoices === 'Paper'){

    console.log("Player one won!! Paper!!!");
    playerOneScore = playerOneScore+1;
     console.log("Score Player one: " + playerOneScore);
    scorePlayerOne.text(playerOneScore);

    newGame();
  }

  else if( playerOneChoices === 'Scsissor' && playerTwoChoices === 'Rock'){

    console.log("Player Two won!! Rock!!!");
    playerSecScore = playerSecScore+1;
    console.log("Score Player two: " + playerSecScore);
    scorePlayerTwo.text(playerSecScore);
    newGame();

  }

  else if( playerOneChoices === 'Rock' && playerTwoChoices === 'Scsissor'){

    console.log("Player one won!! Scsissor!!!");
    playerOneScore = playerOneScore+1;
    console.log("Score Player one: " + playerOneScore);
    scorePlayerOne.text(playerOneScore);

    newGame();

  }

 else if( playerOneChoices === 'Paper' && playerTwoChoices === 'Scsissor'){

    console.log("Player two won!! Scsissor!!!");
    playerSecScore = playerSecScore+1;
    console.log("Score Player two: " + playerSecScore);
    scorePlayerTwo.text(playerSecScore);
    newGame();

  }

  else if( playerOneChoices === 'Scsissor' && playerTwoChoices === 'Paper'){

    console.log("Player one won!! Scsissor!!!")
    playerOneScore = playerOneScore+1;
    console.log("Score Player one: " + playerOneScore);
    scorePlayerOne.text(playerOneScore);

    newGame();

  }

}

function newGame(){
      timesClicked = 0;
      console.log("lets play again!!!");
      var choicesId = $("#choices1");

     

      choicesPlayersOne(choicesId, timesClicked);

      //initPlayerOne(timesClicked);
}


initPlayerOne(timesClicked);


// At the initial load, get a snapshot of the current data.
database.ref("/players").on("value", function(snapshot) {

database.ref().on("value", function(snapshot) {
      console.log(snapshot.val());
      
    }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
});

function dbUpdate(){
  database.ref().set({
        playerNameOne: playerNameOne,
        playerOneScore: playerOneScore,
        playerOneLosses: playerOneLosses,
        playerOneTurn: playerOneTurn,
        playerOneChoices: playerOneTurn,
        playerNameSec: playerNameSec,
        playerSecScore: playerSecScore,
        playerSecLosses: playerSecLosses, 
        playerSecTurn: playerSecTurn , 
        playerTwoChoices: playerOneTurn    
      });
}


// Initial Values
// Create logic for rps game
// Variables:
// variables to store 2 user's names
// variables to store 2 user's scores win
// variable to store score losses
// store rps options in array and generate clickable buttons
// variable to store turns





// Declare variables
