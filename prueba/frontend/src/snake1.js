import React, { useState, useEffect, useRef } from 'react';

const SnakeGame = () => {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState({
    x: 5,
    y: 5,
    prevX: 5,
    prevY: 5,
    velocityX: 0,
    velocityY: 0,
    body: [],
    color: 'lime',
  });
  const [foodX, setFoodX] = useState(null);
  const [foodY, setFoodY] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const blockSize = 25;
  const rows = 20;
  const cols = 20;
  const timeLimit = 180; // 3 minutos

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const placeFood = () => {
      setFoodX(Math.floor(Math.random() * cols) * blockSize);
      setFoodY(Math.floor(Math.random() * rows) * blockSize);
    };

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      snake.prevX = snake.x;
      snake.prevY = snake.y;
      snake.x += snake.velocityX * blockSize;
      snake.y += snake.velocityY * blockSize;

      // Verificar colisión con los bordes
      if (
        snake.x < 0 ||
        snake.x >= cols * blockSize ||
        snake.y < 0 ||
        snake.y >= rows * blockSize
      ) {
        setGameOver(true);
      }

      // Verificar colisión consigo misma
      snake.body.forEach(segment => {
        if (snake.x === segment.x && snake.y === segment.y) {
          setGameOver(true);
        }
      });

      // Mover cuerpo de la serpiente
      if (snake.body.length) {
        snake.body.unshift({ x: snake.prevX, y: snake.prevY });
        snake.body.pop();
      }

      // Dibujar comida
      ctx.fillStyle = 'red';
      ctx.fillRect(foodX, foodY, blockSize, blockSize);

      // Dibujar serpiente
      ctx.fillStyle = snake.color;
      ctx.fillRect(snake.x, snake.y, blockSize, blockSize);

      // Dibujar cuerpo de la serpiente
      ctx.fillStyle = 'green';
      snake.body.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, blockSize, blockSize);
      });

      // Actualizr estado de la serpiente
      setSnake({ ...snake });
    };

    const gameLoop = setInterval(() => {
      if (!gameOver) {
        update();
      } else {
        clearInterval(gameLoop);
        // Acciones al terminar el juego
        // ...
      }
    }, 1000 / 10); // Velocidad del juego (10 cuadros por segundo)

    const keyDownHandler = (event) => {
      switch (event.code) {
        case 'ArrowUp':
          if (snake.velocityY !== 1) {
            setSnake({ ...snake, velocityX: 0, velocityY: -1 });
          }
          break;
        case 'ArrowDown':
          if (snake.velocityY !== -1) {
            setSnake({ ...snake, velocityX: 0, velocityY: 1 });
          }
          break;
        case 'ArrowLeft':
          if (snake.velocityX !== 1) {
            setSnake({ ...snake, velocityX: -1, velocityY: 0 });
          }
          break;
        case 'ArrowRight':
          if (snake.velocityX !== -1) {
            setSnake({ ...snake, velocityX: 1, velocityY: 0 });
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      clearInterval(gameLoop);
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [gameOver]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(prevTime => prevTime + 1);
      if (currentTime >= timeLimit) {
        setGameOver(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentTime, timeLimit]);

  return (
    <div>
      <h1>Snake</h1>
      <p>Time: {currentTime}</p>
      <canvas ref={canvasRef} id="board" width={cols * blockSize} height={rows * blockSize}></canvas>
      {gameOver && <p>Game Over</p>}
    </div>
  );
};

export default SnakeGame;
