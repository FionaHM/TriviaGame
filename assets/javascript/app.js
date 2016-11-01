
var timerInterval;
var gameData = {
	questionData: [["question 1 ", "q1 option 1", "q1 option 2", "q1 option 3", "q1 option 4"], 
	["question 2 ", "q2 option 1", "q2 option 2", "q2 option 3", "q2 option 4"],
	["question 3 ", "q3 option 1", "q3 option 2", "q3 option 3", "q3 option 4"],
	["question 4 ", "q4 option 1", "q4 option 2", "q4 option 3", "q4 option 4"]],
	correctAnswers:   ["q1 option 2", "q2 option 3", "q3 option 2", "q4 option 4"],
	currentQuestion:  0,
	timeoutInterval: 20,
	
	// pass in the current question number to display the correct timer data to the user.
	startTimer: function(){
		// call the countdown function every second
	    timerInterval = setInterval(this.countDown, 1000);
	    // console.log("counting down");
	},


        // The decremeent function.
    countDown: function(){
            // Decrease number by one second.
           	// in this function  the value of 'this' is the window object, so must explicity state object.function or object.variable instead of this.function or this.variable
 			// I guess this is because this function is being called by the setInterval and this is a method of the window object.
 			// console.log(this);
            gameData.timeoutInterval--;
            // Show the number in the #timer tag.
            $('#timer').html('<h2>' + gameData.timeoutInterval + '</h2>');

            // Once number hits zero...
            if (gameData.timeoutInterval === 0){
                // ...run the stop function.
                stop();
                // Alert the user that time is up.
                alert('Time Up!')
                // reset the timer
                gameData.timeoutInterval = 20;
            }
        },

	displayGameData: function(){
			var i = this.currentQuestion;
			var j = 1;
			// var c = $('<div>',{id : "question" + i });
			// console.log(this.questionData[i].length);
			$('#question').html(this.questionData[i][j-1] + '<br>');
		    // c.html(this.questionData[i][j-1] + 'nayting <br>');
			while (j < this.questionData[i].length){
				var currentID = "option" + j;
				var b = $('<input type="radio" class="radioButton" id=' + currentID + '  name="options" value=' + j + '>' + this.questionData[i][j] + '<br>');	 	 
				var hashCurrentID = '#' + currentID;
				$('#options').append(b);
				// radio botton text goes in a <label> tag
				$(hashCurrentID).append('<label for=' + currentID +'>' + this.questionData[i][j] + '</label>');

				j++;
			}
	
            console.log(document.getElementById("options").value);
			// start the timer
			this.startTimer(); 
		    this.currentQuestion++;

		}

}; // end object

$('document').ready(function(){
	// display the first question
	gameData.displayGameData();

   $('.radioButton').on('click', function(){

   	 //capture the data and stop the timer
   	 alert($('input[name="options"]:checked').val());
   	 //stop the counting down
   	 clearInterval(timerInterval);
   	 // display the correct answer 

   	 // set time out for answer display
   });
  

})

// Get the value from a set of radio buttons
// $( "input:radio[name=bar]:checked" ).val();