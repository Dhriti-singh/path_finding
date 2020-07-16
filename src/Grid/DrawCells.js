let canvas = document.getElementById('canvas_trigger');
let ctx = canvas.getContext('2d');
// x = column number
// y = row number
function singleCellDraw(x,y,color){
   const width = canvas.getBoundingClientRect().width;
   const height = canvas.getBoundingClientRect().height;
   let cellWidth = (width/cols) ;
   let cellHeight =(height/rows);
   //  console.log(i);
   //  console.log(j);
   let x1 =  y* cellWidth;
   let y1 =  x* cellHeight;
   let x2 =  cellWidth;
   let y2 =  cellHeight;
   //Set the line and fill style options
   ctx.strokeStyle = "black";
   ctx.lineWidth = 1;
   ctx.fillStyle = color;
   //Draw the rectangle
   ctx.beginPath();
   ctx.rect(x1, y1, x2, y2);
   ctx.stroke();
   ctx.fill();
   drawGrid(rows,cols, canvas);
}

function drawArrayYellow(arr){
   for(let i=0;i<arr.length;i++){
      singleCellDraw(arr[i].i , arr[i].j, "yellow");
   }
   console.log("yellow");
}


function drawArrayBlue(arr){
   ctx.globalAlpha = 0.5;
   for(let i=0;i<arr.length;i++){
      singleCellDraw(arr[i].i,arr[i].j,"blue");
   }
   ctx.globalAlpha = 1;
}