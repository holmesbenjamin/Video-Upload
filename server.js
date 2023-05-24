const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const { v4: uuidv4 } = require('uuid');


const app = express();


app.use(cors());



const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}.${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage,
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
    if (!video) res.status(404).json({ message: "No video found" });
    else res.json(video);
});

app.get('/', (req, res) => {
    res.json({ message: "Hello from the server!" });
});


app.post('/videos', (req, res, next) => {
    upload.single('video')(req, res, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error uploading video' });
        }
        // Process the uploaded video here
        const video = {
            id: uuidv4(),
            title: req.file.filename,
            url: `http://localhost:3000/uploads/${req.file.filename}`
        };
        videos.push(video);
        res.json({ message: 'Video uploaded successfully' });
    });
});
app.use('/uploads', express.static('uploads'));

const port = 3000;
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
