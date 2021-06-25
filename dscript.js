const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "black";
/*
ctx.fillRect(0,0,10000,100);
ctx.fillRect(0,400,10000,100);
*/
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
    w : 1000000,
    dx : 5
}
let grounddown = {
    x : 0,
    y : 400,
    h : 100,
    w : 1000000,
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
    randomdown[i] = (Math.random() * 250) + randomup[i] + 100;
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
    if(player.y>100)
    {
    ctx.clearRect(player.x,player.y,player.w,player.h);
    player.y -= player.dy;
    drawbox();
    requestAnimationFrame(up);
    }
}

function down(){
    if(player.y<350)
    {
    ctx.clearRect(player.x,player.y,player.w,player.h);
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
    start();
    k=1;
    }
}
});

function drawground(){
    ctx.fillStyle = "black";
    ctx.fillRect(groundup.x,groundup.y,groundup.w,groundup.h);
    ctx.fillRect(grounddown.x,grounddown.y,grounddown.w,grounddown.h);
    for(let i=1;i<=500;i++)
{
    ctx.clearRect(randomup[i],groundup.y,100,100);
}
for(let i=1;i<=500;i++)
{
    ctx.clearRect(randomdown[i],grounddown.y,100,100);
}
}

let req;
function start(){
    let wi = 600;
    let he = 500/4;
    ctx.clearRect(groundup.x,groundup.y,groundup.w,groundup.h);
    ctx.clearRect(grounddown.x,grounddown.y,grounddown.w,grounddown.h);
    let score = Math.ceil(-1*grounddown.x/10);
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
    ctx.clearRect(400,0,canvas.width,canvas.height);
    ctx.font = "25px Comic Sans MS";
    ctx.fillStyle = "black";
    ctx.fillText("score: " + score,wi,he);
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
        if(((Math.floor(randomup[i]) < player.x + 50)&&(Math.floor(randomup[i])>player.x) || (Math.floor(randomup[i] + 100) > player.x )&&(Math.floor(randomup[i]<player.x + 50)))&&(player.y == 100))
        {
            cancelAnimationFrame(req);
            f = 1;
        }

        if(((Math.floor(randomdown[i]) < player.x + 50)&&(Math.floor(randomdown[i])>player.x) || (Math.floor(randomdown[i] + 100) > player.x )&&(Math.floor(randomdown[i]<player.x + 50)))&&(player.y == 350))
        {
            cancelAnimationFrame(req);
        }
        if((((randomup[i]<player.x)&&(randomup[i] + 100>player.x +50))&&(player.y == 100))||(((randomdown[i]<player.x)&&(randomdown[i] + 100 >player.x +50))&&(player.y == 350)))
        {
            cancelAnimationFrame(req);           
        }
        
    }
}
let f=0;