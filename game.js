import { EventSystem } from "/systems/event.system.js";
import { CollisionSystem } from "/systems/collision.system.js";
import { Vector2 } from '/utilities/vector2.js';
import { Player} from "./gameObjects/player.js";
import { Background} from "./gameObjects/background.js";
import {GameObject } from "./gameObjects/gameObject.js";
import { InputController } from "./utilities/inputController.js";
import { Bullet } from "./gameObjects/bullet.js";

class Game{
	constructor(canvas){
		this._canvas = canvas;
		this._ctx = this._canvas.getContext('2d');

		this._events = new EventSystem();
		this._collisionSystem = new CollisionSystem(this._canvas, this._canvas.width/10)
		this._inputController = new InputController(this._events, this._canvas);

		this._gameObjects = [];

		this.addGameObject(new Background(Vector2.zero()))
		this.addGameObject(new Player(new Vector2(this._canvas.width/2, this._canvas.height - 125)))

		this._animate();
	}

	addGameObject(gameObject){
		gameObject.setEngine(this);
		gameObject.setEventSystem(this._events)
		gameObject.init();
		this._gameObjects.push(gameObject)
	}

	removeGameObject(gameObject){
		const index = this._gameObjects.indexOf(gameObject);
		this._gameObjects.splice(index, 1);
	}

	getCollisionSystem(){
		return this._collisionSystem;
	}

	_animate(){
		this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height)
		
		//update
		for(const object of this._gameObjects){
			object.update(this._canvas)
		}

		//update collision system
		this._collisionSystem.update();

		//draw
		for(const object of this._gameObjects){
			object.draw(this._ctx)
		}
		
		window.requestAnimationFrame(()=>this._animate())
	}
}



// class ControllerInput extends GameObject{
// 	constructor(eventSystem, position, canvas){
// 		super(eventSystem, position)
// 		this._canvas = canvas

// 		document.addEventListener('keydown', (e)=>{
// 			e.preventDefault();
// 			this._events.publish('keyDown', e.key)
// 		})
// 		document.addEventListener('keyup', (e)=>{
// 			e.preventDefault();
// 			this._events.publish('keyUp', e.key)
// 		})
// 		this._canvas.addEventListener('click', (e)=>{
// 			e.preventDefault();
// 			this._events.publish('mouseClick', {x:e.offsetX, y:e.offsetY})
// 		})
// 		this._canvas.addEventListener('mousemove', (e)=>{
// 			e.preventDefault();
// 			this._events.publish('mouseMove', {x:e.offsetX, y:e.offsetY})
// 		})
// 	}
// }

// class Background extends GameObject{
// 	constructor(eventSystem, position, src, canvas){
// 	  super(eventSystem, position);
// 	  this._canvas = canvas
// 	  this._image = new Image();
// 	  this._image.src = src;
// 	}

// 	draw(ctx){
// 		ctx.drawImage(this._image, 0, 0, this._canvas.width, this._canvas.height)
// 	}
// }





// class BulletSpawner extends GameObject{
// 	constructor(eventSystem, position, playerRef){
// 		super(eventSystem, position)
// 		this._playerRef = playerRef;
// 		this._position = playerRef.getPosition().copy();;
// 		this._bullets = [];

// 		this._events.subscribe('mouseClick', this._mouseClickCallback.bind(this))
// 	}

// 	_mouseClickCallback(mousePos){
// 		this._bullets.push(
// 			new Bullet(this._events, this._position.copy(), new Vector2(mousePos.x, mousePos.y))
// 		)
// 	}

// 	isOffScreen(bullet, canvas){
// 		const pos = bullet.getPosition();
// 		if(pos.x < 0 || pos.x > canvas.width){return true}
// 		if(pos.y < 0 || pos.y > canvas.height){return true}
// 		return false
// 	}

// 	update(canvas){
// 		this._position = this._playerRef.getPosition();

// 		for(const bullet of this._bullets){
// 			bullet.update()
// 			if(this.isOffScreen(bullet, canvas)){
// 				const index = this._bullets.indexOf(bullet)
// 				this._bullets.splice(index, 1)
// 			}
// 		}

// 	}

// 	draw(ctx){
// 		for(const bullet of this._bullets){
// 			bullet.draw(ctx)
// 		}
// 	}

// }



// class EnemySpawner extends GameObject{
// 	constructor(eventSystem, position){
// 		super(eventSystem, position);
// 		this._enemies = [];
// 		this._countdown = 500;
// 	}

// 	_isOffScreen(enemy, canvas){
// 		const pos = enemy.getPosition();
// 		if(pos.x < 0 || pos.x > canvas.width){return true}
// 		if(pos.y < 0 || pos.y > canvas.height){return true}
// 		return false
// 	}

// 	_spawnEnemy(canvas){
// 		this._enemies.push(new Enemy(this._events, new Vector2(100 + (Math.random() * canvas.width-200), 0)))
// 	}

// 	update(canvas){
// 		//tick down counter
// 		this._countdown--;

// 		//if countdown is 0, reset it and spawn enemy
// 		if(this._countdown <= 0){
// 			this._spawnEnemy(canvas);
// 			this._countdown = 500;
// 		}

// 		//check if enemy is off screen

// 		//update enemies
// 		for(const enemy of this._enemies){
// 			enemy.update(canvas)
// 			if(this._isOffScreen(enemy, canvas)){
// 				const index = this._enemies.indexOf(enemy);
// 				this._enemies.splice(index, 1);
// 			}
// 		}
// 	}

// 	draw(ctx){
// 		for(const enemy of this._enemies){
// 			enemy.draw(ctx);
// 		}
// 	}
// }

const canvas = document.querySelector('canvas');
const game = new Game(canvas)