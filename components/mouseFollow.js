import { DrawingUtility } from "../utilities/drawing.utility.js";
import { Vector2 } from "../utilities/vector2.js";
import { Component } from "./component.js";


export class MouseFollow extends Component{

	constructor(targetTransform){
		super();
		this._target = targetTransform;
	}

	init(){
		this._events.subscribe('mouseMove', (e)=>{
			this._target.setPosition(new Vector2(e.x, e.y))
		})
	}

	update(){
		this._
	}

	draw(ctx){
		DrawingUtility.drawPoint(ctx, this.getWorldPosition());
	}
}