var canv;
var ctx;
let score;
let start;
let live;
window.onload=function() {
    canv = document.getElementById("gc");
    ctx = canv.getContext("2d");
    score = document.getElementById("score");
    start = document.getElementById("restart");
    document.addEventListener("keydown", keyPush);
    setInterval(game, 1000/15);
    live = true;
};

px=py=10;
gs=tc=20;
ax=ay=15;


xv=yv=0;
trail = [];
let tail = 5;

function restart(){
    live = true;
    start.style.display = 'none';
    score.innerHTML = 5;

    px=py=10;
    gs=tc=20;
    ax=ay=15;


    xv=yv=0;
    trail = [];
    tail = 5;
}

function game(){
    if(live){
        console.log('test');
        px += xv;
        py+=yv;
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
        ctx.fillStyle="black";
        ctx.fillRect(0,0,canv.width, canv.height);

        ctx.fillStyle="lime";
        for(let i = 0; i < trail.length; i++){

            ctx.fillRect(trail[i].x*gs,trail[i].y*gs,gs-2, gs-2);
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
