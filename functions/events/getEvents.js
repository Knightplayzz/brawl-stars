const fetch = require('node-fetch');
const context = require('../auth/context');
/**
 * Retrieves event information.
 *
 * @returns {Promise<JSON>} JSON
 */

async function getEvents() {
    const response = await fetch('https://api.brawlstars.com/v1/events/rotation', { headers: { 'Authorization': `Bearer ${context.getAuthToken()}` } });
    return await response.json();
}

module.exports = { getEvents }; 