var questionElm = document.querySelector('#question')
var answersBtns = document.querySelectorAll('.answer')
var scoreElm = document.querySelector('#score-val')
var startBtn = document.querySelector('#start-btn')
var counter = document.querySelector('#counter')

var n1, n2, correctAnswer, answers = [], score =0, timer = 60, started = false, interval

startBtn.addEventListener('click', start)

function start (e) {
  n1 = rand(2, 9)
  n2 = rand(2, 9)
  
  correctAnswer = n1 * n2

  questionElm.innerText = n1 + ' X ' + n2

  for (var i =0; i < 4; i++) {
    do {
      answers[i] = rand(correctAnswer - 5, correctAnswer + 5)
    } while (answers[i] === correctAnswer)
  }
  
  answers[rand(0, 3)] = correctAnswer
  
  for (var i =0; i < 4; i++) {
    answersBtns[i].innerText = answers[i]
  }

  scoreElm.innerText = score
  startBtn.style.display = 'none'
  
  for (var i =0; i < 4; i++) {
    answersBtns[i].addEventListener('click', check)
  }

  if (!started) {
    interval = setInterval(function () {
      counter.innerText = --timer

      if (timer <= 0) {
        gameover()
      }
    }, 1000)
    started = true
  }
}

function check(e) {
  var answer = e.target.innerText
  
  if (answer == correctAnswer) {
    start()
    scoreElm.innerText = ++score
  } else {
    gameover()
  }
}

function rand(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

function gameover () {
  clearInterval(interval)
  alert('Game Over your score is: ' + score)
  location.reload()
}