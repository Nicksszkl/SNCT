const questions = [
    "Você sente-se triste ou vazio frequentemente?",
    "Você perdeu o interesse em atividades que antes gostava?",
    "Você tem dificuldade para dormir ou dorme em excesso?",
    "Você sente-se cansado ou sem energia quase todos os dias?",
    "Você sente-se inútil ou com baixa autoestima?",
    "Você tem dificuldade para se concentrar em tarefas diárias?",
    "Você pensa frequentemente em morte ou suicídio?",
    "Você sente-se inquieto ou com lentidão física?",
    "Você experimenta sentimentos de culpa excessivos?",
    "Você tem alterações significativas no apetite ou no peso?",
    "Você evita contato com amigos e familiares?",
    "Você sente dificuldade em tomar decisões simples?"
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
        resultText = "Nível de depressão baixo.";
    } else if (totalScore < 20) {
        resultText = "Nível de depressão moderado.";
    } else {
        resultText = "Nível de depressão elevado.";
    }

    document.getElementById('result-text').innerText = resultText;
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';

    // Redireciona o usuário para a página de testes após um tempo
    setTimeout(() => {
        window.location.href = "Teste SPSI.html"; // Substitua pelo link da página desejada
    }, 5000);
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
showQuestion(currentQuestionIndex);
