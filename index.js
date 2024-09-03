const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const ArrayData = require('./models/arrayData.js');
require('dotenv').config();

const app = express();
const port = 8080;

app.use(cors({
    origin: '*',
}));
app.use(bodyParser.json());

const URI = process.env.MONGO_URI

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.post('/api/save-array', async (req, res) => {
    const { generatedArray, sortedArray } = req.body;

    try {
        const newArrayData = new ArrayData({ generatedArray, sortedArray });
        await newArrayData.save();
        res.status(201).json({ message: 'Data saved successfully', data: newArrayData });
    } catch (err) {
        res.status(500).json({ message: 'Failed to save data', error: err });
    }
});

app.get('/api/get-arrays', async (req, res) => {
    try {
        const arrays = await ArrayData.find();
        res.json(arrays);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch data', error: err });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});