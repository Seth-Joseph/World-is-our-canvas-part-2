var drawing=[];
var currentPath=[];
var isDrawing = false;

function setup() {
  canvas = createCanvas(1150, 600);
  database= firebase.database();
  canvas.mousePressed(start);
  canvas.mouseReleased(end);
  form = new Form();
  form.display();
  //data = new Data();
  
}

function draw() {
  background("white");

  if(isDrawing){
    var point = {
      x:mouseX,
      y:mouseY
    }
    currentPath.push(point);
  }
  
  strokeWeight(3);
  noFill();
  stroke("black");
 
  for(var i=0; i<drawing.length;i++){
    var path=drawing[i];
    beginShape();
    for(var j=0;j<path.length;j++){
      vertex(path[j].x,path[j].y);
    }
    endShape();
  }
  form.button.mousePressed(() => {
    saveDrawing();
    
});

}
function start(){
  isDrawing = true;
  currentPath=[];
  drawing.push(currentPath);
}
function end(){
  isDrawing = false;
}
function saveDrawing(){
  var ref = database.ref('Drawing');
  var data={
      name: "Seth",
      drawing :drawing
  }
  var result = ref.push(data,dataSent);
  console.log(result.key);
  alert('Your drawing has been saved.')

  function dataSent(status){
    console.log(status);
  }
}

