const questions = [
    "Você evita confrontos, mesmo que esteja certo?",
    "Você sente ansiedade ao lidar com pessoas em situações de conflito?",
    "Você se esforça para entender o ponto de vista dos outros em uma discussão?",
    "Você acha difícil expressar sua opinião em desacordos?",
    "Você tenta encontrar um meio-termo ao lidar com conflitos?",
    "Você guarda ressentimentos após discussões?",
    "Você costuma ceder para evitar uma discussão?",
    "Você fica irritado(a) facilmente em situações de confronto?",
    "Você prefere resolver as coisas rapidamente em vez de prolongar uma discussão?",
    "Você considera as emoções das outras pessoas em um conflito?",
    "Você evita discutir problemas até que eles se tornem muito grandes?",
    "Você tenta ver o lado positivo dos outros mesmo em desacordos?",
    "Você se preocupa em resolver conflitos de maneira justa?",
    "Você se sente calmo(a) em situações de confronto?",
    "Você acredita que aprender a lidar com conflitos é importante para o crescimento pessoal?"
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
    currentQuestion.textContent = `Pergunta ${index + 1} de ${totalQuestions}`;

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
    let resultTextContent = "";

    if (totalScore < 10) {
        resultTextContent = "Nível de habilidade interpessoal em conflitos: Baixo.";
    } else if (totalScore < 20) {
        resultTextContent = "Nível de habilidade interpessoal em conflitos: Moderado.";
    } else {
        resultTextContent = "Nível de habilidade interpessoal em conflitos: Elevado.";
    }

    resultText.textContent = resultTextContent;
    resultContainer.style.display = "block";
    document.getElementById("quiz-container").style.display = "none";

    // Redireciona o usuário para a página de testes após um tempo
    setTimeout(() => {
        window.location.href = "Teste SPSI.html"; 
    }, 5000);
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

