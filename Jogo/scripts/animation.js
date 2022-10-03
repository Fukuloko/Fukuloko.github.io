// var x = 0;
// var y = 0;
// var teclar = "";

// var c = document.getElementById("myCanvas");
// var ctx = c.getContext("2d");

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;
let playerState = 'idle';

const playerImage = new Image();
playerImage.src = 'spritesheet2.png';

let x = 0;
let y = 0;
// let spriteWidth = 120;
// let spriteHeight = 135;
let gameFrame = 0;
//sempre roadara a cada x frames (determina a velocidade da animação)
const staggerFrames = 13;
const spriteAnimations = [];
//todos os dados para animações (fazemos isso porque os frames possuem tamanhos diferentes)
const animationStates = [
    {
        name: 'run',
        frames: 8,
        spriteWidth: 108,
        spriteHeight: 135,
        staggerFrames: 5,
    },

    {
        name: 'idle',
        frames: 8,
        spriteWidth: 98,
        spriteHeight: 135,
        staggerFrames: 5,
    },

    {
        name: 'death',
        frames: 13,
        spriteWidth: 119,
        spriteHeight: 135,
        staggerFrames: 6,
    },

    // {
    //     name: 'death2',
    //     frames: 6,
    //     spriteWidth: 119,
    //     spriteHeight: 130,
    //     staggerFrames: 12,
    // }
];

function getAnimationState(name){
    for(const state of animationStates){
        if(state.name == name)
            return state;
    }
}

animationStates.forEach((state, index) => {
    let frames = {
        location: [],
    }

    let positionX;
    let positionY;

    for (let j = 0 ; j < state.frames; j++){
        positionX = j * state.spriteWidth;
        positionY = index * state.spriteHeight;
        frames.location.push({x: positionX, y:positionY});
    }

    spriteAnimations[state.name] = frames;
});

function animate(){  
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let animationState = getAnimationState(playerState);
    
    //aumentar frames antes de chegar em 1 -> gameFrame/staggerFrame aumenta 1 sempre q um loop acontece
    let position = Math.floor(gameFrame/animationState.staggerFrames) % spriteAnimations[playerState].location.length;
    let frameX = spriteAnimations[playerState].location[position].x;
    let frameY = spriteAnimations[playerState].location[position].y;
    let spriteWidth = animationState.spriteWidth;
    let spriteHeight = animationState.spriteHeight;

    // console.log(spriteWidth);
    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, x, y, spriteWidth, spriteHeight);
    gameFrame++;

    spriteAnimations[playerState].animationId = requestAnimationFrame(animate);
}

animate();

function clearAnimation(){
    let animationId = spriteAnimations[playerState].animationId; 
    if (animationId != undefined)
        cancelAnimationFrame(animationId);
    gameFrame = 0;
}

let teclar;
let lastKey;

function OnKeyDown(event) {
    teclar = event.key;
}

function OnKeyUp() {
    teclar = "";
    clearAnimation();
    playerState = 'idle';
    animate();
}

function Update() {
    if(lastKey != teclar){
        clearAnimation();
    }

    if (teclar == "d") {
        playerState = 'run';
        x += 1;
    } else if (teclar == "a") {
        playerState = 'run';
        x -= 1;
    } else if (teclar == "w") {
        playerState = 'death';
        y -= 1;
    } else if (teclar == "s") {
        y += 1;
    }

    if(lastKey != teclar){
        animate();
    }

    lastKey = teclar;
}

setInterval(Update, 0);







