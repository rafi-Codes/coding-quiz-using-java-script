const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('option-buttons')

let shuffledQuestions, currentQuestionIndex, totalScore

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  totalScore = -5
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  answerButtonsElement.classList.remove('hide')
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    questionElement.innerText = 'Your Score is ' + totalScore
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
    answerButtonsElement.classList.add('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    totalScore++
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Which data structure uses the principle of Last-In-First-Out (LIFO)?',
    answers: [
      { text: 'Stack', correct: true },
      { text: 'Queue', correct: false }
    ]
  },
  {
    question: 'In Big-O notation, what is the time complexity of binary search?',
    answers: [
      { text: 'O(log n)', correct: true },
      { text: 'O(n)', correct: false },
      { text: 'O(1)', correct: false },
      { text: 'O(n log n)', correct: false }
    ]
  },
  {
    question: 'Which is not a programming language',
    answers: [
      { text: 'Python', correct: false },
      { text: 'HTML', correct: true },
      { text: 'C++', correct: false },
      { text: 'Java', correct: false }
    ]
  },
  {
    question: ' Which data structure is faster for searching in average case?',
    answers: [
      { text: 'Linked List', correct: false },
      { text: 'Hash Table', correct: true }
    ]
  },
  {
    question: 'Which one is used for making web apps attractive?',
    answers: [
      { text: 'Java Script', correct: false },
      { text: 'CSS', correct: true }
    ]
  }
]