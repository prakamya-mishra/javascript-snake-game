// settings
var snakex = 2;
var snakey =2;
var height =30;
var width = 30;
var increment =4;

//game variables
var tailx = [snakex];
var taily = [snakey];
var fx;
var fy;
var running = false;
var gameover = false;
var direction; //up = 0, down = -1, left = 1, right =2
var int;
var score =0;

/**
*entry point of the gameover
*/
function run(){
  init();
  int = setInterval(gameLoop, interval);
}

function init(){
  createmap();
  createsnake();
  createfruit();
}

/**
*generates the map for the snakey
*/
function createmap() {
  document.write("<table>");

    for(var y = 0; y<height ; y++){
      document.write("<tr>");
        for(var x = 0; x<width; x++){
          if(x==0 || x==width-1 || y==0 || y==height-1){
            document.write("<td class='wall' id='"+x+"-"+y+"'></td>");
          }else{
            document.write("<td class='blank' id='"+x+"-"+y+"'></td>");
          }
        }
      document.write("</tr>");
    }
  document.write("</table>");
}

function createsnake() {
    set(snakex, snakey, "snake");
}
function get(x,y) {
  return document.getElementById(x+"-"+y);
}

function set(x,y,value){
  if(x !=null && y !=null){
  get(x,y).setAttribute("class", value);
  }
}

function rand(min,max){
  return Math.floor(Math.random()*(max-min) + min);
}

function gettype(x,y){
  return get(x,y).getAttribute("class");
}

function createfruit() {
  var found = false;
  while(!found && (length <(width-2)*(height-2)+1)){
        var fruitx = rand(1,width-1);
        var fruity = rand(1,height-1);
        if(gettype(fruitx,fruity) == "blank")
          found = true;
    }
    set(fruitx, fruity, "fruit");
    fx = fruitx;
    fy = fruity;
}

window.addEventListener("keypress", function key(){
  //if key is w se direction up
  var key = event.keyCode;
  if(direction != -1 && (key == 119 || key == 87))
      direction = 0;
  //if key is s se direction down
  else if(direction != 0 && (key == 115 || key == 83))
      direction = -1;
  //if key is a se direction left
  else if(direction != 2 && (key == 97 || key == 65))
    direction = 1;
  //if key is d se direction right
  else if(direction != 1 && (key == 100 || key == 68))
    direction = 2;
  if(!running)
    running = true;
  else if (key == 32)
    running = false;
});

function gameLoop() {
  if(running && !gameover){
    update();
  }else if(gameover){
    clearInterval(int);
  }
}

function update() {
  set(fx, fy, "fruit");
  updatetail();
  set(tailx[length], taily[length], "blank");
  if(direction == 0)
    snakey--;
  else if(direction == -1)
    snakey++;
  else if (direction == 1)
    snakex--;
  else if (direction == 2)
    snakex++;
  set(snakex, snakey, "snake");
  for(var i =tailx.length-1;i>=0;i--){
    if(snakex == tailx[i] && snakey == taily[i]){
      document.getElementById("score").innerHTML = "GAME OVER!!!     SCORE: "+score ;
      gameover=true;
      break;
    }
  }
  if (snakex==0 || snakex==width-1 || snakey==0 || snakey==height-1) {
    document.getElementById("score").innerHTML = "GAME OVER!!!     SCORE: "+score ;
    gameover=true;
  }
  else if(snakex == fx && snakey == fy){
    score+=4;
    createfruit();
    length+=increment;
    document.getElementById("score").innerHTML = "SCORE: "+score;
  }
}

function updatetail() {
  for(var i = length; i>0 ; i--){
    tailx[i] = tailx[i-1];
    taily[i] = taily[i-1];
  }
  tailx[0] = snakex;
  taily[0] = snakey;
}
run();
