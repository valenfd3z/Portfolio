const fs = require('fs');
const path = require('path');
const https = require('https');
const { promisify } = require('util');
const stream = require('stream');

const pipeline = promisify(stream.pipeline);

// Create directories if they don't exist
const createDirs = () => {
  const dirs = [
    'public/assets/img',
    'public/assets/img/projects',
    'public/assets/img/blog',
    'public/assets/img/avatars'
  ];

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
  });
};

// Download a file from URL and save it
const downloadFile = async (url, filePath) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  console.log(`Downloading ${url} to ${filePath}`);
  
  const response = await new Promise((resolve, reject) => {
    https.get(url, resolve).on('error', reject);
  });
  
  if (response.statusCode !== 200) {
    throw new Error(`Failed to download ${url}: ${response.statusCode}`);
  }
  
  await pipeline(response, fs.createWriteStream(filePath));
  console.log(`Downloaded: ${filePath}`);
};

// Sample images to download (placeholder URLs - replace with actual image URLs)
const images = [
  {
    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop',
    path: 'public/assets/img/avatars/profile.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop',
    path: 'public/assets/img/avatars/avatar.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop',
    path: 'public/assets/img/avatars/avatar2.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop',
    path: 'public/assets/img/projects/project1.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop',
    path: 'public/assets/img/projects/project2.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop',
    path: 'public/assets/img/projects/project3.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop',
    path: 'public/assets/img/blog/blog1.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop',
    path: 'public/assets/img/blog/blog2.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop',
    path: 'public/assets/img/blog/blog3.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop',
    path: 'public/assets/img/hero-bg.jpg'
  }
];

// Main function to download all assets
const downloadAllAssets = async () => {
  try {
    console.log('Creating directories...');
    createDirs();
    
    console.log('Starting downloads...');
    for (const img of images) {
      await downloadFile(img.url, img.path);
    }
    
    console.log('All assets downloaded successfully!');
  } catch (error) {
    console.error('Error downloading assets:', error);
    process.exit(1);
  }
};

// Run the script
downloadAllAssets();
