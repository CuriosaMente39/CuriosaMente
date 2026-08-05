let deferredPrompt;
const btnInstall = document.getElementById('btn-install');
const scoreDisplay = document.getElementById('score');
const optionButtons = document.querySelectorAll('.option-btn');
const feedbackAudio = document.getElementById('feedback-audio');

let score = 0;

// Registrar o Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('Service Worker registrado com sucesso:', reg.scope))
      .catch(err => console.error('Falha ao registrar Service Worker:', err));
  });
}

// Lógica de Instalação PWA
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  btnInstall.hidden = false;
});

btnInstall.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  if (outcome === 'accepted') {
    btnInstall.hidden = true;
  }
  deferredPrompt = null;
});

// Lógica Básica do Jogo
optionButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const isCorrect = e.target.getAttribute('data-correct') === 'true';
    
    if (isCorrect) {
      score += 10;
      scoreDisplay.textContent = score;
      feedbackAudio.play().catch(() => {});
      alert('Resposta correta!');
    } else {
      alert('Tente novamente!');
    }
  });
});
