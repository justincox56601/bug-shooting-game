export class Component{
	constructor(){
		this._position = null;
		this._parent = null;
		this._events = null
	}

	setParent(parent){
		this._parent = parent;
	}

	setEventSystem(eventSystem){
		this._events = eventSystem;
	}

	init(){
		this._position  = this._parent.getPosition();
	}

	update(){
		this._position  = this._parent.getPosition();
	}

	draw(ctx){}
}