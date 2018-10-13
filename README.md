
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

```
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

```
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

```
// Getting the DOM element.
const canvas = document.getElementById('my-canvas');

// Getting the 2d context.
const ctx = canvas.getContext('2d');

```

**Obs. 1:** por padrão, o tamanho do elemento canvas é de 300x150 pixels. Como é possível observar acima, configuramos nosso canvas para ser um quadrado com lateral de 500 pixels.

**Obs. 2:** caso o browser não tenha suporte ao canvas, o conteúdo que está dentro da tag será renderizado ao invés do container do canvas.

**Obs. 3:** o CSS tem apenas algumas configurações simples para vizualizarmos a área do nosso canvas.

**Obs. 4 :** poderíamos ter colocado os códigos JavaScript que vamos utilizar para manipular o canvas dentro do próprio index.html mas, para deixarmos mais organizado, criamos o arquivo app.js.

3. Antes de começarmos a codar, abra seu navegador, vá em Arquivo -> Abrir e navegue até a pasta deste tutorial. Selecione o arquivo index.html e marque para abrí-lo. Deverá aparecer uma página com um quadrado desenhado. É isso, hora de codar! \o/

### Nosso grid

Semelhante ao plano cartesiano, o canvas 2d tem dois eixos (x, y). Só tem uma pequena diferença em relação a orientação que você já está acosumado, que pode ser facilmente entendida na figura abaixo:

****************************** IMAGEM

### Renderizando alguma coisa!

Agora sim...

Vamos desenhar um retangulo cinza no canto esquerdo superior do canvas. Para isso, coloque o código abaixo após as linhas que já existem no arquivo app.js

```
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

```
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

### Referência

https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial