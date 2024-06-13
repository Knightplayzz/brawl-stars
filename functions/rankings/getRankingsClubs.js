const fetch = require('node-fetch');
const context = require('../auth/context');
/**
 * Retrieves clubs rankings information.
 * @param {string} countryCode - Two letter country code, or 'global' for global rankings.
 * @returns {Promise<JSON>} JSON
 */

async function getRankingsClubs(countryCode) {
    if (typeof countryCode !== 'string') return { 'reason': 'notFound', 'message': 'countryCode must be a string' };
    const response = await fetch(`https://api.brawlstars.com/v1/rankings/${encodeURIComponent(countryCode)}/clubs`, { headers: { 'Authorization': `Bearer ${context.getAuthToken()}` } });
    return await response.json();
}

module.exports = { getRankingsClubs };  