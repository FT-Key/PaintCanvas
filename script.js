let canvas = document.querySelector('.miCanvas');
let ctx = canvas.getContext('2d');
let color = 'black';
let painting = false;
let oldPosX = null;
let oldPosY = null;
let tamanio = 3;
let cerrandoContenedor = false;

let contenedorFlotante = document.querySelector('.contenedorFlotante');
let paletaColores = document.querySelector('.contenedorFlotante .paletaColoresFlotante');
let tamanioPincel = document.querySelector('.contenedorFlotante .tamanioPincelFlotante');
let paletaColoresEstatica = document.querySelector('.paletaColoresEstatica .gridColores .colorActual input');

function dibujarPunto(posX, posY, color = 'black', tamanio = 3) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(posX, posY, tamanio / 2, 0, Math.PI * 2);
  ctx.fill();
}

function dibujar(posX, posY, color = 'black', tamanio = 3) {
  ctx.strokeStyle = color;
  ctx.lineWidth = tamanio;
  ctx.beginPath();
  ctx.moveTo(oldPosX, oldPosY);
  ctx.lineTo(posX, posY);
  ctx.stroke();

  // Simula una brocha más gruesa al final del trazo
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(posX, posY, tamanio / 2, 0, Math.PI * 2);
  ctx.fill();
}


canvas.addEventListener('click', (e) => {
  if (cerrandoContenedor) {
    cerrandoContenedor = false;
    return;
  }
  dibujarPunto(e.offsetX, e.offsetY, color, tamanio);
});

canvas.addEventListener('mousedown', (e) => {
  if (e.button === 0) {
    if (contenedorFlotante.style.display != 'none') {
      contenedorFlotante.style.display = 'none';
    }
    painting = true;
    oldPosX = e.offsetX;
    oldPosY = e.offsetY;
  } else if (e.button === 1) {
    if (contenedorFlotante.style.display === 'none' || contenedorFlotante.style.display === '') {
      contenedorFlotante.style.display = 'inline-flex';
      contenedorFlotante.style.left = e.clientX + 'px';
      contenedorFlotante.style.top = e.clientY + 'px';
    } else {
      contenedorFlotante.style.display = 'none';
    }
    cerrandoContenedor = true;
    e.preventDefault();
  }
});

canvas.addEventListener('mouseup', (e) => {
  painting = false;
});

canvas.addEventListener('mousemove', (e) => {
  if (painting) {
    dibujar(e.offsetX, e.offsetY, color, tamanio);
    oldPosX = e.offsetX;
    oldPosY = e.offsetY;
  }
});

// Paleta colores

function actualizarColor(nuevoColor) {
  color = nuevoColor;
  paletaColores.value = nuevoColor;
  paletaColoresEstatica.value = nuevoColor;
}

paletaColores.addEventListener('change', (e) => {
  contenedorFlotante.style.left = '0px';
  contenedorFlotante.style.top = '0px';
  contenedorFlotante.style.display = 'none';
});

paletaColoresEstatica.addEventListener('input', (e) => {
  actualizarColor(e.target.value);
});

paletaColores.addEventListener('input', (e) => {
  actualizarColor(e.target.value);
});

document.querySelectorAll('.gridColores div').forEach(div => {
  div.addEventListener('click', () => {
    if (div.classList.contains('colorActual') || div.classList.contains('texto')) {
      return;
    }
    
    const colorSeleccionado = getComputedStyle(div).backgroundColor;
    color = colorSeleccionado;
    console.log(colorSeleccionado)
  });
});

// Tamaño pincel

tamanioPincel.addEventListener('change', (e) => {
  tamanio = e.target.value;
});