function drawInitialState(event , canvas){
	let ctx = canvas.getContext('2d');
	canvas.addEventListener("mousemove", mouseMove, false);
	canvas.addEventListener("mouseup",   mouseUp,   false); 
	let mouse_x = event.offsetX;
	let mouse_y = event.offsetY;

	function mouseMove(event){
		if (isDrawingInitialState== 1){
			ctx.clearRect(0,0,500,500);
			let [cellRow,cellCol] = getCellAt(rows,cols,mouse_x,mouse_y,canvas);
			drawCells(rows,cols,board,canvas);
   			singleCellDraw(cellRow,cellCol,"green");
   			singleCellDraw(goalState.i,goalState.j,"red");
			mouse_x = event.offsetX;
			mouse_y = event.offsetY;
		}
	}
	function mouseUp(event){
		if (isDrawingInitialState== 1){
			let [cellRow,cellCol] = getCellAt(rows,cols,mouse_x,mouse_y,canvas);
			singleCellDraw(cellRow,cellCol,"green");
			mouse_x = 0;
			smouse_y = 0;
			isDrawingInitialState= 0;
			board[initialState.i][initialState.j]=0;
			initialState.i = cellRow;
			initialState.j = cellCol;
			board[initialState.i][initialState.j]=0;
			updateCanvas();
		}
	}
}