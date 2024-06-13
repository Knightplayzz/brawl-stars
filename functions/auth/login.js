const fetch = require('node-fetch');
const context = require('./context');

/**
 * Logs the player in using the auth token.
 * @param {string} auth The authentication token used to make API requests.
*/
async function login(auth) {
    if (typeof auth !== 'string') { throw new Error('Authentication token must be a string.'); }
    const response = await fetch('https://api.brawlstars.com/v1/brawlers', { headers: { 'Authorization': `Bearer ${context.getAuthToken()}` } });
    if (!response.ok) throw new Error('Authentication token is wrong.');
    context.setAuthToken(auth);
    console.log('You succesfully logged in.');
}

module.exports = { login };