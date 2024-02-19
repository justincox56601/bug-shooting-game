import { Sprite } from "../components/sprite.js";
import { Vector2 } from "../utilities/vector2.js";
import { GameObject } from "./gameObject.js";
import { BoxCollider } from "../components/boxCollider.js";
import { LayerEnum } from "../enums/layer.enum.js";

export class Bullet extends GameObject{
	constructor(position, target, sprite){
		super(position)
		this._dir = target.copy().sub(position).normalize();
		this._moveSpeed = 4;
		this.addComponent(sprite); //adding sprite here so I can swap sprite on creation
	}

	init(){	
		const collider = new BoxCollider(new Vector2(20, 20), new Vector2(-10, -10));
		this.addComponent(collider);
		collider.onCollision(this._onCollision.bind(this))
	}

	_onCollision(data){
		if(data.object.getLayer() !== LayerEnum.PLAYER){
			this._engine.removeGameObject(this);
		}
		
	}

	update(){
		this._transform.addToPosition(this._dir.copy().scale(this._moveSpeed));

		//checking for off screen
		if(this._transform.getPosition().y < 0){
			this._engine.removeGameObject(this)
		}
	}
}
