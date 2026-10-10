'use client';
import { useEffect, useRef } from 'react';

class Petal {
  x: number;
  y: number;
  w: number;
  h: number;
  opacity: number;
  flip: number;
  flipSpeed: number;
  vY: number;
  vX: number;
  color: string;

  constructor(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = (Math.random() * height) - height;
    this.w = 10 + Math.random() * 15;
    this.h = 10 + Math.random() * 10;
    this.opacity = Math.random() * 0.5 + 0.3;
    this.flip = Math.random();
    this.flipSpeed = Math.random() * 0.05 + 0.01;
    this.vY = 1 + Math.random() * 2;
    this.vX = -1 + Math.random() * 2;
    this.color = Math.random() > 0.5 ? '#F28C28' : '#F6C945'; // Marigold colors
  }

  update(width: number, height: number) {
    this.y += this.vY;
    this.x += this.vX;
    this.flip += this.flipSpeed;

    if (this.y > height) {
      this.y = -20;
      this.x = Math.random() * width;
    }
    if (this.x > width || this.x < -20) {
      this.x = Math.random() * width;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.translate(this.x, this.y);
    ctx.scale(Math.sin(this.flip), 1);
    
    // Draw petal shape
    ctx.beginPath();
    ctx.ellipse(0, 0, this.w / 2, this.h / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

export default function FallingPetals() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const petals: Petal[] = [];
    // Adjust number of petals based on screen width for performance
    const numPetals = width > 768 ? 40 : 20;
    for (let i = 0; i < numPetals; i++) {
      petals.push(new Petal(width, height));
    }

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (const petal of petals) {
        petal.update(width, height);
        petal.draw(ctx);
      }
      animationId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="petals-canvas"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 50, // Between content and overlays
        opacity: 0.6,
      }}
    />
  );
}
