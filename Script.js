const questions = [
    {
        question: "What fruit is most eaten in the world?",
        answers: [
            { text: "Apple", correct: false },
            { text: "Orange", correct: false },
            { text: "Strawberries", correct: false },
            { text: "Banana", correct: true }
        ]
    },
    {
        question: "Which animal sleeps the most?",
        answers: [
            { text: "Cat", correct: false },
            { text: "sloth", correct: false },
            { text: "koala", correct: true },
            { text: "bat", correct: false }
        ]
    },
    {
        question: "What’s the name for the dot over the letter “i”?",
        answers:[
            { text: "Puncule" , correct:false},
            { text: "Tittle", correct:true},
            { text: "Speck", correct:false},
            { text: "Ditz", correct:false}
        ]
    },
    {
        question: "Which country invented ice cream?",
        answers: [
            { text: "USA", correct: false },
            { text: "Italy", correct: false },
            { text: "France", correct: false },
            { text: "China", correct: true }
        ]
    },
    {
        question:"In the Pac-Man video game, what is the name of the pink ghost?",
        answers:[
            { text: "Blinky" , correct: false},
            { text: "Pinky", correct: true},
            { text: "Inky", correct: false},
            { text: "Clyde", correct: false}
        ]
    },
    {
        question: "What is the national animal of Scotland?",
        answers: [
            { text: "Horse", correct: false },
            { text: "Unicorn", correct: true },
            { text: "Bull", correct: false },
            { text: "Lion", correct: false }
        ]
    },
    {
        question: "Which animal can hold its breath longer than a dolphin?",
        answers:[
            { text: "Sloth" , correct:true},
            { text: "Seal", correct:false},
            { text: "Penguin", correct:false},
            { text: "Platypus", correct:false}
        ]
    },
    {
        question: "Which ancient people invented the toothbrush?",
        answers: [
            { text: "Egyptians", correct: true },
            { text: "Romans", correct: false },
            { text: "Greeks", correct: false },
            { text: "Africans", correct: false }
        ]
    },
    {
        question: "Which planet rains diamonds?",
        answers:[
            { text: "Venus" , correct:false},
            { text: "Jupiter", correct:false},
            { text: "Pluto", correct:false},
            { text: "Uranus", correct:true}
        ]
    },
    {
        question: "What animal’s milk is pink?",
        answers:[
            { text: "Hippopotamus" , correct:true},
            { text: "Flamingo", correct:false},
            { text: "Elephant", correct:false},
            { text: "Camel", correct:false}
        ]
    }
];

const questionElement = document.getElementById("questions");
const answerButtons = document.getElementById("answer-buttons");
const NextButton = document.getElementById("button");

let currentQuestionIndex = 0;
let score = 0;

function StartQuizz() {
    currentQuestionIndex = 0;
    score = 0;
    NextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    resetState();

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = "true";
        }

        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    NextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Quiz completed! You scored ${score} out of ${questions.length}!`;
    NextButton.innerHTML = "Play again";
    NextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

NextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        StartQuizz();
    }
});

StartQuizz();
