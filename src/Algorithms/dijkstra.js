function call_dijkstra(){
	function Node(i,j){
		this.i =i;
		this.j = j;
		this.cost = Math.max(1,weight[i][j]);
		this.visited = false;
		this.closed = false;
		this.parentX = i;
		this.parentY = j;
		this. walk = board[i][j];
		this.distance = 10000000000000;
	}

	let start = new Node(initialState.i , initialState.j);
	let end = new Node(goalState.i , initialState.j );
	
	console.log("here");
	function heap() {
        return new BinaryHeap(function(node) {
            return node.distance;
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

    let nodes = [[]];

    for(let i=0; i<rows;i++){
    	nodes[i] = [];
    	for(let j=0;j<cols;j++){
    		nodes[i][j] = new Node(i,j);
    	} 
    }
    start.distance = 0;

    let dijkstraFinished = false;
    let visitedNodes = [];
    let shortestPath = [];

    function dijkstra(){
    	let frontier = heap();
    	nodes[start.i][start.j].distance = 0;
    	frontier.push(start);

    	while(frontier.size()>0){
    		if(dijkstraFinished){
    			break;
    		}
    		let front = frontier.pop();
       		visitedNodes.push(front);
    		front.closed = 1;
    		//console.log(front);

    		if(check(front)){
    			console.log("dijkstra fincished, node found");
    			dijkstraFinished = true;
    			break;
    		}

    		front.closed = 1;
    		let neighbours = Neighbours(front,nodes);
    		//console.log(neighbours);
    		for(let i=0; i<neighbours.length ; i++){
    			let neighbour = neighbours[i];

    			if(neighbour.closed==1 || neighbour.walk==1)
    				continue;

    			let currDistance = front.distance + neighbour.cost;
    			let beenVisited = neighbour.visited;
    			//console.log(neighbour , currDistance )
    			if(currDistance < neighbour.distance || beenVisited==false){
    				neighbour.distance = currDistance;
    				neighbour.parentX = front.i;
    				neighbour.parentY = front.j;
    				neighbour.visited = 1;
    				if(beenVisited==false){
    					frontier.push(neighbour);
    				}
    				else{
    					frontier.rescoreElement(neighbour);
    				}
    			}
    		}

    	}
    }
    dijkstra();
    console.log("out of while");

	if(dijkstraFinished===false){
		console.log("no solution");
	}
	else{
		let currX = goalState.i;
		let currY = goalState.j;
		while(1){
			if(currX==initialState.i && currY==initialState.j){
				break;
			}
			else{
				//console.log( "in time" , currX, currY);
				let parent_x = nodes[currX][currY].parentX;
				let parent_y = nodes[currX][currY].parentY;
				console.log(nodes[currX][currY], parent_x, parent_y);
				currX = parent_x
				currY = parent_y;
				let curr = new selectedNode(currX, currY);
				shortestPath.push(curr);
			}
		}
	}
	drawArrayBlue(visitedNodes);
	drawArrayYellow(shortestPath);
	singleCellDraw(initialState.i,initialState.j,"green");
	singleCellDraw(goalState.i,goalState.j,"red");
}