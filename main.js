let question_Number = 0;
let current_Score = 0;

function startQuiz() {
  $('main button').on('click', function() {
    generateQuestion();
    $('.startQuiz').remove();
  })
}

function generateQuestion() {
  if (question_Number < STORE.length) {
    updateInfo();
    $('.quiz').html(
      `
      <fieldset>
        <form id="quiz-area">
        <h3 class="question">${STORE[question_Number].question}</h3>

        <input type = "radio" name="choices" id="a" value="${STORE[question_Number].choice[0]}" required>
        <label for = "a">${STORE[question_Number].choice[0]}</label><br>

        <input type = "radio" name="choices" id="b" value="${STORE[question_Number].choice[1]}">
        <label for = "b">${STORE[question_Number].choice[1]}</label><br>

        <input type="radio" name="choices" id="c" value="${STORE[question_Number].choice[2]}">
        <label for = "c">${STORE[question_Number].choice[2]}</label><br>

        <input type="radio" name="choices" id="d" value="${STORE[question_Number].choice[3]}">
        <label for = "d">${STORE[question_Number].choice[3]}</label>

        <button type="submit">Submit</button>
        </form> 
      </fieldset>  
      `
    )
  }
  else {
    updateInfo();
    overall();
  }  
}

function submitAnswer() {
  $('.quiz').submit('form button', function(event) {
    event.preventDefault();
    let correct_Answer = STORE[question_Number].correct;
    let user_Answer = $('form input:checked').val();
    if (correct_Answer == user_Answer) {
      current_Score ++;
      rightAnswerPage();
    }
    else {
      wrongAnswerPage();
    }
  })
}

// show the correct answer to the user
function rightAnswerPage() {
  $('.quiz').html(
    `
    <h2 class="correct">Correct!</h2>
    <img class="feedback-image" src="https://www.konfest.com/wp-content/uploads/2019/05/Konfest-PNG-JPG-Image-Pic-Photo-Free-Download-Royalty-Unlimited-clip-art-sticker-Check-Mark-Symbol-Right-Tick-Yes-Green-6.png" alt="Correct Answer!">

    <button class="nextOne">Next</button>
    `
  )
}

function wrongAnswerPage() {
  $('.quiz').html(
    `
    <h2 class="incorrect">Incorrect! The right answer is:  ${STORE[question_Number].correct}</h2>
    <img class="feedback-image" src="https://cdn.pixabay.com/photo/2014/03/24/13/45/incorrect-294245_960_720.png" alt="InCorrect Answer!">

    <button class="nextOne">Next</button>
    `
  )
}

function nextQuestion() {
  $('.quiz').on('click','.nextOne',function() {
    question_Number ++;
    generateQuestion();
  })
}

function updateInfo() {
  if (question_Number == 10) {
    question_Number --;
  }
  $('.score').html(
    `
    <h2>Questions: <span>${question_Number +1}/10</span></h2>
    <h2>Score: <span>${current_Score}/10</span></h2>
    `
  )
}

function overall() {
  if (current_Score >= 9) {
    $('.quiz').html(
      `<h2>Your final score is: ${current_Score}/10</h2>
      <h3>Good job! You can be a good driver!</h3>
      `
    )
  }
  else if (current_Score >=6) {
    $('.quiz').html(
    `<h2>Your final score is: ${current_Score}/10
    </h2>
    <h3>Not good enough, you need more practice!</h3>`
    )
  }
  else {
    $('.quiz').html(
    `<h2>Your final score is: ${current_Score}/10
    </h2>
    <h3>Are you kidding me? You must be drunk!</h3>`
    )
  }
  $('.quiz').append(
    `
    <h3 class="report">Retake the quiz</h3>
    <input type="image" id="retake" src="http://www.clker.com/cliparts/K/E/a/7/s/a/anticlockwise-green-arrow-hi.png" alt="Retake the Quiz">
    <h3>Or</h3>    
    <button class="backHome">Done</button>
    `
  )
}

function retakeQuiz() {
  $('.quiz').on('click','#retake',function() {
    question_Number = 0;
    current_Score = 0;
    generateQuestion();
  })
}

function finishQuiz() {
  $('.quiz').on('click','.backHome', function() {
    $('.quiz').html(
      `
      <h2>Thank you. See you next time! Drive SAFE!</h2>`
    )
  })
}

function createQuiz() {
  $(startQuiz)
  $(submitAnswer)
  $(nextQuestion)
  $(retakeQuiz)
  $(finishQuiz)
}

$(createQuiz);