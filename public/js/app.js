const prompts = [
  'Write about a memory that still feels like yesterday.',
  'Describe a room that remembers everything you forgot.',
  'Write a letter you will never send.',
  'Begin with: The rain knew before I did.',
  'Write about a place that still remembers you.',
  'Describe heartbreak without using the word love.'
];

const root = document.documentElement;
const savedTheme = localStorage.getItem('writer-theme');
if (savedTheme) root.dataset.theme = savedTheme;

document.querySelectorAll('[data-theme-choice]').forEach(button => {
  button.addEventListener('click', () => {
    const theme = button.dataset.themeChoice === 'midnight' ? 'midnight' : 'linen';
    root.dataset.theme = theme;
    localStorage.setItem('writer-theme', theme);
  });
});

function randomPrompt() {
  return prompts[Math.floor(Math.random() * prompts.length)];
}

document.getElementById('regeneratePrompt')?.addEventListener('click', () => {
  document.getElementById('promptText').textContent = `“${randomPrompt()}”`;
});

document.getElementById('newPromptBtn')?.addEventListener('click', () => {
  alert(randomPrompt());
});

const writerArea = document.getElementById('writerArea');
const wordCount = document.getElementById('wordCount');
writerArea?.addEventListener('input', () => {
  const words = writerArea.value.trim().split(/\s+/).filter(Boolean).length;
  wordCount.textContent = `${words} words`;
  localStorage.setItem('writer-draft', writerArea.value);
});
if (writerArea) writerArea.value = localStorage.getItem('writer-draft') || '';
if (writerArea) writerArea.dispatchEvent(new Event('input'));

let timerInterval = null;
let seconds = 10 * 60;
let isTimerRunning = false;

const timerButtons = document.querySelectorAll('[data-start-timer]');

function updateTimerDisplay() {
  const displays = [
    document.getElementById('timerDisplay'),
    document.getElementById('miniTimer')
  ].filter(Boolean);

  const min = String(Math.floor(seconds / 60)).padStart(2, '0');
  const sec = String(seconds % 60).padStart(2, '0');

  displays.forEach(display => {
    display.textContent = `${min}:${sec}`;
  });
}

function startTimer() {
  isTimerRunning = true;

  timerButtons.forEach(btn => {
    btn.innerHTML = '⏸';
    btn.classList.add('is-running');
    btn.classList.remove('is-paused');
  });

  timerInterval = setInterval(() => {
    seconds -= 1;
    updateTimerDisplay();

    if (seconds <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      isTimerRunning = false;
      seconds = 10 * 60;
      updateTimerDisplay();

      timerButtons.forEach(btn => {
        btn.innerHTML = '▶';
        btn.classList.remove('is-running', 'is-paused');
      });

      alert('Your 10-minute writing sprint is complete. Save what surprised you.');
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  isTimerRunning = false;

  timerButtons.forEach(btn => {
    btn.innerHTML = '▶';
    btn.classList.remove('is-running');
    btn.classList.add('is-paused');
  });
}

timerButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    if (isTimerRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  });
});

const calendarGrid = document.getElementById('calendarGrid');
if (calendarGrid) {
  for (let i = 1; i <= 31; i++) {
    const day = document.createElement('span');
    day.className = `day ${[1,2,3,4,5,8,9,10,11,12,18].includes(i) ? 'active' : ''}`;
    day.textContent = i;
    calendarGrid.appendChild(day);
  }
}

