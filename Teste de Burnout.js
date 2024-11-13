const questions = [
    "Você se sente constantemente exausto(a), mesmo após uma boa noite de sono?",
    "Você tem dificuldade em se concentrar nas tarefas do dia a dia?",
    "Você sente que seu trabalho ou rotina perdeu o sentido ou a motivação?",
    "Você se sente irritado(a) ou impaciente com mais frequência do que o normal?",
    "Você sente que seu desempenho no trabalho ou estudos está piorando?",
    "Você evita atividades sociais ou interações com outras pessoas?",
    "Você tem a sensação de que está sobrecarregado(a) com responsabilidades?",
    "Você tem dores de cabeça frequentes ou problemas de saúde relacionados ao estresse?",
    "Você sente que não consegue lidar com problemas inesperados?",
    "Você se sente apático(a) em relação às coisas que antes gostava?",
    "Você tem pensamentos negativos frequentes sobre suas capacidades ou sobre o futuro?",
    "Você sente que não tem tempo suficiente para relaxar ou cuidar de si mesmo(a)?",
    "Você tem dificuldade para dormir ou permanece acordado(a) pensando nos problemas?",
    "Você se sente desconectado(a) dos outros, mesmo quando está com pessoas conhecidas?",
    "Você acha que está sempre preocupado(a) com tarefas futuras ou prazos?"
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
        resultTextContent = "Nível de burnout: Baixo. Você parece estar gerenciando bem o estresse.";
    } else if (totalScore < 20) {
        resultTextContent = "Nível de burnout: Moderado. Alguns sinais de estresse estão presentes.";
    } else {
        resultTextContent = "Nível de burnout: Alto. É importante considerar buscar apoio ou ajustar sua rotina.";
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
