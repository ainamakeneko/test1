let episodeData = null;
let sceneIndex = 0;
let lineIndex = 0;

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
  fetch('story/' + file)
    .then(res => res.json())
    .then(data => {
      episodeData = data.scenes;
      sceneIndex = 0;
      lineIndex = 0;
      setScene(episodeData[0]);
      showNextLine();
    })
    .catch(() => {
      document.getElementById('text').textContent = '読み込み失敗';
    });
}

function setScene(scene) {
  document.getElementById('bg').style.backgroundImage = 'url(' + scene.bg + ')';
  document.getElementById('character').style.backgroundImage = 'url(' + scene.character + ')';
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
