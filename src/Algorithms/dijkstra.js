function call_dijkstra(){
    updateCanvas();

    //to store the information of the nodes
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

    //inital and goal state
	let start = new Node(initialState.i , initialState.j);
	let end = new Node(goalState.i , initialState.j );

    //the frontier will be implemented as a heap
	function heap() {
        return new BinaryHeap(function(node) {
            return node.distance;
        });
    }

    //to check if the current node is the goal node
    function check(currNode){
		if(currNode.i == goalState.i && currNode.j== goalState.j){
			return true;
		}
		else{
			return false;
		}
	}

    //to store the information of tall nodes
    let nodes = [[]];

    for(let i=0; i<rows;i++){
    	nodes[i] = [];
    	for(let j=0;j<cols;j++){
    		nodes[i][j] = new Node(i,j);
    	} 
    }

    // a variable to check if this goal is achieved
    let dijkstraFinished = false;

    //stores all the visited nodes
    let visitedNodes = [];

    //stores the optimal path to goal
    let shortestPath = [];

    function dijkstra(){
    	let frontier = heap();

        //setting the distance of start as 0
    	nodes[start.i][start.j].distance = 0;
    	frontier.push(start);

    	while(frontier.size()>0){

            //if the search is already complete
    		if(dijkstraFinished){
    			break;
    		}

            //the node with shortest distance
    		let front = frontier.pop();
       		visitedNodes.push(front);
    		front.closed = 1;

            //if current node is goal node
    		if(check(front)){
    			console.log("node found");
    			dijkstraFinished = true;
    			break;
    		}

            //expanding the current noed
    		let neighbours = Neighbours(front,nodes);
    		//console.log(neighbours);

    		for(let i=0; i<neighbours.length ; i++){
    			let neighbour = neighbours[i];

                //if the node is already expanded
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

                    //if the node is not in the frontier
    				if(beenVisited==false){
    					frontier.push(neighbour);
    				}
                    //if the node is already in the frontier
    				else{
    					frontier.rescoreElement(neighbour);
    				}
    			}
    		}
    	}
    }
    dijkstra();

    //if the node is unreachable
	if(dijkstraFinished===false){
		console.log("node unreachable");
	}
    //if the node is found
	else{
		let currX = goalState.i;
		let currY = goalState.j;

        //backtracking the path from the goal state
		
        while(1){
			if(currX==initialState.i && currY==initialState.j){
				break;
			}
			else{
				//console.log( "in time" , currX, currY);
				let parent_x = nodes[currX][currY].parentX;
				let parent_y = nodes[currX][currY].parentY;
				//console.log(nodes[currX][currY], parent_x, parent_y);
				currX = parent_x
				currY = parent_y;
				let curr = new selectedNode(currX, currY);
				shortestPath.push(curr);
			}
		}
	}

    //visualizing the optimal path
	drawArrayBlue(visitedNodes);
	drawArrayYellow(shortestPath);
	singleCellDraw(initialState.i,initialState.j,"green");
	singleCellDraw(goalState.i,goalState.j,"red");

    return;
}