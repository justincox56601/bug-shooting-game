export class CollisionSystem{
	constructor(canvas, cellSize){
		this._canvas = canvas;
		this._cellSize = cellSize;
		this._map = new Map();
	}

	register(collider){
		//inital add to cells
		console.log('registered')
	}

	worldSpacetoMapCell(vector2){
		//takes in a vector2 and converts it to a  vector2 containing the x,y cell of the map
	}

	addToCell(){
		//add the collider position to map, it will be up to checkCollision to determine if the bounding boxes overlap
	}

	removeFromCell(){}

	queryMap(){
		//will take in a position, and radius and return every collider in that radius

	}

	checkCollision(){
		//have to decide if this should be done here or on each collider individually. 
		//currently only using aabb collision so it probabaly doens't matter
	}

	update(){
		//remove all items from their cells and put them into new ones
		//will probably be faster to host collders in an array and start over from a clean map each frame

		//check collisions for each collider in the map
	}
}