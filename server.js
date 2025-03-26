const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(fileUpload());
app.use(express.static('public'));

app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let file = req.files.file;
    let uploadPath = path.join(__dirname, 'public', 'uploads', file.name);

    file.mv(uploadPath, function(err) {
        if (err) return res.status(500).send(err);
        res.send('File uploaded successfully!');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
