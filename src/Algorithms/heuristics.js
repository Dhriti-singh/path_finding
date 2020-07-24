//in each of the followning heuristc,

//d1 represents the distance in the vertical direction
//i.e. the difference of rows between the two points

//d2 represents the distance in the horizontal direction
//i.e. the difference of columns between the two points

//by default euclidean distance will be used

function heuristic(node1 , node2){
	//while we select diagonal,we can ont use the manhattan diatance
	//as the heuristic will not be admissible and lead to suboptimal result
	//changed to euclidean
	if(document.getElementById("manhattan").checked && document.getElementById("dia_check").checked==false){
		let d1 = Math.abs(node1.i-node2.i);
		let d2 = Math.abs(node1.j-node2.j);
		return d1+d2;
	}
	else{
		let d1 = (node1.i-node2.i);
		let d2 = (node1.j-node2.j);
		return Math.sqrt(d1*d1 + d2*d2 );
	}
}
 