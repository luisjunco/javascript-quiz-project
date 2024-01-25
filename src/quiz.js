class Quiz {
    constructor(questions, timeLimit, timeRemaining) {
        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;
    }

    getQuestion() {
        return this.questions[this.currentQuestionIndex];
    }

    moveToNextQuestion() {
        this.currentQuestionIndex++;
    }

    shuffleQuestions() {
        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = this.questions[i];
            this.questions[i] = this.questions[j];
            this.questions[j] = temp;
        }
    }

    checkAnswer(answer) {
        const currentQuestion = this.getQuestion();
        if (answer === currentQuestion.answer) {
            this.correctAnswers++;
        }
    }

    hasEnded() {
        return this.currentQuestionIndex === this.questions.length;
    }

    filterQuestionsByDifficulty(difficulty) {
        if (typeof difficulty !== "number" || difficulty < 1 || difficulty > 3) {
            return;
        }
        this.questions = this.questions.filter(question => question.difficulty === difficulty);
    }

    averageDifficulty() {
        const totalDifficulty = this.questions.reduce((acc, currentValue) => {
            return acc + currentValue.difficulty;
        }, 0);

        return totalDifficulty / this.questions.length;
    }
}

