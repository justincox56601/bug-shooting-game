import { Vector2 } from "../utilities/vector2.js";
import { Component } from "./component.js";
import { Bullet } from "../gameObjects/bullet.js";
import { BoxCollider } from "./boxCollider.js";
import { EventEnum } from "../enums/event.enum.js";
import { createImage } from "../utilities/utilities.js";
import { Sprite } from "./sprite.js";

export class BulletSpawner extends Component{ //this probabaly should be converted to a game object that follows the player
	constructor(){
		super();

		this._bulletImg = createImage('../media/bullet.png');
		this._bulletPool = []
	}

	init(){
		this._events.subscribe(EventEnum.MOUSE_CLICK, this._mouseClickCallback.bind(this))
	}

	_mouseClickCallback(data){
		const position = this.getWorldPosition()

		this._parent._engine.addGameObject(
			new Bullet(
				position, 
				new Vector2(position.x, 0),
				new Sprite(this._bulletImg, Vector2.zero(), new Vector2(39, 39),new Vector2(-39/2, -39/2))
			)
		)
	}

}
