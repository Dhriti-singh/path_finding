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
      singleCellDraw(arr[i].i , arr[i].j, "#f3f377");
   }
}


function drawArrayBlue(arr){
   ctx.globalAlpha = 0.5;
   let visit = [[]];
   for(let i=0;i<rows;i++){
      visit[i] = [];
      for(let j=0;j<cols;j++){
         visit[i][j] = 0;
      }
   }
   for(let i=0;i<arr.length;i++){
      if(visit[arr[i].i][arr[i].j]==0){
         singleCellDraw(arr[i].i,arr[i].j,"#56bdd7");
         visit[arr[i].i][arr[i].j]=1;
      }
   }
   ctx.globalAlpha = 1;
}

function drawPath(arr){
   let ctx = canvas.getContext('2d');
   const width = canvas.getBoundingClientRect().width;
   const height = canvas.getBoundingClientRect().height;
   let cellWidth = (width/cols) ;
   let cellHeight =(height/rows);

   ctx.strokeStyle = "orange";
   ctx.lineWidth = 7;
   ctx.lineCap = "round";
   ctx.lineJoin = "round";

   ctx.beginPath();

   let gx = goalState.j * cellWidth + cellWidth/2;
   let gy = goalState.i* cellHeight + cellHeight/2;

   let x2 = 0; 
   let y2 = 0;
   ctx.moveTo(gx,gy);

   for(let i=0;i<arr.length;i++){
      
      x2 =  arr[i].j * cellWidth + cellWidth/2;
      y2 =  arr[i].i* cellHeight + cellHeight/2;
      ctx.lineTo(x2, y2);
    
   }
   ctx.stroke();
}