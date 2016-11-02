
var timerInterval;
var pauseForMsgDisplay;
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
                // // call function to handle answers and move to next question
                playQuiz.verifyAnswer();
            }
        },

	displayGameData: function(){
			// cannot use 'this' here either as it otherwise it fails when it is being called by setTimeout method
			// console.log(this);
			var i = gameData.currentQuestion;  // the array ID of the current questions
			var j = 1;
			var buttonSelected = false;
            $('.hide-initially').show();
    		$('.show-initially').hide();
			// clear this options div between questions.
			$('#options').empty();
			// displays the current question
			$('#question').html(gameData.questionData[i][j-1] + '<br>');
		    // display all the possible answers held in array questionData indices 1-4;
			while (j < gameData.questionData[i].length-1){
				var currentID = "option" + j;
				var b = $('<input type="radio" class="radioButton" id=' + currentID + '  name="options" value=' + j + '>' + gameData.questionData[i][j] + '<br>');	 	 
				var hashCurrentID = '#' + currentID;
				$('#options').append(b);
				j++;

			}
			// add the onclick event - I tried adding in the $('document').ready section but the event gets dropped when the page is reset - this way 
			// it is attached to the radioButtons each time they are generated.
			// User only gets one chance to answer
			console.log(buttonSelected);
				$('.radioButton').on('click', function(){
					if(!buttonSelected){
						gameData.selectOption();
						gameData.answerSelected = true;
						buttonSelected = true;
					}
				});
				// if ( buttonSelected ){  // dont allow user to click any more options
				// 	$(':radio,:checkbox').click(function(){
				// 	    return false;
				// 	});
				// }
		
			//  reset the interval and start the timer 
			gameData.timeoutInterval = 20;
			gameData.startTimer(); 


		},

		selectOption: function(){
		   	 //capture the users answer and verify it
		   	 playQuiz.currentUserAnswer = $('input[name="options"]:checked').val();
		   	 //stop the timer  
		   	 clearInterval(timerInterval);
		   	 // display the correct answer 
		   	 playQuiz.verifyAnswer();

	   	},

	   	goNoGoDecision: function(){
	   		$('#messages').html('Would you like to restart the quiz?');
	   		$('.modal-buttons').show();
	   		var clickedVal = null;
		   	$('#yes').on('click', function() {
		   		if ( clickedVal === null ) {  // don't allow the buttons to be selected more than once
			   		clickedVal = $('#yes').val();
			   		gameData.quizReset();
				} 
			});
            $('#no').on('click', function() {
            	if ( clickedVal === null ) {  // don't allow the buttons to be selected more than once
            		clickedVal = $('#no').val();
		   			$('#messages').html('Thank You for playing.');
		   			// wait a while and restart anyway
		   			pauseForMsgDisplay = setTimeout(gameData.quizReset,  1000 * 10); 
            	}   
		    });
		    // nothing clicked
		    if (!clickedVal){
		    	//pause a bit and restart anyway
		    	pauseForMsgDisplay = setTimeout(gameData.quizReset,  1000 * 10); 
		    }
	   	},

	   	quizReset: function(){

	   		clearTimeout(pauseForMsgDisplay);
	   		// set all data to initial state
	   		$('.modal').hide();
	   		$('.modal-buttons').hide();
	   		gameData.currentQuestion =  0;
			gameData.answerSelected = false;	
			playQuiz.questionNumber =  0;
			playQuiz.currentUserAnswer =  "";
			playQuiz.userCorrectAnswers =  0;
			playQuiz.userIncorrectAnswers =  0;
			playQuiz.totalQuestionsAsked =  0;
			// reload the game
			gameData.displayGameData();
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
		var correctAnswer = "";
		// if no answer selected (timeout) then set the array id of the answer to -1, valid options are 1 to 4
		console.log(!gameData.answerSelected);
		console.log(gameData.questionData[gameData.currentQuestion][5]);
		if (!gameData.answerSelected){
			this.currentUserAnswer  = "-1";
		}
		// convert the string to an integer for use as array index
		answerNumber = parseInt(this.currentUserAnswer);
		// check if this is the correct answer
		if (this.currentUserAnswer === gameData.questionData[gameData.currentQuestion][5]){
			$('.modal').show();
			$('#messages').html("You got the Correct Answer " + gameData.questionData[gameData.currentQuestion][answerNumber]);
			
			// increment the quiz counters
			this.userCorrectAnswers++;
			this.totalQuestionsAsked++;
			pauseForMsgDisplay = setTimeout(playQuiz.continueQuiz, 3 * 1000);
		} 
		else {
			correctAnswer = gameData.questionData[gameData.currentQuestion][5];
			$('.modal').show();
			$('#messages').html("Incorrect Answer. The correct answer is: " + gameData.questionData[gameData.currentQuestion][correctAnswer]);
	        this.userIncorrectAnswers++;
			this.totalQuestionsAsked++;	
			pauseForMsgDisplay = setTimeout(playQuiz.continueQuiz, 3 * 1000);
		}

	},

	continueQuiz: function(){
		// hide messages
		$('.modal').hide();
		// Move to the next question as long as there are questions remaining
		// current question will be one less than the number of questions - it is an index of the array
		if (gameData.currentQuestion < gameData.questionData.length-1){
			gameData.currentQuestion++;
			// Start the timeout timer - 4 seconds
		    setTimeout(gameData.displayGameData, 0);  // need to use min 3 secs here as the message display is 3 secs - seems to continue on with execution
		}
		else {
			//display end of game message and scores
			$('.modal').show();
		    $('#messages').html('Game Over!');
			$('#messages').append('You got ' + playQuiz.userCorrectAnswers + ' correct questions out of ' + playQuiz.totalQuestionsAsked + ' total questions.');
			//pauseForMsgDisplay = setTimeout(gameData.quizReset,  1000 * 5);  // this should be an OPTION to restart game
			// clearTimeout(pauseForMsgDisplay);
			// When the user clicks on <span> (x), close the modal
			// $('#messages').append('Would you like to restart the game?');
		 //   	$('#yes').on('click', function() {
		 //   	    gameData.quizReset;
			// 	// pauseForMsgDisplay = setTimeout(gameData.quizReset,  1000 * 5); 
			// 	$('.modal-buttons').hide();
			// });
		 //    $('#no').on('click', function() {
			// 	$('#messages').html('Game Over!');
			// 	$('#messages').append('Thank You for playing');
			//     // waits a bit and restarts anyway?
			// 	pauseForMsgDisplay = setTimeout(gameData.quizReset,  1000 * 5); 
			// });
			pauseForMsgDisplay = setTimeout(gameData.goNoGoDecision,  1000 * 3);
		}

	},
		

	hideMsg: function(){
		// this function is required to be called by setTimeout function as it expects a function as the first argument.
		$('.modal').hide();
		// clearTimeout(pauseForMsgDisplay);

	}


}

$('document').ready(function(){
	// start the game after 5 secs
	// $('.hide-initially').hide();
	setTimeout(gameData.displayGameData, 1000 * 3);
	// gameData.init();

})

