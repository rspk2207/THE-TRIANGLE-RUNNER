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
s : 100/(Math.sqrt(3)),
cfb: 100/6,
x : 100,
y : 350,
dy: 10
}
let obstacle1 = {
    h : 40,
    w : 40
}
let obstacle2 = {
    y:125,
    r:25,
    dy:2,
    code:0
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
let block1 = new Array;
let block2x = new Array;
let block2y = new Array;
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
for(let i=1;i<=5;i++)
{
    block1[i] = 50*(Math.random()* 100)+ 269;
    ctx.fillStyle = "darkred";
    ctx.fillRect(block1[i],230,obstacle1.w,obstacle1.h);
}
for(let i=1;i<=10;i++)
{
    block2x[i] = 100*(Math.random()* 100)+ 5200;
    block2y[i] = 125;
    ctx.fillStyle = "darkred";
    ctx.beginPath();
    ctx.arc(block2x[i],block2y[i],obstacle2.r,0,2*Math.PI);
    ctx.fill();
    ctx.closePath();
}
/*
ctx.fillStyle = "royalblue";
ctx.fillRect(player.x,player.y,player.w,player.h);
*/
let count = 0;
function drawbox(){
    ctx.save();
    if(count%2 == 1)
    {
        if(((150+player.y)*Math.PI/250)>(3*Math.PI/2))
        {
        ctx.translate(100+(player.s)/2,(player.y+(player.cfb*Math.cos((150+player.y)*Math.PI/250))));
        ctx.rotate((150+player.y)*Math.PI/250);
        ctx.translate(-(100+(player.s)/2),-(player.y+(player.cfb*Math.cos((150+player.y)*Math.PI/250))));
        }
        else
        {
            ctx.translate(100+(player.s)/2,(player.y+(player.cfb*(-3/2)*Math.cos((150+player.y)*Math.PI/250))));
            ctx.rotate((150+player.y)*Math.PI/250);
            ctx.translate(-(100+(player.s)/2),-(player.y+(player.cfb*(-3/2)*Math.cos((150+player.y)*Math.PI/250))));   
        }
    }
    else if((count%2 == 0))
    {
        if(((350-player.y)*Math.PI/250)<Math.PI/2)
        {
        ctx.translate(100+(player.s)/2,(player.y+((player.cfb*(Math.cos((350-player.y)*Math.PI/250))))));
        ctx.rotate((350-player.y)*(Math.PI/250));
        ctx.translate(-(100+(player.s)/2),-(player.y+((player.cfb*Math.cos((350-player.y)*Math.PI/250)))));
        }
        else
        {
        ctx.translate(100+(player.s)/2,(player.y+(player.cfb*(-1)*Math.cos((350-player.y)*Math.PI/250))));
        ctx.rotate((350-player.y)*Math.PI/250);
        ctx.translate(-(100+(player.s)/2),-(player.y+(player.cfb*(-1)*Math.cos((350-player.y)*Math.PI/250))));
        }
    }
    ctx.beginPath();
    ctx.moveTo(100,(player.y)+(player.h));
    ctx.lineTo(100+(player.s/2),player.y);
    ctx.lineTo(100+(player.s),(player.y)+(player.h));
    ctx.closePath();
    ctx.fillStyle="royalblue";
    ctx.fill();
    ctx.restore();
}
drawbox();
function clearbox()
{
 if(count%2 == 0)
 {
     if(player.y>(129))
    ctx.clearRect(player.x-((player.s/Math.sqrt(3))+player.s/2),player.y-player.s/(3/2),2*player.s+((player.s/Math.sqrt(3))),(3/2)*player.s);
 }   
 else if(count%2 == 1)
 {
    ctx.clearRect(player.x-((player.s/Math.sqrt(3))+player.s/2),player.y-player.s/(5/2),2*player.s+((player.s/Math.sqrt(3))),(3/2)*player.s);
 }
}
/*
if((score>300)&&(player.y<350))
{
    player.dy = 7 + Math.ceil(score/100);
}
*/
function up(){
    if(Math.ceil(player.y)>100||((Math.ceil(player.y)>100)&&(Math.ceil(player.y)<111)))
    {
    clearbox();
    player.y -= player.dy; 
    
    drawbox();
   shiftup = requestAnimationFrame(up);
    }
}
function down(){
    if(Math.ceil(player.y)<350||((Math.ceil(player.y)<350)&&(Math.ceil(player.y)>339)))
    {
    clearbox();
    player.y += player.dy;
    drawbox();
    shiftdown = requestAnimationFrame(down);
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
function obstacles()
{
    for(let i=1;i<=5;i++)
    {
    ctx.clearRect(block1[i],230,obstacle1.w+5,obstacle1.h+5);
    block1[i] -= grounddown.dx;
    ctx.fillStyle = "darkred";
    ctx.fillRect(block1[i],230,obstacle1.w,obstacle1.h);
    }
    for(let i=1;i<=10;i++)
    {
        ctx.clearRect(block2x[i]-obstacle2.r,block2y[i]-obstacle2.r,2*obstacle2.r+5,2*obstacle2.r+5);
        if(obstacle2.code%2 == 0)
        {
            if(block2y[i]<370)
            {
                block2y[i] += obstacle2.dy; 
            }
            if(block2y[i]>=370)
            {
                obstacle2.code++;
            }
        }
        else if(obstacle2.code%2 == 1)
        {
            if(block2y[i]>130)
            {
                block2y[i] -= obstacle2.dy;
            }
            if(block2y[i]<=130)
            {
                obstacle2.code++;
            }
        }
        block2x[i] -= grounddown.dx;
        ctx.fillStyle = "darkred";
        ctx.beginPath();
        ctx.arc(block2x[i],block2y[i],obstacle2.r,0,2*Math.PI);
        ctx.fill();
        ctx.closePath();

    }
}
let req;
function start(){
    let wi = 600;
    let he = 500/4;
    ctx.clearRect(groundup.x,groundup.y,groundup.w,groundup.h);
    ctx.clearRect(grounddown.x,grounddown.y,grounddown.w,grounddown.h);
    score = Math.ceil(-1*grounddown.x/10);
    if(score<500)
    {
    groundup.x -=  groundup.dx;
    grounddown.x -= grounddown.dx;
    }
    else 
    {
        groundup.dx = (score+500)/200;
        grounddown.dx = (score+500)/200;
        groundup.x -=  groundup.dx;
        grounddown.x -= grounddown.dx;
    }
    ctx.clearRect(600,100,canvas.width,canvas.height-200);
    ctx.font = "30px Amatic SC";
    ctx.fillStyle = "darkred";
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
/*
for(let i=1;i<=10;i++)
{
    block1[i] -= grounddown.dx;
}
*/

if(count%2 ==1)
{
if((Math.ceil(player.y)>100)&&(Math.ceil(player.y)<111))
{
clearbox();
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

if(count%2 == 0)
{
if((Math.ceil(player.y)<350)&&(Math.ceil(player.y)>339))
    {
    clearbox();
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
    drawground();
    obstacles();
    req = requestAnimationFrame(start);
 
    for(i=1;i<500;i++)
    {
        if(((Math.floor(randomup[i]) < player.x + player.s)&&(Math.floor(randomup[i])>player.x) || (Math.floor(randomup[i] + 75) > player.x )&&(Math.floor(randomup[i]<player.x + player.s)))&&(player.y == 100))
        {
            cancelAnimationFrame(req);
            ctx.font = "30px Amatic SC";
            ctx.fillStyle = "darkred";
            ctx.fillText("Press 'r' to play again",290,250);
            if(score>window.localStorage.getItem("highscore"))
            {
                window.localStorage.setItem("highscore",score);
            }
            ctx.clearRect(600,100,canvas.width,canvas.height-200);
            ctx.font = "30px Amatic SC";
            ctx.fillStyle = "darkred";
            ctx.fillText("Score: " + score,wi,he);
            ctx.fillText("Highscore: " + window.localStorage.getItem("highscore"),wi,he+30);
        }

        if(((Math.floor(randomdown[i]) < player.x + player.s)&&(Math.floor(randomdown[i])>player.x) || (Math.floor(randomdown[i] + 75) > player.x )&&(Math.floor(randomdown[i]<player.x + player.s)))&&(player.y == 350))
        {
            cancelAnimationFrame(req);
            ctx.font = "30px Amatic SC";
            ctx.fillStyle = "darkred";
            ctx.fillText("Press 'r' to play again",290,250);
            if(score>window.localStorage.getItem("highscore"))
            {
                window.localStorage.setItem("highscore",score);
            }
            ctx.clearRect(600,100,canvas.width,canvas.height-200);
            ctx.font = "30px Amatic SC";
            ctx.fillStyle = "darkred";
            ctx.fillText("score: " + score,wi,he);
            ctx.fillText("highscore: " + window.localStorage.getItem("highscore"),wi,he+30);
        }
        if((((randomup[i]<player.x)&&(randomup[i] + 75>player.x +player.s))&&(player.y == 100))||(((randomdown[i]<player.x)&&(randomdown[i] + 75 >player.x +player.s))&&(player.y == 350)))
        {
            cancelAnimationFrame(req);      
            ctx.font = "30px Amatic SC";
            ctx.fillStyle = "darkred";
            ctx.fillText("press 'r' to play again",290,250);
            if(score>window.localStorage.getItem("highscore"))
            {
                window.localStorage.setItem("highscore",score);
            }
            ctx.clearRect(600,100,canvas.width,canvas.height-200);
            ctx.font = "30px Amatic SC";
            ctx.fillStyle = "darkred";
            ctx.fillText("score: " + score,wi,he);
            ctx.fillText("highscore: " + window.localStorage.getItem("highscore"),wi,he+30);
        }
        
    }
    for(let i=1;i<=5;i++)
    {
        if((((player.x+player.s> block1[i])&&(player.x+player.s<block1[i]+obstacle1.w))||((player.x>block1[i])&&(player.x<block1[i]+obstacle1.w)))&&((player.y+(2/3)*player.h<280)&&(player.y+(2/3)*player.h>230)))
        {
            cancelAnimationFrame(req);           
            ctx.font = "30px Amatic SC";
            ctx.fillStyle = "darkred";
            ctx.fillText("press 'r' to play again",290,250);
            if(score>window.localStorage.getItem("highscore"))
            {
                window.localStorage.setItem("highscore",score);
            }
            ctx.clearRect(600,100,canvas.width,canvas.height-200);
            ctx.font = "30px Amatic SC";
            ctx.fillStyle = "darkred";
            ctx.fillText("score: " + score,wi,he);
            ctx.fillText("highscore: " + window.localStorage.getItem("highscore"),wi,he+30);
        }
    }
    for(let i=1;i<=10;i++)
    {
        if((((player.x+player.s> block2x[i])&&(player.x+player.s<block2x[i]+2*obstacle1.r))||((player.x>block2x[i])&&(player.x<block2x[i]+2*obstacle2.r)))&&((((player.y>block2y[i])&&(player.y<block2y[i]+2*obstacle2.r)))||(player.y<block2y[i])&&(player.y+player.h>block2y[i])&&(player.y+player.h<block2y[i]+2*obstacle2.r)))
        {
            cancelAnimationFrame(req);           
            ctx.font = "30px Amatic SC";
            ctx.fillStyle = "darkred";
            ctx.fillText("press 'r' to play again",290,250);
            if(score>window.localStorage.getItem("highscore"))
            {
                window.localStorage.setItem("highscore",score);
            }
            ctx.clearRect(600,100,canvas.width,canvas.height-200);
            ctx.font = "30px Amatic SC";
            ctx.fillStyle = "darkred";
            ctx.fillText("score: " + score,wi,he);
            ctx.fillText("highscore: " + window.localStorage.getItem("highscore"),wi,he+30);
        }
    }
    /*
    for(let i=1;i<=10;i++)
    {
        if((player.x+player.h> block1[i]+obstacle1.w)&&(player.x<block1[i])&&(player.y>230)&&(player.y<280))
        {
            cancelAnimationFrame(req);           
            ctx.font = "30px Amatic SC";
            ctx.fillStyle = "darkred";
            ctx.fillText("press 'r' to play again",290,250);
            if(score>window.localStorage.getItem("highscore"))
            {
                window.localStorage.setItem("highscore",score);
            }
            ctx.clearRect(600,100,canvas.width,canvas.height-200);
            ctx.font = "30px Amatic SC";
            ctx.fillStyle = "darkred";
            ctx.fillText("score: " + score,wi,he);
            ctx.fillText("highscore: " + window.localStorage.getItem("highscore"),wi,he+30);
        }
    }
    */
}
if(count%2 ==1)
{
if((Math.ceil(player.y)>100)&&(Math.ceil(player.y)<111))
{
    clearbox();
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
if(count%2 == 0)
{
if((Math.ceil(player.y)<350)&&(Math.ceil(player.y)>339))
    {
    clearbox();
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