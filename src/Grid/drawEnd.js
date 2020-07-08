function drawGoalState(event , canvas){
	let ctx = canvas.getContext('2d');
	canvas.addEventListener("mousemove", mouseMove, false);
	canvas.addEventListener("mouseup",   mouseUp,   false); 
	let mouse_x = event.offsetX;
	let mouse_y = event.offsetY;

	function mouseMove(event){
		if (isDrawingGoalState== 1){
			ctx.clearRect(0,0,500,500);
			let [cellRow,cellCol] = getCellAt(rows,cols,mouse_x,mouse_y,canvas);
			drawCells(rows,cols,board,canvas);
			singleCellDraw(cellRow,cellCol,"red");
			singleCellDraw(initialState.i, initialState.j,"green");
			mouse_x = event.offsetX;
			mouse_y = event.offsetY;
		}
	}
	function mouseUp(event){
		if (isDrawingGoalState== 1){
			let [cellRow,cellCol] = getCellAt(rows,cols,mouse_x,mouse_y,canvas);
			singleCellDraw(cellRow,cellCol,"red");
			mouse_x = 0;
			smouse_y = 0;
			isDrawingGoalState= 0;
			board[goalState.i][goalState.j]=0;
			goalState.i = cellRow;
			goalState.j = cellCol;
			board[goalState.i][goalState.j]=0;
			updateCanvas();
		}
	}
}
