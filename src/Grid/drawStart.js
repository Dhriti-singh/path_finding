function drawInitialState(event , canvas){
	let ctx = canvas.getContext('2d');
	canvas.addEventListener("mousemove", mouseMove, false);
	canvas.addEventListener("mouseup",   mouseUp,   false);
	//singleCellDraw(initialState.i, initialState.j,"green"); 
	let mouse_x = event.offsetX;
	let mouse_y = event.offsetY;
	let last_x = initialState.i;
	let last_y = initialState.j;
	

	function mouseMove(event){
		if (isDrawingInitialState== 1){
			//ctx.clearRect(0,0,500,500);
			let [cellRow,cellCol] = getCellAt(rows,cols,mouse_x,mouse_y,canvas);
			//drawCells(rows,cols,board,canvas);
			if(board[last_x][last_y]==1){
				singleCellDraw(last_x , last_y, "grey");
			}
			else if(weight[last_x][last_y]){
				singleCellDraw(last_x , last_y, "pink");
			}
			else{
				singleCellDraw(last_x , last_y, "white");
			}
			singleCellDraw(initialState.i , initialState.j, "white");
   			singleCellDraw(cellRow,cellCol,"green");
   			singleCellDraw(goalState.i,goalState.j,"red");
			mouse_x = event.offsetX;
			mouse_y = event.offsetY;
			last_x = cellRow;
			last_y = cellCol;
		}
	}
	function mouseUp(event){
		if (isDrawingInitialState== 1){
			let [cellRow,cellCol] = getCellAt(rows,cols,mouse_x,mouse_y,canvas);
			mouse_x = 0;
			mouse_y = 0;
			isDrawingInitialState= 0;
			board[initialState.i][initialState.j]=0;
			initialState.i = cellRow;
			initialState.j = cellCol;
			board[initialState.i][initialState.j]=0;
			updateCanvas();
		}
	}
}