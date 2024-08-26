const express = require('express');

const mongoose = require('mongoose')

const bodyParser = require('body-parser');
const Router = require('./Router/router');

const cors = require('cors');
const { startMonitoring } = require('./Controller/cpuUsage.ctrl');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.json({limit : "50mb"}));
app.use(bodyParser.urlencoded({ limit : '50mb', extended : true}));
app.use(express.static("files"));   

// ================================================== //
startMonitoring();

app.use('/api', Router);

app.get('/', (req, res) => {
    res.send('Welcome');
});

app.listen(4000, () => {
    console.log('Port No. 4000');
});

mongoose.connect('mongodb://127.0.0.1:27017/Policy').then(res => {
    console.log('DB connected');
}); 