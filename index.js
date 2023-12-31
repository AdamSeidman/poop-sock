/**
 * Poopery Sockery
 * ========================
 * I use these functions in a lot of projects.
 * Decided to just put them all in one place.
 * I guess if other people want to use them, they can.
 */

const Discord = require('discord.js')
const emojiDict = require('emoji-dictionary')

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    'sec-fetch-mode': 'no-cors'
};
const MAX_RAND = 98;

var discordContext = undefined

module.exports = {

    /**
     * Restart application, but HTTP-aware.
     * @param {any} cmd - [unused] Placeholder for similar functions
     * @param {object} response - HTTP Response. Can close the request if called from there.
     * @param {*} callback - Callback function. Is called before exiting the process.
     */
    restartApp: function (cmd, response, callback) {
        if (callback !== undefined && typeof callback === 'function') {
            callback();
        }
        if (response !== undefined) {
            response.writeHead(200, headers);
            response.end();
        }
        process.exit();
    },

    /**
     * Regex for discord '@'.
     * @param {string} item - Check any string to see if it matches <@id>
     * @returns match or null
     */
    matchesDiscordId: function (item) {
        if ((item || '').match(/^<@\d{18}>$/)) {
            return item.match(/\d{18}/)[0];
        }
        return null;
    },

    /**
     * Simple sanitization for path strings
     * @param {string} str - String to sanitize
     * @returns sanitized string
     */
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

    /**
     * Simple random number generator.
     * @param {number} max - Maximum value. If left blank, MAX_RAND is used
     * @returns Random integer
     */
    randomNumber: function (max) {
        if (max === undefined) {
            max = MAX_RAND;
        }
        return Math.ceil(Math.random() * max) + 1;
    },

    /**
     * Get a random array item
     * @param {array} arr - Array to choose an item from 
     * @returns Random item from arr
     */
    randomArrayItem: function (arr) {
        if (arr === undefined || arr.length <= 1) {
            return undefined;
        }
        return arr[Math.floor(Math.random() * arr.length)];
    },

    /**
     * Provide simple way for probabilities
     * @param {number} probability - Percentage (0.0 to 1.0)
     * @returns boolean (if the check passed)
     */
    probabilityCheck: function (probability) {
        return Math.random() <= probability;
    },

    /**
     * Remove punctuation from string
     * @param {string} str - String to modify
     * @returns Modified string
     */
    stripPunctuation: function (str) {
        return str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,'').replace(/\s{2,}/g,' ');
    },

    /**
     * Uses JSON functions to provide a clean object
     * @param {object} obj - object to copy
     * @returns Copy of the provided object, with no references to original
     */
    copyObject: function (obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    discordIntents: ['Guilds', 'GuildVoiceStates', 'GuildMessages', 'DirectMessages',
    'MessageContent', 'GuildScheduledEvents'],

    discordPartials: [1],

    /**
     * Provide Discord.js client object for api to use
     * @param {object} context - Discord client
     */
    registerDiscordContext: function (context) {
        discordContext = context;
    },

    /**
     * Get a text channel from Discord
     * @param {string} id - Discord id of a text channel
     * @returns Channel object from id, if available
     */
    getChannelById: function (id) {
        if ( discordContext === undefined ) return discordContext;
        return discordContext.channels.cache
            .filter(x => x instanceof Discord.TextChannel)
            .find(x => x.id === id);
    },

    /**
     * Get a text channel of a discord user
     * @param {string} id - Discord id of a user
     * @returns Channel object of user, if available
     */
    getUserById: async function (id) {
        if ( discordContext === undefined ) return discordContext;
        let user = await discordContext.users.fetch(id);
        return user;
    },

    webHeaders: headers,

    /**
     * Get random emoji from dictionary
     * @returns Unicode character
     */
    randomEmoji: function () {
        return emojiDict.unicode[Math.floor(Math.random() * emojiDict.unicode.length)];
    },

    /**
     * Get the name of a unicode emoji
     * @param {string} emoji - Unicode emoji
     * @returns Name of the emoji that was provided
     */
    getEmojiName: function (emoji) {
        if (emoji === undefined) return emoji;
        return emojiDict.getName(emoji) || '';
    },

    /**
     * Shuffle an array using the Durstenfeld shuffle algorithm
     * @param {array} array - An array to be shuffled
     */
    shuffleArray: function (array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    },

    /**
     * Check if the last character in the string is punctuation.
     * @param {string} phrase - Phrase to check if terminated.
     * @returns Boolean, whether or not string is terminated.
     */
    isStringTerminated: function (phrase) {
        if (phrase === undefined) return false;
        if (typeof phrase !== 'string') return false;
        if (phrase.trim().length === 0) return false;
        return ['.', '!', '?', ')', ']'].includes(phrase.trim().slice(-1));
    }

};
