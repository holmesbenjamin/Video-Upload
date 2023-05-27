const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path'); 
const { v4: uuidv4 } = require('uuid');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json'); // Adjust this line based on where your serviceAccount.json is located


const app = express();
app.use(cors());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://videoud-aa8cd.appspot.com/" // your Firebase Storage bucket url
});

const bucket = admin.storage().bucket();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB in bytes
  },
});

const videos = [];

app.get('/videos', (req, res) => {
  res.json(videos);
});

app.get('/videos/:id', (req, res) => {
  const video = videos.find(v => v.id === req.params.id);
  if (!video) res.status(403).json({ message: "No video found" });
  else res.json(video);
});

app.get('/', (req, res) => {
  res.json({ message: "Hello from the server!" });
});

app.post('/videos', upload.single('video'), (req, res, next) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }

  let file = req.file;
  let uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;

  const blob = bucket.file(uniqueName);
  const blobStream = blob.createWriteStream();

  blobStream.on('error', (err) => {
    console.error(err);
    res.status(500).json({ error: 'Error uploading video' });
  });

  blobStream.on('finish', () => {
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    const video = {
      id: uuidv4(),
      title: uniqueName,
      url: publicUrl,
    };
    videos.push(video);
    res.status(200).send(video);
  });

  blobStream.end(file.buffer);
});

const port = 3000;
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
