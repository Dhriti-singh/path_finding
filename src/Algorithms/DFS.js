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
	console.log(nodes[0][0].walk ,"zero zero");
	console.log(nodes[9][9].walk,"nine nine")
	console.log(start,end);
	let frontier = [];
	frontier.push(start);

	//implementing it using a stack
	let exploredNodes = [];

	let dfsFinish = false;

	function check( currentNode ){
	 	if(currentNode.i == end.i && currentNode.j == end.j)
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
		console.log(front);
		exploredNodes[front.i][front.j]=1;
		singleCellDraw(front.i,front.j,"blue");

		if(front.j>0){
			if(exploredNodes[front.i][front.j-1]==0 && nodes[front.i][front.j-1].walk==0){
				//console.log(1);
				frontier.push(nodes[front.i][front.j-1]);
				DFS();
			}
		}
		if(front.i>0){
			if(exploredNodes[front.i-1][front.j]==0 && nodes[front.i-1][front.j].walk==0){
				//console.log(2);
				frontier.push(nodes[front.i-1][front.j]);
				DFS();
			}
		}
		if(front.i<rows-1){
			if(exploredNodes[front.i+1][front.j]==0 && nodes[front.i+1][front.j].walk==0){
				//console.log(3);
				frontier.push(nodes[front.i+1][front.j]);
				DFS();
			}
		}
		if(front.j<cols-1){
			if(exploredNodes[front.i][front.j+1]==0 && nodes[front.i][front.j+1].walk==0){
				//console.log(4);
				frontier.push(nodes[front.i][front.j+1]);
				DFS();
			}
		}
	}
	DFS();
	singleCellDraw(start.i,start.j,"green");
	singleCellDraw(end.i,end.j,"red");

	if(dfsFinish===false){
		console.log("no solution available");
	}

}