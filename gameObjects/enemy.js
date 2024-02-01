class Enemy extends GameObject{
	constructor(position){
		super(position)
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