const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const firebase = require('./firebase');

firebase.init();

app.set('port', (process.env.PORT || 3000));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/redoc-static.html');
});

app.post('/v1/message/send', async (request, response) => {
    const message = request.body;
    console.log(message);
    delete(message.notification);
    if(message.hasOwnProperty('data')){
        try{
            const result = await firebase.sendMessage(message);
            response.send(result);
        }catch(error){
            response
                .status(500)
                .send(error.message);
        }
    }else{
        response.status(500).send("The data object is always required")
    }
});

app.listen(app.get('port'), () => {
  console.log("Node app is running at localhost:" + app.get('port'));
});
