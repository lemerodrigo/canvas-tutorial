
![Iron Hack](https://raw.githubusercontent.com/lemerodrigo/canvas-tutorial/master/img/ih.png)

# Jogo em Canvas + JavaScript by Ironhack

O objetivo deste tutorial é explicar o elemento canvas e mostrar sua utilização fazendo algumas animações usando duas dimensões.

### Introdução ao Canvas

O que é o canvas?

É um elemento do HTML5 que pode ser usado para desenhar/renderizar gráficos, fazer composição de imagens e animações que normalmente são feitas por JavaScript.

E por que precisamos do canvas? Por que não usamos o próprio DOM do HTML?

Na verdade é possível fazer uma animação simples direto no DOM movendo elementos do HTML. A diferença é que o canvas é muito mais performático quando falamos em renderização. Se quisermos mover vários objetos usando 60fps, teremos um péssimo resultado fora do canvas que é otimizado para renderização.

# Etapa 1 - Configurando o ambiente

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
</head>
<body>
  <canvas id="my-canvas" width="500" height="500">
    Your browser does not support canvas!
    </canvas>
    <script src="app.js"></script>
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

3. Antes de começarmos a codar, abra seu navegador, vá em Arquivo -> Abrir e navegue até a pasta deste tutorial. Selecione o arquivo index.html e marque para abrí-lo. Deverá aparecer uma página com fundo cinza e um quadrado preto desenhado.

### Nosso grid

Semelhante ao plano cartesiano, o canvas 2d tem dois eixos (x, y). Só tem uma pequena diferença em relação à orientação que você já está acostumado, que pode ser facilmente entendida na figura abaixo:

![Canvas grid](https://raw.githubusercontent.com/lemerodrigo/canvas-tutorial/master/img/grid.jpg)

 É isso, hora de codar! \o/

# Etapa 2 - Renderizando alguma coisa!

Agora sim...

Vamos desenhar um retângulo cinza no canto esquerdo superior do canvas. Para isso, substitua o código do arquivo app.js pelo código abaixo:

```javascript
// Getting the DOM element.
const canvas = document.getElementById('my-canvas');

// Getting the 2d context.
const ctx = canvas.getContext('2d');

// Drawing the little rectangle.
ctx.fillStyle = 'grey';
ctx.fillRect(0, 0, 50, 50);
```

# Etapa 3 - Primeira animação

Vamos agora fazer esse retângulo se mover da esquerda para direita e parar. Para isso, basta arrumarmos alguma forma de incrementarmos a coordenada x do retângulo.

Se fizermos apenas um looping normal, o retângulo irá se mover mas, será muito rápido ou seja, precisamos de algum mecanismo que incremente o x com um intervalo de tempo que possamos ter algum controle de tempo para cada interação.

Existem 3 formas de fazer isso: setTimeout, setInterval e requestAnimationFrame.

* setInterval(função, espera mínima)
Chama a função que é passada como parâmetro repetidamente a cada intervalo especificado em milisegundos no segundo parâmetro

* setTimeout(funcão, espera mínima)
Chama a função uma vez após o tempo mínimo especificado no segundo parâmetro.

* requestAnimationFrame(função de retorno)
Fala para o browser controlar uma animação que será desenhada pela função passada como parâmetro.

Para este tutorial, vamos usar o requestAnimationFrame. Substitua novamente o código do app.js pelo código abaixo.

```javascript
// Getting the DOM element.
const canvas = document.getElementById('my-canvas');

// Getting the 2d context.
const ctx = canvas.getContext('2d');

// Our animation control.
let running = false;

// Out X value that will be incremented.
let rectX = 0;

// Stops the animation.
const stopAnimation = () => running = false;

// Function that draws the rectangle.
const drawRectangle = (x) => {
  // Stops the animation when the rectangle reaches the end.
  if (x > canvas.width - 50) {
    stopAnimation();
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

  // Calling the animation again and again.
  if (running) {
    window.requestAnimationFrame(render);
  }
}

// Starting animation.
running = true;
render();
```

Como você pode ver, implementamos um looper que chama a função render a cada 10 milisegundos. 

A função render cada vez que é chamada limpa o canvas e chama a função drawRectangle incrementando a coordenada x do retângulo em 1 pixel.

# Etapa 4 - Reaproveitando objetos

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

// Our animation control.
let running = false;

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
    this.y += 10;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, ENEMIES_SIZE, ENEMIES_SIZE);  
  }
}

// This function just instantiate one enemy in a random x position and add it to the array of enemies.
const createEnemy = () => {
  // Each 50 frames we create a new enemy.
  if (frames % 5 === 0) {
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

  // Calling the animation again and again.
  if (running) {
    window.requestAnimationFrame(render);
  }
}

// Starting animation.
running = true;
render();
```

Agora no seu canvas tem uma "chuva" de retângulos com cores aleatórias. 

Para essa implementação fizemos uma classe de inimigos (Enemies). A cada chamada da nossa função render, um novo inimigo é criado. 

Assim que criamos um inimigo, o colocamos na estrutura que tem todos os inimigos criados. Depois disso, chamamos a função que desenha todos os inimigos existentes no canvas.

Essa abordagem tem um problema grave pois, a cada passagem pela função de renderização fazemos um looping em todos os inimigos incluíndo aqueles que já passaram pelo canvas. Isso causará degradação de performance e alto consumo de memória e processamento.

Por enquanto continuaremos assim! :-(

Já que temos inimigos vindo de cima para baixo, que tal criarmos um herói que seja controlado pelo teclado e que tenha que - por enquanto - fugir dos inimigos?

# Etapa 5 - Nosso herói

```javascript
// Some app setup.
const ENEMIES_STORE = [];
const ENEMIES_SIZE = 50;
const ENEMIES_COLORS = [
  'red', 'blue', 'yellow', 'white',
  'green', 'purple', 'navy', 'silver', 'olive',
  'lime', 'fuchsia', 'teal', 'aqua', 'maroon'
];
const HERO_SIZE = ENEMIES_SIZE;
const HERO_COLOR = 'grey';

// Getting the DOM element.
const canvas = document.getElementById('my-canvas');

// Getting the 2d context.
const ctx = canvas.getContext('2d');

// Our animation control.
let running = false;

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
    this.y += 10;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, ENEMIES_SIZE, ENEMIES_SIZE);  
  }
}

// Our Hero class.
class Hero {
  constructor() {
    this.x = 0;
    this.y = canvas.height - HERO_SIZE;
    this.width = HERO_SIZE;
    this.height = HERO_SIZE;
    this.color = HERO_COLOR;
  }

  draw() {
    // Prevent our hero from going beyond the available area.
    if (this.x < 0) this.x = 0;
    if (this.x > canvas.width - HERO_SIZE) this.x = canvas.width - HERO_SIZE;

    // Drawing the hero itself.
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, HERO_SIZE, HERO_SIZE);  
  }
}

// This function just instantiate one enemy in a random x position and add it to the array of enemies.
const createEnemy = () => {
  // Each 50 frames we create a new enemy.
  if (frames % 5 === 0) {
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

// We just need one hero, so let's instantiate it.
const ourHero = new Hero();

// Canvas cleaner.
const resetCanvas = () => ctx.clearRect(0, 0, canvas.width, canvas.height);

// Each loop we call render function.
const render = () => {
  // We clean everything in the canvas.
  resetCanvas();

  // Incremeting frames for each loop.
  frames += 1;

  // Drawing our hero.
  ourHero.draw();

  // Intantiate one new enemy at a random x position and add it to the enemies array.
  createEnemy();

  // Draw all enemies available in the enemies array.
  drawEnemies();

  // Calling the animation again and again.
  if (running) {
    window.requestAnimationFrame(render);
  }
}

// Starting animation.
running = true;
render();

// Keyboard listener to check if the user press arrows keys.
window.addEventListener('keydown', (e) => {
  // Left arrow key.
  if (e.keyCode === 37) {
    if (ourHero.x <= 0) return;
    ourHero.x -= HERO_SIZE;
  }
  // Right arrow key.
  if (e.keyCode === 39) {
    if (ourHero.x >= canvas.width - HERO_SIZE) return;
    ourHero.x += HERO_SIZE;
  }    
});
```

Como você pode ver no código acima, agora também temos uma classe que cria nosso herói. O herói será renderizado a cada chamada da nossa função render com a diferença que apenas a posição dele será atualizada. Não teremos criação de novos heróis.

Adicionamos um listener que dispara uma função toda vez que alguma tecla é pressionada (keydown). Capturamos esse evento e verificamos se o código da tecla pressionada equivale a seta esquerda ou direita.

Caso seja uma das setas, mudamos a posição do nosso herói.

Agora já temos quase um jogo funcional. Falta apenas implementarmos um detector de colisões e uma mensagem de Game Over!

# Etapa 6 - Game over

```javascript
// Some app setup.
const ENEMIES_STORE = [];
const ENEMIES_SIZE = 50;
const ENEMIES_COLORS = [
  'red', 'blue', 'yellow', 'white',
  'green', 'purple', 'navy', 'silver', 'olive',
  'lime', 'fuchsia', 'teal', 'aqua', 'maroon'
];
const HERO_SIZE = ENEMIES_SIZE;
const HERO_COLOR = 'grey';
const GAME_OVER_FONT = '20px Verdana';
const GAME_OVER_COLOR = 'white';
const GAME_OVER_TEXT = 'GAME OVER';
const GAME_OVER_X = 185;
const GAME_OVER_Y = 220;

// Getting the DOM element.
const canvas = document.getElementById('my-canvas');

// Getting the 2d context.
const ctx = canvas.getContext('2d');

// Our animation control.
let running = false;

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
    this.y += 10;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, ENEMIES_SIZE, ENEMIES_SIZE);  
  }
}

// This function just instantiate one enemy in a random x position and add it to the array of enemies.
const createEnemy = () => {
  // Each 50 frames we create a new enemy.
  if (frames % 5 === 0) {
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

// Colission checker.
const collisionChecker = () => {
  ENEMIES_STORE.forEach(enemy => {
    if (ourHero.checkCollision(enemy)) {
      gameOver();
    }
  })
}

// Our Hero class.
class Hero {
  constructor() {
    this.x = 0;
    this.y = canvas.height - HERO_SIZE;
    this.width = HERO_SIZE;
    this.height = HERO_SIZE;
    this.color = HERO_COLOR;
  }

  draw() {
    // Prevent our hero from going beyond the available area.
    if (this.x < 0) this.x = 0;
    if (this.x > canvas.width - HERO_SIZE) this.x = canvas.width - HERO_SIZE;

    // Drawing the hero itself.
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, HERO_SIZE, HERO_SIZE);  
  }

  // Checks the hero position against enemies position.
  checkCollision(enemy) {
    return (this.x < enemy.x + enemy.width) && (this.x + this.width > enemy.x) && (this.y < enemy.y + enemy.height) && (this.y + this.height > enemy.y);
  }  
}

// We just need one hero, so let's instantiate it.
const ourHero = new Hero();

// Canvas cleaner.
const resetCanvas = () => ctx.clearRect(0, 0, canvas.width, canvas.height);

// Stop the looper and print game over message.
const gameOver = () => {
  running = false;
  ctx.font = GAME_OVER_FONT;
  ctx.fillStyle = GAME_OVER_COLOR;
  ctx.fillText(GAME_OVER_TEXT, GAME_OVER_X, GAME_OVER_Y);
}

// Each loop we call render function.
const render = () => {
  // We clean everything in the canvas.
  resetCanvas();

  // Incremeting frames for each loop.
  frames += 1;

  // Drawing our hero in the current position.
  ourHero.draw();

  // Instantiate one new enemy at a random x position and add it to the enemies array.
  createEnemy();

  // Draw all enemies available in the enemies array.
  drawEnemies();

  // Collision checker.
  collisionChecker();

  // Calling the animation again and again.
  if (running) {
    window.requestAnimationFrame(render);
  }
}

// Starting animation.
running = true;
render();

// Keyboard listener to check if the user press arrows keys.
window.addEventListener('keydown', (e) => {
  // Left arrow key.
  if (e.keyCode === 37) {
    if (ourHero.x <= 0) return;
    ourHero.x -= HERO_SIZE;
  }
  // Right arrow key.
  if (e.keyCode === 39) {
    if (ourHero.x >= canvas.width - HERO_SIZE) return;
    ourHero.x += HERO_SIZE;
  }    
});
```
Criamos nesta última etapa a função gameOver, a função collisionChecker e o método no nosso herói chamado checkCollision.

E temos um jogo funcionando! \o/

![Canvas grid](https://raw.githubusercontent.com/lemerodrigo/canvas-tutorial/master/img/victory.gif)

**Desafios**

1. Acertar o leak de inimigos!
2. Implementar pause/play no jogo usando a barra de espaço.
3. Alterar todo o cenário para termos um fundo, um herói e inimigos!
4. Montar um sistema de score.
5. Fazer nosso herói atirar.
6. Matar inimigos.
7. Alterar sistema de score.
8. Sonorizar.

### Autor

Rodrigo Leme de Mello
[@lemerodrigo](https://twitter.com/lemerodrigo)

### Referências

https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial