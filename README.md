
Log Iron Hack

# Sobre este tutorial

O objetivo aqui é introduzir o elemento canvas e mostrar sua utilização fazendo algumas animações usando duas dimensões.

### Introdução ao Canvas

O que é o canvas?

O canvas é um elemento do HTML5 que pode ser usado para desenhar/renderizar gráficos, fazer composição de imagens e animações.

Normalmente a manipulação do canvas é feita por JavaScript. Simplificando, o canvas no browser é um container retangular que vai ser manipulado externamente.

E por que precisamos do canvas? Por que não usamos o próprio DOM do HTML?

Na verdade é possível você fazer uma animação simples direto no DOM movendo elementos do HTML. A diferença é que o canvas é muito mais performático quando falamos en renderização. Se quisermos mover vários objetos usando 60fps, teremos um péssimo resultado fora do canvas que é otimizado para renderização.

### Configurando o ambiente

É fácil usar o canvas porém, é preciso conhecimentos básicos de HTML5 e JavaScript antes de começar.

Vamos começar montando o esquelto da nossa aplicação:

1. Crie um diretório com o nome canvas;

2. Dentro desse diretório, crie um arquivo com o nome index.html e coloque o conteúdo abaixo:

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Canvas in the house!</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" media="screen" href="main.css" />
    <script src="app.js"></script>
</head>
<body>
    <canvas id="canvas-tutorial" width="500" height="500">
        Your browser does not support canvas!
    </canvas>
</body>
</html>
```

Obs. 1: por padrão, o tamanho do elemento canvas é de 300x150 pixels. Como é possível observar acima, configuramos nosso canvas para ser um quadrado com lateral de 500 pixels.

Obs. 2: caso o browser não tenha suporte ao canvas, o conteúdo que está dentro da tag será renderizado ao invés do container do canvas.

3. Poderíamos colocar os códigos JavaScript que vamos utilizar para manipular o canvas dentro do próprio index.html mas, para deixarmos mais organizado, vamos criar um segundo arquivo chamado app.js também na raiz do nosso projeto;

4. Por último, antes de começarmos finalmente a codar, abra seu navegador (Chrome ou Firefox), vá em arquivo -> abrir e navegue até a pasta deste tutorial. Selecione o arquivo index.html e marque para abrí-lo. Deverá aparecer uma página em branco. É isso, bora codar! \o/

### Nosso grid

Semelhante ao plano cartesiano, o canvas 2d tem dois eixos (x, y). Só tem uma diferença em relação a orientação, que pode ser facilmente entendida na figura abaixo:

****************************** IMAGEM

### Renderizando alguma coisa!

Agora sim...

1. Vamos colocar uma cor de fundo no nosso canvas e renderizar um círculo no centro.

Para isso, edite o arquivo app.js e coloque o conteúdo abaixo. Depois de gravar as alterações no arquivo, volte no navegador e atualize a página.

```
// Getting the DOM element.
const canvas = document.getElementById('my-canvas');

// Getting the 2d context.
const ctx = canvas.getContext('2d');

// Filling the canvas bg with some color.
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);

```

Deverá ter aparecido algo assim:

****************** IMAGEM

2. Agora vamos desenhar um círculo ao centro do canvas:

```
ctx.beginPath();
ctx.arc(250, 250, 50, 0, Math.PI * 2, true);
ctx.closePath();
ctx.fillStyle = 'grey';
ctx.fill();
```

Deverá ter aparecido algo assim:

****************** IMAGEM


### Referência

https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial