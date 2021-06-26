const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "black";
/*
ctx.fillRect(0,0,10000,100);
ctx.fillRect(0,400,10000,100);
*/
if(window.localStorage.getItem("highscore") === null)
{
    window.localStorage.setItem("highscore",0);
}
let score;
let player = {
h : 50,
w : 50,
x : 100,
y : 350,
dy: 10
}
let groundup = {
    x : 0,
    y : 0,
    h : 100,
    w : 100000,
    dx : 5
}
let grounddown = {
    x : 0,
    y : 400,
    h : 100,
    w : 100000,
    dx : 5
}
ctx.fillRect(groundup.x,groundup.y,groundup.w,groundup.h);
ctx.fillRect(grounddown.x,grounddown.y,grounddown.w,grounddown.h);
let randomup = new Array;
let randomdown = new Array;
for(let i=1;i<=500;i++)
{
    randomup[i] = (Math.random() * 200) + (i*450);
    ctx.clearRect(randomup[i],groundup.y,50,100);
}
for(let i=1;i<=500;i++)
{
    randomdown[i] = (Math.random() * 200) + randomup[i] + 100;
    ctx.clearRect(randomdown[i],grounddown.y,50,100);
}
ctx.fillStyle = "royalblue";
ctx.fillRect(player.x,player.y,player.w,player.h);
let count = 0;
function drawbox(){
    ctx.beginPath();
    ctx.rect(player.x, player.y, player.w, player.h);
    ctx.fillStyle="royalblue";
    ctx.fill();
}


function up(){
    if(Math.ceil(player.y)>100||((Math.ceil(player.y)>100)&&(Math.ceil(player.y)<111)))
    {
    ctx.clearRect(player.x,player.y,player.w,player.h);
    /*
    if(score>300)
    {
        player.dy = 10 + Math.ceil(score/100);
    }
    */
    player.y -= player.dy;
    drawbox();
    requestAnimationFrame(up);
    }
}

function down(){
    if(Math.ceil(player.y)<350||((Math.ceil(player.y)<350)&&(Math.ceil(player.y)>339)))
    {
    ctx.clearRect(player.x,player.y,player.w,player.h);
    /*
    if(score>300)
    {
        player.dy = 10 + Math.ceil(score/100);
    }
    */
    player.y += player.dy;
    drawbox();
    requestAnimationFrame(down);
    }
}
document.addEventListener("keypress",function(e){
    if(document.getElementById("canvas").style.display == "block")
    {
    if(e.key === ' ')
    {
    if(count%2 == 0 && player.y == 350)
    {
    up();
    count++;
    }
    else if(count%2 == 1 && player.y == 100)
    {
        down();
        count++;
    }
    }
}
});

document.getElementById("canvas").addEventListener("click",function(e){
    if(count%2 == 0)
    {
    up();
    count++;
    }
    else
    {
        down();
        count++;
    }
});
let k = 0;
document.addEventListener("keypress",function(e){
    if(k==0)
    {
    if(e.key === 'Enter')
    {
    document.getElementById("canvas").style.display = "block";
    document.getElementById("inst").style.display = "none";
    start();
    k=1;
    }
}
});
let scorecount=0;
function drawground(){
    ctx.fillStyle = "black";
    ctx.fillRect(groundup.x,groundup.y,groundup.w,groundup.h);
    ctx.fillRect(grounddown.x,grounddown.y,grounddown.w,grounddown.h);
    for(let i=1;i<=500;i++)
{
    ctx.clearRect(randomup[i],groundup.y,75,100);
}
for(let i=1;i<=500;i++)
{
    ctx.clearRect(randomdown[i],grounddown.y,75,100);
}
}
let req;
function start(){
    let wi = 600;
    let he = 500/4;
    ctx.clearRect(groundup.x,groundup.y,groundup.w,groundup.h);
    ctx.clearRect(grounddown.x,grounddown.y,grounddown.w,grounddown.h);
    score = Math.ceil(-1*grounddown.x/10);
    if(score<300)
    {
    groundup.x -=  groundup.dx;
    grounddown.x -= grounddown.dx;
    }
    else 
    {
        groundup.dx = (score+200)/100;
        grounddown.dx = (score+200)/100;
        groundup.x -=  groundup.dx;
        grounddown.x -= grounddown.dx;
    }
    ctx.clearRect(600,100,canvas.width,canvas.height-200);
    ctx.font = "30px Amatic SC";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score,wi,he);
    ctx.fillText("Highscore: " + window.localStorage.getItem("highscore"),wi,he+30);
    for(let i=1;i<=500;i++)
{
    randomup[i] -= groundup.dx; 
}
for(let i=1;i<=500;i++)
{
    randomdown[i] -= grounddown.dx; 
}
    drawground();
    req = requestAnimationFrame(start);
 
    for(i=1;i<500;i++)
    {
        if(((Math.floor(randomup[i]) < player.x + 50)&&(Math.floor(randomup[i])>player.x) || (Math.floor(randomup[i] + 75) > player.x )&&(Math.floor(randomup[i]<player.x + 50)))&&(player.y == 100))
        {
            cancelAnimationFrame(req);
            ctx.font = "30px Amatic SC";
            ctx.fillStyle = "black";
            ctx.fillText("Press 'r' to play again",290,250);
            if(score>window.localStorage.getItem("highscore"))
            {
                window.localStorage.setItem("highscore",score);
            }
            ctx.clearRect(600,100,canvas.width,canvas.height-200);
            ctx.font = "30px Amatic SC";
            ctx.fillStyle = "black";
            ctx.fillText("Score: " + score,wi,he);
            ctx.fillText("Highscore: " + window.localStorage.getItem("highscore"),wi,he+30);
        }

        if(((Math.floor(randomdown[i]) < player.x + 50)&&(Math.floor(randomdown[i])>player.x) || (Math.floor(randomdown[i] + 75) > player.x )&&(Math.floor(randomdown[i]<player.x + 50)))&&(player.y == 350))
        {
            cancelAnimationFrame(req);
            ctx.font = "30px Amatic SC";
            ctx.fillStyle = "black";
            ctx.fillText("Press 'r' to play again",290,250);
            if(score>window.localStorage.getItem("highscore"))
            {
                window.localStorage.setItem("highscore",score);
            }
            ctx.clearRect(600,100,canvas.width,canvas.height-200);
            ctx.font = "30px Amatic SC";
            ctx.fillStyle = "black";
            ctx.fillText("score: " + score,wi,he);
            ctx.fillText("highscore: " + window.localStorage.getItem("highscore"),wi,he+30);
        }
        if((((randomup[i]<player.x)&&(randomup[i] + 75>player.x +50))&&(player.y == 100))||(((randomdown[i]<player.x)&&(randomdown[i] + 75 >player.x +50))&&(player.y == 350)))
        {
            cancelAnimationFrame(req);           
            ctx.font = "30px Amatic SC";
            ctx.fillStyle = "black";
            ctx.fillText("press 'r' to play again",290,250);
            if(score>window.localStorage.getItem("highscore"))
            {
                window.localStorage.setItem("highscore",score);
            }
            ctx.clearRect(600,100,canvas.width,canvas.height-200);
            ctx.font = "30px Amatic SC";
            ctx.fillStyle = "black";
            ctx.fillText("score: " + score,wi,he);
            ctx.fillText("highscore: " + window.localStorage.getItem("highscore"),wi,he+30);
        }
        
    }
}
let reload=0;
document.addEventListener("keypress",function(e){
    if(e.key == 'r')
    {
        reload = 1;
        window.localStorage.setItem("reload",reload);
        window.location.reload();
    }
});

if(window.localStorage.getItem("reload") == 1)
{
    reload = 0;
    window.localStorage.setItem("reload",reload);
    document.getElementById("canvas").style.display = "block";
    document.getElementById("inst").style.display = "none";
    k=1;
    player.dy = 10;
    start();
}
/*        ctx.clearRect(0,0,800,500);
playinitialize();
ctx.fillRect(groundup.x,groundup.y,groundup.w,groundup.h);
ctx.fillRect(grounddown.x,grounddown.y,grounddown.w,grounddown.h);
let randomup = new Array;
let randomdown = new Array;
for(let i=1;i<=500;i++)
{
    randomup[i] = (Math.random() * 200) + (i*450);
    ctx.clearRect(randomup[i],groundup.y,50,100);
}
for(let i=1;i<=500;i++)
{
    randomdown[i] = (Math.random() * 200) + randomup[i] + 100;
    ctx.clearRect(randomdown[i],grounddown.y,50,100);
}
ctx.fillStyle = "royalblue";
ctx.fillRect(player.x,player.y,player.w,player.h);
let count = 0;
        start();
    }
});

function playinitialize()
{
    player.dy = 10;
 
    groundup.x = 0;
    groundup.y = 0;
    groundup.w = 100000;
    groundup.dx = 5;


    grounddown.x = 0;
    grounddown.y = 400;
    grounddown,h = 100;
    grounddown.w = 10000;
    grounddown.dx = 5;
}
*/