export class GameObject{
	constructor(position){
		this._position = position.copy();;
		this._events = null;
		this._engine = null;
		this._components = [];
	}

	getPosition(){
		return this._position.copy();;
	}

	getBoudingBox(){
		//using this as a makeshift box collider
		//this depends on a sprite being present - will need to fix that later
		return {
			topLeft: new Vector2(
				this._position.x - this._sprite.width/2,  
				this._position.y - this._sprite.height/2
			),
			bottomRight:new Vector2(
				this._position.x + this._sprite.width/2,  
				this._position.y + this._sprite.height/2
			)
		}
	}

	setEngine(engine){
		this._engine = engine;
	}
	
	setEventSystem(eventSystem){
		this._events = eventSystem;
	}

	addComponent(component){
		component.setParent(this);
		component.setEventSystem(this._events);
		component.init();
		this._components.push(component)
	}

	init(){}

	update(canvas){
		for(const component of this._components){
			component.update(canvas);
		}
	}

	draw(ctx){
		for(const component of this._components){
			component.draw(ctx);
		}
	}
}