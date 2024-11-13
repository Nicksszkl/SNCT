const questions = [
    "Você se sente confiante sobre suas habilidades e qualidades?",
    "Você se sente confortável ao receber elogios?",
    "Você acredita que merece coisas boas em sua vida?",
    "Você se sente satisfeito com quem você é como pessoa?",
    "Você se compara frequentemente com os outros?",
    "Você evita situações onde possa ser julgado?",
    "Você sente orgulho das suas conquistas?",
    "Você se critica severamente quando comete um erro?",
    "Você sente que é uma pessoa valiosa e digna de respeito?",
    "Você acha fácil aceitar suas falhas e imperfeições?",
    "Você se sente confortável ao expressar sua opinião em público?",
    "Você acredita que tem controle sobre sua própria vida?",
    "Você evita estabelecer metas por medo de falhar?",
    "Você se sente digno de amor e aceitação?",
    "Você sente que suas opiniões e sentimentos são importantes?"
];

const totalQuestions = questions.length;
let currentQuestionIndex = 0;
let answers = new Array(totalQuestions).fill(null);

// Seletores de elementos HTML
const questionText = document.getElementById("question-text");
const currentQuestion = document.getElementById("current-question");
const options = document.getElementsByName("answer");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const resultText = document.getElementById("result-text");

function showQuestion(index) {
    questionText.textContent = questions[index];
    currentQuestion.textContent = index + 1;

    // Carregar a resposta previamente selecionada (se houver)
    const selectedAnswer = answers[index];
    options.forEach(option => {
        option.checked = parseInt(option.value) === selectedAnswer;
    });

    // Habilitar/desabilitar botão "Voltar" conforme necessário
    prevBtn.disabled = index === 0;
}

function showResult() {
    const totalScore = answers.reduce((acc, answer) => acc + answer, 0);
    let resultMsg;
    if (totalScore < 15) {
        resultMsg = "Nível de autoestima baixo. Considere trabalhar mais na valorização de si mesmo.";
    } else if (totalScore < 30) {
        resultMsg = "Nível de autoestima moderado. Com pequenas mudanças, você pode melhorar sua autoestima.";
    } else {
        resultMsg = "Nível de autoestima elevado. Continue cultivando essa confiança!";
    }
    resultText.textContent = resultMsg;
    resultContainer.style.display = "block";
}

nextBtn.addEventListener("click", () => {
    const selectedOption = Array.from(options).find(opt => opt.checked);
    if (selectedOption) {
        answers[currentQuestionIndex] = parseInt(selectedOption.value);
        if (currentQuestionIndex < totalQuestions - 1) {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
        } else {
            showResult();
        }
    } else {
        alert("Por favor, selecione uma opção antes de continuar.");
    }
});

prevBtn.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
    }
});

// Exibe a primeira pergunta ao iniciar
showQuestion(currentQuestionIndex);
