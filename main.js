var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var lineWidth = 5;

/***全屏canvas***/
autoSetCanvasSize(canvas);
listenToUser(canvas);



/***橡皮擦***/
var eraserEnabled = false;
pen.onclick = function () {
    eraserEnabled = false;
    pen.classList.add('active');
    eraser.classList.remove('active');
}
eraser.onclick = function () {
    eraserEnabled = true;
    eraser.classList.add('active');
    pen.classList.remove('active');
}
/**/
red.onclick = function () {
    context.strokeStyle = '#ff484f';
    red.classList.add('active');
    green.classList.remove('active');
    blue.classList.remove('active');
}
green.onclick = function () {
    context.strokeStyle = '#a0ff8d';
    green.classList.add('active');
    red.classList.remove('active');
    blue.classList.remove('active');
}
blue.onclick = function (){
    context.strokeStyle = '#7277ff';
    blue.classList.add('active');
    green.classList.remove('active');
    red.classList.remove('active');
}

thin.onclick = function () {
    lineWidth = 5;
}
thick.onclick = function () {
    lineWidth = 8;
}
clear.onclick = function () {
    context.clearRect(0,0,canvas.width,canvas.height);
}
save.onclick = function () {
    var url = canvas.toDataURL('image/png');
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = '我的画';
    a.target = '_blank';
    a.click();
}


function drawCircle(x,y,radius){
    context.beginPath();
    context.fillStyle='black';
    context.arc(x,y,radius,0,Math.PI*2);
    context.fill();
}

function paintLine(x1,y1,x2,y2){
    context.beginPath();
    context.moveTo(x1,y1);
    context.lineWidth=lineWidth;
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

/**/
function listenToUser(canvas){
    var context = canvas.getContext('2d');

    var using = false;
    var lastPoint = {'x':undefined,'y':undefined};

    if(document.body.ontouchstart !== undefined){
        //触屏设备
        canvas.ontouchstart = function(e){
            var x = e.touches[0].clientX;
            var y = e.touches[0].clientY;
            using = true;
            if(eraserEnabled){
                context.clearRect(x-5,y-5,10,10);
            }else{
                lastPoint={'x':x,'y':y};
            }
        }

        canvas.ontouchmove = function(a){
            var x = a.touches[0].clientX;
            var y = a.touches[0].clientY;
            if(!using){return;}
            if(eraserEnabled){
                context.clearRect(x-5,y-5,10,10);
            }else{
                var newPoint = {'x':x,'y':y};
                paintLine(lastPoint.x,lastPoint.y,x,y);
                lastPoint = newPoint;
            }
        }

        canvas.ontouchend = function(a){
            using = false;
        }

    }else{
        //非触屏设备
        canvas.onmousedown = function(e){
            var x = e.clientX;
            var y = e.clientY;
            using = true;
            if(eraserEnabled){
                context.clearRect(x-5,y-5,10,10);
            }else{
                lastPoint={'x':x,'y':y};
                drawCircle(x,y,1);
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
                drawCircle(x,y,1);
                paintLine(lastPoint.x,lastPoint.y,x,y);
                lastPoint = newPoint;
            }
        }

        canvas.onmouseup = function(a){
            using = false;
        }
    }

}
