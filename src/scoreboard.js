let levelUI = null
let scoreUI = null
let linesUI = null
let nextUI = null

export const updateScoreboard = (score, lines, level, next) => {
  if (!scoreUI) {
    levelUI = document.getElementById('level')
    scoreUI = document.getElementById('score')
    linesUI = document.getElementById('lines')
    nextUI = document.getElementById('next')
  }
  levelUI.innerHTML = 'Level: ' + level
  scoreUI.innerHTML = 'Score: ' + score
  linesUI.innerHTML = 'Lines: ' + lines
  nextUI.innerHTML = 'Next: ' + next
}
