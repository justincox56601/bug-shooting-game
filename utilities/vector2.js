export class Vector2{
	constructor(x,y){
		this.x = x;
		this.y = y;
	}

	static zero(){
		return new Vector2(0,0);
	}
	
	static one(){
		return new Vector2(1,1);
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
