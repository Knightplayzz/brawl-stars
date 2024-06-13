const fetch = require('node-fetch');
const context = require('../auth/context');
/**
 * Retrieves all brawlers information.
 * @param {string} clubTag - The tag of the club.
 * @returns {Promise<JSON>} JSON
 */

async function brawlers() {
    const response = await fetch('https://api.brawlstars.com/v1/brawlers', { headers: { 'Authorization': `Bearer ${context.getAuthToken()}` } });
    return await response.json();
}

module.exports = { brawlers };  