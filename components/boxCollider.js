import { DrawingUtility } from "../utilities/drawing.utility.js";
import { Vector2 } from "../utilities/vector2.js";
import { Component } from "./component.js";

export class BoxCollider extends Component{
	constructor(size, offset, debug=false){
		super();
		this._size = size; //vector2 width, height
		this._offset = offset; //vector2 x,y
		this._debug = false;
		this._onCollisionCallback = ()=>{return};
	}

	init(){
		this._transform.setPosition(this._offset)
	}

	checkCollision(boundingBox){
		//check aabb collision and return boolean
		const bb = this.getBoundingBox();
		if(bb.upperLeft.x > boundingBox.lowerRight.x){return false}
		if(bb.lowerRight.x < boundingBox.upperLeft.x){return false}
		if(bb.upperLeft.y > boundingBox.lowerRight.y){return false}
		if(bb.lowerRight.y < boundingBox.upperLeft.y){return false}
		return true
	}

	getBoundingBox(){
		//return the upper left and lower right vector2
		return {
			upperLeft: this.getWorldPosition(),
			lowerRight:this.getWorldPosition().add(this._size)
		}
	}

	getSize(){
		return this._size;
	}

	onCollision(callback){
		//what to do once a collision is detected
		this._onCollisionCallback = callback;
	}

	collisionDetected(collider){
		this._onCollisionCallback(collider)
	}

	update(){
		
		
	}

	draw(ctx){
		if(this._debug){
			DrawingUtility.drawSquare(
				ctx, 
				this.getWorldPosition(),
				this._size,
				'lime'
			)
		}
		
	}
}