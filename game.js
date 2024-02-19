import { EventSystem } from "/systems/event.system.js";
import { CollisionSystem } from "/systems/collision.system.js";
import { Vector2 } from '/utilities/vector2.js';
import { Player} from "./gameObjects/player.js";
import { Background} from "./gameObjects/background.js";
import {GameObject } from "./gameObjects/gameObject.js";
import { InputController } from "./utilities/inputController.js";
import { Bullet } from "./gameObjects/bullet.js";
import {Enemy } from './gameObjects/enemy.js';
import { Score } from "./gameObjects/score.js";
import { MouseFollow } from "./components/mouseFollow.js";
import { BoxCollider } from "./components/boxCollider.js";
import { getId, createImage } from "./utilities/utilities.js";
import { EnemySpawner} from "./gameObjects/enemySpawner.js";

class Game{
	constructor(canvas){
		this._canvas = canvas;
		this._ctx = this._canvas.getContext('2d');
		this._time = Date.now();

		this._events = new EventSystem();
		this._collisionSystem = new CollisionSystem(this._canvas, this._canvas.width/10)
		this._inputController = new InputController(this._events, this._canvas);

		this._gameObjects = [];
		this.addGameObject(new Background(Vector2.zero(), createImage('../media/space-bg.jpg'), this._canvas))
		this.addGameObject(new Player(new Vector2(this._canvas.width/2, this._canvas.height - 125)))
		this.addGameObject(new EnemySpawner(Vector2.zero(), this._canvas))
		this.addGameObject(new Score(Vector2.zero()))
		

		this._animate();
	}

	addGameObject(gameObject){
		gameObject.setEngine(this);
		gameObject.setEventSystem(this._events)
		gameObject.init();
		this._gameObjects.push(gameObject)
	}

	removeGameObject(gameObject){
		const id = gameObject.getId();
		const index = this._gameObjects.findIndex(el =>el.getId() === id)
		if(index > -1){
			this._gameObjects.splice(index, 1);
		}
		
	}

	getCollisionSystem(){
		return this._collisionSystem;
	}

	_animate(){
		const deltaTime = Date.now() - this._time;
		this._time = Date.now();

		this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height)

		//update
		for(const object of this._gameObjects){
			object.update(deltaTime)
		}

		//update collision system
		this._collisionSystem.update(this._gameObjects);

		//draw
		for(const object of this._gameObjects){
			object.draw(this._ctx)
		}

		this._collisionSystem.draw(this._ctx)
		
		window.requestAnimationFrame(()=>this._animate())
	}
}


const canvas = document.querySelector('canvas');
const game = new Game(canvas)