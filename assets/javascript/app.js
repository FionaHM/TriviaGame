alert("hello");
var gameData = {
	questionData: [["question 1 ", "q1 option 1", "q1 option 2", "q1 option 3", "q1 option 4"], 
	["question 2 ", "q2 option 1", "q2 option 2", "q2 option 3", "q2 option 4"],
	["question 3 ", "q3 option 1", "q3 option 2", "q3 option 3", "q3 option 4"],
	["question 4 ", "q4 option 1", "q4 option 2", "q4 option 3", "q4 option 4"]],
	correctAnswers:   ["q1 option 2", "q2 option 3", "q3 option 2", "q4 option 4"],
	currentQuestion:  1,
	timeoutInterval: 20,
	
	// pass in the current question number to display the correct timer data to the user.
	startTimer: function(){
		// call the countdown function every second
	    setInterval(this.countDown, 1000);
	    console.log("counting down");
	},


        // The decremeent function.
    countDown: function(){
            // Decrease number by one second.
           	// in this function  the value of 'this' is the window object, so must explicity state object.function or object.variable instead of this.function or this.variable
 			// I guess this is because this function is being called by the setInterval and this is a method of the window object.
 			console.log(this);
            gameData.timeoutInterval--;
            // Show the number in the #show-number tag.
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
			var c = $('<div>',{id : "question" + i });
			// console.log(this.questionData[i].length);
			$('#question').append(c);
		    c.html(this.questionData[i][j-1] + 'nayting <br>');
			while (j < this.questionData[i].length){
				var currentID = '#' + "option" + j;
				var b = $('<input/>',{
						id: "option" + j,
						type: "radio",
						name: "options", 
						value: this.questionData[i][j]});
				$("#options").append(b);
				// b.attr('value', j );
				// console.log("questions" + this.questionData[i][j]);
				b.html(this.questionData[i][j] + '<br>');
				j++;
			}
			console.log(b)
			// start the timer
			this.startTimer(); 
		    this.currentQuestion++;

		}

}; // end object

$('document').ready(function(){
	// display the first question
	gameData.displayGameData();

})