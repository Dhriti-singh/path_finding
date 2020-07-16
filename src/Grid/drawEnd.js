function drawGoalState(event , canvas){
	let ctx = canvas.getContext('2d');
	canvas.addEventListener("mousemove", mouseMove, false);
	canvas.addEventListener("mouseup",   mouseUp,   false); 
	let mouse_x = event.offsetX;
	let mouse_y = event.offsetY;
	let last_x = goalState.i;
	let last_y = goalState.j;

	function mouseMove(event){
		if (isDrawingGoalState== 1){
			//ctx.clearRect(0,0,500,500);
			let [cellRow,cellCol] = getCellAt(rows,cols,mouse_x,mouse_y,canvas);
			if(board[last_x][last_y]==1){
				singleCellDraw(last_x , last_y, "grey");
			}
			else if(weight[last_x][last_y]==10){
				singleCellDraw(last_x , last_y, '#e6b3cc');
			}
			else if(weight[last_x][last_y]==20){
				singleCellDraw(last_x , last_y, "#c6538a");
			}
			else if(weight[last_x][last_y]==50){
				singleCellDraw(last_x , last_y, "#862d58");
			}
			else{
				singleCellDraw(last_x , last_y, "white");
			}
			singleCellDraw(goalState.i,goalState.j,"white");
			singleCellDraw(cellRow,cellCol,"red");
			singleCellDraw(initialState.i, initialState.j,"green");
			mouse_x = event.offsetX;
			mouse_y = event.offsetY;
			last_x = cellRow;
			last_y = cellCol;
		}
	}
	function mouseUp(event){
		if (isDrawingGoalState== 1){
			let [cellRow,cellCol] = getCellAt(rows,cols,mouse_x,mouse_y,canvas);
			singleCellDraw(cellRow,cellCol,"red");
			mouse_x = 0;
			mouse_y = 0;
			isDrawingGoalState= 0;
			board[goalState.i][goalState.j]=0;
			goalState.i = cellRow;
			goalState.j = cellCol;
			board[goalState.i][goalState.j]=0;
			updateCanvas();
		}
	}
}
