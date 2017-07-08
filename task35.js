/**
 * Created by Administrator on 2017/3/18.
 */
var table=document.getElementById("map");
var text=document.getElementById("text");
var exec=document.getElementById("exec");
var clear=document.getElementById("clear");
var tv=document.getElementById("tv");
var box=document.getElementById("box");
(function printMap(){
    for(var r=0;r<11;r++){
        var tr=document.createElement("tr");
        for(var c=0;c<11;c++){
            var td=document.createElement("td");
            if(r==0){
                td.innerHTML=c;
                td.className="fontstyle";
            }else if(c==0){
                td.innerHTML=r;
                td.className="fontstyle";
            }else{
                td.className="tdstyle";
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
})();
var car= {
    x: Math.floor(Math.random() * 10+1),//当前横坐标
    y: Math.floor(Math.random() * 10+1),//当前纵坐标
    currentDeg:0,//当前度数
    targetDeg:0,//要旋转到的度数
    deg:0,//要前进方向的度数
    canvas:document.getElementById("image"),//储存活动的图片
    placeImage: function () {
        var context = car.canvas.getContext("2d");
        context.fillStyle = "blue";
        context.fillRect(0, 0, 64, 21);
        context.fillStyle = "red";
        context.fillRect(0, 21, 64, 43);
        table.appendChild(car.canvas);
        car.canvas.style.top = 64+(car.y-1)* 66+1 + "px";
        car.canvas.style.left = 64+(car.x-1)* 66+1 + "px";
        console.log("横坐标:"+car.x+" 纵坐标:"+car.y);
        console.log("当前度数:"+car.currentDeg+" 目标度数:"+car.targetDeg+" 前进方向的度数"+car.deg);
    },
    calDeg:function(){
        if (car.targetDeg-car.currentDeg>180){
            car.deg=car.targetDeg-car.currentDeg-360;
        }else if(car.targetDeg-car.currentDeg<-180){
            car.deg=360+car.targetDeg-car.currentDeg;
        }else{
            car.deg=car.targetDeg-car.currentDeg;
        }
    },
    rotate:function(deg,movetoDeg){

        if (movetoDeg==false) {
            if (car.canvas.style.transform == "" || car.canvas.style.transform == undefined) {
                car.canvas.style.transform = "rotate(" + deg + "deg)";
            } else {
                car.canvas.style.transform = "rotate(" + (parseInt(car.canvas.style.transform.slice(7)) + deg ) + "deg)";
            }
        }else if(movetoDeg==true){
            car.canvas.style.transform = "rotate(" + deg + "deg)";
        }
    },
    go:function(){
        if (car.currentDeg==0&&car.y>1){
            car.canvas.style.top=(parseInt(car.canvas.style.top)-66)+"px";
            car.y--;
        }else  if ((car.currentDeg==90||car.currentDeg==-270)&&car.x<10){
            car.canvas.style.left=(parseInt(car.canvas.style.left)+66)+"px";
            car.x++;
        }else  if ((car.currentDeg==180||car.currentDeg==-180)&&car.y<10){
            car.canvas.style.top=(parseInt(car.canvas.style.top)+66)+"px";
            car.y++;
        }else  if ((car.currentDeg==-90||car.currentDeg==270)&&car.x>1){
            car.canvas.style.left=(parseInt(car.canvas.style.left)-66)+"px";
            car.x--;
        }
    },
    goTop:function(){
        if (car.y>1){
            car.canvas.style.top=(parseInt(car.canvas.style.top)-66)+"px";
            car.y--;
        }
    },
    goBottom:function(){
        if (car.y<10){
            car.canvas.style.top=(parseInt(car.canvas.style.top)+66)+"px";
            car.y++;
        }
    },
    goLeft:function(){
        if (car.x>1){
            car.canvas.style.left=(parseInt(car.canvas.style.left)-66)+"px";
            car.x--;
        }
    },
    goRight:function(){
        if (car.x<10){
            car.canvas.style.left=(parseInt(car.canvas.style.left)+66)+"px";
            car.x++;
        }
    }
};
car.placeImage();
function addHandler(element,type,handler){//跨浏览器兼容性添加事件
    if (window.addEventListener){
        window.addEventListener(type,handler,false);
    }else if(element.attachEvent){
        element.attachEvent("on"+type,handler);
    }else{
        element["on"+type]=handler;
    }
}
function move(text,cishu){
    var reg1=/[\d]+/gi;
    var reg2=/(([A-Z])+(\s)*)+/gi;
    if (text.match(reg1)!=undefined) {
        var count = text.match(reg1)[0];
    }else{
        var count=1;
    }
    if (text!="") {
        var wenzi = text.match(reg2)[0].toLocaleUpperCase().trim();
    }
            if(wenzi=="TRA LEF"){
                for (var i=0;i<count;i++){
                    car.goLeft();
                }
             }
            else if (wenzi=="TRA TOP") {
                for (var i = 0; i < count; i++) {
                    car.goTop();
                }
            }else if(wenzi=="TRA RIG") {
        for (var i = 0; i < count; i++) {
            car.goRight();
        }
    }else if(wenzi=="TRA BOT") {
        for (var i = 0; i < count; i++) {
            car.goBottom();
        }
    }else if(wenzi=="TUN LEF") {
        car.rotate(-90, false);
        car.currentDeg += -90;
        car.currentDeg %= 360;
    }else if(wenzi=="TUN RIG") {
        car.rotate(90, false);
        car.currentDeg += 90;
        car.currentDeg %= 360;
    }else if(wenzi=="TUN BAC") {
        car.rotate(180, false);
        car.currentDeg += 180;
        car.currentDeg %= 360;
    }else if(wenzi=="MOV LEF") {
        car.rotate(-90, true);
        car.currentDeg = -90;
        for (var i = 0; i < count; i++) {
            car.goLeft();
        }
    }else if(wenzi=="MOV TOP") {
        car.rotate(0, true);
        car.currentDeg = 0;
        for (var i = 0; i < count; i++) {
            car.goTop();
        }
    }else if(wenzi=="MOV RIG") {
        car.rotate(90, true);
        car.currentDeg = 90;
        for (var i = 0; i < count; i++) {
            car.goRight();
        }
    }else if(wenzi=="MOV BOT") {
        car.rotate(180, true);
        car.currentDeg = 180;
        for (var i = 0; i < count; i++) {
            car.goBottom();
        }
    }else if(wenzi=="GO"){
                for (var i=0;i<count;i++) {
                    car.go();
                }
    }else {
        var divs=box.getElementsByTagName("div");
        divs[cishu].style.backgroundColor="red";
                divs[cishu].style.borderRadius="50%";
    }
    tv.value="当前度数:"+car.currentDeg;
}
exec.addEventListener("click",function(){
    var arr=text.value.split("\n");
    var i=0;
    move(arr[i],i);
    i++;
    var timer=setInterval(function(){
        if (i < arr.length) {
            move(arr[i],i);
            i++;
        } else {
            clearInterval(timer);
        }
    },1000);
},false);
clear.addEventListener("click",function(){
    text.value="";
});
text.addEventListener("keydown",function(){
    var context=text.value;
    var row=context.split("\n");
    var arr=[];
    for(var i=0;i<row.length;i++){
        arr.push("<div>"+(i+1)+"</div>");
    };
    box.innerHTML=arr.join("");
	console.log(text.offsetHeight);
console.log(text.offsetWidth);
console.log(text.offsetTop);
console.log(text.offsetLeft);
console.log(text.offsetParent);
});
text.addEventListener("scroll",function(){
    var top=text.scrollTop;
    box.scrollTop=top;
})

