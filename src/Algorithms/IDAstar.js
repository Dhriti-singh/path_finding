// weight Weight to apply to the heuristic to allow for
//  *     suboptimal paths, in order to speed up the search.

//the algo wont be optimal once it has to pass through weights

//allow an option to add the weights or not, 
//if not then dissaper all teh weights

//it will give sub optimla path with the weights


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
		this.visited = false;
		this.closed = false;
		this.parentX = i;
		this.parentY = j;
		this.walk = board[i][j];
	}

	let start = new Node(initialState.i, initialState.j);
	let end = new Node(goalState.i , goalState.j);

	for(let i=0 ; i<rows; i++){
		nodes[i] = [];
		for(let j=0; j<cols ; j++){
			nodes[i][j] = new Node(i,j);
			nodes[i][j].h = heuristic(nodes[i][j] , end);		
		}
	}
	function heap() {
        return new BinaryHeap(function(node) {
            return node.f;
        });
    }
	
	function check(currNode){
		if(currNode.i == goalState.i && currNode.j== goalState.j){
			return true;
		}
		else{
			return false;
		}
	}

	let IDAstarFinish = false;

	function IDAstar(){
		let threshold = heuristic(start,end);
		while(true){
			if(IDAstarFinish){
				break;
			}

			let path = [];
			path.push(start);
			let t = Astar(path, 0, threshold);
			if(t < 0 ){
				console.log("node found");
				drawArrayYellow(path);
				break;
			}
			else if(t == Infinity){
				console.log("node not found");
				return;
			}
			else{
				threshold = t;
			}
		}
		return;
	}

	function Astar(path,g, threshold){
		if(IDAstarFinish){
			return;
		}
		let node = path[path.length-1];
		//node.closed = 1;
		console.log(node);
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

		for(let i=0; i<neighbours.length;i++){
			let neighbour = neighbours[i];
			if(neighbour.closed == 1){
				continue;
			}
			path.push(neighbour);
			neighbour.closed = 1;
			let t = Astar(path, g+neighbour.cost ,threshold);
			if(t==-1){
				return -1;
			}
			if(t < min){
				min = t;
			}
			let temp = path.pop();
		}
		return min;
	}
	IDAstar();
	singleCellDraw(initialState.i,initialState.i,"green");
	singleCellDraw(goalState.i,goalState.j,"red");
}