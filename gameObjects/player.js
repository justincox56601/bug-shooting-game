import { GameObject } from "./gameObject.js";
import { Vector2 } from "../utilities/vector2.js";
import { Sprite } from "../components/sprite.js";
import { BulletSpawner } from "../components/bulletSpawner.js";
import { PlayerController } from "../components/playerController.js";
import { BoxCollider } from "../components/boxCollider.js";

export class Player extends GameObject{
	constructor(position){
		super(position);
		this._moveSpeed = 3;
		this._velocity = Vector2.zero();

		this._bullets = [];

	}

	init(){
		
		

		this.addComponent(new Sprite(
			'../media/ship.png',
			null, null, new Vector2(-75, -25)
		));
		this.addComponent(new PlayerController(4))
		this.addComponent(new BulletSpawner());
		this.addComponent(new BoxCollider(new Vector2(100, 100), new Vector2(-50, 0)))
	}

	

	update(canvas){
		super.update();
		
		
		
	}

	draw(ctx){
		super.draw(ctx);
		
		// const angle = this._target.copy().sub(this._position).toAngle() + (Math.PI/2)
		// ctx.save();
		// ctx.translate(this._position.x, this._position.y);
		// ctx.rotate(angle)
		// ctx.drawImage(this._sprite, -this._sprite.width/2, -this._sprite.height/2)
		// ctx.restore();
	}
}