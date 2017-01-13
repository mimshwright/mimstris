export const updateMessage = (message) => {
  const element = document.getElementById('message')
  element.innerHTML = message
  element.style.visibility = (message == '') ? "hidden" : ""
}
