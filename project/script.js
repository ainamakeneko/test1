let episodeData = null;
let sceneIndex = 0;
let lineIndex = 0;
const natoriElem = document.getElementById('natori');
const otherElem = document.getElementById('otherCharacter');


document.getElementById('startBtn').addEventListener('click', () => {
  document.getElementById('start').style.display = 'none';
  document.getElementById('episodeSelect').style.display = 'block';
});

Array.from(document.getElementsByClassName('ep')).forEach(btn => {
  btn.addEventListener('click', () => startEpisode(btn.dataset.ep));
});

document.getElementById('textbox').addEventListener('click', showNextLine);

function startEpisode(file) {
  document.getElementById('episodeSelect').style.display = 'none';
  document.getElementById('game').style.display = 'block';
  document.getElementById('text').textContent = '読み込み中...';
  fetch('story/' + file)
    .then(res => (res.ok ? res.json() : Promise.reject()))
    .then(data => setEpisode(data))
    .catch(() => {
      document.getElementById('text').textContent = '読み込み失敗';
    });
}

function setEpisode(data) {
  episodeData = data.scenes;
  sceneIndex = 0;
  lineIndex = 0;
  natoriElem.style.backgroundImage = "url('assets/characters/natori.png')";
  setScene(episodeData[0]);
  showNextLine();
}

function setScene(scene) {
  document.getElementById('bg').style.backgroundImage = 'url(' + scene.bg + ')';
  if (scene.character.includes('natori')) {
    otherElem.style.display = 'none';
  } else {
    otherElem.style.display = 'block';
    otherElem.style.backgroundImage = 'url(' + scene.character + ')';
  }
}

function showNextLine() {
  const scene = episodeData[sceneIndex];
  if (!scene) return;
  if (lineIndex < scene.lines.length) {
    const line = scene.lines[lineIndex];
    document.getElementById('speaker').textContent = line.speaker;
    document.getElementById('text').textContent = line.text;
    lineIndex++;
  } else {
    sceneIndex++;
    lineIndex = 0;
    if (sceneIndex < episodeData.length) {
      setScene(episodeData[sceneIndex]);
      showNextLine();
    } else {
      document.getElementById('text').textContent = '--- 完 ---';
    }
  }
}
