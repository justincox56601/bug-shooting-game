import { Transform } from "./transform.js";
import { getId } from "../utilities/utilities.js";

export class Component{
	constructor(){
		this._id = getId();
		this._parent = null;
		this._events = null;
		this._name = this.constructor.name;

		this._transform = new Transform();
	}

	//called by parent object during addComponent Method
	setParent(parent){
		this._parent = parent;
	}

	getParent(){
		return this._parent;
	}

	//called by parent object during addComponent Method
	setEventSystem(eventSystem){
		this._events = eventSystem;
	}

	//position relative to the parent component
	getLocalPosition(){
		return this._transform.getPosition().copy();
	}

	setLocalPosition(position){
		this._transform.setPosition(position.copy());
	}

	//actual position with parent position taken into account
	getWorldPosition(){
		return this._parent.getPosition().add(this._transform.getPosition());
	}

	init(){}

	update(deltaTime){}

	draw(ctx){}
}