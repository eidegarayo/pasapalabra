/**********************************
 *Pasapalabra Game! (Final JS) 🎮⁉️
 *********************************/

var questions = [
{ letter: 'a', answer: 'andy', answered: 0, with: ('Empieza por '), question: ('Nombre del dueño de Woody en Toy Story (Andy)') },
{ letter: 'b', answer: 'bichos', answered: 0, with: ('Empieza por '), question: ('Película de pixar protagonizada por la hormiga Flik (Bichos)') },
{ letter: 'c', answer: 'cars', answered: 0, with: ('Empieza por '), question: ('Película de pixar protagonizada por Rayo McQueen (Cars)') },
{ letter: 'd', answer: 'dexter', answered: 0, with: ('Empieza por '), question: ('Psicópata forense especializado en análisis de salpicaduras de sangre en el Departamento de Policía de Miami. (Dexter)') },
{ letter: 'e', answer: 'embrujadas', answered: 0, with: ('Empieza por '), question: ('Serie juvenil protagonizada por tres hermanas brujas (Embrujadas)') },
{ letter: 'f', answer: 'futurama', answered: 0, with: ('Empieza por '), question: ('Serie animada creada por Matt Groening que sigue las aventuras del repartidor de pizzas Philip Fry (Futurama)') },
{ letter: 'g', answer: 'gunters', answered: 0, with: ('Empieza por '), question: ('Luchan contra los sixers en "Ready Player One" (Gunters)') },
{ letter: "h", answer: "house", answered: 0, with: ("Empieza por "), question: ("Ególatra genio de la medicina que dirige el departamento de diagnóstico médico del Hospital Universitario Princeton-Plainsboro (House)") },
{ letter: "i", answer: "iron man", answered: 0, with: ("Empieza por "), question: ("Alter ego de Tony Stark (Iron Man") },
{ letter: "j", answer: "jabalí", answered: 0, with: ("Empieza por "), question: ("Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba (Jabalí)") },
{ letter: "l", answer: "lost", answered: 0, with: ("Empieza por "), question: ("Serie en la que aparece la Iniciativa Dharma (Lost)") },
{ letter: "m", answer: "miénteme", answered: 0, with: ("Empieza por "), question: ("Serie basada en la conexión entre los estados emocionales y las expresiones faciales (Miénteme)") },
{ letter: "n", answer: "narcos", answered: 0, with: ("Empieza por "), question: ("Plata o plomo (Narcos)") },
{ letter: "ñ", answer: "arguiñano", answered: 0, with: ("Contiene la "), question: ("Apellido del cocinero vasco que adorna todos sus platos con perejil (Arguiñano)") },
{ letter: "o", answer: "one piece", answered: 0, with: ("Empieza por "), question: ("Serie manga protagonizada por Sombrero de Paja (One piece") },
{ letter: "p", answer: "payaso", answered: 0, with: ("Empieza por "), question: ("¿Qué tipo de pez es Nemo? (Payaso)") },
{ letter: "q", answer: "queso", answered: 0, with: ("Empieza por "), question: ("Producto obtenido por la maduración de la cuajada de la leche") },
{ letter: "r", answer: "rex", answered: 0, with: ("Empieza por "), question: ("Roedor") },
{ letter: "s", answer: "stackoverflow", with: ("Empieza por "), answered: 0, question: ("Comunidad salvadora de todo desarrollador informático") },
{ letter: "t", answer: "tintin", with: ("Empieza por "), answered: 0, question: ("Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984") },
{ letter: "u", answer: "unamuno", with: ("Empieza por "), answered: 0, question: ("Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914") },
{ letter: "v", answer: "verano azul", with: ("Empieza por "), answered: 0, question: ("CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa") },
{ letter: "x", answer: "Expediente X", answered: 0, with: ("Empieza por "), question: ("CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética") },
{ letter: "y", answer: "peyote", answered: 0, with: ("Empieza por "), question: ("CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos") },
{ letter: "z", answer: "zen", answered: 0, with: ("Empieza por "), question: ("CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional") }
]

var hits = 0
var user = ''
var records = []
var index = []
var userResponse = ''
var time = 130
var seconds

function pasapalabraStart () {
// Restart aswered responses
// Create the index array
  for (var i = 0; i < questions.length; i++) {
    questions[i].answered = 0
    index.push(i)
  }
  // Restore points
  hits = 0
  // Hide play button
  document.getElementById('play').style.display = 'none'
  // Show name and send buttons
  document.getElementById('name').style.display = 'block'
  document.getElementById('name').focus()
  document.getElementById('sendName').style.display = 'block'

  var enterName = document.getElementById('name')
  enterName.onkeyup = function (e) {
    if (e.keyCode === 13) {
      sendName()
    }
  }
}

function sendName () {
  // Save name
  user = document.getElementById('name').value
  if (user === '') {
    user = 'Anónimo'
  }
  // Hide button
  document.getElementById('name').style.display = 'none'
  document.getElementById('sendName').style.display = 'none'
  // Show buttons: Pasapalabra, Risk, quit
  document.getElementById('pasapalabra').disabled = false
  document.getElementById('risk').disabled = false
  document.getElementById('quit').disabled = false
  // Star countdown
  countdown()
  // Ask question
  document.getElementById('answer').focus()
  askQuestion()
}

function askQuestion () {
  // Delete last answer from the input
  document.getElementById('answer').value = ''
  document.getElementById('answer').focus()
  // Show question
  var letter = "<p id='letter'>" + questions[index[0]].letter + '<p/>'
  var start = "<p id='start'>" + questions[index[0]].with + '<p/>'
  var definition = "<p id='definition'>" + questions[index[0]].question + '<p/>'
  document.getElementById('start').innerHTML = start + letter + definition

  var enterKey = document.getElementById('answer')
  enterKey.onkeyup = function (e) {
    if (e.keyCode === 13) {
      toAnswer()
    }
    if (e.keyCode === 27) {
      pasapalabra()
    }
  }
}

function toAnswer () {
  // Value answered change to 1
  questions[index[0]].answered = 1
  // Take the answer
  userResponse = document.getElementById('answer').value.toLowerCase()
  // If it is right, add 1 hit, show it and put green circle letter
  if (userResponse === questions[index[0]].answer) {
    hits++
    document.getElementById(questions[index[0]].letter).className = 'circle green'
    document.getElementById('points').innerHTML = hits
  } else { // If it is wrong, put red circle
    document.getElementById(questions[index[0]].letter).className = 'circle red'
  }
  // Delete question index
  index.shift()
  // Are there more questions?
  check()
}

function pasapalabra () {
  document.getElementById(questions[index[0]].letter).className = 'circle orange'
  // Add no answered question index at the end of the array
  index.push(index[0])
  // Delete the index from the start of the array
  index.shift()
  // Another question
  askQuestion()
}

function check () {
  // Check if all the questions are answered
  var checkRosco = function (element) {
    return element.answered !== 0
  }
  // If they are answered is the end
  if (questions.every(checkRosco)) {
    // Stop countdown
    clearTimeout(seconds)
    // Add the name to the ranking
    records.push({name: user, points: hits})
    // Users order by points
    records.sort(function (a, b) {
      return b.points - a.points
    })
    disableButtons()
    clearTimeout(seconds)
    hideQuestion()
    document.getElementById('rendered').innerHTML = '<div class="noTime"><p>¡Enhorabuena!<br>Terminaste el rosco</p><button id="showRanking" class="blue" onclick="showRanking();">Ver ranking</button></div>'
  } else {
    askQuestion()
  }
}

function showRanking () {
  // Display none screen 1
  document.getElementById('screen1').style.display = 'none'
  // Change background image position for second screen
  document.getElementById('main').style.backgroundPosition = 'bottom right'
  // Make second screen elements
  var screen2 = document.getElementById('screen2')
  var ranking = document.createElement('div')
  ranking.setAttribute('id', 'ranking')
  screen2.appendChild(ranking)
  if (records.length > 0) {
    for (var i = 0; i < records.length; i++) {
      var rankingName = document.createElement('p')
      rankingName.innerHTML = (i + 1) + '. ' + records[i].name + ' ' + records[i].points + ' puntos'
      ranking.appendChild(rankingName)
    }
  } else {
    ranking.innerHTML = "<p class='rankingName'>¡Completa el juego para ser el primero en entrar en el ranking!</p>"
  }
  var anotherGame = document.createElement('button')
  anotherGame.setAttribute('id', 'anotherGame')
  anotherGame.setAttribute('class', 'main blue')
  anotherGame.setAttribute('onclick', 'returnScreen1()')
  anotherGame.innerHTML = 'Volver'
  screen2.appendChild(anotherGame)
}

function deleteScreen () {
  disableButtons()
  // Restart the time
  time = 130
  document.getElementById('seconds').innerHTML = time
  // Restart points
  document.getElementById('points').innerHTML = '0'

  // Delete second screen
  document.getElementById('screen2').innerHTML = ''
  document.getElementById('rendered').style.display = 'none'

  var circles = document.getElementsByClassName('circle')
  for (var c = 0; c < circles.length; c++) {
    circles[c].className = 'circle blue'
  }
}

function disableButtons () {
  // Disabled buttons pasapalabra, risk and quit
  document.getElementById('pasapalabra').disabled = true
  document.getElementById('risk').disabled = true
  document.getElementById('quit').disabled = true
  document.getElementById('start').innerHTML = ''
}

function returnScreen1 () {
  // Restart index
  index = []
  document.getElementById('screen1').style.display = 'block'
  document.getElementById('main').style.backgroundPosition = '345px 300px'
  document.getElementById('name').value = ''
  document.getElementById('question').style.display = 'block'
  document.getElementById('play').style.display = 'block'
  deleteScreen()
}

function countdown () {
  document.getElementById('seconds').innerHTML = time
  if (time <= 0) {
    // Add the player to the ranking
    records.push({name: user, points: hits})
    // Order the players points
    records.sort(function (a, b) {
      return b.points - a.points
    })
    disableButtons()
    hideQuestion()
    document.getElementById('rendered').innerHTML = '<div class="noTime"><p>¡Acabó tu tiempo!</p><button id="showRanking" class="blue" onclick="showRanking();">Ver ranking</button></div>'
    clearTimeout(seconds)
  } else {
    time = time - 1
    seconds = setTimeout(function () { countdown() }, 1000)
  }
}

function giveUp () {
  disableButtons()
  clearTimeout(seconds)
  hideQuestion()
  document.getElementById('rendered').innerHTML = '<div class="noTime"><p>Has abandonado,<br>no entras en el ranking</p><button id="showRanking" class="blue" onclick="showRanking();">Ver ranking</button></div>'
}

function hideQuestion () {
  document.getElementById('question').style.display = 'none'
  document.getElementById('rendered').style.display = 'block'
}
