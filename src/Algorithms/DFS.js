function call_DFS(){
	console.log("THE ALGORITHM IS UNWEIGHTED, WEIGHTS ARE TREATED AS WALKABLE BLLOCKS");

	//to  store informaion about all the nodes
	let nodes = [[]];
	updateCanvas();

	for(let i=0;i<rows;i++){
		nodes[i] =[];
		for(let j=0;j<cols;j++){
			nodes[i][j] = new Node(i,j);
			nodes[i][j].walk = board[i][j];
		}
	}
	//inital and goal state
	let start = new Node(initialState.i, initialState.j);
	let end   = new Node(goalState.i , goalState.j);


	//implementing the frontier using a stack
	let frontier = [];
	frontier.push(start);

	//to store the shortest path
	let shortestPath = [];

	//to keep a track of all the visited nodes
	let visitedNodes = [];

	//a variable to check if the algorithm is  completed
	let dfsFinish = false;

	//if current node is the goal node
	function check( currentNode ){
	 	if(currentNode.i == goalState.i && currentNode.j == goalState.j)
	 		return true;
	 	else
	 		return false;
	}

	while(frontier.length){
		//if the goal node is already found
		if(dfsFinish){
			break;
		}

		let front = frontier.pop();

		//if current node is the goal node
		if(check(front)){
			console.log("dfs dfsFinish");
			dfsFinish = 1;
			break;
		}

		//closing the current node
		front.closed = 1;
		visitedNodes.push(new selectedNode(front.i ,front.j));

		//expanging the current node
		let neighbours = Neighbours(front , nodes);

		for(let i =0;i<neighbours.length;i++){
			let neighbour = neighbours[i];

			//if the node is already explored
			if(neighbour.closed == 1){
				continue;
			}
			neighbour.visit = true;
			neighbour.parentX = front.i;
			neighbour.parentY = front.j;
			frontier.push(neighbour);
		}
	}

	//node not reachable
	if(dfsFinish===false){
		console.log("goal state is unreachable");
	}
	else{
		let currX = goalState.i;
		let currY = goalState.j;
		//backtracking the path found by DFS
		while(1){
			if(currX==initialState.i && currY==initialState.j){
				break;
			}
			else{
				let parent_x = nodes[currX][currY].parentX;
				let parent_y = nodes[currX][currY].parentY;
				///console.log(nodes[currX][currY], parent_x, parent_y);
				currX = parent_x
				currY = parent_y;
				let curr = new selectedNode(currX, currY);
				shortestPath.push(curr);
			}
		}
	}

	//visualizing the results
	drawArrayBlue(visitedNodes);
	drawArrayYellow(shortestPath);
	singleCellDraw(initialState.i, initialState.j,"green");
	singleCellDraw(goalState.i,goalState.j,"red");

}