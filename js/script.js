
// function openwindow(){
//     window.open('search.html')
// }


function handleFormSubmit(event) {
  // Просим форму не отправлять данные самостоятельно
  event.preventDefault()
//   console.log('Отправка!')
    window.open('search.html')
}

const applicantForm = document.getElementById('form_reg')
applicantForm.addEventListener('submit', handleFormSubmit)

// function serializeForm(formNode) {
//   console.log(formNode.elements)
// }

// function handleFormSubmit(event) {
//   event.preventDefault()
//   serializeForm(applicantForm)
// }

// const applicantForm = document.getElementById('form_reg')
// applicantForm.addEventListener('submit', handleFormSubmit)
