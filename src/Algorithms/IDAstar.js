function call_IDAstar(){
	updateCanvas();

	//storing information of nodes
	let nodes = [[]];

	function Node(i,j){
		this.i =i;
		this.j = j;
		this.f = 0;
		this.g = 0;
		this.h = 0;
		//Math.abs(i - goalState.i) + Math.abs(j - goalState.j);
		this.cost = Math.max(1,weight[i][j]);
		this.visited = 0;
		this.closed = 0;
		this.parentX = i;
		this.parentY = j;
		this.walk = board[i][j];
	}

	//initial and final state
	let start = new Node(initialState.i, initialState.j);
	let end   = new Node(goalState.i , goalState.j);
	
	// to check if the goal node is achieved
	function check(currNode){
		if(currNode.i == goalState.i && currNode.j== goalState.j){
			return true;
		}
		else{
			return false;
		}
	}

	//a variable to check if the algorithm is  completed
	let IDAstarFinish = false;

	//keeps a count of the nodes explored in previous iteration
	let exploredPrev = -1;
	//keeps a count of the nodes explored in current iteration
	let explored = 0;

	//iterating through different threshold
	function IDAstar(){
		let threshold = heuristic(start,end);
		while(true){
			//console.log(threshold);
			for(let i=0 ; i<rows; i++){
				nodes[i] = [];
				for(let j=0; j<cols ; j++){
					nodes[i][j] = new Node(i,j);	
				}
			}
			if(IDAstarFinish){
				break;
			}
			explored = 0;
			let t = Astar(nodes[start.i][start.j], 0, threshold);

			if(t < 0 ){
				console.log("node found");
				let shortestPath = [];
				let currX = goalState.i;
				let currY = goalState.j;
				//backtracking to find the optimal path
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
				drawArrayYellow(shortestPath);
				singleCellDraw(initialState.i, initialState.j,"green");
				singleCellDraw(goalState.i,goalState.j,"red");
				break;
			}
			else if(t === Infinity){
				console.log("node not found");
				return;
			}
			else{
				//increasing the thresholf for next iteration
				threshold++;
			}
			///if the umber of nodes explored in current iteration is same as the previous iteration
			//then the node is unreachable
			if(exploredPrev == explored){
				console.log("node is unreachable");
				break;
			}
			//update previous explored nodes value
			else{
				exploredPrev = explored ;
			}
		}
		return;
	}

	function Astar(node,g, threshold){
		//if the node is found already
		if(IDAstarFinish){
			return;
		}
		node.h = heuristic(node,end);
		node.g = g;
		node.f = node.g + node.h;

		//return, as the thershold value is exceeded
		if(node.f > threshold){
			return node.f
		}

		//if the current node is the goal state
		if(check(node)){
			IDAstarFinish = true;
			return -1;
		}

		let min = Infinity;
		//expanding the current node
		let neighbours = Neighbours(node , nodes);
		let neighbours2 = [];

		for(let i=0;i<neighbours.length;i++){
			let neighbour = neighbours[i];

			//if the node is explored
			if(neighbour.visited==1 || neighbour.closed==1){
				let Gtemp = node.g + neighbour.cost;
				if(Gtemp < neighbour.g){
					neighbour.g = Gtemp;
					neighbours2.push(neighbour);
					neighbour.h = neighbour.h ||  heuristic(neighbour,end);
				}
			}
			//the neighbour is not explored yet
			else{
				neighbours2.push(neighbour);
				neighbour.visited = 1;
			}
		}
		for(let i=0; i<neighbours2.length;i++){

			//increasing the number of explored nods
			explored += 1;

			let neighbour = neighbours2[i];	
			neighbour.parentX = node.i;
			neighbour.parentY = node.j;
			neighbour.closed = 1;
	
			let t = Astar(neighbour, node.g+neighbour.cost ,threshold);
			//if the goal node is found
			if(t==-1){
				return -1;
			}
			//updating min to the minimum f value for the next iteration
			if(t < min){
				min = t;
			}
		}
		return min;
	}
	IDAstar();
}