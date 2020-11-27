const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

let MenuItem = require('./models/menuItem.model');
const { PassThrough } = require('stream');

let reply = ''
let surveyStarted = false

const start = async function(){
    try {
        let menuitem = await MenuItem.findOne({command: arguments[0]}).exec();
        if (typeof menuitem != null) {
            reply = menuitem.messageText
        }
        else {
            reply = ''
        }
    } catch (error) {
        PassThrough
    }
}

const client = new Client();

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
});

client.on('authenticated', (session) => {
    console.log('AUTHENTICATED', session);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async msg => {
    if (surveyStarted == false) {
        if (msg.body.toLowerCase() == '#') {
            start(0)
            setTimeout(() => {
                client.sendMessage(msg.from, reply);
            }, 3000);
            setTimeout(() => {  reply = ''; }, 3000);
            setTimeout(() => {  surveyStarted = true; }, 2000);
        }
        else {
            client.sendMessage(msg.from, 'Please start the chat first by sending "#"');
        }
    }
    else {
        setTimeout(() => {
            if (surveyStarted == true) {
                if (msg.body.toLowerCase() == '#') {
                    setTimeout(() => { PassThrough }, 2000);
                    start(0)
                    setTimeout(() => {
                        client.sendMessage(msg.from, reply);
                    }, 3000);
                    setTimeout(() => {  reply = ''; }, 3000);
                }
                else if (isNaN(msg.body)) {
                    client.sendMessage(msg.from, 'Your input was incorrect !');
                }
                else {
                    if (msg.body == '0') {
                            client.sendMessage(msg.from, 'Choose a correct option');
                    }
                    else {
                        setTimeout(() => { PassThrough }, 2000);
                        start(msg.body)
                        setTimeout(() => {
                            if (reply !== '') {
                                    setTimeout(() => {
                                    client.sendMessage(msg.from, reply);
                                }, 3000);
                                setTimeout(() => {  reply = ''; }, 3000);
                            }
                            else {
                                client.sendMessage(msg.from, 'Choose a correct option');
                            }
                        }, 3000);
                    }
                }
            }
        }, 3000);
    }
});

client.initialize();