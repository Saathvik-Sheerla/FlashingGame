let gameSeq = [];
let userSeq = [];
let btns = ["red", "blue", "voilet", "gold"];

let score = 0;
let points = 0;
let started = false;
let initialize = false;

let counter = 0;
let players = [];
let highScore = 0;
let highScorePlayer = players[0];

let h2 = document.querySelector("h2");

function askUser(i){
    players[i] = prompt("Enter your name");
}

document.addEventListener("keypress",()=>{
    if(initialize === false){
        let n = noPlayers();
        initialize = true;
    
        if(counter < n && started === false && initialize === true){
            started = true;
            askUser(counter++);
            h2.innerHTML = `Game started, Player Name: <i>${players[counter-1]}<i>`;
            next();
            np++;
            }

        }
});

function noPlayers(){
    return prompt("Enter no of players");
}

function winner(){
    if(points > highScore){
        highScore = points;
        highScorePlayer = player[counter-1];
    }
}

if(started === true){
    btnPress();
}

function next(){
    userSeq = [];
    score++;
    points = points*2 + addon(score);

    let idx = Math.floor(Math.random() * 3)+1;
    let randColor = btns[idx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameFlash(randBtn);
    gameSeq.push(randColor);
}

function gameFlash(btn){
    btn.classList.add("gameFlash");

    setTimeout(()=>{
        btn.classList.remove("gameFlash");
    },500);
}

function userFlash(btn){
    btn.classList.add("userFlash");

    setTimeout(()=>{
        btn.classList.remove("userFlash");
    },200);
}

function btnPress(){
    userFlash(this);
    userColor = this.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");

for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}


function checkAns(idx){

    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length === gameSeq.length){
            setTimeout(next, 750);
        }
    } else{
        let body = document.querySelector("body");
        body.classList.add("errorRed");
        setTimeout(()=>{
            body.classList.remove("errorRed");
        },800);
        h2.innerHTML = `Game Over!  Your Score is <b>${score}<b> <br>press enter to play again`;
        reset();

        if(np == n){
            winner();
            h2.innerHTML = `Game Over! <br> ${highScorePlayer} is winner with score <b>${score}`;
        }
    }
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    score = 0;
    points = 0;
}

function addon(score){
    return Math.floor(Math.random() * score%10);
}

