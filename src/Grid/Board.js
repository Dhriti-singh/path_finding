let rows = 10;
let cols = 10;

//a 2D array to store which nodes can be passed through
let board = [[]];
let nodes = [[]];

// block will be a square, of w side length


//intializing the start and end node
let start = new Node(0,0);
start.walk = 1;

let end = new Node(9,9);
end.walk = 1;

let isDrawingStart = 0;
let isDrawingEnd = 0;

// triggers a function for each mouse click on the canvas
canvas.addEventListener("mousedown", function(e){ 
   console.log("mouse click");
   setBlock(canvas, e, rows, cols, board); 
   //testBlock();
}); 

//redraws the canvas every 100ms. 
//setInterval(updateCanvas, 100);

//initalising the board
for (let i = 0; i < rows; i++){
   board[i] = [];
   nodes[i] =[];
   for (let j = 0; j < cols; j++){
     board[i][j] = 0;
     nodes[i][j] = new Node(i,j);
   } 
}


console.log(nodes);
// board[8][8]=1;
// board[9][8]=1;
// board[8][9]=1;
// nodes[8][8].walk=1;
// nodes[9][8].walk=1;
// nodes[8][9].walk=1;
// board[4][4]=1;
// board[5][5]=1;
// board[6][6]=1;

//intial grid 
function updateCanvas(){
   drawCells(rows,cols,board,canvas);
   drawGrid(rows,cols, canvas);
   singleCellDraw(start.i,start.j,"green");
   singleCellDraw(end.i,end.j,"red");
   drawGrid(rows,cols, canvas);
}   

updateCanvas();

//to draw the cell
function drawCells(rows,cols,board,canvas){
   let ctx = canvas.getContext('2d');
   const width = canvas.getBoundingClientRect().width;
   const height = canvas.getBoundingClientRect().height;
   //ctx.clearRect(0,0,width,height)
   let cellWidth = (width/cols) ;
   let cellHeight =(height/rows);

   for (let i = 0; i < rows; i++) 
      for (let j = 0; j < cols; j++){
         if(board[i][j] == 1){
            singleCellDraw(i,j,"grey");
         }
         else{
            singleCellDraw(i,j,"white");
         }
      }
}

//Drawing the grid after drawin a cell is imoprtant to 
//maintan the consistance of the grid
function drawGrid(rows,cols,canvas){

   //var width = canvas.width;
   //var height = canvas.height;
   const width = canvas.getBoundingClientRect().width;
   const height = canvas.getBoundingClientRect().height;
   //const width = canvas.scrollWidth;
   //const height = canvas.scrollHeight;

   let cellWidth = width/cols ;
   let cellHeight = height/rows;
   let ctx = canvas.getContext('2d');

   //1. Set the line style options
   ctx.strokeStyle = "black";
   ctx.lineWidth = 3;

   for (let i = 0; i < rows; i++) {

      let y = i * cellHeight;
      // Draw the line
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
   }
   for (let i = 0; i < cols; i++) {

      let x = i * cellWidth;
      // Draw the line
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
   }
}

function getCellAt(rows, cols, px, py, canvas) {

   let ctx = canvas.getContext('2d');
   const width = canvas.getBoundingClientRect().width;
   const height = canvas.getBoundingClientRect().height;
   let cellWidth = width/cols ;
   let cellHeight = height/rows;

   //to get the x cordinate of the selected block
   let cx =  Math.floor(px / cellWidth);
   if (cx < 0)
      cx = 0;
   if (cx >= cols)
      cx = cols - 1;

   //to get the y cordinate of the slected block
   let cy = Math.floor(py / cellHeight);
   if (cy < 0)
      cy = 0;
   if (cy >= rows)
      cy = rows - 1;

   return [cy, cx];

}

//mouse click function
function setBlock(canvas, event, rows, cols, board) { 
   let rect = canvas.getBoundingClientRect(); 
   let x = event.clientX - rect.left; 
   let y = event.clientY - rect.top; 

   // console.log(x);
   // console.log(y);

   const [ cellRow, cellCol ]  = getCellAt(rows, cols, x, y, canvas)
   console.log("click on row  " + cellRow);
   console.log("click on cell col " + cellCol);

   //check if the click was on start
   if(cellRow == start.i && cellCol == start.j){
      isDrawingStart = 1;
      drawStart(event,canvas);
   }
   else if(cellRow == end.i && cellCol == end.j){
      isDrawingEnd= 1;
      drawEnd(event,canvas);
   }
   //check if the click was on end

   else if(board[cellRow][cellCol] == 0){
      board[cellRow][cellCol] = 1;
      nodes[cellRow][cellCol].walk = 1;
      console.log("board 1 " + board[cellRow][cellCol]);
   }

   else if(board[cellRow][cellCol] == 1){
      board[cellRow][cellCol] = 0 ;
      nodes[cellRow][cellCol].walk = 0;
      console.log("board 0 " + board[cellRow][cellCol]);
   }

//for (let i = 0; i < rows; i++){
//  for (let j = 0; j < cols; j++){
//    console.log(" row = " + i + "col = " +  j + "val = " + board[i][j]  )
//  }
//}
   updateCanvas();
} 
if(start.i == end.i && start.j==end.j){
      alert("start and end are in the same node\n drag start from the end node to move to another node")
   }
