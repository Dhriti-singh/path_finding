//storing basic infromation about each node

// x - column of the node
// y - row of the node
// walk 
// 	if walk == 0
// 		means that the node is walkable
// 	else
// 		means that the node is not walkable
// 		and hence a wall.

function Node(i,j){
  this.i = i;
  this.j = j;
  this.walk = 0;
}