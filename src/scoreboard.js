let levelUI = null
let scoreUI = null
let linesUI = null

export const updateScoreboard = (score, lines, level) => {
  if (!scoreUI) {
    levelUI = document.getElementById('level')
    scoreUI = document.getElementById('score')
    linesUI = document.getElementById('lines')
  }
  levelUI.innerHTML = 'Level: ' + level
  scoreUI.innerHTML = 'Score: ' + score
  linesUI.innerHTML = 'Lines: ' + lines
}
