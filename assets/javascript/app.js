
var timerInterval;
var gameData = {
	questionData: [["question 1 ", "q1 option 1", "q1 option 2", "q1 option 3", "q1 option 4", "1"], 
	["question 2 ", "q2 option 1", "q2 option 2", "q2 option 3", "q2 option 4", "2"],
	["question 3 ", "q3 option 1", "q3 option 2", "q3 option 3", "q3 option 4", "3"],
	["question 4 ", "q4 option 1", "q4 option 2", "q4 option 3", "q4 option 4", "4"]],
	currentQuestion:  0,
	timeoutInterval: 20,
	answerSelected: false,
	
	// pass in the current question number to display the correct timer data to the user.
	startTimer: function(){
	    //display initial time
		$('#timer').html('<h2>' + gameData.timeoutInterval + ' seconds </h2>');	
		// call the countdown function every second
	    timerInterval = setInterval(this.countDown, 1000);
	    // console.log("counting down");
	},


        // The decremeent function.
    countDown: function(){
            // Decrease number by one second.
           	// in this function  the value of 'this' is the window object, so must explicity state object.function or object.variable instead of this.function or this.variable
 			// I guess this is because this function is being called by the setInterval and this is a method of the window object.

             gameData.timeoutInterval--;
            // Show the number in the #timer tag.
            $('#timer').html('<h2>' + gameData.timeoutInterval + ' seconds </h2>');
       

            // Once number hits zero...
            if (gameData.timeoutInterval === 0){

               //stop the timer  
		   	 	clearInterval(timerInterval);
                // reset the timer
                gameData.timeoutInterval = 20;
                // call function to handle answers and move to next question
                playQuiz.verifyAnswer();
          
            }
        },

	displayGameData: function(){
			// cannot use 'this' here either as it otherwise it fails when it is being called by setTimeout method
			// console.log(this);
			var i = gameData.currentQuestion;
			var j = 1;
			// clear this options div between questions.
			$('#options').empty();
			$('#question').html(gameData.questionData[i][j-1] + '<br>');
		    // c.html(this.questionData[i][j-1] + 'nayting <br>');
			while (j < gameData.questionData[i].length-1){
				var currentID = "option" + j;
				var b = $('<input type="radio" class="radioButton" id=' + currentID + '  name="options" value=' + j + '>' + gameData.questionData[i][j] + '<br>');	 	 
				var hashCurrentID = '#' + currentID;
				$('#options').append(b);
				j++;

			}
			// add the onclick event - i tried adding in the $('document').ready section but the event gets dropped when the page is reset - this way 
			// it is attached to the radioButtons each time they are generated.
			$('.radioButton').on('click', function(){
				gameData.selectOption();
				gameData.answerSelected = true;
			});
			   	 //  reset the interval and start the timer 
			 gameData.timeoutInterval = 20;
			 gameData.startTimer(); 

		

		},

		selectOption: function(){
		   	 //capture the data
		   	 playQuiz.currentUserAnswer = $('input[name="options"]:checked').val();
		   	 //stop the timer  
		   	 clearInterval(timerInterval);
		   	 // display the correct answer 
		   	 playQuiz.verifyAnswer();

	   	},

	   	quizReset: function(){
	   		// set all data to initial state
	   		gameData.currentQuestion =  0;
			gameData.timeoutInterval = 20;
			gameData.answerSelected = false;
	   	}

}; // end object

var playQuiz = {
	questionNumber: 0,
	currentUserAnswer : "",
	userCorrectAnswers: 0,
	userIncorrectAnswers: 0,
	totalQuestionsAsked: 0,

	verifyAnswer: function(){
		var answerNumber = "";

		if (!gameData.answerSelected){
			answerNumber = "-1"
		}
		
		answerNumber = parseInt(this.currentUserAnswer);
		
		if (this.currentUserAnswer === gameData.questionData[gameData.currentQuestion][5]){
			$('#messages').html("You got the Correct Answer " + gameData.questionData[gameData.currentQuestion][answerNumber]);

			this.userCorrectAnswers++;
			this.totalQuestionsAsked++;
		} 
		else {
			$('#messages').html("Incorrect Answer. The correct answer is: " + gameData.questionData[gameData.currentQuestion][answerNumber]);
	        this.userIncorrectAnswers++;
			this.totalQuestionsAsked++;	
		}
		
		// Move to the next question as long as there are questions remaining
		// current question will be one less than the number of quetions - it is an index of the array
		if (gameData.currentQuestion < gameData.questionData.length-1){
			gameData.currentQuestion++;
			// Start the timeout timer - 4 seconds
		    setTimeout(gameData.displayGameData, 1000 * 2);
		}
		else {
			//display end of game message and scores
			// call displayMessage function
			// $('#messages').html('Game Over!');
			var message = "Game Over";
			this.displayMessage('html', message);
			$('.modal').show();
			$('messages').html('You got ' + this.userCorrectAnswers + ' correct questions out of ' + this.totalQuestionsAsked + ' total questions.');
			// var callFunction = gameData.quizReset();
			// this.displayMessage('append', message, callFunction);
			// $('#messages').append();
			// restart the quiz -- have a delay
			// setTimer(gameData.quizReset(), 1000 * 5);
			// 
		}

	},
// working on this bit - not currently working - will get back to when I have time!
	displayMessage: function(text, textvalue, textfunction){
		$('.modal').show();
		$('#messages').text(textvalue);
		// delay abit and hide
		setInterval(textfunction, 5 * 1000);
		$('.modal').hide();

	}



}

$('document').ready(function(){
	// display the first question
	gameData.displayGameData();

})

