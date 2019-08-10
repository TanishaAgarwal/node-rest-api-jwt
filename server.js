const express = require('express'); 
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', (req, res)=>{
    res.json({"tutorial" : "Build REST API with node.js"});
console.log('Starting the app now');
});

app.listen(3000, () => { 
    console.log('Node server listening on port 3000');
});