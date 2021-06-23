const canvasExample3 = document.querySelector('.canvas-example-3');

const vertexShaderExample3 = document.createElement('script');
vertexShaderExample3.type = 'x-shader/x-vertex';
vertexShaderExample3.innerHTML = `#version 300 es
precision mediump float;

in vec3 aVertexColor;
in vec3 aVertexPosition;

uniform mat3 uTransformMatrix;

out vec3 vVertexColor;

void main(void) {
  gl_Position = vec4(uTransformMatrix * aVertexPosition, 1.0);
  vVertexColor = aVertexColor;
}`;

const fragmentShaderExample3 = document.createElement('script');
fragmentShaderExample3.type = 'x-shader/x-vertex';
fragmentShaderExample3.innerHTML = `#version 300 es
precision mediump float;

in vec3 vVertexColor;
out vec4 fragColor;

void main(void) {
  fragColor = vec4(vVertexColor, 1.0);
}`;

function drawExample3(canvas, vertexShader, fragmentShader) {
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

  const uTransformMatrix = ctx.getUniformLocation(program, 'uTransformMatrix');
  const transformMatrix = mat3.create();
  mat3.rotate(transformMatrix, transformMatrix, Math.PI / 6);
  console.log(transformMatrix);

  ctx.uniformMatrix3fv(uTransformMatrix, false, transformMatrix);

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

drawExample3(canvasExample3, vertexShaderExample3, fragmentShaderExample3);
