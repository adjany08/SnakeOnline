var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

var snake = {
    x: blockSize * 5,
    y: blockSize * 5,
    prevX: blockSize * 5, // Almacena la posición previa en X
    prevY: blockSize * 5, // Almacena la posición previa en Y
    velocityX: 0,
    velocityY: 0,
    body: [],
    color: "lime" // Color inicial de la serpiente
};

var foodX;
var foodY;

var gameOver = false; // Variable para saber si el juego terminó

var timeLimit = 20; // Variable para tiempo de juego
var startTime = Date.now();
var currentTime; // Variable para tiempo transcurrido
var speed = 10; //Vraible para la velocidad de la serpiente


//Funcion que carga todo en patalla
window.onload = function() {

    //Carga el canvas
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");


    //Carga la comida en el canvas y la actualizaci[on de la snake
    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000 / speed);


    //Prompt para el tiempo de juego
    var minutes = prompt("Ingrese la duración del juego en minutos:");

    if (minutes && !isNaN(minutes)) {
        timeLimit = parseInt(minutes) * 60; // Convierte minutos a segundos
    } else {
        alert("Se ingresó un valor inválido para la duración del juego. Se usará la duración predeterminada.");
    }

    var timerElement = document.getElementById("timer"); // Elemento para mostrar el temporizador


    //Funcion que actualiza el juego
    //Se actualiza el canvas, la comida, la serpiente y el tiempo
    //Se encarga de la mayor parte logica del juego
    function update() {
        if (gameOver) {
            return;
        }

        context.fillStyle = "black";
        context.fillRect(0, 0, board.width, board.height);

        context.font = "20px Arial";
        context.fillText("🍎", foodX, foodY + blockSize);

        if (snake.x == foodX && snake.y == foodY) {
            snake.body.push([foodX, foodY]);
            placeFood();
        }

        for (let i = snake.body.length - 1; i > 0; i--) {
            snake.body[i] = snake.body[i - 1];
        }
        if (snake.body.length) {
            snake.body[0] = [snake.x, snake.y];
        }

        context.fillStyle = snake.color; // Usa el color seleccionado por el usuario
        snake.prevX = snake.x; // Guarda la posición previa en X
        snake.prevY = snake.y; // Guarda la posición previa en Y
        snake.x += snake.velocityX * blockSize;
        snake.y += snake.velocityY * blockSize;

        // Restar longitud y detener movimiento si la serpiente toca el borde
        if (snake.x < 0 || snake.x >= cols * blockSize || snake.y < 0 || snake.y >= rows * blockSize) {
            snake.x = snake.prevX; // Vuelve a la posición previa en X
            snake.y = snake.prevY; // Vuelve a la posición previa en Y
            snake.velocityX = 0;
            snake.velocityY = 0;
            snake.pop(); // Limpia todo el cuerpo de la serpiente
        }

        // Restar longitud y detener movimiento si la serpiente se choca consigo misma
        for (let i = 1; i < snake.body.length; i++) {
            if (snake.x == snake.body[i][0] && snake.y == snake.body[i][1]) {
                snake.velocityX = 0;
                snake.velocityY = 0;
                snake.body = snake.body.slice(0, i); // Reduce el cuerpo de la serpiente a la parte que no está en colisión
                break;
            }
        }

        context.fillRect(snake.x, snake.y, blockSize, blockSize);
        for (let i = 0; i < snake.body.length; i++) {
            context.fillRect(snake.body[i][0], snake.body[i][1], blockSize, blockSize);
        }

        currentTime = Math.floor((Date.now() - startTime) / 1000); // Tiempo transcurrido en segundos


        //Codigo necesario para el cronometro
        var timeLeft = timeLimit - currentTime;
        var minutes = Math.floor(timeLeft / 60);
        var seconds = timeLeft % 60;
        var formattedTime = padZero(minutes) + ":" + padZero(seconds);

        timerElement.textContent = "Tiempo restante: " + formattedTime;

        if (currentTime >= timeLimit) {
            endGame();
            return;
        }
    }

    function padZero(num) {
        return (num < 10 ? "0" : "") + num;
    }

    //Funcion que cambia la direccion de la serpiente
    function changeDirection(e) {
        if (e.code == "ArrowUp" && snake.velocityY != 1) {
            snake.velocityX = 0;
            snake.velocityY = -1;
        } else if (e.code == "ArrowDown" && snake.velocityY != -1) {
            snake.velocityX = 0;
            snake.velocityY = 1;
        } else if (e.code == "ArrowLeft" && snake.velocityX != 1) {
            snake.velocityX = -1;
            snake.velocityY = 0;
        } else if (e.code == "ArrowRight" && snake.velocityX != -1) {
            snake.velocityX = 1;
            snake.velocityY = 0;
        }
    }

    //Funcion que coloca la comida en el canvas
    function placeFood() {
        foodX = Math.floor(Math.random() * cols) * blockSize;
        foodY = Math.floor(Math.random() * rows) * blockSize;
    }

    //Funcion que termina el juego

    function endGame() {
        gameOver = true;
        alert("Fin del juego: Tiempo agotado");
        console.log("Fin del juego: Tiempo agotado");
    }
};
