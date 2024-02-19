import { GameObject } from "./gameObject.js";
import { Vector2 } from "../utilities/vector2.js";
import { Sprite } from "../components/sprite.js";
import { BulletSpawner } from "../components/bulletSpawner.js";
import { PlayerController } from "../components/playerController.js";
import { BoxCollider } from "../components/boxCollider.js";
import { DrawingUtility } from "../utilities/drawing.utility.js";
import { LayerEnum } from "../enums/layer.enum.js";
import { createImage } from "../utilities/utilities.js";


export class Player extends GameObject{
	constructor(position){
		super(position, 'Player', LayerEnum.PLAYER);
		this._moveSpeed = 3;
		this._velocity = Vector2.zero();

		this._bullets = [];

	}

	init(){
		this.addComponent(new Sprite(
			createImage('../media/ship.png'),
			null, new Vector2(300, 300), new Vector2(-75, -75)
		));
		this.addComponent(new PlayerController(this._transform, 4))
		this.addComponent(new BoxCollider(new Vector2(100, 100), new Vector2(-50, -50)))
		this.addComponent(new BulletSpawner());
	}

	draw(ctx){
		super.draw(ctx);
		
		//save this for drawing rotating ship later
		// const angle = this._target.copy().sub(this._position).toAngle() + (Math.PI/2)
		// ctx.save();
		// ctx.translate(this._position.x, this._position.y);
		// ctx.rotate(angle)
		// ctx.drawImage(this._sprite, -this._sprite.width/2, -this._sprite.height/2)
		// ctx.restore();
	}
}