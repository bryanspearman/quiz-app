'use strict';

// Special thanks to Casey Capps my mentor for all of his guidance and teaching me how to properly organize my code 

const QUIZ = [
  {
    text: "Where did motocross get its start?",
    answers: [
      {text: "United States"},
      {text: "South America"},
      {text: "Europe", isCorrect: true},
      {text: "Australia"},
    ]
  },
  {
    text: "What does motocross stand for?",
    answers: [
      {text: "Motorcycle Cross-Trek"},
      {text: "Motorcycle Crossing"},
      {text: "Motorcyclist Criss-Cross"},
      {text: "Motorcycles Cross Country", isCorrect: true},
    ]
  },
  {
    text: "How is a winner determined in an outdoor motocross race?",
    answers: [
      {text: "Qualifying followed by a main event - winner take all"},
      {text: "Two races with the winner having the lowest combined score", isCorrect: true},
      {text: "Three races with the winner having the highest combined score"},
      {text: "One race - winner take all"},
    ]
  },
  {
    text: "What is the nickname for the small building most often found in the middle of the starting gate?",
    answers: [
      {text: "The Dog House", isCorrect: true},
      {text: "The Latch"},
      {text: "The Jumper"},
      {text: "The Barn"},
    ]
  },
  {
    text: "What sign is shown to the riders on the starting gate?",
    answers: [
      {text: "The Go Sign"},
      {text: "The 30 Second Board", isCorrect: true},
      {text: "The Drop Sign"},
      {text: "The 10 Second Signal"},
    ]
  },
  {
    text: "What series of obstacles is shaped like small rolling hills one after another?",
    answers: [
      {text: "Waves"},
      {text: "Camel Backs"},
      {text: "Table Tops"},
      {text: "Rollers", isCorrect: true},
    ]
  },
  {
    text: "How many riders typcially make up the starting gate at a pro motocross event?",
    answers: [
      {text: "55"},
      {text: "50"},
      {text: "40", isCorrect: true},
      {text: "20"},
    ]
  },
  {
    text: "What famous American motocross track is located in New Berlin, New York?",
    answers: [
      {text: "Glen Helen"},
      {text: "Unadilla", isCorrect: true},
      {text: "High Point"},
      {text: "Thunder Valley"},
    ]
  },
  {
    text: "Who is the first rider to ever acheive a \"Perfect Season\"?",
    answers: [
      {text: "Ricky Carmichael", isCorrect: true},
      {text: "Bob Hannah"},
      {text: "Jeremy McGrath"},
      {text: "Stephan Everts"},
    ]
  },
  {
    text: "What motocross rider is considered to be the \"Greatest of All Time\"?",
    answers: [
      {text: "Roger DeCoster"},
      {text: "Ricky Carmichael", isCorrect: true},
      {text: "James Stewart"},
      {text: "Ryan Dungey"},
    ]
  },
];



// Functions to determine the correct answers, keep the score and display the correct answer 

let answers = []
function correctAnswerFilter(answer) {
  return answer.isCorrect;
}
function currentScore() {
  const filteredAnswers = answers.filter(correctAnswerFilter);
  return filteredAnswers.length;
}
function displayCorrectAnswer(quiz=QUIZ) {
  let correctAnswer = quiz[answers.length-1].answers.find(correctAnswerFilter);
  return correctAnswer.text;
}



// This generates the landing page for the quiz 

function createStartPage() {
  console.log("createStartPage ran");
   $('.container').html(`
        <header role="banner">
      <h1>Motocross Quiz</h1>
      <h2>Test your knowledge of motocross terms and history!</h2>
    </header>
    <main role="main">
      <div class="quizStart">
        <button type="button" class="startButton">Take the Quiz!</button>
      </div>
    </main>`);
}
function startQuiz() {
  $('.container').on('click', '.startButton', function (event) {
    $(createQuizPage);
});
}


// This generates the question and answers and displays what question the user is on as well as their current score

function createQuizPage() {
  console.log("createQuizPage ran");
   $('.container').html(`
  <header role="banner">
      <h1>Motocross Quiz</h1>
      <div class="scoreArea">
      <ul>
        <li>Question: <span class="questionNumber">${answers.length+1}</span>/${QUIZ.length}</li>
        <li>Score: <span class="score">${currentScore()}</span>/${QUIZ.length}</li>
      </ul>
      </div>
    </header>
    <main role="main">
  <div class="quizArea">
  <h2>${QUIZ[answers.length].text}</h2>
    <form>
    <fieldset>
    <legend>Select Your Answer</legend>
    ${
      QUIZ[answers.length].answers.map(function(answer, index) {
       return `
      <label class="answerChoice">
        <input type="radio" value="${index}" name="answer" required>
        <span>${answer.text}</span>
      </label>
        `
      })
    .join('\n')
  }
    <button type="submit" class="submitButton">Check Answer</button>
    </fieldset>
    </form>
    </div>
    </main>`)
}



//  This function determines the user's answer choice  

function checkAnswer() {
  $('.container').on('submit', 'form', function (event) {
    event.preventDefault();
    const formData = $(this).serializeArray();
    const selectedValue = formData[0].value;
    const selectedAnswer = QUIZ[answers.length].answers[selectedValue];
    answers.push(selectedAnswer);
    displayFeedback(selectedAnswer);

});
}


// These functions let the user know if their answer is right or wrong and provides an option to continue to the next question

function displayFeedback(answer) {
  console.log("displayFeedback ran");
  const correctMessage = 'Hey that\'s right!';
  const wrongMessage = 'Sorry that\'s incorrect.';
    return $('.container').html(`
  <header role="banner">
      <h1>Motocross Quiz</h1>
      <div class="scoreArea">
      <ul>
        <li>Question: <span class="questionNumber">${answers.length}</span>/${QUIZ.length}</li>
        <li>Score: <span class="score">${currentScore()}</span>/${QUIZ.length}</li>
      </ul>
      </div>
    </header>
    <main role="main">
  <div class="quizArea">
    <h2>${answer.isCorrect? correctMessage: wrongMessage}</h2>
   <p>The correct answer is: <span class="underline">${displayCorrectAnswer()}</span></p>
    <button type="button" class="nextButton">${answers.length < QUIZ.length? 'Next Question': 'See How You Did'}</button>
    </div></main>`)
}

function nextQuestion() {
  $('.container').on('click', '.nextButton', function (event) {
    if (answers.length < QUIZ.length) {
      createQuizPage();
    }
    else {
      createResultsPage();
    }
});
}


// These functions display a 'final page' showing a message to the user based on their score along with their final score and also displays a 'restart quiz' button

function createResultsPage() {
  console.log("createResultsPage ran");
  const finalScore = currentScore();
  const messageGold = 'Heck yea! You\'re one of us! A true motocross enthusiast!';
  const messageSilver = 'Hey not bad! You\'re pretty knowledgable about motocross.';
  const messageBronze = 'Whoa Nelly! Based on this score you\'re not very familiar with motocross. Try again!';
  let scoreMessage = messageBronze;
  if (finalScore >= 10) {
    scoreMessage = messageGold;
  } else if (finalScore >= 6) {
    scoreMessage = messageSilver;
  }
  $('.container').html(`
  <header role="banner">
      <h1>Motocross Quiz</h1>
      </header>
    <main role="main">
  <div class="quizArea">
    <h2>${scoreMessage}</h2>
    <p>You scored: <span class="score">${currentScore()}</span>/${QUIZ.length}</p>
    <button type="button" class="restartButton">Restart Quiz</button>
    <p>See if your friends know their stuff! Share the quiz!</p>
    <a href="#"><img src="http://www.bryanspearman.info/images/social.png" alt="fake social media buttons"/></a>
    </div></main>`);
}

function restartQuiz() {
  $('.container').on('click', '.restartButton', function (event) {
   answers = [];
   createStartPage();
});
}



// Aside from 'createStartPage()' these are all event listeners that execute the app's functions 

function generateQuiz() {
  createStartPage();
  startQuiz();
  checkAnswer();
  nextQuestion();
  restartQuiz();
}


//This jQuery call waits until the page fully loads before running

$(generateQuiz);








