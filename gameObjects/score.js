import { DrawingUtility } from "../utilities/drawing.utility.js";
import { Vector2 } from "../utilities/vector2.js";
import { GameObject } from "./gameObject.js";

export class Score extends GameObject{
	constructor(position){
		super(position);
		this._score = 0;
	}

	init(){
		
		this._events.subscribe('scoreEvent', this._scoreEventCallback.bind(this))
	}

	_scoreEventCallback(scoreEvent){
		this._score += scoreEvent.score;
	}

	draw(ctx){
		super.draw(ctx);
		DrawingUtility.drawText(ctx, `Score: ${this._score}`, new Vector2(50,50), 'white', 36)
	}
}