import { Sprite } from "../components/sprite.js";
import { Vector2 } from "../utilities/vector2.js";
import { GameObject } from "./gameObject.js";

export class Bullet extends GameObject{
	constructor(position, target){
		super(position)
		this._dir = target.copy().sub(this._position).normalize();
		this._moveSpeed = 4;
	}

	init(){
		this.addComponent(new Sprite(
			'../media/bullet.png', 
			Vector2.zero(), 
			new Vector2(39, 39),
			new Vector2(-39/2, -39/2)  
		))
	}

	update(){
		super.update();
		this._position.add(this._dir.copy().scale(this._moveSpeed))

		if(this._position.y < 0){
			this._engine.removeGameObject(this)
		}
	}

	draw(ctx){
		super.draw(ctx)
	}
}
