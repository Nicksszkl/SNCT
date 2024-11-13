const questions = [
    "Você se sente nervoso, ansioso ou tenso frequentemente?",
    "Você acha difícil controlar suas preocupações?",
    "Você tem dificuldade em relaxar?",
    "Você sente que algo terrível pode acontecer a qualquer momento?",
    "Você se irrita com facilidade?",
    "Você tem dificuldade em se concentrar por causa da ansiedade?",
    "Você tem a sensação de que seu coração está acelerado?",
    "Você sente falta de ar ou dificuldade em respirar?",
    "Você sente náuseas ou dores de estômago relacionadas à ansiedade?",
    "Você sente tonturas ou fraqueza frequentemente?",
    "Você tem dificuldade para dormir por causa de preocupações?",
    "Você evita situações que te causam ansiedade?"
];

const totalQuestions = questions.length;
let currentQuestionIndex = 0;
let answers = new Array(totalQuestions).fill(null);

// Exibe a pergunta atual
function showQuestion(index) {
    document.getElementById('question-text').innerText = questions[index];
    document.getElementById('current-question').innerText = index + 1;
    const radios = document.querySelectorAll('input[name="answer"]');
    radios.forEach(radio => {
        radio.checked = false;
    });

    if (answers[index] !== null) {
        radios[answers[index]].checked = true;
    }

    document.getElementById('prev-btn').disabled = index === 0;
    document.getElementById('next-btn').innerText = index === totalQuestions - 1 ? "Finalizar" : "Confirmar";
}

// Mostra o resultado final baseado nas respostas
function showResult() {
    const totalScore = answers.reduce((acc, answer) => acc + answer, 0);
    let resultText = "";

    if (totalScore < 10) {
        resultText = "Nível de ansiedade baixo.";
    } else if (totalScore < 20) {
        resultText = "Nível de ansiedade moderado.";
    } else {
        resultText = "Nível de ansiedade elevado.";
    }

    document.getElementById('result-text').innerText = resultText;
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
}
// Redireciona o usuário para a página de testes após um tempo
setTimeout(() => {
    window.location.href = "Teste SPSI.html"; 
}, 5000);

// Manipula o clique no botão Confirmar
document.getElementById('next-btn').addEventListener('click', () => {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        answers[currentQuestionIndex] = parseInt(selectedOption.value);
        if (currentQuestionIndex < totalQuestions - 1) {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
        } else {
            showResult();
        }
    } else {
        alert("Por favor, selecione uma opção.");
    }
});

// Manipula o clique no botão Voltar
document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
    }
});

// Exibe a primeira pergunta ao carregar a página
showQuestion(currentQuestionIndex);

