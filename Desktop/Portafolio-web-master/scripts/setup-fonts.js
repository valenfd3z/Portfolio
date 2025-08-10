const fs = require('fs');
const path = require('path');
const https = require('https');
const { promisify } = require('util');
const stream = require('stream');

const pipeline = promisify(stream.pipeline);

// Create fonts directory if it doesn't exist
const createFontsDir = () => {
  const fontsDir = 'public/assets/fonts';
  if (!fs.existsSync(fontsDir)) {
    fs.mkdirSync(fontsDir, { recursive: true });
    console.log(`Created directory: ${fontsDir}`);
  }
  return fontsDir;
};

// Download a font file from Google Fonts
const downloadFont = async (fontName, weights = [400, 700]) => {
  const fontsDir = createFontsDir();
  
  for (const weight of weights) {
    const fontUrl = `https://fonts.gstatic.com/s/${fontName}/v26/${getFontFileName(fontName, weight)}`;
    const fontPath = path.join(fontsDir, getFontFileName(fontName, weight));
    
    try {
      console.log(`Downloading ${fontName} (${weight})...`);
      const response = await new Promise((resolve, reject) => {
        https.get(fontUrl, resolve).on('error', reject);
      });
      
      if (response.statusCode !== 200) {
        console.warn(`Failed to download ${fontUrl}: ${response.statusCode}`);
        continue;
      }
      
      await pipeline(response, fs.createWriteStream(fontPath));
      console.log(`Downloaded: ${fontPath}`);
    } catch (error) {
      console.error(`Error downloading ${fontUrl}:`, error.message);
    }
  }
};

// Helper function to get font file name based on font name and weight
const getFontFileName = (fontName, weight) => {
  const fontVariants = {
    'inter': `Inter-${weight}.woff2`,
    'space-grotesk': `SpaceGrotesk-${weight}.woff2`
  };
  
  return fontVariants[fontName] || `${fontName}-${weight}.woff2`;
};

// Main function to set up all fonts
const setupFonts = async () => {
  try {
    console.log('Starting font setup...');
    
    // Download Inter font (main font)
    await downloadFont('inter', [300, 400, 500, 600, 700]);
    
    // Download Space Grotesk (for headings)
    await downloadFont('space-grotesk', [400, 500, 700]);
    
    console.log('Font setup completed!');
  } catch (error) {
    console.error('Error setting up fonts:', error);
    process.exit(1);
  }
};

// Run the script
setupFonts();
