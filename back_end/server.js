const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());

app.post('/write-file', (req, res) => {
    const { folderPath, filePath, data } = req.body;

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }

    if (fs.existsSync(filePath)) {
        fs.appendFileSync(filePath, `\n${data}`);
    } else {
        fs.writeFileSync(filePath, data);
    }

    res.json({ message: 'Tốt, đã thêm data thành công!'+filePath }); // Trả về JSON
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});