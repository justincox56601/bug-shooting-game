import { Vector2 } from "../utilities/vector2.js";
import { Component } from "./component.js";


export class Sprite extends Component{
	constructor(path, origin,size, offset){
		super();
		this._img  = new Image();
		this._img.src = path;
		this._origin = origin ?? Vector2.zero(); //vector2 x, y
		this._size = size ?? new Vector2(this._img.width, this._img.height); //vector2 width, height
		this._offset = offset ?? Vector2.zero(); //vector2 x, y
	}

	update(){
		super.update();
	}

	draw(ctx){
		super.draw(ctx);
		ctx.drawImage(
			this._img, // source image
			this._origin.x, this._origin.y, //source x,y
			this._size.x, this._size.y, //source width, height
			this._position.x + this._offset.x, this._position.y + this._offset.y, //destination x, y
			this._size.x, this._size.y // destination width, height
			
		)
	}
}