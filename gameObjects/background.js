import { GameObject } from "./gameObject.js";
import { Sprite } from "../components/sprite.js";
import { Vector2 } from "../utilities/vector2.js";

export class Background extends GameObject{
	constructor(position, img){
		super(position)
		this.addComponent(new Sprite(img, null, new Vector2(1000, 600), Vector2.zero()));
	}
}