const canvasExample2 = document.querySelector('.canvas-example-2');

const vertexShaderExample2 = document.createElement('script');
vertexShaderExample2.type = 'x-shader/x-vertex';
vertexShaderExample2.innerHTML = `#version 300 es
precision mediump float;

in vec3 aVertexColor;
in vec3 aVertexPosition;

uniform vec4 uTranslation;

out vec3 vVertexColor;

void main(void) {
  gl_Position = vec4(aVertexPosition, 1.0) + uTranslation;
  vVertexColor = aVertexColor;
}`;

const fragmentShaderExample2 = document.createElement('script');
fragmentShaderExample2.type = 'x-shader/x-vertex';
fragmentShaderExample2.innerHTML = `#version 300 es
precision mediump float;

in vec3 vVertexColor;
out vec4 fragColor;

void main(void) {
  fragColor = vec4(vVertexColor, 1.0);
}`;

function drawExample2(canvas, vertexShader, fragmentShader) {
  const ctx = canvas.getContext('webgl2');

  setClearColor(ctx, ...[0, 0, 0, 1.0]);

  const colors = [0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1];
  const vertices = [-0.5, 0.5, 0, -0.5, -0.5, 0, 0.5, -0.5, 0, 0.5, 0.5, 0];
  const indices = [0, 1, 2, 0, 2, 3];

  const colorBuffer = initBuffer(ctx, colors);
  const vertexBuffer = initBuffer(ctx, vertices);
  const indexBuffer = initBuffer(ctx, indices, ctx.ELEMENT_ARRAY_BUFFER);

  const program = initProgram(ctx, vertexShader, fragmentShader);

  const aVertexPositionAttribute = ctx.getAttribLocation(
    program,
    'aVertexPosition'
  );
  const aVertexColorAttribute = ctx.getAttribLocation(program, 'aVertexColor');
  var uTranslationAttribute = ctx.getUniformLocation(program, 'uTranslation');
  ctx.uniform4f(uTranslationAttribute, ...[0.5, 0.3, 0.4], 0.0);

  clearContext(ctx);

  enableVertexAttribute(ctx, vertexBuffer, aVertexPositionAttribute);
  enableVertexAttribute(ctx, colorBuffer, aVertexColorAttribute);

  ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, indexBuffer);

  ctx.drawElements(ctx.TRIANGLES, indices.length, ctx.UNSIGNED_SHORT, 0);

  const lineIndices = [0, 2];
  ctx.bufferData(
    ctx.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(lineIndices),
    ctx.STATIC_DRAW
  );
  ctx.drawElements(ctx.LINES, lineIndices.length, ctx.UNSIGNED_SHORT, 0);

  ctx.bindBuffer(ctx.ARRAY_BUFFER, null);
  ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, null);
}

drawExample2(canvasExample2, vertexShaderExample2, fragmentShaderExample2);
