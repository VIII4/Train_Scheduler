//#region Global Variables

//#endregion

//#region HTML Elements

//#endregion

//#region Functions

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

function createEmpRow(trainData) {
  //Get Current Time
  var nextTrain;
  var currentTime = moment().format("HH:mm");

  //calc next train
  //   if (currentTime > trainData.firstTrain) {
  //   } else {
  //     nextTrain = trainData.firstTrain;
  //   }
  //calc min away

  //Create Empty Row
  var newRow = $("<tr>");
  //Create Data Cells with Data
  var nameCell = $("<td>").text(trainData.name);
  var destCell = $("<td>").text(trainData.destination);
  var freqCell = $("<td>").text(trainData.trainFreq);
  var nextCell = $("<td>").text(/* Next Arrival */);
  var minAwayCell = $("<td>").text(/* Mins Away */);

  newRow.append(nameCell, destCell, freqCell, nextCell, minAwayCell);
  tableBody.prepend(newRow);
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
  //On Submit Button
  $("#formSubmit").on("click", function(event) {
    event.preventDefault();

    var trainData = getInfo();

    console.log(trainData);
    database.ref().push(trainData);
  });
});

//Ran When data set
database.ref().on("value", function(snapshot) {
  //console.log(snapshot.val());
});

//Ran when data pushed
database.ref().on("child_added", function(childSnapshot) {
  //console.log(childSnapshot.val());
});

//#endregion
