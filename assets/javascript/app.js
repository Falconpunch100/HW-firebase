const firebaseConfig = {
  apiKey: "AIzaSyBmqAie9d7DtRneSq6BL3MxnKLUEtJiKsE",
  authDomain: "homework-firebase-66590.firebaseapp.com",
  databaseURL: "https://homework-firebase-66590.firebaseio.com",
  projectId: "homework-firebase-66590",
  storageBucket: "homework-firebase-66590.appspot.com",
  messagingSenderId: "24600960848",
  appId: "1:24600960848:web:1735e0f064bd8efb041655"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

$("#enter").on("click", function(event){
  event.preventDefault();
  var newTrain = {
    firstTrain: $("#firstTrain").val(),
    trainName: $("#trainName").val(),
    trainDest: $("#trainDest").val(),
    trainFreq: $("#trainFreq").val()
  }
  clearForm()
 database.ref().push(newTrain);
 console.log(newTrain)
});

function clearForm(){
  $("#firstTrain").val("");
  $("#trainName").val("");
  $("#trainDest").val("");
  $("#trainFreq").val("");
}

$(document).ready(function() {
  database.ref().on("child_added", function(train){
    var trainName = train.val().trainName;
    var trainDest = train.val().trainDest;
    var trainFreq = train.val().trainFreq;
    var nextArrival;
    var freqNum = parseInt(trainFreq);
    var firstTrain = train.val().firstTrain;
    var temp =  moment(firstTrain, "hh:mm");
    var currentTime = moment();
    let difference = temp.diff(currentTime, "minutes");
    if(difference < 0){
        var calc = (-difference % freqNum); 
        difference = freqNum - calc
        nextArrival = moment().add(difference, "m").format("hh:mm");
        console.log(nextArrival);
    }
    else{
      nextArrival = firstTrain;
    }
    var newRow = $("<tr>");
    var trainTable = $("#trainTable");
    newRow.append($("<td>").text(trainName));
    newRow.append($("<td>").text(trainDest));
    newRow.append($("<td>").text(trainFreq));
    newRow.append($("<td>").text(nextArrival));
    newRow.append($("<td>").text(difference));
    trainTable.append(newRow);
    console.log(difference);
    }); 
});