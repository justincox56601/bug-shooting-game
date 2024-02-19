import { Vector2 } from "../utilities/vector2.js";
import { Component } from "./component.js";


export class EnemyController extends Component{
	constructor(targetTransform, moveSpeed){
		super();
		this._targetTransform = targetTransform;
		this._moveSpeed = moveSpeed;
	}

	update(deltaTime){
		this._targetTransform.addToPosition(Vector2.down().scale(this._moveSpeed))
	}
}