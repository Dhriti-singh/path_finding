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

function call_BestFirstSearch(){
	updateCanvas();
	// board = [[]]
	//which is walk able and which is not
	let nodes = [[]];

	function Node(i,j){
		this.i =i;
		this.j = j;
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

	for(let i=0 ; i<rows; i++){
		nodes[i] = [];
		for(let j=0; j<cols ; j++){
			nodes[i][j] = new Node(i,j);
			nodes[i][j].h = heuristic(nodes[i][j] , goalState);
		}
	}

	function heap() {
        return new BinaryHeap(function(node) {
            return node.h;
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

	let BestFirstSearchFinish = false;

	function BestFirstSearch(){
		let frontier = heap();
		frontier.push(start);

		start.h = heuristic(start,end);

		while(frontier.size()>0){
			//poping the lowest h(x) value node;
			let front = frontier.pop();
			//console.log(front);
			if(check(front)){
				AstarFinish = true;
				return;
			}

			front.closed = true;
			let neighbours = Neighbours(front, nodes);

			for(let i=0;i<neighbours.length;i++){
				let neighbour = neighbours[i];
				visitedNodes.push(neighbour);
				if(neighbour.closed==true){
					continue;
				}
				let beenVisited = neighbour.visited;
				neighbour.visited = 1;
				neighbour.parentY = front.j;
				neighbour.parentX = front.i;
				neighbour.h = neighbour.h + neighbour.cost;
				
				if(beenVisited==0){
					frontier.push(neighbour);
				}
				else{
					frontier.rescoreElement(neighbour);
				}
			}
		}
	}

	let visitedNodes = [];
	BestFirstSearch();
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