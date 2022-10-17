
var ShoutoutClient = require('shoutout-sdk');


var apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmN2Y0YTA2MC00ZTM5LTExZWQtOTJjOC1mMzMwOTIwMDljNmMiLCJzdWIiOiJTSE9VVE9VVF9BUElfVVNFUiIsImlhdCI6MTY2NjAyNDYzOSwiZXhwIjoxOTgxNjQzODM5LCJzY29wZXMiOnsiYWN0aXZpdGllcyI6WyJyZWFkIiwid3JpdGUiXSwibWVzc2FnZXMiOlsicmVhZCIsIndyaXRlIl0sImNvbnRhY3RzIjpbInJlYWQiLCJ3cml0ZSJdfSwic29fdXNlcl9pZCI6IjczNjg5Iiwic29fdXNlcl9yb2xlIjoidXNlciIsInNvX3Byb2ZpbGUiOiJhbGwiLCJzb191c2VyX25hbWUiOiIiLCJzb19hcGlrZXkiOiJub25lIn0.eXDtdqhigLH6B4U6ebGQS99wp1mt4bWTNEGudxQ0ugM';

var debug = true, verifySSL = false;



const  sendSms = (fullName,Tp_id,mobileno)=>{

    var client = new ShoutoutClient(apiKey, debug, verifySSL);
    var message = {
    "content": {"sms": "Hello! "+fullName+" Your Registration is successfull..!" + "Your Taprobane ID is: "+Tp_id+"."},
    "destinations": [mobileno],
    "source": "ShoutDEMO",
    "transports": ["SMS"]
    };

    client.sendMessage(message, (error, result) => {
    if (error) {
    console.error('Error sending message!',error);
    } else {
    console.log('Sending message successful!',result);
    }
    });
}


module.exports = {
    sendSms
  };
  