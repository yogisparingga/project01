// Game State
let gameState = {
    difficulty: 'easy',
    currentQuestion: 0,
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    totalQuestions: 10,
    timeLeft: 30,
    timerInterval: null,
    questions: []
};

// Difficulty Settings
const difficultySettings = {
    easy: {
        name: 'Mudah',
        maxNumber: 20,
        operations: ['+', '-'],
        timePerQuestion: 30
    },
    medium: {
        name: 'Sedang',
        maxNumber: 50,
        operations: ['+', '-', '*'],
        timePerQuestion: 25
    },
    hard: {
        name: 'Sulit',
        maxNumber: 100,
        operations: ['+', '-', '*', '/'],
        timePerQuestion: 20
    }
};

// Start Game
function startGame(difficulty) {
    gameState.difficulty = difficulty;
    gameState.currentQuestion = 0;
    gameState.score = 0;
    gameState.correctAnswers = 0;
    gameState.wrongAnswers = 0;
    gameState.questions = [];

    // Hide start screen, show game screen
    document.getElementById('startScreen').classList.add('hidden');
    document.getElementById('gameScreen').classList.remove('hidden');

    // Set difficulty badge
    const badge = document.getElementById('difficultyBadge');
    badge.textContent = difficultySettings[difficulty].name;
    badge.className = `difficulty-badge ${difficulty}`;

    // Generate all questions
    generateQuestions();

    // Load first question
    loadQuestion();
}

// Generate Questions
function generateQuestions() {
    const settings = difficultySettings[gameState.difficulty];

    for (let i = 0; i < gameState.totalQuestions; i++) {
        gameState.questions.push(generateQuestion(settings));
    }
}

// Generate Single Question
function generateQuestion(settings) {
    const operation = settings.operations[Math.floor(Math.random() * settings.operations.length)];
    let num1, num2, correctAnswer;

    switch(operation) {
        case '+':
            num1 = Math.floor(Math.random() * settings.maxNumber) + 1;
            num2 = Math.floor(Math.random() * settings.maxNumber) + 1;
            correctAnswer = num1 + num2;
            break;
        case '-':
            num1 = Math.floor(Math.random() * settings.maxNumber) + 1;
            num2 = Math.floor(Math.random() * num1) + 1;
            correctAnswer = num1 - num2;
            break;
        case '*':
            num1 = Math.floor(Math.random() * 12) + 1;
            num2 = Math.floor(Math.random() * 12) + 1;
            correctAnswer = num1 * num2;
            break;
        case '/':
            num2 = Math.floor(Math.random() * 10) + 1;
            correctAnswer = Math.floor(Math.random() * 10) + 1;
            num1 = num2 * correctAnswer;
            break;
    }

    // Generate wrong answers
    const wrongAnswers = generateWrongAnswers(correctAnswer, settings.maxNumber);

    return {
        question: `${num1} ${operation} ${num2}`,
        correctAnswer: correctAnswer,
        answers: shuffleArray([correctAnswer, ...wrongAnswers])
    };
}

// Generate Wrong Answers
function generateWrongAnswers(correctAnswer, maxRange) {
    const wrongAnswers = new Set();

    while (wrongAnswers.size < 3) {
        let wrong;
        const variance = Math.floor(Math.random() * 20) + 1;

        if (Math.random() > 0.5) {
            wrong = correctAnswer + variance;
        } else {
            wrong = correctAnswer - variance;
        }

        if (wrong > 0 && wrong !== correctAnswer) {
            wrongAnswers.add(wrong);
        }
    }

    return Array.from(wrongAnswers);
}

// Shuffle Array
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Load Question
function loadQuestion() {
    if (gameState.currentQuestion >= gameState.totalQuestions) {
        endGame();
        return;
    }

    const question = gameState.questions[gameState.currentQuestion];

    // Update UI
    document.getElementById('currentQuestion').textContent = gameState.currentQuestion + 1;
    document.getElementById('score').textContent = gameState.score;
    document.getElementById('question').textContent = `Berapa ${question.question} ?`;

    // Update progress bar
    const progress = ((gameState.currentQuestion) / gameState.totalQuestions) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;

    // Generate answer buttons
    const answersContainer = document.getElementById('answersContainer');
    answersContainer.innerHTML = '';

    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = answer;
        button.onclick = () => checkAnswer(answer, button);
        answersContainer.appendChild(button);
    });

    // Start timer
    startTimer();
}

// Start Timer
function startTimer() {
    const settings = difficultySettings[gameState.difficulty];
    gameState.timeLeft = settings.timePerQuestion;
    document.getElementById('timer').textContent = gameState.timeLeft;

    clearInterval(gameState.timerInterval);

    gameState.timerInterval = setInterval(() => {
        gameState.timeLeft--;
        document.getElementById('timer').textContent = gameState.timeLeft;

        if (gameState.timeLeft <= 0) {
            clearInterval(gameState.timerInterval);
            // Time's up - treat as wrong answer
            handleWrongAnswer();
        }
    }, 1000);
}

// Check Answer
function checkAnswer(selectedAnswer, button) {
    clearInterval(gameState.timerInterval);

    const question = gameState.questions[gameState.currentQuestion];
    const allButtons = document.querySelectorAll('.answer-btn');

    // Disable all buttons
    allButtons.forEach(btn => btn.disabled = true);

    if (selectedAnswer === question.correctAnswer) {
        // Correct answer
        button.classList.add('correct');
        gameState.correctAnswers++;

        // Calculate score based on time left
        const timeBonus = gameState.timeLeft * 10;
        const baseScore = 100;
        gameState.score += baseScore + timeBonus;

        document.getElementById('score').textContent = gameState.score;
    } else {
        // Wrong answer
        button.classList.add('wrong');
        handleWrongAnswer();

        // Show correct answer
        allButtons.forEach(btn => {
            if (parseInt(btn.textContent) === question.correctAnswer) {
                btn.classList.add('correct');
            }
        });
    }

    // Move to next question after delay
    setTimeout(() => {
        gameState.currentQuestion++;
        loadQuestion();
    }, 1500);
}

// Handle Wrong Answer
function handleWrongAnswer() {
    gameState.wrongAnswers++;
}

// End Game
function endGame() {
    clearInterval(gameState.timerInterval);

    // Hide game screen, show result screen
    document.getElementById('gameScreen').classList.add('hidden');
    document.getElementById('resultScreen').classList.remove('hidden');

    // Display results
    document.getElementById('finalScore').textContent = gameState.score;
    document.getElementById('correctAnswers').textContent = gameState.correctAnswers;
    document.getElementById('wrongAnswers').textContent = gameState.wrongAnswers;

    // Display message based on performance
    const percentage = (gameState.correctAnswers / gameState.totalQuestions) * 100;
    const messageElement = document.getElementById('resultMessage');

    if (percentage === 100) {
        messageElement.textContent = '🌟 Sempurna! Anda adalah jenius matematika!';
        messageElement.style.color = '#84fab0';
    } else if (percentage >= 80) {
        messageElement.textContent = '🎉 Luar biasa! Sangat bagus!';
        messageElement.style.color = '#667eea';
    } else if (percentage >= 60) {
        messageElement.textContent = '👍 Bagus! Terus berlatih!';
        messageElement.style.color = '#ffa751';
    } else {
        messageElement.textContent = '💪 Jangan menyerah! Coba lagi!';
        messageElement.style.color = '#f5576c';
    }
}

// Restart Game
function restartGame() {
    document.getElementById('resultScreen').classList.add('hidden');
    document.getElementById('startScreen').classList.remove('hidden');
}
