$(document).ready(function () {

    var count = 0;

    var pfQuestions = $(".pfQuestions")

    var pfQuestion = $(".pfQuestion"); 

    var next =  $("#nextQuestion"); 
    var pfAnswer = $(".pfAnswer"); 
    var pfAnswer1 = $(".pfAnswer1"); 
    var pfAnswer2 = $(".pfAnswer2"); 
    var pfAnswer3 = $(".pfAnswer3"); 
    var pfAnswer4 = $(".pfAnswer4");
    var pfAnswer5 = $(".pfAnswer5");

//    var mainTitle = $("#mainTitle");
    var replay = $("#replay"); 
    var start = $("#start"); 
    var results = $(".results"); 


var gameObject = {

    pfQuestions: [
    "Which best describes your situation?",
    "How much do you smoke per day?",
    "What age range would you consider? (note: range floor is 18yrs, and ranges are adjusted accordingly)"
    ],

    pfAnswers: [
    ["Man looking for Woman", "Woman looking for Man", "Man looking for Man", "Woman looking for Woman", "Human looking for Pet Dog"],
    ["None", "half a pack", "pack", "two packs", "smoke anything I can find" ],
    ["my age +/- 3yrs", "my age +/- 5yrs", "my age +/- 10yrs", "my age +/- 15yrs", "my age +/- 20yrs"]
    
    ],


        // Start game on click of start button, hide everything until button is pressed
        startGame: function() {
            next.hide();
            pfAnswer1.hide();
            pfAnswer2.hide();
            pfAnswer3.hide();
            pfAnswer4.hide();
            pfAnswer5.hide();
            pfQuestion.hide();
            replay.hide();
            $("#startJumbo").show();
            $("#mainTitle").show();
            $("#startSurveyJumbo").hide();
            //On click, start the game, display the questions, and start the timer
            start.click(function() {
               gameObject.displayQuestion()
              // gameObject.timer();

           });
        },
        // When the an asnwer is picked do this...
    processAnswer: function () {
            pfAnswer.on("click", function () {
                //seclected answer is this
                selectedAnswer = $(this).text();

                console.log("selectedAnswer is: " + selectedAnswer)

                            //Display the next question
            gameObject.nextQuestion()
         
//after selecting the first three questions, 
//display the remaining the reamining 7 personality Qs
//and then find the match

//So 5 groups of 3 potential matches 
//all smokers end up a date with an oxygen station
//Pets are al dogs broken out by size, function, hypo allergenic etc
//
                    
           })//pfAnswer.onclick end

     },//processAnswer end



    //Displaying the question
    displayQuestion: function () {
        $("#startJumbo").hide();
        $("#mainTitle").hide();
        $("#startSurveyJumbo").hide();
        start.hide();
        next.hide();
        pfAnswer1.show();
        pfAnswer2.show();
        pfAnswer3.show();
        pfAnswer4.show();
        pfAnswer5.show();
        pfQuestion.show();

        pfQuestion.text(gameObject.pfQuestions[count]);
        console.log('pfQuestion: ' + count);
        //added a 1 after pfAnswer (below) was orig just pfAnswer
        pfAnswer1.text(gameObject.pfAnswers[count][0]);
        //            answer.text(gameObject.answers[0]);
        console.log('pfAnswer1: ' + count);
        pfAnswer2.text(gameObject.pfAnswers[count][1]);
        //            answer2.text(gameObject.answers[1]);
        console.log('pfAnswer2: ' + count);
        pfAnswer3.text(gameObject.pfAnswers[count][2]);
        //            answer3.text(gameObject.answers[2]);
        console.log('pfAnswer3: ' + count);
        pfAnswer4.text(gameObject.pfAnswers[count][3]);
        //            answer4.text(gameObject.answers[3]);
        console.log('pfAnswer4: ' + count);
        pfAnswer5.text(gameObject.pfAnswers[count][4]);
        //            answer5.text(gameObject.answers[4]);
        console.log('pfAnswer5: ' + count);
        results.empty();
        //$("#timer").show();
        },

//Survey: displaySurvey
    displaySurvey: function(){
    console.log("SURVEY CALLED!!!")
        $("#startJumbo").hide();
        $("#mainTitle").hide();
        $("#startSurveyJumbo").show();
        start.hide();
        next.hide();
        pfAnswer1.hide();
        pfAnswer2.hide();
        pfAnswer3.hide();
        pfAnswer4.hide();
        pfAnswer5.hide();
        pfQuestion.hide();

},


    //Next Question
    nextQuestion: function () {
            // If the count of questions is less than 9, increase count and display Question, Set timer to 30 and run timer
            if (count < 9) {
               count++;
               if (count < 3) {
               gameObject.displayQuestion();
           } else {
                gameObject.displaySurvey();
           }

           }
            //If count is greater then show Final Screen
            else {
              gameObject.endScreen();
          }

      },

    //End Screen
    endScreen: function() {
        results.html("<div class='finalScreen'><h2>Game Over</h2><br><h3>Correct Answers:"+ correctAnswers +"</h3><br><h3>Wrong Answers:"+ wrongAnswers +"</h3><br><button id='replay' class='btn btn-success'>Replay</button></div>")
        question.empty();
        pfAnswer1.empty();
        pfAnswer2.empty();
        pfAnswer3.empty();
        pfAnswer4.empty();
        pfAnswer5.empty();
        next.hide();
        //Run the restart function
        gameObject.restart();
        },
    //Restart Function
    restart: function() {
            //On button click ..
            $("#replay").click(function() {
                count = 0;
                //timer = 30;
                correctAnswers = 0;
                wrongAnswers = 0;
               // gameObject.timer();
                gameObject.displayQuestion();
            });
        }

}

gameObject.startGame();
gameObject.processAnswer();


});
