//Imports:
require('dotenv').config(); //Importing dotenv to get enviroment variables from .env file
const Discord = require("discord.js"); //Importing discord bot api
const client = new Discord.Client();   //Creating discord bot client

//Constants:
const token = process.env.CLIENT_TOKEN; //Bot token (can't be put in code, otherwise discord will bonk us once it is uploaded on github)
const personId = process.env.PERSON_ID;  //Stramer's user id
const voiceId = process.env.VOICE_ID;   //Voice channel
const notificationsId = process.env.NOTIFICATIONS_ID;   //Text channel for notifications
const roleId = process.env.ROLE_ID;     //Role to receive notifications
const notificationMessage = process.env.NOTIFICATION_MESSAGE; //Message to send with notification (maybe will change to a random message from a variety in the future)

//Voice channel change listener
client.on("voiceStateUpdate", function(oldMember, newMember) {
    //Check if it is streamer && if they are streaming && if they are connected to the right channel
    if(newMember.id === personId && newMember.streaming && newMember.channelID === voiceId) {
        const channel = client.channels.cache.get(notificationsId); //Text channel for notifications
        channel.send(`<@&${roleId}> ${notificationMessage}`); //Send notification
    }

});

client.login(token); //Abomination - rise!