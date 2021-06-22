// Make the variables inside the .env element available to our Node project
require('dotenv').config();

const tmi = require('tmi.js');
const client = new tmi.Client({
    options: { debug: true, messagesLogLevel: "info" },
    connection: {
        reconnect: true,
        secure: true
    },
    identity: {
        username: `${process.env.TWITCH_USERNAME}`,
        password: `oauth:${process.env.TWITCH_OAUTH}`
    },
    channels: [`${process.env.TWITCH_CHANNEL}`]
});
client.connect().catch(console.error);
client.on('message', (channel, tags, message, self) => {
    if (self) return;
    switch (message.toLowerCase()) {
        case 'commands':
            client.say(channel, `@${tags.username}, available commands are:
            Commands Help Greetings Hi !Website !Name
           
            For more help just type "Help"
            `);
            break;
        case '!website':
            client.say(channel, `@${tags.username}, my website is www.section.io!`);
            break;
        case 'greetings':
            client.say(channel, `Hello @${tags.username}, what's up?!`);
            break;
        case 'hi':
            client.say(channel, `${tags.username}, hola!`);
            break;
        case '!name':
            client.say(channel, `Hello @${tags.username}, my name is ChatBot! Press "1" to continue...`);
            if (message.toLowerCase() === '1') {
                client.say(channel, `I was built today!`);
            }
            break;
        case 'help':
            client.say(channel, `${tags.username}, Use the following commands to get quick help:
            -> Commands: Get Commands || 
            Help: Get Help || 
            Greetings: Get Greetings || 
            Hi: Get "Hola" || 
            !Website: Get my website || 
            !Name: Get my name  
    
            For more help just ping me up!
            `);
            break;
    }
});