/*
 * This is a helper script to generate favicon files.
 * You can run this script manually with Node.js to regenerate the favicon
 * if you need to change the logo design.
 * 
 * Usage: 
 * 1. Install dependencies: npm install canvas fs-extra
 * 2. Run: node src/scripts/generateFavicon.js
 */

const fs = require('fs-extra');
const { createCanvas } = require('canvas');

// Function to render our logo
function renderLogo(size, color = '#e85a4f') {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Background Circle
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(size/2, size/2, size/2, 0, 2 * Math.PI);
  ctx.fill();
  
  // 'A' for ArtiFlare - Stylized (scaled down for smaller sizes)
  ctx.fillStyle = 'white';
  const scale = size / 512;
  
  ctx.beginPath();
  ctx.moveTo(size/2, 96 * scale);
  ctx.lineTo(352 * scale, 416 * scale);
  ctx.lineTo(288 * scale, 416 * scale);
  ctx.lineTo(272 * scale, 368 * scale);
  ctx.lineTo(240 * scale, 368 * scale);
  ctx.lineTo(224 * scale, 416 * scale);
  ctx.lineTo(160 * scale, 416 * scale);
  ctx.closePath();
  ctx.fill();
  
  // Stylized Flame
  ctx.beginPath();
  ctx.moveTo(256 * scale, 160 * scale);
  ctx.bezierCurveTo(
    256 * scale, 160 * scale,
    276 * scale, 190 * scale,
    276 * scale, 210 * scale
  );
  ctx.bezierCurveTo(
    276 * scale, 230 * scale,
    256 * scale, 240 * scale,
    256 * scale, 240 * scale
  );
  ctx.bezierCurveTo(
    256 * scale, 240 * scale,
    236 * scale, 230 * scale,
    236 * scale, 210 * scale
  );
  ctx.bezierCurveTo(
    236 * scale, 190 * scale,
    256 * scale, 160 * scale,
    256 * scale, 160 * scale
  );
  ctx.fill();
  
  // Craft/Artisan Tools
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 16 * scale;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(144 * scale, 270 * scale);
  ctx.bezierCurveTo(
    144 * scale, 270 * scale,
    176 * scale, 290 * scale,
    208 * scale, 290 * scale
  );
  ctx.bezierCurveTo(
    240 * scale, 290 * scale,
    256 * scale, 270 * scale,
    256 * scale, 270 * scale
  );
  ctx.bezierCurveTo(
    256 * scale, 270 * scale,
    272 * scale, 290 * scale,
    304 * scale, 290 * scale
  );
  ctx.bezierCurveTo(
    336 * scale, 290 * scale,
    368 * scale, 270 * scale,
    368 * scale, 270 * scale
  );
  ctx.stroke();
  
  return canvas.toBuffer('image/png');
}

// Create directory if it doesn't exist
fs.ensureDirSync('public');

// Generate different size icons
const sizes = [16, 32, 64, 192, 512];
sizes.forEach(size => {
  const buffer = renderLogo(size);
  fs.writeFileSync(`public/logo${size}.png`, buffer);
  console.log(`Generated logo${size}.png`);
});

// For favicon.ico (typically 16x16 or 32x32)
fs.writeFileSync('public/favicon.ico', renderLogo(32));
console.log('Generated favicon.ico');

console.log('All icons generated successfully!'); 