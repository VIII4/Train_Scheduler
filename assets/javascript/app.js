//#region Global Variables

//#endregion

//#region HTML Elements
var dashboardPanel;
var addTrainPanel;
var historicPanel;

var panels = [];

//#endregion

//#region Functions

function getPanels() {
  dashboardPanel = $("#dashboard-panel");
  addTrainPanel = $("#add-train-panel");
  historicPanel = $("#historic-data-panel");

  var tempArray = [dashboardPanel, addTrainPanel, historicPanel];
  return tempArray;
}

function getInfo() {
  var name = $("#trainName")
    .val()
    .trim();
  var destination = $("#trainDest")
    .val()
    .trim();
  //   var firstTrain = $("#firstTrainTime")
  //     .val()
  //     .trim();

  var firstTrain = moment(
    $("#firstTrainTime")
      .val()
      .trim(),
    "HH:mm"
  ).format("HH:mm");
  var trainFreq = moment(
    $("#trainFreq")
      .val()
      .trim(),
    "mm"
  ).format("mm");

  //   var startDate = moment(
  //     $("#empDate")
  //       .val()
  //       .trim(),
  //     "MM/DD/YYYY"
  //   ).format("X");

  $("#trainName").val(null);
  $("#trainDest").val(null);
  $("#firstTrainTime").val(null);
  $("#trainFreq").val(null);

  console.log(moment().format("HH:mm"));

  return {
    name: name,
    destination: destination,
    firstTrain: firstTrain,
    trainFreq: trainFreq
  };
}

function nextTrain(trainData) {
  //Get Current Time, First Time and Frequency
  var currentTime = moment();
  var firstTime = trainData.firstTrain;
  var freq = trainData.trainFreq;

  //Create Next Train Moment
  var _nextTrain = moment(firstTime, "HH:mm");
  if (currentTime < _nextTrain) {
    console.log(
      "Current Time is Less than Next Train so the Return Next Train"
    );
    return _nextTrain;
  }
  //
  else {
    console.log(
      "Current Time has passed Next Train so add frequency until greater than current time, then return next train"
    );
    while (_nextTrain < currentTime) {
      _nextTrain = _nextTrain.add(freq, "m");

      console.log(
        "incremeneted next train time to : " + _nextTrain.format("HH:mm")
      );
    }
    console.log(_nextTrain);
    return _nextTrain;
  }
}

function createEmpRow(trainData) {
  //Get Next Train
  var _nextTrain = nextTrain(trainData);
  //Get Current Time
  var currentTime = moment();
  var minsAway = _nextTrain.diff(currentTime, "minutes");

  //Format Times
  _nextTrain = _nextTrain.format("HH:mm");
  currentTime = currentTime.format("HH:mm");
  console.log("current Time: " + currentTime + " Next Train: " + _nextTrain);

  //Display Current Time
  $("#currentTime").text("Current Time " + currentTime);
  //Create Empty Row
  var newRow = $("<tr>");
  //Create Data Cells with Data
  var nameCell = $("<td>").text(trainData.name);
  var destCell = $("<td>").text(trainData.destination);
  var freqCell = $("<td>").text(trainData.trainFreq);
  var nextCell = $("<td>").text(_nextTrain);
  var minAwayCell = $("<td>").text("~ " + minsAway);

  newRow.append(nameCell, destCell, freqCell, nextCell, minAwayCell);
  $("#tableBody").prepend(newRow);
}

//#endregion

//#region Objects

//#endregion

//#region Firebase Config
var firebaseConfig = {
  apiKey: "AIzaSyD347ZRbjjO7AWzy1kZ2LtufKBnwPrFO-U",
  authDomain: "my-project-55f19.firebaseapp.com",
  databaseURL: "https://my-project-55f19.firebaseio.com",
  projectId: "my-project-55f19",
  storageBucket: "my-project-55f19.appspot.com",
  messagingSenderId: "224075218664",
  appId: "1:224075218664:web:f6a93a947d83e83a3e135d",
  measurementId: "G-CF1EHQFDBT"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create a variable to reference the database
var database = firebase.database();
//#endregion

//#region Events
//On Page Load
$(document).ready(function() {
  // Get Elements and add to array
  panels = getPanels();

  //On Submit Button
  $("#formSubmit").on("click", function(event) {
    event.preventDefault();

    var trainData = getInfo();

    console.log(trainData);
    database.ref().push(trainData);
  });

  // Side bar nav link click
  $(".side-bar-link").click(function() {
    // Switch panel
    //To do: Get which panel was clicked
    var buttonData = $(this).attr("data-type");

    //To do: Check all in panel array for matching ID
    panels.forEach(element => {
      var temp = element.attr("id");

      //button clicked equals element
      if (temp === buttonData) {
        //check Panel state is disabled
        if (element.attr("data-display") === "disable") {
          //Set panel as active, display show
          element.attr("data-display", "active");
          element.show();
        }
      } else {
        //set panel as disable, hide
        if (element.attr("data-display") === "active") {
          //Set panel as active, display show
          element.attr("data-display", "disable");
          element.hide();
        }
      }
    });
    //To do:
    //To do:

    //Check which button is clicked, find corresponding panel, set active, set other panels disable
  });
});

//Ran When data set
database.ref().on("value", function(snapshot) {
  //console.log(snapshot.val());
});

//Ran when data pushed
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());
  createEmpRow(childSnapshot.val());
});

//#endregion
