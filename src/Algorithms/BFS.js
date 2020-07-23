function call_BFS(){
	updateCanvas();
	console.log("THE ALGORITHM IS UNWEIGHTED, WEIGHTS ARE TREATED AS WALKABLE BLLOCKS");

	//storing information about all the nodes
	let nodes = [[]];

	//defining the state of every node in BFS
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

	//implementing frontier using a queue
	let frontier = [];
	frontier.push(start);
	
	//to store the shortest path
	let shortestPath = [];

	//to keep a track of all the visited nodes
	let visitedNodes = [];

	//a variable to check if the algorithm is  completed
	let bfsFinish = false;

	//to check if the current node is the goal state
	function check( currentNode ){
	 	if(currentNode.i == goalState.i && currentNode.j == goalState.j)
	 		return true;
	 	else
	 		return false;
	}

	while(frontier.length){
		//if the goal node is already found
		if(bfsFinish){
			break;
		}

		let front = frontier.shift();
		
		//if the current node is the gosl state
		if(check(front)){
			bfsFinish = true;
			console.log("BFS finsished");
			break;
		}

		//closing the current state
		front.closed = 1;
		visitedNodes.push(new selectedNode(front.i , front.j));

		//expanding the current node
		let neighbours = Neighbours(front , nodes);

		for(let i=0;i<neighbours.length;i++){
			let neighbour = neighbours[i];

			//if the goal node is alreasy explored
			if(neighbours.closed==1 || neighbour.visit){
				continue;
			}
			neighbour.visit = true;
			neighbour.parentX = front.i;
			neighbour.parentY = front.j;
			frontier.push(neighbour);
		}
	}
	
	//if the node is unreachable
	if(bfsFinish===false){
		console.log("no solution");
	}
	else{
		let currX = goalState.i;
		let currY = goalState.j;
		//backtracking the path found by BFS
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
	}

	//visualizing the results
	drawArrayBlue(visitedNodes);
	drawArrayYellow(shortestPath);
	singleCellDraw(initialState.i,initialState.j,"green");
	singleCellDraw(goalState.i,goalState.j,"red");
}