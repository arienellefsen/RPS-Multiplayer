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
    playerOneScore = 2,
    playerOneLosses = 1,
    playerOneTurn = true,
    playerOneChoices = '',
    playerNameSec = "eric",
    playerSecScore = 0,
    playerSecLosses = 1,
    playerSecTurn = false,
    playerTwoChoices = '',
    choices = ["R", "P", "S"];

function gameBtn(choicesId){
//generate button based on array
    
    choices.forEach(function(element) {
    console.log(element);
    var btnChoices= $('<input/>').attr({ type: 'button', name:'btn1', class: 'btn-choices', value:element});

    btnChoices.on("click", function(){

      if (playerOneTurn === true){

        var choiceP1= $(this).val();
      }
      else{
            var choiceP2 = $(this).val();
      }

    console.log($(this).val());


    });

    $(choicesId).append(btnChoices);
});
}

function initPlayerOne(){
  var choicesId = $("#choices1");
  gameBtn(choicesId);

}

function initPlayerTwo(){
  var choicesId = $("#choices2");
  gameBtn(choicesId);
}

initPlayerOne();
initPlayerTwo();


// At the initial load, get a snapshot of the current data.
database.ref("/players").on("value", function(snapshot) {

database.ref().on("value", function(snapshot) {
      console.log(snapshot.val());
      
    }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
});


function dbUpdate(){
  databases.ref().set({
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




