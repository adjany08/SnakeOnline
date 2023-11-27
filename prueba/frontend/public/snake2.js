var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

let largoGane = 5; 

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
var gameOver = false;
var startTime = Date.now();
var currentTime;
var speed = 10;
var gameDuration; // Variable para almacenar la duración del juego


window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000 / speed);


        let metaFrutas = prompt("Ingresa el número de frutas que será tu meta:");
    
        while (metaFrutas === null || isNaN(metaFrutas) || metaFrutas <= 0) {
            metaFrutas = prompt("Ingresa un número válido mayor que cero:");
        }
    
        largoGane = parseInt(metaFrutas); 
    101

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
            snake.body = []; // Limpia todo el cuerpo de la serpiente
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

        if (snake.body.length === largoGane) {
            gameDuration = (Date.now() - startTime) / 1000;
            endGame(); 
            return;
        }

    }
 

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

    function placeFood() {
        foodX = Math.floor(Math.random() * cols) * blockSize;
        foodY = Math.floor(Math.random() * rows) * blockSize;
    }

    function endGame() {
        gameOver = true;
        alert("Fin del juego: objetivo cumplido. Duración: " + gameDuration.toFixed(2) + " segundos");
        
    }
};
