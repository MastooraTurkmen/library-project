// const fs = require('fs');
// const path = require('path');

// const sourcePath = path.join(__dirname, '../node_modules/pdfjs-dist/build/pdf.worker.min.js');
// const destPath = path.join(__dirname, '../public/pdf.worker.min.js');

// // Create public directory if it doesn't exist
// if (!fs.existsSync(path.dirname(destPath))) {
//   fs.mkdirSync(path.dirname(destPath), { recursive: true });
// }

// // Copy the worker file
// fs.copyFileSync(sourcePath, destPath);
console.log('PDF.js worker file copied to public directory'); 