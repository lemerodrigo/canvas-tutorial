
Log Iron Hack

# Sobre este tutorial

O objetivo deste tutorial é explicar o elemento canvas e mostrar sua utilização fazendo algumas animações usando duas dimensões.

### Introdução ao Canvas

O que é o canvas?

É um elemento do HTML5 que pode ser usado para desenhar/renderizar gráficos, fazer composição de imagens e animações que normalmente são feitas por JavaScript.

E por que precisamos do canvas? Por que não usamos o próprio DOM do HTML?

Na verdade é possível fazer uma animação simples direto no DOM movendo elementos do HTML. A diferença é que o canvas é muito mais performático quando falamos en renderização. Se quisermos mover vários objetos usando 60fps, teremos um péssimo resultado fora do canvas que é otimizado para renderização.

### Configurando o ambiente

É fácil usar o canvas porém, é preciso conhecimentos básicos de HTML5 e JavaScript antes de começar.

Vamos começar montando o esquelto da nossa aplicação:

1. Crie um diretório com o nome canvas;

2. Dentro desse diretório, crie 3 arquivos (index.html, app.css, app.js) com os respectivos códigos:

**index.html**

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Canvas in the house!</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" media="screen" href="app.css" />
    <script src="app.js"></script>
</head>
<body>
    <canvas id="canvas-tutorial" width="500" height="500">
        Your browser does not support canvas!
    </canvas>
</body>
</html>
```

**app.css**

```css
* {
  margin: 0;
  padding: 0;
}

body {
  background-color: #cccccc;
  text-align: center;
}

canvas {
  margin-top: 50px;
  background-color: black;
}
```
**app.js**

```javascript
// Getting the DOM element.
const canvas = document.getElementById('my-canvas');

// Getting the 2d context.
const ctx = canvas.getContext('2d');

```

**Obs. 1:** por padrão, o tamanho do elemento canvas é de 300x150 pixels. Como é possível observar acima, configuramos nosso canvas para ser um quadrado com lateral de 500 pixels.

**Obs. 2:** caso o browser não tenha suporte ao canvas, o conteúdo que está dentro da tag será renderizado ao invés do container do canvas.

**Obs. 3:** o CSS tem apenas algumas configurações simples para vizualizarmos a área do nosso canvas.

**Obs. 4:** poderíamos ter colocado os códigos JavaScript que vamos utilizar para manipular o canvas dentro do próprio index.html mas, para deixarmos mais organizado, criamos o arquivo app.js.

3. Antes de começarmos a codar, abra seu navegador, vá em Arquivo -> Abrir e navegue até a pasta deste tutorial. Selecione o arquivo index.html e marque para abrí-lo. Deverá aparecer uma página com um quadrado desenhado semelhante à imagem abaixo.

****************************** IMAGEM

### Nosso grid

Semelhante ao plano cartesiano, o canvas 2d tem dois eixos (x, y). Só tem uma pequena diferença em relação à orientação que você já está acostumado, que pode ser facilmente entendida na figura abaixo:

****************************** IMAGEM

 É isso, hora de codar! \o/

### Renderizando alguma coisa!

Agora sim...

Vamos desenhar um retangulo cinza no canto esquerdo superior do canvas. Para isso, substitua o código do arquivo app.js pelo código abaixo:

```javascript
// Getting the DOM element.
const canvas = document.getElementById('my-canvas');

// Getting the 2d context.
const ctx = canvas.getContext('2d');

// Drawing the little rectangle.
ctx.fillStyle = 'grey';
ctx.fillRect(0, 0, 50, 50);
```

Deverá ter aparecido algo assim:

****************** IMAGEM

### Primeira animação

Vamos agora fazer esse retangulo se mover da esquerda para direita e parar. Para isso, basta arrumarmos alguma forma de incrementarmos o x do retangulo.

Se fizermos apenas um looping, o retangulo irá se mover mas, será muito rápido ou seja, precisamos de algum mecanismo que incremente o x com um intervalo de tempo que possamos ter algum controle.

Existem 3 formas de fazer isso: setTimeout, setInterval e requestAnimationFrame.

setInterval(função, espera mínima)
Chama a função que é passada como parâmetro repetidamente a cada intervalo especificado em milisegundos no segundo parâmetro

setTimeout(funcão, espera mínima)
Chama a função uma vez após o tempo mínimo especificado no segundo parâmetro.

requestAnimationFrame(função de retorno)
Fala para o browser controlar uma animação que será desenhada pela função passada como parâmetro.

Para este exemplo, vamos usar o setInterval. Substitua novamente o código do app.js pelo código abaixo.

```javascript
// Getting the DOM element.
const canvas = document.getElementById('my-canvas');

// Getting the 2d context.
const ctx = canvas.getContext('2d');

// Our looper control.
let looper;

// Out X value that will be incremented.
let rectX = 0;

// Stops the animation.
const stopLooper = () => clearInterval(looper);

// Function that draws the rectangle.
const drawRectangle = (x) => {
  // Stops the animation when the rectangle reaches the end.
  if (x > canvas.width - 50) {
    stopLooper();
  }
  ctx.fillStyle = 'grey';
  ctx.fillRect(x, 0, 50, 50);
};

// Each loop we call render function.
const render = () => {
  // We clean everything in the canvas.
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Call the function that draws the rectangle incrementing x.
  drawRectangle(rectX += 1);
}

// Starting looper.
looper = setInterval(render, 0);
```

### Reaproveitando objetos

Até agora nosso código está bem simples. Vamos fazer algumas alterações para conseguirmos reaproveitar objetos, desenhar vários no canvas e animá-los.

Nesta etapa vamos usar um pouco de POO (programação orientada à objetos).

O primeiro passo é fazer uma classe que nos permitirá ter várias instâncias de objetos. Cada instância terá suas próprias propriedades.

A ideia é que a cada ciclo de renderização mudemos os parâmetros de cada instância para que todas se movimentem.

Aqui já começamos a ver a performance do canvas ao renderizar vários objetos simultaneamente.

```javascript
// Some app setup.
const ENEMIES_STORE = [];
const ENEMIES_SIZE = 50;
const ENEMIES_COLORS = [
  'red', 'blue', 'yellow', 'white', 'grey',
  'green', 'purple', 'navy', 'silver', 'olive',
  'lime', 'fuchsia', 'teal', 'aqua', 'maroon'
];

// Getting the DOM element.
const canvas = document.getElementById('my-canvas');

// Getting the 2d context.
const ctx = canvas.getContext('2d');

// Our looper control.
let looper;

// Animation frames counter.
let frames = 0;

// Our class that will generate enemies instances.
class Enemy {
  constructor(x) {
    this.x = x;
    this.y = 0;
    this.width = ENEMIES_SIZE;
    this.height = ENEMIES_SIZE;
    // Getting a random color when the object is instantiated.
    this.color = ENEMIES_COLORS[Math.floor(Math.random() * ENEMIES_COLORS.length)];
  }

  draw() {
    this.y += 1;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, ENEMIES_SIZE, ENEMIES_SIZE);  
  }
}

// This function just instantiate one enemy in a random x position and add it to the array of enemies.
const createEnemy = () => {
  // Each 50 frames we create a new enemy.
  if (frames % ENEMIES_SIZE === 0) {
    // Set enemy x coordinate from 0 to 450.
    const x = Math.floor(Math.random() * 10) * ENEMIES_SIZE;
    // Adding the enemy to the array of enemies.
    ENEMIES_STORE.push(new Enemy(x));
  }
}

// This functions performs a loop in the enemies array and draw each enemy.
const drawEnemies = () => {
  // Drawing all enemies.
  ENEMIES_STORE.forEach(enemy => enemy.draw());
}

// Canvas cleaner.
const resetCanvas = () => ctx.clearRect(0, 0, canvas.width, canvas.height);

// Each loop we call render function.
const render = () => {
  // We clean everything in the canvas.
  resetCanvas();

  // Incremeting frames for each loop.
  frames += 1;

  // Intantiate one new enemy at a random x position and add it to the enemies array.
  createEnemy();

  // Draw all enemies available in the enemies array.
  drawEnemies();
}

// Starting looper.
looper = setInterval(render, 0);
```


### Referência

https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial