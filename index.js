/**
 * Poopery Sockery
 * ========================
 * I use these functions in a lot of projects.
 * Decided to just put them all in one place.
 * I guess if other people want to use them, they can.
 */

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    'sec-fetch-mode': 'no-cors'
};
const MAX_RAND = 98;

module.exports = {

    restartApp: function (cmd, response, callback) {
        if (callback !== undefined) {
            callback();
        }
        if (response !== undefined) {
            response.writeHead(200, headers);
            response.end();
        }
        process.exit();
    },

    matchesDiscordId: function (item) {
        if ((item || '').match(/^<@\d{18}>$/)) {
            return item.match(/\d{18}/)[0];
        }
        return null;
    },

    fixPathCharacters: function (str) {
        let returnStr = '';
        while (str.length > 0) {
            if (str[0] === '%') {
                returnStr += String.fromCharCode(parseInt(str.slice(1, 3), 16));
                str = str.slice(3);
            } else {
                returnStr += str[0];
                str = str.slice(1);
            }
        }
        return returnStr;
    },

    randomNumber: function (max) {
        if (max === undefined) {
            max = MAX_RAND;
        }
        return Math.ceil(Math.random() * max) + 1;
    },

    randomArrayItem: function (arr) {
        if (arr === undefined || arr.length <= 1) {
            return undefined;
        }
        return arr[Math.floor(Math.random() * arr.length)];
    },

    probabilityCheck: function (probability) {
        return Math.random() <= probability;
    },

    stripPunctuation: function (str) {
        return str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,'').replace(/\s{2,}/g,' ');
    },

    copyObject: function (obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    discordIntents: ['Guilds', 'GuildVoiceStates', 'GuildMessages', 'DirectMessages',
    'MessageContent', 'GuildScheduledEvents'],

    discordPartials: [1]
};
