const canvas = document.getElementById('canvas'); // Get canvas element
const ctx = canvas.getContext('2d'); // Get context of canvas in 2D so it I can change settings of it
canvas.width = window.innerWidth; // Set canvas width to window width
canvas.height = window.innerHeight; // Set canvas height to window height

let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height); // Create gradient
gradient.addColorStop(0, 'red'); // Add color stop to gradient
gradient.addColorStop(0.1, 'pink'); // Add color stop to gradient
gradient.addColorStop(0.2, 'blue'); // Add color stop to gradient
gradient.addColorStop(0.3, 'cyan'); // Add color stop to gradient
gradient.addColorStop(0.4, 'green'); // Add color stop to gradient
gradient.addColorStop(0.5, 'green'); // Add color stop to gradient
gradient.addColorStop(0.6, 'yellow'); // Add color stop to gradient
gradient.addColorStop(0.7, 'red'); // Add color stop to gradient
gradient.addColorStop(0.8, 'orange'); // Add color stop to gradient
gradient.addColorStop(0.9, 'pink'); // Add color stop to gradient
gradient.addColorStop(1, 'purple'); // Add color stop to gradient

class Symbol {
    constructor(x, y, fontSize, canvasHeight){
        this.characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌ' +
        'フムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトホモヨョロヲゴゾドボポヴッン' +
        '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.canvasHeight = canvasHeight;
    }
    draw(context){
        this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
        context.fillStyle = 'black';
        // below 2 lines is responsible for removing 'ghost' effect of the overlay squares
        context.fillRect((this.x * this.fontSize), (this.y * this.fontSize) - this.fontSize / 2 - 750, this.fontSize, this.fontSize);
        context.fillStyle = gradient;
        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
        if (this.y * this.fontSize > canvas.height && Math.random() > 0.98) {
            this.y = 0;
        } else {
            this.y += 1;
        }
    }
}

class Effect {
    constructor(canvasWidth, canvasHeight){
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 20;
        this.columns = this.canvasWidth / this.fontSize;
        this.symbols = [];
        this.#initialize();
        console.log(this.symbols);
    }
    #initialize(){
         for (let i = 0; i < this.columns; i++) {
            this.symbols[i] = new Symbol(i, this.canvasHeight / Math.random(), this.fontSize, this.canvasHeight); 
        }
    }
    resize(width, height){
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.columns = this.canvasWidth / this.fontSize;
        this.symbols = [];
        this.#initialize();
    }
}

const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
const fps = 18;
const nextFrame = 1000 / fps;
let timer = 0; 

function animate(timeStamp){
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if (timer > nextFrame){
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.textAlign = 'center';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = gradient //'#0aff0a';
        ctx.font = effect.fontSize + 'px monospace';    
        effect.symbols.forEach(symbol => symbol.draw(ctx));
        timer = 0;
    } else {
        timer += deltaTime;
    }
    
    
    requestAnimationFrame(animate);
}
animate(0);

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.resize(canvas.width, canvas.height);
});

document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('start_btn').addEventListener('click', startBtn);
    document.getElementById('close_btn').addEventListener('click', closeBtn);
});

function startBtn() {
    var leftOverlay = document.getElementById('left_overlay');
    var rightOverlay = document.getElementById('right_overlay');
    var startBox = document.getElementById('start_box');

    // Check if the screen width is over 2000px
    if (window.innerWidth > 2000) {
        var totalWidth = window.innerWidth;
        var leftWidth = 400; // Width for the left overlay
        var rightWidth = 1400; // Calculate the width for the right overlay
        leftOverlay.style.width = leftWidth + 'px';
        rightOverlay.style.width = rightWidth + 'px';

        var sides = (totalWidth - (leftWidth + rightWidth +20))/2

        leftOverlay.style.left = sides + 'px';
        rightOverlay.style.right = sides + 'px';
        
    } else {
        // Default values for screens under 2000px
        leftOverlay.style.width = '25%';
        rightOverlay.style.width = '74%';
    }

    startBox.style.display = 'none';
}


function closeBtn(){
    document.getElementById('left_overlay').style.width = '0%';
    document.getElementById('right_overlay').style.width = '0%';
    document.getElementById('start_box').style.display = 'block';
    document.getElementById('start_box').style.animation = 'fadeIn 0s ease-out forwards 0s';
}
