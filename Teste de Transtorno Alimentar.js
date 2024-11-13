const questions = [
    "Você come em excesso quando está estressado(a) ou ansioso(a)?",
    "Você se sente culpado(a) ou envergonhado(a) após comer?",
    "Você tenta compensar o que comeu com exercícios excessivos ou restrição alimentar?",
    "Você se preocupa excessivamente com seu peso ou forma corporal?",
    "Você evita comer na frente dos outros por vergonha ou ansiedade?",
    "Você já usou laxantes, diuréticos ou jejum para perder peso?",
    "Você sente que não consegue controlar o quanto come em algumas situações?",
    "Você faz dietas ou restrições alimentares frequentes?",
    "Você sente que a comida controla sua vida de alguma forma?",
    "Você já teve um episódio em que comeu muito mais do que pretendia?",
    "Você come mesmo quando não está com fome?",
    "Você sente que seus hábitos alimentares afetam seu humor?",
    "Você tem medo de ganhar peso ou engordar?",
    "Você se sente ansioso(a) ou deprimido(a) devido à alimentação?",
    "Você já se machucou ou teve problemas de saúde relacionados à sua alimentação?"
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
        resultTextContent = "Preocupação alimentar: Baixa. Seus hábitos alimentares parecem saudáveis.";
    } else if (totalScore < 20) {
        resultTextContent = "Preocupação alimentar: Moderada. Pode haver algumas preocupações com a alimentação que merecem atenção.";
    } else {
        resultTextContent = "Preocupação alimentar: Alta. Seria interessante procurar orientação profissional para entender melhor seus hábitos alimentares.";
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
