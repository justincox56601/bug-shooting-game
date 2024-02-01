import { Vector2 } from "../utilities/vector2.js";
import { Component } from "./component.js";
import { Bullet } from "../gameObjects/bullet.js";

export class BulletSpawner extends Component{
	constructor(){
		super();
	}

	init(){
		super.init();
		this._events.subscribe('mouseClick', this._mouseClickCallback.bind(this))
	}

	_mouseClickCallback(data){
		this._parent._engine.addGameObject(new Bullet(this._parent._position, new Vector2(this._parent._position.x, 0)))
	}
}