document.addEventListener("DOMContentLoaded", () => {
  /************  HTML ELEMENTS  ************/
  // View divs
  const quizView = document.querySelector("#quizView");
  const endView = document.querySelector("#endView");

  // Quiz view elements
  const progressBar = document.querySelector("#progressBar");
  const questionCount = document.querySelector("#questionCount");
  const questionContainer = document.querySelector("#question");
  const choiceContainer = document.querySelector("#choices");
  const nextButton = document.querySelector("#nextButton");

  // End view elements
  const resultContainer = document.querySelector("#result");

  // Restart button
  const restartButton = document.getElementById("restartButton");

  /************  SET VISIBILITY OF VIEWS  ************/

  // Show the quiz view (div#quizView) and hide the end view (div#endView)
  quizView.style.display = "block";
  endView.style.display = "none";


  /************  QUIZ DATA  ************/
  
  // Array with the quiz questions
  const questions = [
    new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", 1),
    new Question("What is the capital of France?", ["Miami", "Paris", "Oslo", "Rome"], "Paris", 1),
    new Question("Who created JavaScript?", ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"], "Brendan Eich", 2),
    new Question("What is the mass–energy equivalence equation?", ["E = mc^2", "E = m*c^2", "E = m*c^3", "E = m*c"], "E = mc^2", 3),
    // Add more questions here
  ];
  const quizDuration = 120; // 120 seconds (2 minutes)


  /************  QUIZ INSTANCE  ************/
  
  // Create a new Quiz instance object
  const quiz = new Quiz(questions, quizDuration, quizDuration);
  // Shuffle the quiz questions
  quiz.shuffleQuestions();



  /************  TIMER  ************/

  let timer;

  function startTimer(){
    timer = setInterval(() => {
      quiz.timeRemaining--;
  
      if(quiz.timeRemaining === 0){
        clearInterval(timer);
        showResults();
      } else {
        showCurrentTime();
      }
    }, 1000);
  }


  /************  SHOW INITIAL CONTENT  ************/

  showQuestion(); // Show first question
  startTimer();
  showCurrentTime();


  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);
  restartButton.addEventListener("click", restartButtonHandler);
  



  /************  FUNCTIONS  ************/

  // showCurrentTime() - Displays the current time
  // showQuestion() - Displays the current question and its choices
  // nextButtonHandler() - Handles the click on the next button
  // showResults() - Displays the end view and the quiz results
  // restartButtonHandler() - Restarts the quiz


  function showCurrentTime() {
    // Convert the time remaining in seconds to minutes and seconds, and pad the numbers with zeros if needed
    const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
    const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

    // Display the time remaining in the time remaining container
    const timeRemainingContainer = document.getElementById("timeRemaining");
    timeRemainingContainer.innerText = `${minutes}:${seconds}`;
  }


  function showQuestion() {
    // If the quiz has ended, show the results
    if (quiz.hasEnded()) {
      showResults();
      return;
    }

    // Clear the previous question text and question choices
    questionContainer.innerText = "";
    choiceContainer.innerHTML = "";

    // Get the current question from the quiz by calling the Quiz class method `getQuestion()`
    const question = quiz.getQuestion();
    // Shuffle the choices of the current question by calling the method 'shuffleChoices()' on the question object
    question.shuffleChoices();
    
    
    // 1. Show the question
    // Update the inner text of the question container element and show the question text
    questionContainer.innerText = question.text;
    
    // 2. Update the green progress bar
    // Update the green progress bar (div#progressBar) width so that it shows the percentage of questions answered
    const percentage = (quiz.currentQuestionIndex + 1) / quiz.questions.length * 100;
    progressBar.style.width = `${percentage}%`; // This value is hardcoded as a placeholder



    // 3. Update the question count text 
    // Update the question count (div#questionCount) show the current question out of total questions
    
    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${quiz.questions.length}`; //  This value is hardcoded as a placeholder


    
    // 4. Create and display new radio input element with a label for each choice.
    question.choices.forEach(choiceText => {

      // generate kebab-case ids
      const id = choiceText.toLowerCase().replace(/\s+/g, '-');

      // create new input
      const newInput = document.createElement("input");
      newInput.setAttribute("type", "radio");
      newInput.setAttribute("name", "choice");
      newInput.setAttribute("value", choiceText);
      newInput.setAttribute("id", id);
      choiceContainer.appendChild(newInput);

      // create new label
      const newLabel = document.createElement("label");
      newLabel.innerText = choiceText;
      newLabel.setAttribute("for", id);
      choiceContainer.appendChild(newLabel);

      // create new br
      const newBr = document.createElement("br");
      choiceContainer.appendChild(newBr);
    });

  }


  
  function nextButtonHandler () {
    let selectedAnswer; // A variable to store the selected answer value

    // 1. Get all the choice elements. You can use the `document.querySelectorAll()` method.
    const choices = document.querySelectorAll("#choices input");

    // 2. Loop through all the choice elements and check which one is selected
    choices.forEach( choice => {
      if(choice.checked){
        selectedAnswer = choice.value;
      }
    });
      
    // 3. If an answer is selected (`selectedAnswer`), check if it is correct and move to the next question
    quiz.checkAnswer(selectedAnswer);
    quiz.moveToNextQuestion();
    showQuestion();
  }  




  function showResults() {

    // YOUR CODE HERE:
    //
    // 1. Hide the quiz view (div#quizView)
    quizView.style.display = "none";

    // 2. Show the end view (div#endView)
    endView.style.display = "flex";
    
    // 3. Update the result container (div#result) inner text to show the number of correct answers out of total questions
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`; // This value is hardcoded as a placeholder
  }


  function restartButtonHandler(){
        // 1. Hide the end view
        endView.style.display = "none";

        // 2. Show the quiz view
        quizView.style.display = "flex";
        
        // 3. Reset the quiz
        quiz.currentQuestionIndex = 0;
        quiz.correctAnswers = 0;
        quiz.timeRemaining = quizDuration;
        quiz.shuffleQuestions();
        showQuestion();
        startTimer();
        showCurrentTime();
  }
  
});