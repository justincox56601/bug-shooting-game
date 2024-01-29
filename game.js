class Game{
	constructor(canvas){
		this._canvas = canvas;
		this._ctx = this._canvas.getContext('2d');

		this._events = new EventSystem();

		const player = new Player(this._events, new Vector2(this._canvas.width/2, this._canvas.height-100));

		this._gameObjects = [
			new ControllerInput(this._events, Vector2.zero(), this._canvas),
			new Background(this._events, Vector2.zero(), '/media/grass.jpg', this._canvas),
			player,
			new BulletSpawner(this._events, Vector2.zero(), player),
			new EnemySpawner(this._events, Vector2.zero()),
			//need to update this so that spawned objects get added to this as well.  
			//then I need to implement the collison system using this
			//will probably use the niave method for now since there are not a lot of objects 
			//on screen at any  time.  but update to a bette system later with space partitioning,
			//and colliders.
		]

		this._animate();
	}

	_animate(){
		this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height)
		
		//update
		for(const object of this._gameObjects){
			object.update(this._canvas)
		}

		//draw
		for(const object of this._gameObjects){
			object.draw(this._ctx)
		}


		window.requestAnimationFrame(()=>this._animate())
	}
}

class EventSystem{
	constructor(){
		//events is a map key=eventName, value= set of callbacks
		this._events = new Map()
	}

	subscribe(eventName, callback){
		const event = this._events.get(eventName);

		if(event == null){
			this._events.set(eventName, new Set([callback]))
		}else{
			event.add(callback)
		}
	}

	unsubscribe(eventName, callback){
		const event = this._events.get(eventName);

		if(event != null){
			event.delete(callback)
		}

		if(event.size === 0){
			this._events.delete(eventName); // a little clean up incase the event is empty
		}
	}

	publish(eventName, data){
		const event = this._events.get(eventName);

		if(event != null){
			event.forEach(e => e(data))
		}
	}
}

class Vector2{
	constructor(x,y){
		this.x = x;
		this.y = y;
	}

	static zero(){
		return new Vector2(0,0);
	}

	static right(){
		return new Vector2(1,0);
	}

	static left(){
		return new Vector2(-1,0);
	}

	static up(){
		//up in 2d canvas space is -y
		return new Vector2(0,-1);
	}

	static down(){
		//down in 2d canvas space is +y
		return new Vector2(0,1);
	}

	add(vector){
		this.x += vector.x;
		this.y += vector.y;
		return this;
	}

	sub(vector){
		this.x -= vector.x;
		this.y -= vector.y;
		return this;
	}

	scale(scalar){
		this.x *= scalar;
		this.y *= scalar;
		return this;
	}

	normalize(){
		const magnitude = Math.sqrt((this.x * this.x)+(this.y * this.y))
		if(magnitude > 0){
			this.x /= magnitude;
			this.y /= magnitude;
		}
		return this;
	}

	magnitude(){
		return Math.sqrt((this.x * this.x)+(this.y * this.y))
	}

	copy(){
		return new Vector2(this.x, this.y)
	}

	toAngle(){
		//returns the angle in radians between the positive x-axis and the ray from (0, 0) to the point (x, y)
		return Math.atan2(this.y, this.x)
	}

	rotateRight90(){
		const temp = this.copy();
		this.x = -temp.y;
		this.y = temp.x;
		return this;
	}
	rotateleft90(){
		const temp = this.copy();
		this.x = temp.y;
		this.y = -temp.x;
		return this;
	}
}

class GameObject{
	constructor(eventSystem, position){
		this._events = eventSystem;
		this._position = position;
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

	update(canvas){}

	draw(ctx){}
}

class ControllerInput extends GameObject{
	constructor(eventSystem, position, canvas){
		super(eventSystem, position)
		this._canvas = canvas

		document.addEventListener('keydown', (e)=>{
			e.preventDefault();
			this._events.publish('keyDown', e.key)
		})
		document.addEventListener('keyup', (e)=>{
			e.preventDefault();
			this._events.publish('keyUp', e.key)
		})
		this._canvas.addEventListener('click', (e)=>{
			e.preventDefault();
			this._events.publish('mouseClick', {x:e.offsetX, y:e.offsetY})
		})
		this._canvas.addEventListener('mousemove', (e)=>{
			e.preventDefault();
			this._events.publish('mouseMove', {x:e.offsetX, y:e.offsetY})
		})
	}
}

class Background extends GameObject{
	constructor(eventSystem, position, src, canvas){
	  super(eventSystem, position);
	  this._canvas = canvas
	  this._image = new Image();
	  this._image.src = src;
	}

	draw(ctx){
		ctx.drawImage(this._image, 0, 0, this._canvas.width, this._canvas.height)
	}
}

class Player extends GameObject{
	constructor(eventSystem, position){
		super(eventSystem, position);
		this._moveSpeed = 3;
		this._velocity = Vector2.zero();
		this._sprite = new Image();
		this._sprite.src = '/media/ship.png'

		this._target = Vector2.zero();

		

		this._bullets = [];

		this._events.subscribe('keyDown', this._keyDownCallback.bind(this))
		this._events.subscribe('keyUp', this._keyUpCallback.bind(this))
		this._events.subscribe('mouseMove', this._mouseMoveCallback.bind(this))
		this._inputs = new Set()

	}

	_keyDownCallback(input){
		this._inputs.add(input)
	}

	_keyUpCallback(input){
		this._inputs.delete(input)
	}

	_mouseMoveCallback(mousePos){
		this._target = new Vector2(mousePos.x, mousePos.y)
	}

	update(canvas){
		//for free movement around area
		// const forward = this._target.copy().sub(this._position).normalize();
		// if(this._inputs.has('w')){this._position.add(forward.scale(this._moveSpeed))}
		// if(this._inputs.has('s')){this._position.add(forward.scale(this._moveSpeed).scale(-1))}
		// if(this._inputs.has('a')){this._position.add(forward.rotateleft90().scale(this._moveSpeed))}
		// if(this._inputs.has('d')){this._position.add(forward.rotateRight90().scale(this._moveSpeed))}
		
		//for side to side only movement
		if(this._inputs.has('a')){this._position.add(Vector2.left().scale(this._moveSpeed))}
		if(this._inputs.has('d')){this._position.add(Vector2.right().scale(this._moveSpeed))}
	}

	draw(ctx){
		
		const angle = this._target.copy().sub(this._position).toAngle() + (Math.PI/2)
		ctx.save();
		ctx.translate(this._position.x, this._position.y);
		ctx.rotate(angle)
		ctx.drawImage(this._sprite, -this._sprite.width/2, -this._sprite.height/2)
		ctx.restore();
	}
}

class Enemy extends GameObject{
	constructor(eventSystem, position){
		super(eventSystem, position)
		this._moveSpeed = 1;

		this._sprite = new Image();
		this._sprite.src = '/media/Spaceship-Drakir1.png';
	}

	update(canvas){
		this._position.add(Vector2.down().normalize().scale(this._moveSpeed))
	}

	draw(ctx){
		ctx.drawImage(this._sprite, this._position.x-this._sprite.width/2, this._position.y-this._sprite.height/2 )
	}
}

class BulletSpawner extends GameObject{
	constructor(eventSystem, position, playerRef){
		super(eventSystem, position)
		this._playerRef = playerRef;
		this._position = playerRef.getPosition().copy();;
		this._bullets = [];

		this._events.subscribe('mouseClick', this._mouseClickCallback.bind(this))
	}

	_mouseClickCallback(mousePos){
		this._bullets.push(
			new Bullet(this._events, this._position.copy(), new Vector2(mousePos.x, mousePos.y))
		)
	}

	isOffScreen(bullet, canvas){
		const pos = bullet.getPosition();
		if(pos.x < 0 || pos.x > canvas.width){return true}
		if(pos.y < 0 || pos.y > canvas.height){return true}
		return false
	}

	update(canvas){
		this._position = this._playerRef.getPosition();

		for(const bullet of this._bullets){
			bullet.update()
			if(this.isOffScreen(bullet, canvas)){
				const index = this._bullets.indexOf(bullet)
				this._bullets.splice(index, 1)
			}
		}

	}

	draw(ctx){
		for(const bullet of this._bullets){
			bullet.draw(ctx)
		}
	}

}

class Bullet extends GameObject{
	constructor(eventSystem, position, target){
		super(eventSystem, position);
		this._dir = target.copy().sub(this._position).normalize();

		this._sprite = new Image();
		this._sprite.src = '/media/bullet.png';
		this._spriteWidth = 39;
		this._frame = 0;

		this._moveSpeed = 4;


	}


	update(){
		this._position.add(this._dir.copy().scale(this._moveSpeed)) 		
	}

	draw(ctx){
		ctx.drawImage(
			this._sprite, 
			this._spriteWidth * this._frame, 0, //source x, y
			this._spriteWidth, this._spriteWidth, // source width, height
			this._position.x - this._spriteWidth/2, this._position.y-this._spriteWidth/2, //desitnation x, y
			this._spriteWidth, this._spriteWidth //destination width, height
		);

	}
}

class EnemySpawner extends GameObject{
	constructor(eventSystem, position){
		super(eventSystem, position);
		this._enemies = [];
		this._countdown = 500;
	}

	_isOffScreen(enemy, canvas){
		const pos = enemy.getPosition();
		if(pos.x < 0 || pos.x > canvas.width){return true}
		if(pos.y < 0 || pos.y > canvas.height){return true}
		return false
	}

	_spawnEnemy(canvas){
		this._enemies.push(new Enemy(this._events, new Vector2(100 + (Math.random() * canvas.width-200), 0)))
	}

	update(canvas){
		//tick down counter
		this._countdown--;

		//if countdown is 0, reset it and spawn enemy
		if(this._countdown <= 0){
			this._spawnEnemy(canvas);
			this._countdown = 500;
		}

		//check if enemy is off screen

		//update enemies
		for(const enemy of this._enemies){
			enemy.update(canvas)
			if(this._isOffScreen(enemy, canvas)){
				const index = this._enemies.indexOf(enemy);
				this._enemies.splice(index, 1);
			}
		}
	}

	draw(ctx){
		for(const enemy of this._enemies){
			enemy.draw(ctx);
		}
	}
}

class CollisionMap{
	constructor(canvas, cellSize){
		this._canvas = canvas;
		this._cellSize = cellSize;
	}
}


const canvas = document.querySelector('canvas');
const game = new Game(canvas)