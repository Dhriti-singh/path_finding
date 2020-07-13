let rows = 20;
let cols = 50;

//a 2D array to store which nodes can be passed through
let board = [[]];
let weight = [[]];

//intializing the initialState and end node
let initialState = new Node(0,0);
let goalState = new Node(rows-1, cols-1);

let isDrawingInitialState = 0;
let isDrawingGoalState    = 0;
// let isDrawingWall         = 0;
// let isDrawingWeight       = 0;

// triggers a function for each mouse click on the canvas
canvas.addEventListener("mousedown", function(e){ 
   let rect = canvas.getBoundingClientRect(); 
   let x = event.clientX - rect.left; 
   let y = event.clientY - rect.top; 

   // console.log(x);
   // console.log(y);

   const [ cellRow, cellCol ]  = getCellAt(rows, cols, x, y, canvas)
   console.log("click on row  " + cellRow);
   console.log("click on cell col " + cellCol);

   //check if the click was on initialState
   if(cellRow == initialState.i && cellCol == initialState.j){
      isDrawingInitialState = 1;
      drawInitialState(event,canvas);
   }
   else if(cellRow == goalState.i && cellCol == goalState.j){
      isDrawingGoalState= 1;
      drawGoalState(event,canvas);
   }
   //check if the click was on goalState
   if(document.getElementById("weight").checked){
      setWeight(canvas, e, cellRow, cellCol, board);
   }
   else{
      setWall(canvas, e, cellRow, cellCol); 
   }

}); 

//redraws the canvas every 100ms. 
//setInterval(updateCanvas, 100);

//initialising the board
for (let i = 0; i < rows; i++){
   board[i] = [];
   weight[i] = [];
   for (let j = 0; j < cols; j++){
     board[i][j] = 0;
     weight[i][j] = 0;
   } 
}

//intial grid 
function updateCanvas(){
   drawCells(rows,cols,board,canvas);
   singleCellDraw(initialState.i,initialState.j,"green");
   singleCellDraw(goalState.i,goalState.j,"red");
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

   for (let i = 0; i < rows; i++){
      for (let j = 0; j < cols; j++){
         if(board[i][j] == 1){
            singleCellDraw(i,j,"grey");
         }
         else{
            singleCellDraw(i,j,"white");
         }
         if(weight[i][j]== 10){
            singleCellDraw(i,j,"pink");
         }
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
   ctx.lineWidth = 1;

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

function setWeight(canvas, event, cellRow, cellCol, board) { 
   if(weight[cellRow][cellCol] == 0){
      weight[cellRow][cellCol] = 10;
      console.log("board weight set " + weight[cellRow][cellCol]);
   }

   else if(weight[cellRow][cellCol] == 10){
      weight[cellRow][cellCol] = 0 ;
      console.log("board weight removed " + weight[cellRow][cellCol]);
   }
   board[cellRow][cellCol] = 0;
   updateCanvas();
}

//function to add walls in the board
//values stord in the board array
function setWall(canvas, event, cellRow, cellCol) {

   if(board[cellRow][cellCol] == 0){
      board[cellRow][cellCol] = 1;
      console.log("board 0 to " + board[cellRow][cellCol]);
      singleCellDraw(cellRow, cellCol, "grey");
   }

   else if(board[cellRow][cellCol] == 1){

      board[cellRow][cellCol] = 0 ;
      console.log("board 1 to"+ board[cellRow][cellCol]);
      singleCellDraw(cellRow, cellCol, "white");
   }
   weight[cellRow][cellCol] = 0;
   updateCanvas();

   // let ctx = canvas.getContext('2d');
   // canvas.addEventListener("mousemove", mouseMove, false);
   // canvas.addEventListener("mouseup",   mouseUp,   false);
   // let mouse_x = event.offsetX;
   // let mouse_y = event.offsetY;

   // function mouseMove(event){
   //    console.log("mouse move");
   //    if(isDrawingWall==1){
   //       let[currCellRow , currCellCol] = getCellAt(rows,cols,mouse_x,mouse_y,canvas);
   //       if(currCellCol==initialState.j && currCellRow==initialState.i)
   //          console.log("start can not be a wall");
   //       else if(currCellCol==drawGoalState.j && currCellRow==drawGoalState.i)
   //          console.log("end can not be a wall");
   //       else{
   //          if(board[currCellRow][currCellCol]==1){
   //             board[currCellRow][currCellCol] = 0;
   //             singleCellDraw(currCellRow,currCellCol,"white");
   //          }
   //          else{
   //             board[currCellRow][currCellCol] = 1;
   //             singleCellDraw(currCellRow.currCellCol,"grey")
   //          }
   //       }
   //       weight[currCellRow][currCellCol] = 0;
   //       mouse_x = event.offsetX;
   //       mouse_y = event.offsetY;
   //    }
   // }
   // function mouseUp(event){
   //    if(isDrawingWall==1){
   //       isDrawingWall = 0;
   //       let[currCellRow , currCellCol] = getCellAt(rows,cols,mouse_x,mouse_y,canvas);
   //       if(currCellCol==initialState.j && currCellRow==initialState.i)
   //          console.log("start can not be a wall");
   //       if(currCellCol==drawGoalState.j && currCellRow==drawGoalState.i)
   //          console.log("end can not be a wall");
   //       else{
   //          if(board[currCellRow][currCellCol]==1){
   //             board[currCellRow][currCellCol] = 0;
   //             singleCellDraw(currCellRow,currCellCol,"grey");
   //          }
   //          else{
   //             board[currCellRow][currCellCol] = 0;
   //             singleCellDraw(currCellRow.currCellCol,"white")
   //          }
   //       }
   //       weight[currCellRow][currCellCol] = 0;
   //       mouse_x = event.offsetX;
   //       mouse_y = event.offsetY;

   //    }
   // }
}