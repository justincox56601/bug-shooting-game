import { DrawingUtility } from "../utilities/drawing.utility.js";
import { Vector2 } from "../utilities/vector2.js";
import { Component } from "./component.js";


export class Sprite extends Component{
	constructor(img, origin, size, offset){
		super();
		this._img  = img;
		this._origin = origin ?? Vector2.zero(); //vector2 x, y
		this._size = size ?? new Vector2(this._img.width, this._img.height); //vector2 width, height
		this._offset = offset ?? new Vector2(-this._img.width/2, -this._img.height/2); //vector2 x, y
		
	}

	update(){
		super.update();
	}

	draw(ctx){
		//this doesn't take into account scale or rotation yet.  that is a later issue
		const position = this.getWorldPosition();
		DrawingUtility.drawImage(ctx, this._img, this._origin, this._size, position.add(this._offset), this._size)
	}
}