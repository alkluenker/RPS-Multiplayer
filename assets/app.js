var firebaseConfig = {
  apiKey: "AIzaSyDqK2xTepGOT6jVv-MUxtZJdPSYKxvNGKg",
  authDomain: "rps-multiplayer-game-d6276.firebaseapp.com",
  databaseURL: "https://rps-multiplayer-game-d6276.firebaseio.com",
  projectId: "rps-multiplayer-game-d6276",
  storageBucket: "rps-multiplayer-game-d6276.appspot.com",
  messagingSenderId: "471252944677",
  appId: "1:471252944677:web:e0fc7a029f1e28772efccc"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var playersRef = database.ref("/players");

var playerName = "";

var player1LoggedIn = false;
var player2LoggedIn = false;

var playerNumber = "";
var playerObject = "";

var player1Object = {
  name: "",
  choice: "",
  wins: 0,
  losses: 0
}
var player2Object = {
  name: "",
  choice: "",
  wins: 0,
  losses: 0
}

playersRef.on("child_added", function (snapshotChild) {
  window["player" + snapshotChild.key + "LoggedIn"] = true;
  window["player" + snapshotChild.key + "Object"] = snapshotChild.val();
})



$("#login").on("click", function(event) {

  event.preventDefault();

  if (player1LoggedIn === false) {

    playerNumber = 1;
    playerObject = player1Object;

  }

  else if (player2LoggedIn === false) {

    playerNumber = 2;
    playerObject = player2Object;

  }

  else {
    playerNumber = null;
    playerObject = null;
  }

  if (playerNumber) {
    playerName = $("#player-name").val().trim();
    playerObject.name = playerName;
    $("#player-name").val("");

    $("#player-name-display").text(playerObject.name);
    $("#player-number").text(playerNumber);

    database.ref("/players/" + playerNumber).set(playerObject);
  }

  

  
  

 

  database.ref().set({

    player1Object: player1Object,
    player2Object: player2Object
  })
  

})

/*playersRef.on("child_added", function(childSnapshot) {

  if (oneLoggedIn === false) {
    oneLoggedIn = true;
    playerNumber = 1;
    $("#name-one-display").text(childSnapshot.val().oneObject.name);

  }

  else if (twoLoggedIn === false) {
    twoLoggedIn = true;
    playerNumber = 2;
    $("#name-two-display").text(childSnapshot.val().twoObject.name);
  }

  else if ((oneLoggedIn === true) && (twoLoggedIn === true)) {
    playerNumber = null;
    playerObject = null;
  }

  

 
})

database.ref().on("value", function(snapshot) {

  
  $("#name-one-display").text(snapshot.val().oneObject.name);
  $("#name-two-display").text(snapshot.val().twoObject.name);

})

/*function resetScreen() {

  $("#name-one-display, #name-two-display").empty();

  oneLoggedIn = false;
  twoLoggedIn = false;

}*/



$("#one-answer").on("click", function(event) {
  event.preventDefault;
  oneChoice = $("#one-choice").val().trim();
  console.log(oneChoice);

  database.ref().push({

    oneChoice: oneChoice
    
  })

  
})

$("#two-answer").on("click", function(event) {
  event.preventDefault;
  twoChoice = $("#two-choice").val().trim();
  console.log(twoChoice);

  database.ref().push({
    twoChoice: twoChoice
  })
})



database.ref().on("value", function(snapshotOne) {

  
  $("#one-choice").text(snapshotOne.val().oneChoice);
  $("#choice-two-display").text(snapshotOne.val().twoChoice);

})