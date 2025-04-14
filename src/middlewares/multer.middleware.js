// import multer from 'multer';

// // Multer storage configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/temp'); // Make sure this directory exists
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname); // Prefix with a timestamp to avoid name collisions
//   }
// });

// // Initialize multer with storage configuration
// const upload = multer({ storage: storage });

// export default upload;

import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Temporary file storage location
const tempDir = path.resolve('public/temp');

// Ensure the temp folder exists
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

// Configure Multer to store files in the temp folder
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, tempDir); // Save files in public/temp
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // Limit file size to 10MB
});

export default upload;









