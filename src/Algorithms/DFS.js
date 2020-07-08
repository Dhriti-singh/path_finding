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
	let nodes = [[]];

	for(let i=0;i<rows;i++){
		nodes[i] =[];
		for(let j=0;j<cols;j++){
			nodes[i][j] = new Node(i,j);
			if(board[i][j])
				nodes[i][j].walk = 1;
		}
	}

	let frontier = [];
	frontier.push(initialState);

	//implementing it using a stack
	let shortestPath = [];
	let visitedNodes = [];
	let exploredNodes = [];

	let dfsFinish = false;

	function check( currentNode ){
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

	function DFS(){
		if(dfsFinish){
			return;
		}
		if(frontier.lenght==0){
			console.log("no solution available");
			return;
		}

		let front = frontier.pop();
		if(check( front) ){
			dfsFinish = true;
			console.log("DFS finished");
			return;
		}

		exploredNodes[front.i][front.j]=1;
		visitedNodes.push(new selectedNode(front.i, front.j));

		if(front.j>0){
			if(exploredNodes[front.i][front.j-1]==0 && nodes[front.i][front.j-1].walk==0){
				//console.log(1);
				frontier.push(nodes[front.i][front.j-1]);
				nodes[front.i][front.j-1].parentX = front.i;
				nodes[front.i][front.j-1].parentY = front.j;
				DFS();
			}
		}
		if(front.i>0){
			if(exploredNodes[front.i-1][front.j]==0 && nodes[front.i-1][front.j].walk==0){
				//console.log(2);
				frontier.push(nodes[front.i-1][front.j]);
				nodes[front.i-1][front.j].parentX = front.i;
				nodes[front.i-1][front.j].parentY = front.j;
				DFS();
			}
		}
		if(front.i<rows-1){
			if(exploredNodes[front.i+1][front.j]==0 && nodes[front.i+1][front.j].walk==0){
				//console.log(3);
				frontier.push(nodes[front.i+1][front.j]);
				nodes[front.i+1][front.j].parentX = front.i;
				nodes[front.i+1][front.j].parentY = front.j;
				DFS();
			}
		}
		if(front.j<cols-1){
			if(exploredNodes[front.i][front.j+1]==0 && nodes[front.i][front.j+1].walk==0){
				//console.log(4);
				frontier.push(nodes[front.i][front.j+1]);
				nodes[front.i][front.j+1].parentX = front.i;
				nodes[front.i][front.j+1].parentY = front.j;
				DFS();
			}
		}
	}
	DFS();

	if(dfsFinish===false){
		console.log("no solution available");
	}
	else{
		let currX = goalState.i;
		let currY = goalState.j;
		while(1){
			if(currX==initialState.i && currY==initialState.j){
				break;
			}
			else{
				let parent_x = nodes[currX][currY].parentX;
				let parent_y = nodes[currX][currY].parentY;
				//console.log(parent_x, parent_y);
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