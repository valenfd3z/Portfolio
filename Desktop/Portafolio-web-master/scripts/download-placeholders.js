const fs = require('fs');
const path = require('path');
const https = require('https');

// Ensure the assets/img directory exists
const assetsDir = path.join(__dirname, '../src/assets');
const imgDir = path.join(assetsDir, 'img');

if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

// List of placeholder images to download
const placeholderImages = [
  { 
    filename: 'redes.avif',
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  { 
    filename: 'blog2.jpg',
    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  { 
    filename: 'blog3.jpg',
    url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  { 
    filename: 'project1.jpg',
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  { 
    filename: 'project2.jpg',
    url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  { 
    filename: 'project3.jpg',
    url: 'https://images.unsplash.com/photo-1581093057307-9d4ac58f5a9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  }
];

// Function to download a file from a URL
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, response => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', error => {
      fs.unlink(filepath, () => {
        reject(error);
      });
    });
  });
}

// Download all placeholder images
async function downloadAllImages() {
  console.log('Downloading placeholder images...');
  
  for (const image of placeholderImages) {
    const filePath = path.join(imgDir, image.filename);
    
    // Skip if file already exists
    if (fs.existsSync(filePath)) {
      console.log(`Skipping ${image.filename} - already exists`);
      continue;
    }
    
    try {
      console.log(`Downloading ${image.filename}...`);
      await downloadImage(image.url, filePath);
      console.log(`✓ Downloaded ${image.filename}`);
    } catch (error) {
      console.error(`Error downloading ${image.filename}:`, error.message);
    }
  }
  
  console.log('All placeholder images have been downloaded!');
}

// Run the downloader
downloadAllImages().catch(console.error);
