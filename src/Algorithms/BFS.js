// each probelm needs to have
// - initial state
// -actions
// -transition state
// -goal state
// -path cost function

// node
// -a state
// -a paren
// -an actions
// -path cost

// -frontier

// -expanded nodes

// -Start with the frontier, which only contains the initial node 
// -Start with an empty explored set
// -Repeat 
// --If the frontier is empty then there is no solution 
// --Remove a node from the frontier 
// --If node contains the goal state then return the solution 
// --Add the node to the explored set
// --Expand the node, add the resulting node to the frontier 
//  - --if they aren't already in the frontier or in the explored state

//the frontier stores the nodes to be expanded;


function call_BFS(){
	updateCanvas();
	console.log("THE ALGORITHM IS UNWEIGHTED, WEIGHTS ARE TREATED AS WALKABLE BLLOCKS");
	let nodes = [[]];
	//defining the state of every node in BFS
	for(let i=0;i<rows;i++){
		nodes[i] =[];
		for(let j=0;j<cols;j++){
			nodes[i][j] = new Node(i,j);
			nodes[i][j].walk = board[i][j];
		}
	}


	let frontier = [];
	frontier.push(initialState);
	initialState.parentX = initialState.i;
	initialState.parentY = initialState.j;

	let shortestPath = [];
	let visitedNodes = [];
	let exploredNodes = [];

	let bfsFinish = false;

	function check( currentNode ){
	 	if(currentNode.i == goalState.i && currentNode.j == goalState.j)
	 		return true;
	 	else
	 		return false;
	}

	for(let i=0;i<rows;i++){
		exploredNodes[i]=[];
		for(let j=0;j<cols;j++){
			exploredNodes[i][j] = 0;
		}
	}
	while(frontier.length){
		if(bfsFinish){
			break;
		}
		let front = frontier.shift();
		//console.log(front); 

		if(check(front)){
			bfsFinish = true;
			console.log("BFS finsished");
			break;
		}
		front.closed = 1;
		exploredNodes[front.i][front.j] = 1;
		visitedNodes.push(new selectedNode(front.i , front.j));

		let neighbours = Neighbours(front , nodes);

		for(let i =0;i<neighbours.length;i++){
			let neighbour = neighbours[i];

			if(neighbours.closed==1 || exploredNodes[neighbour.i][neighbour.j]==1 || neighbour.visit){
				continue;
			}
			neighbour.visit = true;
			neighbour.parentX = front.i;
			neighbour.parentY = front.j;
			frontier.push(neighbour);
		}
	}
	

	if(bfsFinish===false){
		console.log("no solution");
	}
	else{
		let currX = goalState.i;
		let currY = goalState.j;
		while(1){
			if(currX==initialState.i && currY==initialState.j){
				break;
			}
			else{
				//console.log( "in time" , currX, currY);
				let parent_x = nodes[currX][currY].parentX;
				let parent_y = nodes[currX][currY].parentY;
				console.log(nodes[currX][currY], parent_x, parent_y);
				currX = parent_x
				currY = parent_y;
				let curr = new selectedNode(currX, currY);
				shortestPath.push(curr);
			}
		}
	}
	drawArrayBlue(visitedNodes);
	drawArrayYellow(shortestPath);
	singleCellDraw(initialState.i,initialState.j,"green");
	singleCellDraw(goalState.i,goalState.j,"red");
}