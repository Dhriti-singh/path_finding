function call_Astar(){
	updateCanvas();
	
	//to store all the information of each node
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

	// the inital and goal state
	let start = new Node(initialState.i, initialState.j);
	let end = new Node(goalState.i , goalState.j);

	//to keep track of all the visited nodes
	let visitedNodes = [];

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
	
    //function to cheack if all current node is the goal state
	function check(currNode){
		if(currNode.i == goalState.i && currNode.j== goalState.j){
			return true;
		}
		else{
			return false;
		}
	}

	//variable to check if the algorithm is finished
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

			//console.log(currNode);
			if(check(currNode)){
				AstarFinish = true;
				return;
			}

			currNode.closed = true;
			
			//expanding the current node
			let neighbours = Neighbours(currNode, nodes);
			//console.log(neighbours);

			for(let i=0;i<neighbours.length;i++){
				let neighbour = neighbours[i];
				if( neighbour.closed==true){
					continue;
				}
				visitedNodes.push(neighbour);
				let Gtemp = currNode.g + neighbour.cost;
				let beenVisited = neighbour.visited;

				//if the node has not yet been added to frontier yet  or
				//the current g value is less than the previous one
				//indicting a better path
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

	Astar();
	let shortestPath = [];
	if(AstarFinish==false){
		document.getElementById("status_select").innerHTML = "Unreachable";
		document.getElementById("visit_select").innerHTML = "-";
		document.getElementById("path_select").innerHTML = "-";
		console.log("no solution is avaiable");
	}
	else{
		console.log("node found");
		document.getElementById("status_select").innerHTML = "Found";
		let currX = goalState.i;
		let currY = goalState.j;
		//backtracking the path to find the optimla path
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
		document.getElementById("visit_select").innerHTML = visitedNodes.length;
		document.getElementById("path_select").innerHTML = shortestPath.length;
	}
	
	drawArrayBlue(visitedNodes);
	drawArrayYellow(shortestPath);
	drawPath(shortestPath);
	singleCellDraw(initialState.i, initialState.j,"green");
	singleCellDraw(goalState.i,goalState.j,"red");
}