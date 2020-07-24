function call_IDDFS(){
	updateCanvas();
	
	//storing information of nodes
	let nodes = [[]];

	function Node(i,j){
		this.i = i;
		this.j = j;
		this.parentX = i;
		this.parentY = j;
		this.walk = board[i][j];
		this.visted = 0;
        this.closed = 0;
        this.depth = 0;
	}
	
	//initial and final state
	let start = new Node(initialState.i , initialState.j);
	let end = new Node(goalState.i , goalState.j);

	// to check if the goal node is achieved
	function check(currNode){
		if(currNode.i == goalState.i && currNode.j== goalState.j){
			return true;
		}
		else{
			return false;
		}
	}

	//a variable to check if the algorithm is  completed
	let DLSfinished = false;

	//keeps a count of the nodes explored in previous iteration
	let exploredPrev = -1;

	//keeps a count of the nodes explored in current iteration
	let explored = 0;

	function iterativeDeepingDFS(){
		let depth = 1;
		for(;depth<=(rows*cols*3);){

			for(let i=0 ; i<rows; i++){
				nodes[i] = [];
				for(let j=0; j<cols ; j++){
					nodes[i][j] = new Node(i,j);
				}
			}
			DLSfinished = false;
			nodes[start.i][start.j].visited = 1; 
			// so that start node is not considered as child of its childs.
            
            explored = 0;

			let result = depthLimitedSearch(nodes[start.i][start.j],0, depth);

			if(result==true){
				let shortestPath = [];

				console.log("node found at depth",depth);
				document.getElementById("status_select").innerHTML = "Found";
				let currX = goalState.i;
				let currY = goalState.j;
				//backtracking to find the optimal path
				while(1){
					if(currX==initialState.i && currY==initialState.j){
						break;
					}
					else{
						let parent_x = nodes[currX][currY].parentX;
						let parent_y = nodes[currX][currY].parentY;
						//console.log(nodes[currX][currY], parent_x, parent_y);
						currX = parent_x
						currY = parent_y;
						let curr = new selectedNode(currX, currY);
						shortestPath.push(curr);
					}
				}
				document.getElementById("visit_select").innerHTML = "-";
				document.getElementById("path_select").innerHTML = shortestPath.length;
				drawArrayYellow(shortestPath);
				singleCellDraw(initialState.i, initialState.j,"green");
				singleCellDraw(goalState.i,goalState.j,"red");
				return;
			}
			else{
				//increasing the depth of the search
				depth += 1;
			}
			if(DLSfinished){
				return;
			}
			//if the umber of nodes explored in current iteration is same as the previous iteration
			//then the node is unreachable
			if(exploredPrev == explored){
				console.log("node is unreachable");
				document.getElementById("status_select").innerHTML = "unreachable";
				document.getElementById("visit_select").innerHTML = "-";
				document.getElementById("path_select").innerHTML = "-";
				break;
			}
			//update previous explored nodes value
			else{
				exploredPrev = explored ;
			}
		} 
		return;
	}
	function depthLimitedSearch(node  ,currDepth , maxDepth){

		//if the node is found already
		if(DLSfinished)
			return true;

		//if the current node is the goal state
		if(check(node)){
			DLSfinished = true;
			return true;
		}
		
		//can not get into more depth
		if(currDepth == maxDepth){
			return false;
		}

		//expanding the current node
		let neighbours = Neighbours(node , nodes);
		let neighbours2= [];

		for(let i=0;i<neighbours.length;i++){
			let neighbour = neighbours[i];

			//if the node is explored
			if(neighbour.closed==1 || neighbour.visted ==1){
				//the neighbour has a less deep path than the previous
				if(neighbour.depth > currDepth + 1){
					neighbour.depth = currDepth + 1;
					neighbours2.push(neighbour); 
				}
				else{
					continue;
				}
			}
			//the neighbour is not explored yet
			else{
				neighbour.depth = currDepth + 1;
				neighbours2.push(neighbour);
				neighbour.visted = 1;
			}
		}

		for(let i=0;i<neighbours2.length;i++){
			let neighbour = neighbours2[i];

			//increasing the number of explored nods
			explored += 1;
		
			neighbour.parentX = node.i;
			neighbour.parentY = node.j;
            neighbour.closed = 1;

            let result = depthLimitedSearch(neighbour , currDepth+1, maxDepth);
			
			//if goal node is found
			if(result==true){
				return true;
			}
		}
		return false;
	}
	iterativeDeepingDFS();
}