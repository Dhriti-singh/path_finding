// each probelm needs to have
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

function call_IDDFS(){
	let bottomReached = false;
	updateCanvas();
	console.log("called IDDFS");

	let nodes = [[]];
	function Node(i,j){
		this.i = i;
		this.j = j;
		this.parentX = i;
		this.parentY = j;
		this.walk = board[i][j];
		this.visted = 0;
		this.closed = 0;
	}
	
	let shortestPath = [];
	let start = new Node(initialState.i , initialState.j);
	let end = new Node(goalState.i , goalState.j);

	function check(currNode){
		if(currNode.i == goalState.i && currNode.j== goalState.j){
			return true;
		}
		else{
			return false;
		}
	}
	let DLSfinished = false;
	//let visitedNodes = [];
	function iterativeDeepingDFS(){
		let depth = 1;
		for(;depth<=(rows*cols*10);){

			for(let i=0 ; i<rows; i++){
				nodes[i] = [];
				for(let j=0; j<cols ; j++){
					nodes[i][j] = new Node(i,j);
				}
			}
			DLSfinished = false;
			//visitedNodes = [];

			let result = depthLimitedSearch(nodes[start.i][start.j],0, depth);
			if(result==true){
				console.log("node found");
				let currX = goalState.i;
				let currY = goalState.j;
				console.log(currX ,currY);
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
				//drawArrayBlue(visitedNodes);
				drawArrayYellow(shortestPath);
				singleCellDraw(initialState.i, initialState.j,"green");
				singleCellDraw(goalState.i,goalState.j,"red");
				return;
			}
			else{
				depth += 1;
				console.log("increasing depth to",depth);
			}
			if(DLSfinished){
				return;
			}
		}
		console.log("node is unreachable");
		return;
	}
	function depthLimitedSearch(node  ,currDepth , maxDepth){
		if(DLSfinished)
			return true;

		//console.log(currDepth, maxDepth, node);
		//node.closed = 1;
		//visitedNodes.push(node);

		if(check(node)){
			DLSfinished = true;
			return true;
		}
		let neighbours = Neighbours(node , nodes);
		//console.log(neighbours);

		if(currDepth == maxDepth){
			return false;
		}
		
		for(let i=0;i<neighbours.length;i++){
			let neighbour = neighbours[i];
			if(neighbour.closed==1)
			 	continue;
			neighbour.closed = 1;
			neighbour.parentX = node.i;
			neighbour.parentY = node.j;
			neighbour.closed = 1;
			let result = depthLimitedSearch(neighbour , node, currDepth+1, maxDepth);
			if(result==true){
				return true;
			}
		}
		return false;
	}
	iterativeDeepingDFS();
}