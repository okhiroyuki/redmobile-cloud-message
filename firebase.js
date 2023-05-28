const admin = require('firebase-admin');

function init(){
    let serviceAccount;

    if(process.env.SERVICE_ACCOUNT_KEY){
        serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY);
    }else{
        serviceAccount = require("./serviceAccountKey.json");
    }

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://redmobile-1c98d.firebaseio.com"
    });
}

async function sendMessage(message){
    try{
        const res = await admin.messaging().send(message);
        return Promise.resolve(res);
    }catch(error){
        return Promise.reject(error);
    }
}

module.exports = {
    init: init,
    sendMessage: sendMessage,
};
