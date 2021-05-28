
import React, { useEffect, useRef } from 'react';
import Wave from './component/Wave';
import Ring from './component/Ring';
import Retina from './retina';

const WaveHook = (props) => {
	const canvasRef = useRef(null);
	let isDrawContainer = false;
	let {
		color = '#07C790',
		range = 0,
		fontSize = 'default',
		fontFamily = '宋体',
		width = '200px',
		type = 'circle'
	} = props;

	const hexToRgba = (hex, opacity) => {
		let c;
		if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
			c = hex.substring(1).split('');
			if (c.length === 3) {
				c = [c[0], c[0], c[1], c[1], c[2], c[2]];
			}
			c = '0x' + c.join('');
			return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + opacity + ')';
		}
		throw new Error('Bad Hex');
	};

	let defaultColor = color || '#ccc';
	let colorOp1 = hexToRgba(defaultColor, 0.5);
	let colorOp2 = hexToRgba(defaultColor, 0.8);

	if (typeof width === 'string') {
		width = parseFloat(width.split('px')[0]);
	}
	const Font = {
		'small': `${width / 6}px`,
		'default': `${width / 5}px`,
		'large': `${width / 4}px`
	};

	let canvas,
		canvasWidth,
		canvasHeight,
		radius,
		nowRange,
		rangeValue,
		wave1,
		wave2,
		wave3;
	const init = () => {
		canvas = canvasRef.current;
		canvas.width = width * (11 / 15) || canvas.parentElement.offsetHeight * (11 / 15);
		canvas.height = canvas.width;
		canvasWidth = canvas.width;
		canvasHeight = canvas.width;
		radius = canvasWidth / 2;
		// 高清适配
		Retina.run(canvas);
		nowRange = 0;
		rangeValue = range;

		wave1 = new Wave({
			canvasWidth: canvasWidth, // 轴长
			canvasHeight: canvasHeight, // 轴高
			waveWidth: 0.055, // 波浪宽度,数越小越宽
			waveHeight: 7.5, // 波浪高度,数越大越高
			color: colorOp1, // 波浪颜色
			xOffset: 0, // 初始偏移
			speed: 0.02 // 速度
		});
		wave2 = new Wave({
			canvasWidth: canvasWidth, // 轴长
			canvasHeight: canvasHeight, // 轴高
			waveWidth: 0.045, // 波浪宽度,数越小越宽
			waveHeight: 3, // 波浪高度,数越大越高
			color: colorOp2, // 波浪颜色
			xOffset: 2, // 初始偏移
			speed: 0.035 // 速度
		});
		wave3 = new Wave({
			canvasWidth: canvasWidth, // 轴长
			canvasHeight: canvasHeight, // 轴高
			waveWidth: 0.037, // 波浪宽度,数越小越宽
			waveHeight: 5.5, // 波浪高度,数越大越高
			color: color, // 波浪颜色
			xOffset: 2, // 初始偏移
			speed: 0.045 // 速度
		});
		draw();
	};

	useEffect(() => {
		init();
	});

	const draw = () => {
		const ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);

		if (!isDrawContainer) {
			drawContainer(ctx);
		}
		if (nowRange <= rangeValue) {
			nowRange += 1;
		}
		if (nowRange > rangeValue) {
			nowRange -= 1;
		}
		wave2.update({
			nowRange: nowRange || 0
		});
		wave2.draw(ctx);
		wave1.update({
			nowRange: nowRange || 0
		});
		wave1.draw(ctx);

		wave3.update({
			nowRange: nowRange || 0
		});
		wave3.draw(ctx);
		// 百分比
		ctx.globalCompositeOperation = 'xor';
		ctx.beginPath();
		ctx.font = `${Font[fontSize]} ${fontFamily}`;
		ctx.textAlign = 'center';
		ctx.fillStyle = color;
		ctx.fillText(range || 0, canvasWidth / 2, canvasWidth / 2 + 10);
		window.requestAnimationFrame(draw);
	};

	const drawContainer = (ctx) => {
		if (type === 'circle') {
			drawCircle(ctx);
		}
	};

	const drawCircle = (ctx) => {
		const r = radius;
		const lineWidth = 4;
		const cR = r - (lineWidth);
		ctx.lineWidth = lineWidth;
		ctx.beginPath();
		ctx.arc(r, r, cR, 0, 2 * Math.PI);
		ctx.strokeStyle = colorOp1;
		ctx.stroke();
		ctx.clip();
		isDrawContainer = true;
	};
	return (
		<div
			className='tntx-wave'
			style={{
				width: width,
				height: width,
				position: 'relative'
			}}
		>
			<Ring
				color={colorOp1}
				width={width}
			/>
			<canvas
				ref={canvasRef}
				style={{
					display: 'inlne-block',
					position: 'absolute',
					left: '15.8%',
					top: '19.5%'
				}}
			/>
		</div>
	);
};

export default WaveHook;
