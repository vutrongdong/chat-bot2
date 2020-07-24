const express = require ('express');
const app = express.Router();
const { Client } = require('@line/bot-sdk')

app.get("/", (req, res) => {
  res.json({
    hello: "hi! Vũ Trọng Đông"
  });
});


const client = new Client({
    channelAccessToken: 'RLw6mpW3ES2VHnNcYpgpP5dEySzl8SAtgxiiBJARuC0k+/MiRwC6n7BpSyXpFVWjyqeSrpg+krGw8D2c8vHh7JOKFQmBBd0PmOvcWOQ5PVqXin93UinolKx+6cgXy0U/jozgWoAv3i9izyXkVKkjNwdB04t89/1O/w1cDnyilFU=',
    channelSecret: 'fbc429606f93b307669f3e7137498d59'
});

app.post('/webhook', (req, res) => {
    const event = req.body;
  
    switch (event.type) {
      case 'join':
      case 'follow':
        return client.replyMessage(event.replyToken, {
          type: 'text',
          text: 'Hello, Wellcome you!'
        });   
      case 'message':
        switch (event.message.type) {
            case 'text':
              switch (event.message.text) {
                case 'hello':
                  return client.replyMessage(event.replyToken, {
                    type: 'text',
                    text: 'Can we help you?'
                  });
                case 'I want book ticket':
                  return client.replyMessage(event.replyToken, {
                    type: 'text',
                    text: 'Where do you want to book tickets?'
                  });
              }
        }
    }

    res.send('okok')
})

module.exports = app;