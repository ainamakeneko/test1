let episodeData = null;
let sceneIndex = 0;
let lineIndex = 0;

const embeddedEpisodes = {
  'episode1.json': {
    scenes: [
      {
        bg: 'assets/backgrounds/bg_office.png',
        character: 'assets/characters/natori.png',
        lines: [
          { speaker: '名取 梓馬', text: '調査を始めるぞ。' },
          { speaker: '依頼人', text: '夫の浮気を調べてください。' },
          { speaker: '名取 梓馬', text: 'AIの記録だけでは真実は見えない。' }
        ]
      },
      {
        bg: 'assets/backgrounds/bg_bar.png',
        character: 'assets/characters/shiori.png',
        lines: [
          { speaker: '栞', text: 'ここがBarエデンよ。' },
          { speaker: '名取 梓馬', text: 'この街はAIに頼りすぎだな。' }
        ]
      }
    ]
  },
  'episode2.json': {
    scenes: [
      {
        bg: 'assets/backgrounds/bg_street.png',
        character: 'assets/characters/yuuki.png',
        lines: [
          { speaker: '結城ミチオ', text: '名取さん、変なロボが鳴いてます！' },
          { speaker: '名取 梓馬', text: '感情進化型か、厄介だな。' }
        ]
      },
      {
        bg: 'assets/backgrounds/bg_lab.png',
        character: 'assets/characters/natori.png',
        lines: [
          { speaker: '名取 梓馬', text: '旧オーナーの声を再現しているらしい。' },
          { speaker: '結城ミチオ', text: 'ロボが幽霊になったみたいですね。' }
        ]
      }
    ]
  }
};

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
      if (embeddedEpisodes[file]) {
        setEpisode(embeddedEpisodes[file]);
      } else {
        document.getElementById('text').textContent = '読み込み失敗';
      }
    });
}

function setEpisode(data) {
  episodeData = data.scenes;
  sceneIndex = 0;
  lineIndex = 0;
  setScene(episodeData[0]);
  showNextLine();
}

function setScene(scene) {
  document.getElementById('bg').style.backgroundImage = 'url(' + scene.bg + ')';
  const charElem = document.getElementById('character');
  charElem.style.backgroundImage = 'url(' + scene.character + ')';
  if (scene.character.includes('natori')) {
    charElem.style.right = '5%';
    charElem.style.left = 'auto';
    charElem.style.transform = 'none';
  } else {
    charElem.style.left = '50%';
    charElem.style.right = 'auto';
    charElem.style.transform = 'translateX(-50%)';
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
