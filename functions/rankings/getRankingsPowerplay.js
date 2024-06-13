const fetch = require('node-fetch');
const context = require('../auth/context');
/**
 * Retrieves player rankings information.
 * @param {string} countryCode - Two letter country code, or 'global' for global rankings.
 * 
 * @param {string|number} seasonId - The id of a season.
 * 
 * @returns {Promise<JSON>} JSON
 */

async function getRankingsPowerplay(countryCode, seasonId) {
    if (typeof countryCode !== 'string') return { 'reason': 'notFound', 'message': 'countryCode must be a string' };
    if (typeof seasonId !== 'string' && typeof seasonId !== 'number') return { 'reason': 'notFound', 'message': 'seasonId must be a string or a number' };
    const response = await fetch(`https://api.brawlstars.com/v1/rankings/${encodeURIComponent(countryCode)}/players`, { headers: { 'Authorization': `Bearer ${context.getAuthToken()}` } });
    return await response.json();
}

module.exports = { getRankingsPowerplay };  