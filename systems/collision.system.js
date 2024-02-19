import { DrawingUtility } from "../utilities/drawing.utility.js";
import { Vector2 } from "../utilities/vector2.js";

export class CollisionSystem{
	constructor(canvas, cellSize){
		this._canvas = canvas;
		this._cellSize = cellSize;
		this._colliders = [];
		this._map = new Map();
		this._debug = false;
	}

	worldSpacetoMapCell(vector2){
		//takes in a vector2 and converts it to a  vector2 containing the x,y cell of the map
		return new Vector2(
			Math.floor(vector2.x / this._cellSize),
			Math.floor(vector2.y / this._cellSize)
		)
	}

	addToCell(collider){
		const bb = collider.getBoundingBox();
		const upperLeft = this.worldSpacetoMapCell(bb.upperLeft);
		const lowerRight = this.worldSpacetoMapCell(bb.lowerRight);
		
		for(let i = upperLeft.x; i<=lowerRight.x; i++){
			for(let j = upperLeft.y; j<=lowerRight.y; j++){
				const key = `${i},${j}`;
				const cell = this._map.get(key);
				(cell == null) ?
					this._map.set(key, [collider]) :
					cell.push(collider)
			}
		}

	}

	queryMap(boundingBox, radius){
		//will take in a position, and radius and return every collider in that radius
		const upperLeft = this.worldSpacetoMapCell(boundingBox.upperLeft);
		const lowerRight = this.worldSpacetoMapCell(boundingBox.lowerRight);
		radius = Math.ceil(radius / this._cellSize);
		const response = new Set();
		
		for(let i=upperLeft.x-radius; i<=lowerRight.x+radius; i++){
			for(let j=upperLeft.y-radius; j<lowerRight.y+radius; j++){
				const key = `${i},${j}`;
				const set = this._map.get(key)
				if(set != null){
					response.add(...set)
				}
				
			}
		}

		return Array.from(response);
	}

	checkCollision(boundingBoxA, boundingBoxB){
		//check aabb collision and return boolean
		if(boundingBoxA.upperLeft.x > boundingBoxB.lowerRight.x){return false}
		if(boundingBoxA.lowerRight.x < boundingBoxB.upperLeft.x){return false}
		if(boundingBoxA.upperLeft.y > boundingBoxB.lowerRight.y){return false}
		if(boundingBoxA.lowerRight.y < boundingBoxB.upperLeft.y){return false}
		return true
	}

	update(gameObjects){
		this._map.clear();
		const colliders = []

		for(const object of gameObjects){
			const collider = object.getComponentByName('BoxCollider');
			if(collider != null){
				this.addToCell(collider)
				colliders.push(collider)
			}
		}

		for(const collider of colliders){
			const bb = collider.getBoundingBox();
			const potentialCollisions = this.queryMap(bb, this._cellSize).filter(el => el != collider);
			if(potentialCollisions.length === 0){continue;}

			for(const pc of potentialCollisions){
				if(this.checkCollision(bb, pc.getBoundingBox())){
					//I need to decide what a collision data point looks like
					//object(parent, not collider) collided with, 
					pc.collisionDetected({object: collider.getParent()});
					collider.collisionDetected({object: pc.getParent()})
				}
				
			}
		}

		
	}

	draw(ctx){
		if(this._debug){
			
			for(let i=0; i<this._canvas.width; i+=this._cellSize){	
				for(let j=0; j<this._canvas.height; j+=this._cellSize){
					DrawingUtility.drawLine(ctx, new Vector2(i,j), new Vector2(i+this._cellSize, j))
					DrawingUtility.drawLine(ctx, new Vector2(i,j), new Vector2(i, j+this._cellSize))
					DrawingUtility.drawText(ctx, `${i/this._cellSize},${j/this._cellSize}`, new Vector2(i + 25, j + 25))
				}			
			}

		}
		
	}
}