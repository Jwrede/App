const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const iconDir = path.join(__dirname, 'icons');

// Create icons directory if it doesn't exist
if (!fs.existsSync(iconDir)) {
  fs.mkdirSync(iconDir);
}

// First convert SVG to PNG
sharp('icon.svg')
  .png()
  .toFile('icon.png')
  .then(() => {
    console.log('Converted SVG to PNG');
    
    // Generate icons of different sizes
    return Promise.all(
      sizes.map(size => 
        sharp('icon.png')
          .resize(size, size)
          .toFile(path.join(iconDir, `icon-${size}x${size}.png`))
          .then(() => console.log(`Generated ${size}x${size} icon`))
          .catch(err => console.error(`Error generating ${size}x${size} icon:`, err))
      )
    );
  })
  .then(() => {
    // Clean up the temporary icon.png file
    fs.unlinkSync('icon.png');
    console.log('Icon generation complete');
  })
  .catch(err => {
    console.error('Error during icon generation:', err);
  }); 