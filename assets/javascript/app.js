var config = {
    apiKey: "AIzaSyAAPUqX96enkFQCZimIjts2774_RBefPjA",
    authDomain: "trainschedule-8d5d1.firebaseapp.com",
    databaseURL: "https://trainschedule-8d5d1.firebaseio.com",
    storageBucket: "trainschedule-8d5d1.appspot.com",
    messagingSenderId: "894281085076"
};
firebase.initializeApp(config);

var database = firebase.database();

$(document).ready(function() {


    $("#addTrainBtn").on("click", function() {

        var trainName = $("#nameInput").val().trim();
        var trainDestination = $("#destinInput").val().trim();
        var trainTime = $("#firstTrainInput").val().trim();
        var trainFrequency = $("#FreqInput").val().trim();

        var addNew = {
            name: trainName,
            destination: trainDestination,
            time: trainTime,
            frequency: trainFrequency
        }

        database.ref().push(addNew);


        console.log(addNew.name);
        console.log(addNew.destination);
        console.log(addNew.time);
        console.log(addNew.frequency)

        alert("Train Schedule Updated");

        $("#nameInput").val("");
        $("#destinInput").val("");
        $("#firstTrainInput").val("");
        $("#FreqInput").val("");

        return false;
    });

    database.ref().on("child_added", function(childSnapshot, prevChildKey) {

        console.log(childSnapshot.val());

        var trainName = childSnapshot.val().name;
        var trainDestination = childSnapshot.val().destination;
        var trainTime = childSnapshot.val().time;
        var trainFrequency = childSnapshot.val().frequency;

        var trainPrettify = moment.unix(trainTime).format("HH:mm");

        var minsAway = moment().diff(moment.unix(trainTime, "X"), "minutes");

        $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainTime + "</td><td>" + trainFrequency + "</td><td>");

    });
});
