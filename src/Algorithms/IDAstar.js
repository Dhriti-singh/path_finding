function call_IDAstar(){
	
	updateCanvas();
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

	let start = new Node(initialState.i, initialState.j);
	let end   = new Node(goalState.i , goalState.j);

	function heap() {
        return new BinaryHeap(function(node) {
            return node.f;
        });
    }
	
	// to check if the goal node is achieved
	function check(currNode){
		if(currNode.i == goalState.i && currNode.j== goalState.j){
			return true;
		}
		else{
			return false;
		}
	}

	let IDAstarFinish = false;

	//iterating through
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

			let t = Astar(nodes[start.i][start.j], 0, threshold);
			if(t < 0 ){
				console.log("node found");
				let shortestPath = [];
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
				drawArrayYellow(shortestPath);
				break;
			}
			else if(t === Infinity){
				console.log("node not found");
				return;
			}
			else{
				threshold = t;
			}
		}
		return;
	}

	function Astar(node,g, threshold){
		if(IDAstarFinish){
			return;
		}
		node.h = heuristic(node,end);
		node.g = g;
		node.f = node.g + node.h;

		if(node.f > threshold){
			return node.f
		}
		if(check(node)){
			IDAstarFinish = true;
			return -1;
		}

		let min = Infinity;
		let neighbours = Neighbours(node , nodes);
		let neighbours2 = [];
		for(let i=0;i<neighbours.length;i++){
			let neighbour = neighbours[i];
			if(neighbour.visited==1 || neighbour.closed==1){
				let Gtemp = node.g + neighbour.cost;
				if(Gtemp < neighbour.g){
					neighbour.g = Gtemp;
					neighbours2.push(neighbour);
					neighbour.h = neighbour.h ||  heuristic(neighbour,end);
				}
			}
			else{
				neighbours2.push(neighbour);
				neighbour.visited = 1;
			}
		}
		for(let i=0; i<neighbours2.length;i++){

			let neighbour = neighbours2[i];	
			neighbour.parentX = node.i;
			neighbour.parentY = node.j;
			neighbour.closed = 1;
	
			let t = Astar(neighbour, node.g+neighbour.cost ,threshold);
			if(t==-1){
				return -1;
			}
			if(t < min){
				min = t;
			}
		}
		return min;
	}
	IDAstar();
	singleCellDraw(initialState.i,initialState.i,"green");
	singleCellDraw(goalState.i,goalState.j,"red");
}