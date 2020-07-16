// //each probelm needs to have
// - initial state
// -actions
// -transition state
// -goal state
// -path cost function

// node
// -a state
// -a parent
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
function call_DFS(){
	console.log("THE ALGORITHM IS UNWEIGHTED, WEIGHTS ARE TREATED AS WALKABLE BLLOCKS");
	let nodes = [[]];
	updateCanvas();
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

	//implementing it using a stack

	//to store the shortest path
	let shortestPath = [];
	//to keep a check if its visited ot not
	let visitedNodes = [];

	//all the visited nodes
	let exploredNodes = [];

	let dfsFinish = false;

	function check( currentNode ){
		//console.log("check run")
	 	if(currentNode.i == goalState.i && currentNode.j == goalState.j)
	 		return true;
	 	else
	 		return false;
	}

	//need to reset everything after running one algorihtm,
	//the explored nodes sepecially

	for(let i=0;i<rows;i++){
		exploredNodes[i]=[];
		for(let j=0;j<cols;j++){
			exploredNodes[i][j] = 0;
		}
	}

	dfsFinish = false;

	while(frontier.length){
		if(dfsFinish){
			break;
		}
		let front = frontier.pop();
		exploredNodes[front.i][front.j] = 1;

		if(check(front)){
			console.log("dfs dfsFinish");
			dfsFinish = 1;
			break;
		}
		front.closed = 1;
		visitedNodes.push(new selectedNode(front.i ,front.j));
		let neighbours = Neighbours(front , nodes);

		for(let i =0;i<neighbours.length;i++){
			let neighbour = neighbours[i];

			if(neighbours.closed==1 || exploredNodes[neighbour.i][neighbour.j]==1 ){
				continue;
			}
			neighbour.visit = true;
			neighbour.parentX = front.i;
			neighbour.parentY = front.j;
			frontier.push(neighbour);
		}
	}

	if(dfsFinish===false){
		console.log("no solution available");
	}
	else{
		let currX = goalState.i;
		let currY = goalState.j;
		//console.log(currX ,currY);
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

	drawArrayBlue(visitedNodes);
	drawArrayYellow(shortestPath);
	singleCellDraw(initialState.i, initialState.j,"green");
	singleCellDraw(goalState.i,goalState.j,"red");

}