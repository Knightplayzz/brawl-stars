const fetch = require('node-fetch');
const context = require('../auth/context');
/**
 * Retrieves player rankings information.
 * @param {string} countryCode - Two letter country code, or 'global' for global rankings.
 * @returns {Promise<JSON>} JSON
 */

async function getRankingsPlayers(countryCode) {
    if (typeof countryCode !== 'string') return { 'reason': 'notFound', 'message': 'countryCode must be a string' };
    const response = await fetch(`https://api.brawlstars.com/v1/rankings/${encodeURIComponent(countryCode)}/players`, { headers: { 'Authorization': `Bearer ${context.getAuthToken()}` } });
    return await response.json();
}

module.exports = { getRankingsPlayers };  