
export class DrawingUtility{
	static drawPoint(ctx, position, radius=4, color='white'){
		ctx.save();
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI);
		ctx.fill();
		ctx.restore();
	}

	static drawCircle(ctx, position, radius=40, color='white'){
		ctx.save();
		ctx.strokeStyle = color;
		ctx.beginPath();
		ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.restore();
	}

	static drawSquare(ctx, position, size, color='white'){
		ctx.save();
		ctx.strokeStyle = color,
		ctx.beginPath();
		ctx.moveTo(position.x, position.y);
		ctx.lineTo(position.x + size.x, position.y);
		ctx.lineTo(position.x + size.x, position.y + size.y);
		ctx.lineTo(position.x, position.y + size.y);
		ctx.lineTo(position.x, position.y);
		ctx.closePath();
		ctx.stroke();
		ctx.restore();
	}

	static drawLine(ctx, start, end, color='white'){
		ctx.save();
		ctx.strokeStyle = color,
		ctx.beginPath();
		ctx.moveTo(start.x, start.y);
		ctx.lineTo(end.x, end.y);
		ctx.stroke();
		ctx.restore();
	}

	static drawText(ctx, text, position, color='white', size=20){
		ctx.save();
		ctx.fillStyle = color,
		ctx.font = `${size}px Arial`;
		ctx.fillText(text, position.x, position.y);
		ctx.restore();
	}

	static drawImage(ctx, img, sPosition, sSize, dPosition, dSize){
		ctx.drawImage(
			img, 
			sPosition.x, sPosition.y, 
			sSize.x, sSize.y, 
			dPosition.x, dPosition.y, 
			dSize.x, dSize.y
		)
	}
}