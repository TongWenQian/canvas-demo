var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

/***全屏canvas***/
autoSetCanvasSize(canvas);
listenToMouse(canvas);



/***橡皮擦***/
var eraserEnabled = false;
eraser.onclick = function(){
    eraserEnabled =true;
    actions.className = 'actions x';
}
brush.onclick = function(){
    eraserEnabled = false;
    actions.className = 'actions';
}


function drawCircle(x,y,radius){
    context.beginPath();
    context.fillStyle='black';
    context.arc(x,y,radius,0,Math.PI*2);
    context.fill();
}

function paintLine(x1,y1,x2,y2){
    context.beginPath();
    context.strokeStyle='black';
    context.moveTo(x1,y1);
    context.lineWidth=5;
    context.lineTo(x2,y2);
    context.stroke();
    context.closePath();
}
/***/
function autoSetCanvasSize(canvas){
    setCanvasSize();
    window.onresize = function(){
        setCanvasSize();
    }
    function setCanvasSize(){
        var pageWidth = document.documentElement.clientWidth;
        var pageHeight = document.documentElement.clientHeight;
        canvas.width = pageWidth;
        canvas.height = pageHeight;
    }
}

function listenToMouse(canvas){
    var context = canvas.getContext('2d');

    var using = false;
    var lastPoint = {'x':undefined,'y':undefined};
    canvas.onmousedown = function(e){
        var x = e.clientX;
        var y = e.clientY;
        using = true;
        if(eraserEnabled){
            context.clearRect(x-5,y-5,10,10);
        }else{
            lastPoint={'x':x,'y':y};
        }
    }

    canvas.onmousemove = function(a){
        var x = a.clientX;
        var y = a.clientY;
        if(!using){return;}
        if(eraserEnabled){
            context.clearRect(x-5,y-5,10,10);
        }else{
            var newPoint = {'x':x,'y':y};
            paintLine(lastPoint.x,lastPoint.y,x,y);
            lastPoint = newPoint;
        }
    }

    canvas.onmouseup = function(a){
        using = false;
    }

}
