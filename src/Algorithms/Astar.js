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

function call_Astar(){
	updateCanvas();
	// board = [[]]
	//which is walk able and which is not
	let nodes = [[]];

	function Node(i,j){
		this.i =i;
		this.j = j;
		this.f = 0;
		this.g = 0;
		this.h = 0;
		//Math.abs(i - goalState.i) + Math.abs(j - goalState.j);
		this.cost = Math.max(1,weight[i][j]);
		this.visited = false;
		this.closed = false;
		this.parentX = i;
		this.parentY = j;
		this. walk = board[i][j];
	}

	let start = new Node(initialState.i, initialState.j);
	let end = new Node(goalState.i , goalState.j);

	let exploredNodes = [[]];

	for(let i=0 ; i<rows; i++){
		nodes[i] = [];
		exploredNodes[i] = [];
		for(let j=0; j<cols ; j++){
			nodes[i][j] = new Node(i,j);
			exploredNodes[i][j] = 0;
		}
	}

	function heap() {
        return new BinaryHeap(function(node) {
            return node.f;
        });
    }
	// need to add all the heuristics

	function check(currNode){
		if(currNode.i == goalState.i && currNode.j== goalState.j){
			return true;
		}
		else{
			return false;
		}
	}

	let AstarFinish = false;

	function Astar(){
		let frontier = heap();
		frontier.push(start);

		start.h = heuristic(start,end);
		start.g = 0;
		start.f = start.h + start.g;

		while(frontier.size()>0){
			//poping the lowest f(x) value node;
			let currNode = frontier.pop();
			console.log(currNode);
			if(check(currNode)){
				AstarFinish = true;
				return;
			}

			currNode.closed = true;
			exploredNodes[currNode.i][currNode.j] = 1;
			let neighbours = Neighbours(currNode, nodes);
			console.log(neighbours);

			for(let i=0;i<neighbours.length;i++){
				let neighbour = neighbours[i];
				if(neighbour.walk==1 || neighbour.closed==true || exploredNodes[neighbour.i][neighbour.j]==1){
					continue;
				}
				visitedNodes.push(neighbour);
				let Gtemp = currNode.g + neighbour.cost;
				let beenVisited = neighbour.visited;

				if(beenVisited==false || Gtemp < neighbour.g){
					neighbour.g = Gtemp;
					neighbour.h = neighbour.h ||  heuristic(neighbour,end);
					neighbour.f = neighbour.g + neighbour.h;
					neighbour.visited = 1;
					neighbour.parentY = currNode.j;
					neighbour.parentX = currNode.i;

					if(beenVisited==0){
						frontier.push(neighbour);
					}
					else{
						frontier.rescoreElement(neighbour);
					}
				}
			}
		}
	}

	let visitedNodes = [];
	Astar();
	let shortestPath = [];
	if(AstarFinish==false){
		console.log("no solution is avaiable");
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