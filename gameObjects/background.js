import { GameObject } from "./gameObject.js";
import { Sprite } from "../components/sprite.js";

export class Background extends GameObject{
	constructor(position){
		super(position)
		
	}

	init(){
		this.addComponent(new Sprite('/media/grass.jpg'));
	}

}