export const getId = function(){
	var state = 1;
	return function() {
		return state++;
	};
}();

export const createImage =(path) =>{
	const img = new Image();
	img.src = path;
	return img;
}

