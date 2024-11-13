const questions = [
    "Você sente que sua felicidade depende de uma pessoa específica?",
    "Você sente medo de perder alguém, mesmo que não tenha motivo?",
    "Você evita tomar decisões importantes sem consultar alguém?",
    "Você se sente ansioso(a) quando essa pessoa não responde suas mensagens imediatamente?",
    "Você costuma mudar seus planos para agradar essa pessoa?",
    "Você tem dificuldade em dizer 'não' para essa pessoa?",
    "Você se sente inseguro(a) quando essa pessoa está com outras pessoas?",
    "Você sente necessidade de estar constantemente em contato com essa pessoa?",
    "Você evita expressar seus sentimentos para não desagradar essa pessoa?",
    "Você sente que sua vida gira em torno de agradar essa pessoa?",
    "Você sente que faria qualquer coisa para manter essa pessoa em sua vida?",
    "Você se sente incompleto(a) quando não está com essa pessoa?",
    "Você se preocupa excessivamente com a opinião dessa pessoa sobre você?",
    "Você costuma se sentir culpado(a) ao fazer algo sem essa pessoa?",
    "Você sente que sua autoestima depende da aceitação dessa pessoa?"
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
        resultTextContent = "Nível de dependência emocional: Baixo. Você tende a ser emocionalmente independente.";
    } else if (totalScore < 20) {
        resultTextContent = "Nível de dependência emocional: Moderado. Você demonstra alguns sinais de dependência emocional.";
    } else {
        resultTextContent = "Nível de dependência emocional: Alto. Você pode estar fortemente dependente emocionalmente de alguém.";
    }

    resultText.textContent = resultTextContent;
    resultContainer.style.display = "block";
    document.getElementById("question-container").style.display = "none";

    // Redireciona o usuário para a página inicial ou outra página de testes após alguns segundos
    setTimeout(() => {
        window.location.href = "TesteConcluido.html"; 
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
