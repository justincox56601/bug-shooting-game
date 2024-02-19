import { GameObject } from "./gameObject.js";
import { Vector2 } from "../utilities/vector2.js";
import { Sprite } from "../components/sprite.js";
import { BoxCollider } from "../components/boxCollider.js";
import { createImage } from "../utilities/utilities.js";
import { EnemyController } from "../components/enemyController.js";
import { EventEnum } from "../enums/event.enum.js";

export class Enemy extends GameObject{
	constructor(position){
		super(position)
		this._moveSpeed = 1;
	}

	init(){
		const collider = new BoxCollider(new Vector2(85, 75), new Vector2(-42, -37));
		collider.onCollision(this._onHit.bind(this))
		this.addComponent(collider)
		this.addComponent(new Sprite(
			createImage('../media/Spaceship-Drakir1.png')
		));
		this.addComponent(new EnemyController(this._transform, 1));
	}

	_onHit(collider){
		this._engine.removeGameObject(this);
		this._events.publish(EventEnum.SCORE_EVENT, {score:3})
	}
}