import { Vector2 } from "../utilities/vector2.js";

export class Transform{
	constructor(position=Vector2.zero(), rotation=Vector2.zero(), scale=Vector2.one()){
		this._position = position;
		this._rotation = rotation;
		this._scale = scale;
	}

	getPosition(){return this._position.copy();}
	setPosition(position){this._position = position}
	addToPosition(vector2){this._position.add(vector2)}

	getRotation(){return this._rotation.copy();}
	setRotation(rotation){this._rotation = rotation}
	addToRotation(vector2){this._rotation.add(vector2)}

	getScale(){return this._scale.copy()}
	setScale(scale){this._scale = scale}
	addToScale(vector2){this._scale.add(vector2)}
}