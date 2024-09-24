"use strict";

const colors = ["#FFC213", "#ED63D2", "#39E09B", "#0BAFFF", "#F43636", "#FF7D50", "#7551E7"];

class ConfettiParticle {
    constructor(x, y, width, height, color, speedX, speedY) {
        this.color = color;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.speedY = speedY;
        this.angle = Math.random() * 360;
        this.velocityX = Math.random() * 0.65 - 0.2; 
        this.velocityY = Math.random() * (0.8 - 0.5) + 0.5; 
        this.rotationSpeed = (Math.random() < 0.5 ? -1 : 1) * Math.random() * 0.5; 
    }

    move() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.angle += this.rotationSpeed;
    }
}

const startConfettiAnimation = () => {
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');

    let particles = [];
    const particleCount = 50;

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles = []; // Reset particles on resize
        for (let i = 0; i < particleCount; i++) {
            createParticle();
        }
    };

	const drawRoundedRect = (ctx, x, y, width, height, radius) => {
		ctx.beginPath();
		ctx.moveTo(x + radius, y);
		ctx.lineTo(x + width - radius, y);
		ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
		ctx.lineTo(x + width, y + height - radius);
		ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
		ctx.lineTo(x + radius, y + height);
		ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
		ctx.lineTo(x, y + radius);
		ctx.quadraticCurveTo(x, y, x + radius, y);
		ctx.closePath();
		ctx.fill();
	};

    const createParticle = () => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height - canvas.height;
        const width = 48;
        const height = 16;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const speedX = Math.random() * 1 - 0.2; 
        const speedY = 0.15;
        particles.push(new ConfettiParticle(x, y, width, height, color, speedX, speedY));
    };

    const drawParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.move();
            ctx.fillStyle = particle.color;
            ctx.save();
            ctx.translate(particle.x, particle.y);
            ctx.rotate(particle.angle * Math.PI / 180);
            drawRoundedRect(ctx, -particle.width / 2, -particle.height / 2, particle.width, particle.height, 10); // Radius of 10 for rounded corners
            ctx.restore();
        });
        particles = particles.filter(particle => particle.y <= canvas.height + 100); // Remove particles that go off screen
    };

    const animate = () => {
        drawParticles();
        // Continuously create new particles
        if (particles.length < particleCount) {
            createParticle();
        }
        requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

	for (let index = 0; index < 20; index++) {
		
	const width = 48;
	const height = 16;
	const color = colors[Math.floor(Math.random() * colors.length)];
	
	
	const x = Math.random() * canvas.width; 
	const y = Math.random() * (canvas.height) + 100; 
	
	particles.push(new ConfettiParticle(x, y, width, height, color));
		
	}
    animate();
};
startConfettiAnimation()