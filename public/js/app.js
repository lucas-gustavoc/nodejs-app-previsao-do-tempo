console.log('Client side javascript file is loaded!')



// Obtendo o formulário utilizando seletor CSS
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// Adicionando um trigger de evento para submit
weatherForm.addEventListener('submit', (e) => {
    // Impedindo o comportamento padrão, que seria recarregar a página
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecastData
            }
        })
    })
})