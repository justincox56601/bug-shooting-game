export class InputController{
	constructor(eventSystem, canvas){
		this._events = eventSystem;
		this._canvas = canvas;

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