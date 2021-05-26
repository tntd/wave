class Wave {
	constructor({
		canvasWidth, // 轴长
		canvasHeight, // 轴高
		waveWidth = 0.055, // 波浪宽度,数越小越宽
		waveHeight = 6, // 波浪高度,数越大越高
		xOffset = 0,
		speed = 0.04,
		color = 'rgba(7, 199, 144)', // 波浪颜色
		range = 0
	} = {}) {
		this.points = [];
		this.startX = 0;
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;
		this.waveWidth = waveWidth;
		this.waveHeight = waveHeight;
		this.xOffset = xOffset;
		this.speed = speed;
		this.color = color;
		this.range = range || 0;
	}
	getChartColor(ctx) {
		const radius = this.canvasWidth / 2;
		const grd = ctx.createLinearGradient(radius, radius, radius, this.canvasHeight);
		grd.addColorStop(0, this.color);
		return grd;
	}
	draw(ctx) {
		const points = this.points;
		ctx.globalCompositeOperation = 'source-over';
		ctx.beginPath();
		for (let i = 0; i < points.length; i += 1) {
			const point = points[i];
			ctx.lineTo(point[0], point[1]);
		}

		ctx.lineTo(this.canvasWidth, this.canvasHeight);
		ctx.lineTo(this.startX, this.canvasHeight);
		ctx.lineTo(points[0][0], points[0][1]);
		ctx.fillStyle = this.getChartColor(ctx);
		ctx.fill();
	}
	update({
		nowRange
	} = {}) {
		this.points = [];
		nowRange = nowRange > 1 ? nowRange : nowRange + 1;
		const {
			startX, waveHeight, waveWidth, canvasWidth, canvasHeight, xOffset
		} = this;
		for (let x = startX; x < startX + canvasWidth; x += 20 / canvasWidth) {
			const y = Math.sin(((startX + x) * waveWidth) + xOffset);
			const dY = canvasHeight * (1 - (nowRange / 100));
			this.points.push([x, dY + (y * waveHeight)]);
		}
		this.xOffset += this.speed;
	}
}

export default Wave;

