const questions = [
    "Você se sente sobrecarregado ou pressionado no seu dia a dia?",
    "Você sente que tem muitas responsabilidades para lidar?",
    "Você sente que seu trabalho ou estudos causam muito estresse?",
    "Você tem dificuldade em relaxar, mesmo quando está fora de suas atividades?",
    "Você se preocupa frequentemente com o futuro?",
    "Você tem pouco tempo para atividades de lazer ou descanso?",
    "Você sente que seu nível de energia está baixo?",
    "Você sente dores de cabeça ou tensão muscular com frequência?",
    "Você tem dificuldade para dormir devido a preocupações?",
    "Você sente irritabilidade ou impaciência mais do que o normal?",
    "Você sente que não consegue controlar seu nível de estresse?",
    "Você evita interações sociais por estar estressado?",
    "Você sente que pequenos problemas parecem maiores do que realmente são?",
    "Você sente falta de motivação ou produtividade?",
    "Você recorre a hábitos prejudiciais (como fumar ou beber) para aliviar o estresse?"
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

    if (totalScore < 15) {
        resultText = "Nível de estresse baixo. Continue gerenciando bem suas responsabilidades e cuidando de seu bem-estar!";
    } else if (totalScore < 30) {
        resultText = "Nível de estresse moderado. Considere adotar práticas de relaxamento e tempo para si mesmo.";
    } else {
        resultText = "Nível de estresse elevado. Tente buscar maneiras de reduzir o estresse e, se necessário, converse com um profissional.";
    }

    document.getElementById('result-text').innerText = resultText;
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
}

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
document.addEventListener('DOMContentLoaded', () => {
    showQuestion(currentQuestionIndex);
});
