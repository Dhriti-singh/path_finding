// storing basic infromation about each node

// x - column of the node
// y - row of the node
// walk 
// 	if walk == 0
// 		means that the node is walkable
// 	else
// 		means that the node is not walkable
// 		and hence a wall.


//general 
function Node(i,j){
    this.i = i;
    this.j = j;
    this.walk = 0;
    this.parentX = i;
    this.parentY = j;
    this.visit = 0;
    this.closed = 0;
}

//a node to store just coordinates
function selectedNode(i,j){
	this.i = i;
	this.j = j;
}

//a function to expand the input node
function Neighbours(currNode,nodes){
    let i = currNode.i;
    let j = currNode.j;
    let temp = [];


    if(i>0 && nodes[i-1][j].walk==0){
        temp.push(nodes[i-1][j]);
    }

    if(i<rows-1 && nodes[i+1][j].walk==0){
        temp.push(nodes[i+1][j]);
    }
    if(j<cols-1 && nodes[i][j+1].walk==0){
        temp.push(nodes[i][j+1]);
    }
    if(j>0 && nodes[i][j-1].walk==0){
        temp.push(nodes[i][j-1]);
    }
    if(document.getElementById("dia_check").checked){
        if(i>0 && j>0 && nodes[i-1][j-1].walk == 0){
            temp.push(nodes[i-1][j-1])
        }
        if(i<rows-1 && j<cols-1 && nodes[i+1][j+1].walk == 0){
            temp.push(nodes[i+1][j+1])
        }
        if(i<rows-1 && j>0 && nodes[i+1][j-1].walk == 0){
            temp.push(nodes[i+1][j-1])
        }
        if(i>0 && j<cols-1 && nodes[i-1][j+1].walk == 0){
            temp.push(nodes[i-1][j+1])
        }
    }

    return temp;
}