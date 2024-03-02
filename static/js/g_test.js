const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const appendAlert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}

const explanation = document.getElementById('explanation')
const showExplanation = () => {
    explanation.style.display = "block"; 
}

const correctTrigger = document.getElementById('correctAnswerBtn')
if (correctTrigger) {
  correctTrigger.addEventListener('click', () => {
    appendAlert('正解', 'success');
    showExplanation();
    correctTrigger.setAttribute("disabled", true);
  },)
}
for(let i=0;i<4;i++){
const incorrectTrigger = document.getElementById(`incorrectAnswerBtn${i}`)
if (incorrectTrigger) {
    incorrectTrigger.addEventListener('click', () => {
        appendAlert('不正解', 'danger');
        incorrectTrigger.setAttribute("disabled", true);
    })
    }
}
