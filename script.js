let lines = [];
let index = 0;

function showLine() {
  if (index >= lines.length) {
    return;
  }
  const line = lines[index];
  if (line.bg) {
    document.getElementById('background').src = line.bg;
  }
  if (line.char) {
    document.getElementById('character').src = line.char;
  }
  document.getElementById('speaker').textContent = line.speaker || '';
  document.getElementById('text').textContent = line.text || '';
  index += 1;
}

async function loadStory() {
  const response = await fetch('story.json');
  const data = await response.json();
  lines = data.lines || [];
  showLine();
}

document.addEventListener('DOMContentLoaded', () => {
  loadStory();
  document.getElementById('game').addEventListener('click', showLine);
});
