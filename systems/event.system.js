export class EventSystem{
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