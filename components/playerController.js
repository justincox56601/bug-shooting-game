import { EventEnum } from "../enums/event.enum.js";
import { Vector2 } from "../utilities/vector2.js";
import { Component } from "./component.js";

export class PlayerController extends Component{
	constructor(targetTransform, moveSpeed){
		super();
		this._targetTransform = targetTransform;
		this._moveSpeed = moveSpeed;
		this._inputs = new Set();
		

		this._inputVector = Vector2.zero();
	}

	_keyDownCallback(input){
		this._inputs.add(input)
	}

	_keyUpCallback(input){
		this._inputs.delete(input)
	}

	// _mouseMoveCallback(mousePos){
	// 	//this is used for rotating the player.  not used in this version of the 
	// 	//player controller but saving it for when I decide to use it.
	// 	this._target = new Vector2(mousePos.x, mousePos.y)
	// }

	init(){
		this._events.subscribe(EventEnum.KEY_DOWN, this._keyDownCallback.bind(this));
		this._events.subscribe(EventEnum.KEY_UP, this._keyUpCallback.bind(this));
		//this._events.subscribe(EventEnum.MOUSE_MOVE, this._mouseMoveCallback.bind(this)); //used for rotating the player
	}

	update(){
		//for side to side only movement
		const inputVector = Vector2.zero();
		if(this._inputs.has('a')){inputVector.add(Vector2.left())}
		if(this._inputs.has('d')){inputVector.add(Vector2.right())}

		this._targetTransform.addToPosition(inputVector.scale(this._moveSpeed))

		//for free movement around area
		//sample code being kept for when I implement free form move controller
		// const forward = this._target.copy().sub(this._position).normalize();
		// if(this._inputs.has('w')){this._position.add(forward.scale(this._moveSpeed))}
		// if(this._inputs.has('s')){this._position.add(forward.scale(this._moveSpeed).scale(-1))}
		// if(this._inputs.has('a')){this._position.add(forward.rotateleft90().scale(this._moveSpeed))}
		// if(this._inputs.has('d')){this._position.add(forward.rotateRight90().scale(this._moveSpeed))}

	}
}