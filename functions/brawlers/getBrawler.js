const fetch = require('node-fetch');
const context = require('../auth/context');
/**
 * Retrieves brawler information by brawlerId.
 * @param {string|number} brawlerId - The id of the brawler.
 * 
 * @returns {Promise<JSON>} JSON
 */

async function getBrawler(brawlerId) {
    if (typeof brawlerId !== 'string' && typeof brawlerId !== 'number') return { 'reason': 'notFound', 'message': 'brawlerId must be a string or number' };
    const response = await fetch(`https://api.brawlstars.com/v1/brawlers/${encodeURIComponent(brawlerId)}`, { headers: { 'Authorization': `Bearer ${context.getAuthToken()}` } });
    return await response.json();
}

module.exports = { getBrawler };  