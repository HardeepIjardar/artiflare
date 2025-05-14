const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateFavicons() {
  const logoPath = path.resolve(__dirname, '../src/assets/images/logo.png');
  const publicDir = path.resolve(__dirname, '../public');
  
  console.log(`Source logo: ${logoPath}`);
  console.log(`Target directory: ${publicDir}`);
  
  // Check if source image exists
  if (!fs.existsSync(logoPath)) {
    console.error(`❌ Source logo not found at ${logoPath}`);
    return;
  }
  
  // Check if target directory exists
  if (!fs.existsSync(publicDir)) {
    console.error(`❌ Public directory not found at ${publicDir}`);
    return;
  }
  
  try {
    // Generate favicon.ico (16x16, 32x32, 48x48)
    await sharp(logoPath)
      .resize(32, 32)
      .toFile(path.join(publicDir, 'favicon.ico'));
    console.log('✅ favicon.ico generated');
      
    // Generate logo192.png
    await sharp(logoPath)
      .resize(192, 192)
      .toFile(path.join(publicDir, 'logo192.png'));
    console.log('✅ logo192.png generated');
      
    // Generate logo512.png
    await sharp(logoPath)
      .resize(512, 512)
      .toFile(path.join(publicDir, 'logo512.png'));
    console.log('✅ logo512.png generated');
      
    console.log('✅ All favicon and app icons generated successfully!');
  } catch (error) {
    console.error('❌ Error generating favicon:', error);
  }
}

generateFavicons(); 