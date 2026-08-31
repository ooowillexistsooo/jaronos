const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');

const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');
const sizeVal = document.getElementById('sizeVal');
const eraserBtn = document.getElementById('eraserBtn');
const clearBtn = document.getElementById('clearBtn');

let isDrawing = false;
let isEraser = false;
let lastX = 0;
let lastY = 0;

canvas.width = 800;
canvas.height = 500;

ctx.lineCap = 'round';
ctx.lineJoin = 'round';

function startDrawing(e) {
    isDrawing = true;

    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function draw(e) {
    if (!isDrawing) return;
    
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);

    ctx.lineWidth = brushSize.value;
    ctx.strokeStyle = isEraser ? '#ffffff' : colorPicker.value;

    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function stopDrawing() {
    isDrawing = false;
}

eraserBtn.addEventListener('click', () => {
    isEraser = !isEraser;
    if (isEraser) {
        eraserBtn.classList.add('active');
        eraserBtn.innerText = 'Brush';
    } else {
        eraserBtn.classList.remove('active');
        eraserBtn.innerText = 'Eraser';
    }
});

clearBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear this?')) {
        ctx.clearRect(0,0, canvas.width, canvas.height);
    }
});

brushSize.addEventListener('input', (e) => {
    sizeVal.innerText = e.target.value;
});

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);