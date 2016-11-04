
var timerInterval;
var pauseForMsgDisplay;
var gameData = {
	questionData: [['Question 1: What are \"Bangers and Mash\"?', 'Sausages and Mashed Potatoes', 'Bacon and Peas','Egg and Chips', 'Fish and Chips', '1'], 
				['Question 2: What is the Japanese food called \"Gyoza\"?', 'Sushi', 'Dumplings', 'Rice Balls', 'Spiced Cabbage', '2'],
				['Question 3: What is Borscht?', 'Stew', 'Soup', 'Salad', 'Potato Pancakes', '2'],
				['Question 4: What is the main constituent of the Chinese food \"Porridge\"?', 'Oatmeal', 'Chicken', 'Rice', 'Flour', '3'],
				['Question 5: Irish Stew is made with which ingredients?', 'Beef, Cabbage, Onion, Potatoes', 'Lamb, Carrots, Potato, Onion', 'Corned Beef, Cabbage, Onion,  Potato', 'Chicken, Carrots,  Peas, Potato', '2'],
				['Question 6: Moon Cakes are traditional for which annual feast?', 'Christmas', 'Halloween', 'Easter', 'Chinese New Year', '4'],
				['Question 7: Simnel Cake is traditional for which holiday?', 'Christmas', 'St Patrick\'s Day', 'Easter', 'Chinese New Year', '3'],
				['Question 8: In which holiday cake would you find a gold ring?', 'Rosca de Reyes', 'Barmbrack', 'Simnel Cake', 'šakotis (Lithuania Layer Cake)', '2'],
				['Question 9: What are Mince Pies made of?', 'Beef and onions covered in pastry', 'Fruit based sweet pie covered in pastry', 'Tart apple pie', 'Beef and vegetables covered in pastry', '2'],
				['Question 10: what is  \"Roti Prata\"?', 'Fish based curry served with rice', 'Chicken curry served with noodles', 'Fried flat bread served with curry sauce', 'Beef and rice wrapped in banana leaf ', '3'],
				['Question 11: Where does the dish Bibimbap originate?', 'Ukraine', 'Korea', 'Singapore', 'India ', '2'],
				['Question 12: In which county in Ireland does the potato pancake called \"Boxty\" originate?', 'Dublin', 'Limerick', 'Galway', 'Donegal', '1']],
	currentQuestion:  0,
	timeoutInterval: 20,
	answerSelected: false,

	



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

    // pass in the current question number to display the correct timer data to the user
	displayGameData: function(){
			// cannot use 'this' here either as it otherwise it fails when it is being called by setTimeout method
			// console.log(this);
			var i = gameData.currentQuestion;  // the array ID of the current questions
			var j = 1;
			var buttonSelected = false;
			gameData.answerSelected = false;
			// playQuiz.gameOver = false;
            $('.hide-initially').show();
    		$('.show-initially').hide();
			// clear this options div between questions.
			$('#options').empty();
			// displays the current question
			$('#question').html('<h3>' + gameData.questionData[i][j-1] + '</h3><br>');
		    // display all the possible answers held in array questionData indices 1-4;
			while (j < gameData.questionData[i].length-1){
				var currentID = "option" + j;
				var b = $('<input type="radio" class="radioButton" id=' + currentID + '  name="options" value=' + j + '><p>' + gameData.questionData[i][j] + '</p><br>');	 	 
				var hashCurrentID = '#' + currentID;
				$('#options').append(b);
				j++;

			}
			// add the onclick event - I tried adding in the $('document').ready section but the event gets dropped when the page is reset - this way 
			// it is attached to the radioButtons each time they are generated.
			// User only gets one chance to answer
			// console.log(buttonSelected);
				$('.radioButton').on('click', function(){
					if(!buttonSelected){
					
						gameData.answerSelected = true;
						buttonSelected = true;
					    gameData.selectOption();
					}
				});

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
	   	    $('#info-message-title').html('Game Over!');
	   		$('#messages').html('<p>Would you like to restart the quiz?</p>');
	   		$('.modal-buttons').show();
	   		var clickedVal = null;
		   	$('#yes').on('click', function() {
		   		if ( clickedVal === null ) {  // don't allow the buttons to be selected more than once
			   		clickedVal = $('#yes').val();
			   		playQuiz.gameOver = false;
			   		gameData.quizReset();
				} 
			});
            $('#no').on('click', function() {
            	if ( clickedVal === null ) {  // don't allow the buttons to be selected more than once
            		clickedVal = $('#no').val();
		   			$('#messages').html('<p><Thank You for playing.</p><br><p>Have a nice day!</p>');
		   			// wait a while and restart anyway
		   			playQuiz.gameOver = true;
		   			console.log(playQuiz.gameOver, "value in no function");
		   			pauseForMsgDisplay = setTimeout(gameData.quizReset,  1000 * 5); 

            	}   
		    });
		    // nothing clicked
		    if (!clickedVal){
		    	//pause a bit and restart anyway
		    	playQuiz.gameOver = true;
		    	pauseForMsgDisplay = setTimeout(gameData.quizReset,  1000 * 5); 
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
            console.log( playQuiz.gameOver , 'value in reset function')
			if ( playQuiz.gameOver === false ){
	   			// reload the game
				gameData.displayGameData();

	   		} 
	   		else {
	   			$('.show-initially').show();
	   			$('.hide-initially').hide();
	   			$('.modal-buttons').hide();
	   			// reset flag to false.
	   			playQuiz.gameOver = false;
	   			// End the game 
	   			// setTimeout(gameData.displayGameData, 1000 * 8);	

	   		}
			
	   	}

}; // end object

var playQuiz = {
	questionNumber: 0,
	currentUserAnswer : "",
	userCorrectAnswers: 0,
	userIncorrectAnswers: 0,
	totalQuestionsAsked: 0,
	gameOver: false,


	verifyAnswer: function(){
		var answerNumber = "";
		var correctAnswer = "";
		// if no answer selected (timeout) then set the array id of the answer to -1, valid options are 1 to 4
		
		if (gameData.answerSelected === false){
			this.currentUserAnswer  = "-1";
		}
		// convert the string to an integer for use as array index
		answerNumber = parseInt(this.currentUserAnswer);
		correctAnswer = gameData.questionData[gameData.currentQuestion][5];
		// check if this is the correct answer
		if (this.currentUserAnswer === correctAnswer ){
			$('.modal').show();
			$('#info-message-title').html('<p>Correct Answer!</p>');
			$('#messages').html('<p> You correctly answered ' + gameData.questionData[gameData.currentQuestion][answerNumber] + '</p><br><p> Congratulations! </p>');
			
			// increment the quiz counters
			this.userCorrectAnswers++;
			this.totalQuestionsAsked++;
			pauseForMsgDisplay = setTimeout(playQuiz.continueQuiz, 3 * 1000);
		} 
		else if (answerNumber > 0) {
			
			$('.modal').show();
			$('#info-message-title').html('<p>Incorrect Answer!</p>');
			$('#messages').html("<br><p> The correct answer is: </p><br><p> " + gameData.questionData[gameData.currentQuestion][correctAnswer] + '</p>');
	        this.userIncorrectAnswers++;
			this.totalQuestionsAsked++;	
			pauseForMsgDisplay = setTimeout(playQuiz.continueQuiz, 3 * 1000);
		}
		else  {
			$('.modal').show();
			$('#info-message-title').html('<p>No Answer Provided!</p>');
			$('#messages').html('<br><p> Please select an option before time runs out.</p><br>');
			$('#messages').append('<br><p> The correct answer is: </p><br><p>' + gameData.questionData[gameData.currentQuestion][correctAnswer] + '</p>');
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
		    $('#info-message-title').html('Score');
			$('#messages').html('<p> You got ' + playQuiz.userCorrectAnswers + ' questions correct out of ' + playQuiz.totalQuestionsAsked + ' total questions.</p>');
			if ( playQuiz.userCorrectAnswers === playQuiz.totalQuestionsAsked ){
				$('#messages').append('<p> You got all the questions correct! Wow - great job! </p>');	
			}
			pauseForMsgDisplay = setTimeout(gameData.goNoGoDecision,  1000 * 3);
		}

	}

}

$('document').ready(function(){
	// start the game 

	setTimeout(gameData.displayGameData, 1000 * 8);

})

