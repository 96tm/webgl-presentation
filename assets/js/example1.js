const canvasExample1 = document.querySelector('.canvas-example-1');
const canvasExampleCopy1 = document.querySelector('.canvas-example-1-copy');


const vertexShaderExample1 = document.createElement('script');
vertexShaderExample1.type = 'x-shader/x-vertex';
vertexShaderExample1.innerHTML = `#version 300 es
precision mediump float;

in vec3 aVertexPosition;

void main(void) {
  gl_Position = vec4(aVertexPosition, 1.0);
}`;

const fragmentShaderExample1 = document.createElement('script');
fragmentShaderExample1.type = 'x-shader/x-vertex';
fragmentShaderExample1.innerHTML = `#version 300 es
precision mediump float;

out vec4 fragColor;

void main(void) {
  fragColor = vec4(0.7, 0.7, 0.5, 1.0);
}`;

function drawExample1(canvas, vertexShader, fragmentShader) {
  const ctx = canvas.getContext('webgl2');

  setClearColor(ctx, ...[0, 0, 0, 1.0]);

  const vertices = [-0.5, 0.5, 0, -0.5, -0.5, 0, 0.5, -0.5, 0, 0.5, 0.5, 0];
  const indices = [0, 1, 2, 0, 2, 3];

  const indexBuffer = initBuffer(ctx, indices, ctx.ELEMENT_ARRAY_BUFFER);
  const vertexBuffer = initBuffer(ctx, vertices);

  const program = initProgram(ctx, vertexShader, fragmentShader);

  const aVertexPositionAttribute = ctx.getAttribLocation(
    program,
    'aVertexPosition'
  );

  enableVertexAttribute(ctx, vertexBuffer, aVertexPositionAttribute);

  ctx.drawElements(ctx.TRIANGLES, indices.length, ctx.UNSIGNED_SHORT, 0);

  ctx.bindBuffer(ctx.ARRAY_BUFFER, null);
  ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, null);
}

drawExample1(canvasExample1, vertexShaderExample1, fragmentShaderExample1);
drawExample1(canvasExampleCopy1, vertexShaderExample1, fragmentShaderExample1);

