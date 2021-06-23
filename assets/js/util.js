let rotationValue = 0.0;
let then = 0;

function enableVertexAttribute(
  ctx,
  buffer,
  attributeName,
  { size, type, normalized, stride, offset } = {
    size: 3,
    type: ctx.FLOAT,
    normalized: false,
    stride: 0,
    offset: 0,
  }
) {
  ctx.bindBuffer(ctx.ARRAY_BUFFER, buffer);
  ctx.vertexAttribPointer(
    attributeName,
    size,
    type,
    normalized,
    stride,
    offset
  );
  ctx.enableVertexAttribArray(attributeName);
}

function clearContext(ctx) {
  ctx.clear(ctx.COLOR_BUFFER_BIT | ctx.DEPTH_BUFFER_BIT);
  ctx.viewport(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function initBuffer(ctx, sourceArray, bufferType = ctx.ARRAY_BUFFER) {
  const buffer = ctx.createBuffer();
  ctx.bindBuffer(bufferType, buffer);
  const ArrayType =
    bufferType === ctx.ARRAY_BUFFER ? Float32Array : Uint16Array;
  ctx.bufferData(bufferType, new ArrayType(sourceArray), ctx.STATIC_DRAW);
  return buffer;
}

function initProgram(ctx, vertexShaderScript, fragmentShaderScript) {
  const vertexShader = ctx.createShader(ctx.VERTEX_SHADER);
  ctx.shaderSource(vertexShader, vertexShaderScript.textContent);
  ctx.compileShader(vertexShader);

  const fragmentShader = ctx.createShader(ctx.FRAGMENT_SHADER);
  ctx.shaderSource(fragmentShader, fragmentShaderScript.textContent);
  ctx.compileShader(fragmentShader);
  console.log(
    vertexShader,
    ctx.getShaderParameter(vertexShader, ctx.COMPILE_STATUS),
    ctx.getShaderInfoLog(vertexShader)
  );

  const program = ctx.createProgram();
  ctx.attachShader(program, vertexShader);
  ctx.attachShader(program, fragmentShader);
  ctx.linkProgram(program);
  ctx.useProgram(program);

  return program;
}

function setClearColor(ctx, ...color) {
  ctx.clearColor(...color);
  ctx.clear(ctx.COLOR_BUFFER_BIT);
  console.log(ctx.COLOR_CLEAR_VALUE);
}

function drawScene(
  ctx,
  program,
  uTransformMatrix,
  aVertexPositionAttribute,
  aVertexColorAttribute,
  vertexBuffer,
  colorBuffer,
  indexBuffer,
  deltaTime
) {
  ctx.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
  ctx.clearDepth(1.0); // Clear everything
  ctx.enable(ctx.DEPTH_TEST); // Enable depth testing
  ctx.depthFunc(ctx.LEQUAL); // Near things obscure far things

  // Clear the canvas before we start drawing on it.

  ctx.clear(ctx.COLOR_BUFFER_BIT | ctx.DEPTH_BUFFER_BIT);

  const fieldOfView = (45 * Math.PI) / 180; // in radians
  const aspect = ctx.canvas.clientWidth / ctx.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const transformMatrix = mat4.create();

  mat4.perspective(transformMatrix, fieldOfView, aspect, zNear, zFar);

  mat4.translate(
    transformMatrix,
    transformMatrix,
    [-0.0, 0.0, -6.0]
  );
  mat4.rotate(
    transformMatrix,
    transformMatrix,
    rotationValue,
    [0, 0, 1]
  );
  mat4.rotate(
    transformMatrix,
    transformMatrix,
    rotationValue * 0.7,
    [0, 1, 0]
  );

  enableVertexAttribute(ctx, vertexBuffer, aVertexPositionAttribute);
  enableVertexAttribute(ctx, colorBuffer, aVertexColorAttribute);
  ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, indexBuffer);
  
  ctx.useProgram(program);

  ctx.uniformMatrix4fv(uTransformMatrix, false, transformMatrix);

  const vertexCount = 36;
  const type = ctx.UNSIGNED_SHORT;
  const offset = 0;
  ctx.drawElements(ctx.TRIANGLES, vertexCount, type, offset);

  rotationValue += deltaTime;
}
