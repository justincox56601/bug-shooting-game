import { Vector2 } from "../utilities/vector2.js";
import { Component } from "./component.js";

export class BoxCollider extends Component{
	constructor(size, offset, debug=false){
		super();
		this._collisionSystem = null;
		this._size = size; //vector2 width, height
		this._offset = offset; //vector2 x,y
		this._debug = true;
	}

	init(){
		super.init();
		this._collisionSystem = this._parent._engine.getCollisionSystem();
		this._collisionSystem.register(this)
		this._events.subscribe('mouseClick', (data)=>console.log(this.checkCollision({
			upperLeft: new Vector2(data.x, data.y),
			lowerRight: new Vector2(data.x, data.y)
		})))
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
			upperLeft: this._position.copy(),
			lowerRight: this._position.copy().add(this._size)
		}
	}

	onCollission(){
		//what to do once a collision is detected
	}

	update(){
		super.update();
		this._position.add(this._offset)
		
	}

	draw(ctx){
		if(this._debug){
			ctx.save();
			ctx.strokeStyle = 'lime',
			ctx.beginPath();
			ctx.moveTo(this._position.x, this._position.y);
			ctx.lineTo(this._position.x + this._size.x, this._position.y);
			ctx.lineTo(this._position.x + this._size.x, this._position.y + this._size.y);
			ctx.lineTo(this._position.x, this._position.y + this._size.y);
			ctx.lineTo(this._position.x, this._position.y);
			ctx.closePath();
			ctx.stroke();
			ctx.restore();
		}
		
	}
}