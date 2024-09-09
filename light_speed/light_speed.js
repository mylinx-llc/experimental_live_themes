const numStars = 250;
let stars = [];
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let width, height;
let acc = 0.02; // Initial acceleration

function setup() {
	resizeCanvas();
	for (let i = 0; i < numStars; i++) {
		stars.push(new Star(Math.random() * width, Math.random() * height));
	}
	window.addEventListener('resize', resizeCanvas);
	canvas.addEventListener('mousemove', e => {
		acc = map(e.clientX, 0, width, 0.005, 0.06);
	});
	animate();
}

function draw() {
	ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
	ctx.fillRect(0, 0, width, height);
	
	stars.forEach(star => {
		star.update(acc);
		star.draw();
	});
	
	// Remove inactive stars
	stars = stars.filter(star => star.isActive());
	
	// Add new stars if needed
	while (stars.length < numStars) {
		stars.push(new Star(Math.random() * width, Math.random() * height));
	}
}

class Star {
	constructor(x, y) {
		this.pos = { x, y };
		this.prevPos = { x, y };
		this.vel = { x: 0, y: 0 };
		this.ang = Math.atan2(y - height / 2, x - width / 2);
	}
	
	isActive() {
		return onScreen(this.prevPos.x, this.prevPos.y);
	}
	
	update(acc) {
		this.vel.x += Math.cos(this.ang) * acc;
		this.vel.y += Math.sin(this.ang) * acc;
		
		this.prevPos.x = this.pos.x;
		this.prevPos.y = this.pos.y;
		
		// limit the distance stars can move to shorten trails
		this.pos.x += this.vel.x * 0.1;
		this.pos.y += this.vel.y * 0.1;

		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;

		// reset velocity to avoid long lengths
		this.vel.x *= 0.98;
		this.vel.y *= 0.98;
	}
	
	draw() {
		const alpha = map(Math.sqrt(this.vel.x ** 2 + this.vel.y ** 2), 0, 3, 0, 255);
		ctx.strokeStyle = `rgba(255, 255, 255, ${alpha / 255})`;
		ctx.beginPath();
		ctx.moveTo(this.pos.x, this.pos.y);
		ctx.lineTo(this.prevPos.x, this.prevPos.y);
		ctx.stroke();
	}
}

function map(value, min1, max1, min2, max2) {
	return (value - min1) / (max1 - min1) * (max2 - min2) + min2;
}

function onScreen(x, y) {
	return x >= 0 && x <= width && y >= 0 && y <= height;
}

function resizeCanvas() {
	width = canvas.width = window.innerWidth;
	height = canvas.height = window.innerHeight;
}

function animate() {
	draw();
	requestAnimationFrame(animate);
}

setup();