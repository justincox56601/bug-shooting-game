import { Vector2 } from "../utilities/vector2.js";
import { GameObject } from "./gameObject.js";
import { Enemy } from "./enemy.js";

export class EnemySpawner extends GameObject{
	
	constructor(position, canvas){
		super(position, 'Enemy Spawner');
		this._canvas = canvas;
		this._baseTime = 1000;
		this._timer = this._baseTime;

	}

	_spawnEnemy(){
		const position = new Vector2(
			Math.floor( 200 + Math.random() * (this._canvas.width -400)), 0
		)

		this._engine.addGameObject(
			new Enemy(position)
		)
	}

	update(deltaTime){
		this._timer -= deltaTime;
		
		if(this._timer <= 0){
			this._spawnEnemy();
			this._timer = this._baseTime;
		}
	}
}