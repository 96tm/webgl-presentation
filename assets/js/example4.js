const canvasExample4 = document.querySelector('.canvas-example-4');

const vertexShaderExample4 = document.createElement('script');
vertexShaderExample4.type = 'x-shader/x-vertex';
vertexShaderExample4.innerHTML = `#version 300 es
// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec4 aVertexPosition;
in vec4 aVertexColor;
out vec4 vVertexColor;

// A matrix to transform the positions by
uniform mat4 uTransformMatrix;

// all shaders have a main function
void main() {
  // Multiply the position by the matrix.
  gl_Position = uTransformMatrix * aVertexPosition;
  //gl_Position = aVertexPosition;
  vVertexColor = aVertexColor;
}
`;
const fragmentShaderExample4 = document.createElement('script');
fragmentShaderExample4.type = 'x-shader/x-vertex';
fragmentShaderExample4.innerHTML = `#version 300 es
precision highp float;

in vec4 vVertexColor;

// we need to declare an output for the fragment shader
out vec4 outColor;

void main() {
  outColor = vVertexColor;
}
`;

function drawExample4(canvas, vertexShader, fragmentShader) {
  const ctx = canvas.getContext('webgl2');

  setClearColor(ctx, ...[0.7, 0.7, 1, 1.0]);

  const colors = [
    0.0,
    1.0,
    1.0,
    1.0, // Front face: white
    1.0,
    1.0,
    1.0,
    1.0, // Front face: white
    1.0,
    1.0,
    1.0,
    1.0, // Front face: white
    1.0,
    1.0,
    1.0,
    1.0, // Front face: white
    1.0,
    0.0,
    0.0,
    1.0, // Back face: red
    1.0,
    0.0,
    0.0,
    1.0, // Back face: red
    1.0,
    0.0,
    0.0,
    1.0, // Back face: red
    1.0,
    0.0,
    0.0,
    1.0, // Back face: red
    0.0,
    1.0,
    0.0,
    1.0, // Top face: green
    0.0,
    1.0,
    0.0,
    1.0, // Top face: green
    0.0,
    1.0,
    0.0,
    1.0, // Top face: green
    0.0,
    1.0,
    0.0,
    1.0, // Top face: green
    0.0,
    0.0,
    1.0,
    1.0, // Bottom face: blue
    0.0,
    0.0,
    1.0,
    1.0, // Bottom face: blue
    0.0,
    0.0,
    1.0,
    1.0, // Bottom face: blue
    0.0,
    0.0,
    1.0,
    1.0, // Bottom face: blue
    1.0,
    1.0,
    0.0,
    1.0, // Right face: yellow
    1.0,
    1.0,
    0.0,
    1.0, // Right face: yellow
    1.0,
    1.0,
    0.0,
    1.0, // Right face: yellow
    1.0,
    1.0,
    0.0,
    1.0, // Right face: yellow
    1.0,
    0.0,
    1.0,
    1.0, // Left face: purple
    1.0,
    0.0,
    1.0,
    1.0, // Left face: purple
    1.0,
    0.0,
    1.0,
    1.0, // Left face: purple
    1.0,
    0.0,
    1.0,
    1.0, // Left face: purple
  ];

  const indices = [
    0,
    1,
    2,
    0,
    2,
    3, // front
    4,
    5,
    6,
    4,
    6,
    7, // back
    8,
    9,
    10,
    8,
    10,
    11, // top
    12,
    13,
    14,
    12,
    14,
    15, // bottom
    16,
    17,
    18,
    16,
    18,
    19, // right
    20,
    21,
    22,
    20,
    22,
    23, // left
  ];

  const vertices = [
    -0.5,
    -0.5,
    0.5,
    0.5,
    -0.5,
    0.5,
    0.5,
    0.5,
    0.5,
    -0.5,
    0.5,
    0.5,

    // Back face
    -0.5,
    -0.5,
    -0.5,
    -0.5,
    0.5,
    -0.5,
    0.5,
    0.5,
    -0.5,
    0.5,
    -0.5,
    -0.5,

    // Top face
    -0.5,
    0.5,
    -0.5,
    -0.5,
    0.5,
    0.5,
    0.5,
    0.5,
    0.5,
    0.5,
    0.5,
    -0.5,

    // Bottom face
    -0.5,
    -0.5,
    -0.5,
    0.5,
    -0.5,
    -0.5,
    0.5,
    -0.5,
    0.5,
    -0.5,
    -0.5,
    0.5,

    // Right face
    0.5,
    -0.5,
    -0.5,
    0.5,
    0.5,
    -0.5,
    0.5,
    0.5,
    0.5,
    0.5,
    -0.5,
    0.5,

    // Left face
    -0.5,
    -0.5,
    -0.5,
    -0.5,
    -0.5,
    0.5,
    -0.5,
    0.5,
    0.5,
    -0.5,
    0.5,
    -0.5,
  ];

  const indexBuffer = initBuffer(ctx, indices, ctx.ELEMENT_ARRAY_BUFFER);
  const colorBuffer = initBuffer(ctx, colors);
  const vertexBuffer = initBuffer(ctx, vertices);

  const program = initProgram(ctx, vertexShader, fragmentShader);

  const uTransformMatrix = ctx.getUniformLocation(program, 'uTransformMatrix');
  const aVertexPositionAttribute = ctx.getAttribLocation(
    program,
    'aVertexPosition'
  );
  const aVertexColorAttribute = ctx.getAttribLocation(program, 'aVertexColor');

  enableVertexAttribute(ctx, vertexBuffer, aVertexPositionAttribute);
  enableVertexAttribute(ctx, colorBuffer, aVertexColorAttribute);

  const transformMatrix = mat4.create();
  mat4.rotateX(transformMatrix, transformMatrix, Math.PI / 6);
  mat4.rotateY(transformMatrix, transformMatrix, Math.PI / 6);

  ctx.uniformMatrix4fv(uTransformMatrix, false, transformMatrix);

  ctx.drawElements(ctx.TRIANGLES, indices.length, ctx.UNSIGNED_SHORT, 0);

  function render(now) {
    now *= 0.001; // convert to seconds
    const deltaTime = now - then;
    then = now;

    drawScene(
      ctx,
      program,
      uTransformMatrix,
      aVertexPositionAttribute,
      aVertexColorAttribute,
      vertexBuffer,
      colorBuffer,
      indexBuffer,
      deltaTime
    );

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  ctx.bindVertexArray(null);
  ctx.bindBuffer(ctx.ARRAY_BUFFER, null);
  ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, null);
}

drawExample4(canvasExample4, vertexShaderExample4, fragmentShaderExample4);
