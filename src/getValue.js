function displayRadioValue(){
	if(document.getElementById("dfs").checked){
		console.log("DFS ");
		call_DFS();
	}
	if(document.getElementById("bfs").checked){
		console.log("BFS ");
		call_BFS();
	}
	if(document.getElementById("A*").checked){
		console.log("a star");
		call_Astar();
	}
	if(document.getElementById("dijkstra").checked){
		console.log("dijkstra");
		call_dijkstra();
	}
	if(document.getElementById("IDDFS").checked){
		console.log("IDDFS");
		call_IDDFS();
	}
}
