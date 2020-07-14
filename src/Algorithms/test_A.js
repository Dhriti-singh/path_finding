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
		this.f = 100000000000;
		this.g = 100000000000;
		this.h = Math.abs(i - goalState.i) + Math.abs(j - goalState.j);
		this.cost = weight[i][j];
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
		}
	}


	function heap() {
        return new BinaryHeap(function(node) {
            return node.f;
        });
    }
	// need to add all the heuristics
	function manhattan(A,B){
		let d1 = Math.abs(A.i - B.i);
		let d2 = Math.abs(A.j - B.j);
		return (d1+d2);
	}
	function Neighbours(currNode){
		let i = currNode.i;
		let j = currNode.j;
		let temp = [];

		if(j>0 && nodes[i][j-1].walk==0){
			temp.push(nodes[i][j-1]);
		}
		if(i>0 && nodes[i-1][j].walk==0){
			temp.push(nodes[i-1][j]);
		}
		if(i<rows-1 && nodes[i+1][j].walk==0){
			temp.push(nodes[i+1][j]);
		}
		if(j<cols-1 && nodes[i][j+1].walk==0){
			temp.push(nodes[i][j+1]);
		}

		return temp;
	}

	function check(A){
		if(A.i == goalState.i && A.j== goalState.j){
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

		start.h = manhattan(start,end);
		start.g = 0;
		start.f = start.h;

		while(frontier.size()>0){
			//poping the lowest f(x) value node;
			let currNode = frontier.pop();

			if(check(currNode)){
				AstarFinish = true;
				return;
			}

			currNode.closed = true;
			let neighbours = Neighbours(currNode, nodes);
			//console.log(neighbours);

			for(let i=0;i<neighbours.length;i++){
				let neighbour = neighbours[i];
				visitedNodes.push(neighbour);
				if(neighbour.walk==1 || neighbour.closed==true){
					continue;
				}

				let Gtemp = currNode.g + neighbour.cost;
				let beenVisited = neighbour.visited;
				if(beenVisited==false || Gtemp < neighbour.g){
					neighbour.g = Gtemp;
					neighbour.h = neighbour.h ||  manhattan(neighbour,end);
					neighbour.f = neighbour.g + neighbour.h;
					neighbour.parentY = currNode.j;
					neighbour.parentX = currNode.i;
					neighbour.visit = 1;
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