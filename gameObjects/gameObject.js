import { Transform } from "../components/transform.js";
import { Vector2 } from "../utilities/vector2.js";
import { getId } from "../utilities/utilities.js";
import { LayerEnum } from "../enums/layer.enum.js";

export class GameObject{
	constructor(position = Vector2.zero(), name=this.constructor.name,  layer=LayerEnum.OBJECT){
		this._id = getId();
		this._name = name;
		this._layer = layer;
		
		this._events = null;
		this._engine = null;
		this._components = [];

		this._transform = new Transform(position.copy());
	}

	init(){}

	//convenience method to get the object position.
	getPosition(){
		return this._transform.getPosition().copy();
	}

	//called by the engine during addObject method
	setEngine(engine){
		this._engine = engine;
	}
	
	//called by the engine during addObject method
	setEventSystem(eventSystem){
		this._events = eventSystem;
	}

	getId(){
		return this._id;
	}

	getName(){
		return this._name;
	}

	getLayer(){
		return this._layer;
	}

	addComponent(component){
		component.setParent(this);
		component.setEventSystem(this._events);
		component.init();
		this._components.push(component)
	}

	removeComponent(component){
		const index = this._components.indexOf(component);
		this._components.splice(index, 1);
	}

	getComponentByName(componentName){
		return this._components.find(el => el._name === componentName)
	}

	

	update(deltaTime){
		for(const component of this._components){
			component.update(deltaTime);
		}
	}

	draw(ctx){
		for(const component of this._components){
			component.draw(ctx);
		}
	}
}