var canv;
var ctx;
let score;
let start;
let live;
let timeout = 1000/15;
window.onload=function() {
    canv = document.getElementById("gc");
    ctx = canv.getContext("2d");
    score = document.getElementById("score");
    start = document.getElementById("restart");
    document.addEventListener("keydown", keyPush);
    setInterval(game, timeout);
    live = true;
};

//position du serpent
let px = 10;
let py = 10;


let gs = 20;
let tc = 40;

//position du point rouge
let ax = Math.floor(Math.random() * tc);
let ay = Math.floor(Math.random() * tc);


let xv=0;
let yv=0;
let trail = [];
let tail = 5;

function restart(){
    live = true;
    start.style.display = 'none';
    score.innerHTML = 5;

    px = py = 10;

    ax = Math.floor(Math.random() * tc);
    ay = Math.floor(Math.random() * tc);


    xv=yv=0;
    trail = [];
    tail = 5;
}

function game(){
    if(live){
        console.log('test');
        px += xv;
        py += yv;
        if(px < 0){
            live = false;
        }
        if(px > tc-1){
            live = false;

        }
        if(py < 0){
            live = false;
        }
        if(py > tc-1){
            live= false;
        }
        ctx.fillStyle = "black";
        ctx.fillRect(0,0, canv.width, canv.height);

        for(let i = 0; i < trail.length; i++){
            ctx.fillStyle = "lime";
            ctx.fillRect(trail[i].x*gs,trail[i].y*gs,gs-2, gs-2);
            if(i === trail.length-1){
                ctx.fillStyle = 'green';
                ctx.fillRect(trail[i].x*gs, trail[i].y*gs, gs-2, gs-2);
                ctx.fillStyle = 'black';
                if(yv === -1){
                    ctx.fillRect(trail[i].x*gs+10, trail[i].y*gs+1, 5, 5);
                    ctx.fillRect(trail[i].x*gs+2, trail[i].y*gs+1, 5, 5);
                }else if(yv === 1){

                    ctx.fillRect(trail[i].x*gs+10, trail[i].y*gs+9, 5, 5);
                    ctx.fillRect(trail[i].x*gs+2, trail[i].y*gs+9, 5, 5);
                }else if(xv === -1){
                    ctx.fillRect(trail[i].x*gs+1, trail[i].y*gs+10, 5, 5);
                    ctx.fillRect(trail[i].x*gs+1, trail[i].y*gs+2, 5, 5);
                }else if(xv === 1){
                    ctx.fillRect(trail[i].x*gs+9, trail[i].y*gs+10, 5, 5);
                    ctx.fillRect(trail[i].x*gs+9, trail[i].y*gs+2, 5, 5);
                }
            }
            if(tail !== 5){
                if(trail[i].x === px && trail[i].y === py){
                    live = false;
                }
            }

        }

        trail.push({x:px, y:py});
        while(trail.length > tail){
            trail.shift();
        }

        if(ax===px && ay===py){
            tail++;
            score.innerHTML = tail;
            ax = Math.floor(Math.random()*tc);
            ay = Math.floor(Math.random()*tc);
        }


        ctx.fillStyle="red";
        ctx.fillRect(ax*gs,ay*gs,gs-2, gs-2);
    }else{
        start.style.display = 'block';
    }


}

function keyPush(evt){
    switch (evt.code) {
        case "ArrowLeft":
            xv=-1; yv=0;
            break;
        case "ArrowDown":
            xv=0; yv=1;
            break;
        case "ArrowRight":
            xv=1; yv=0;
            break;
        case "ArrowUp":
            xv=0; yv=-1;
            break;
        case 'Space':
            restart();
            break;
    }
}
