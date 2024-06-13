const fetch = require('node-fetch');
const context = require('../auth/context');
/**
 * Retrieves clubs rankings information.
 * @param {string} countryCode - Two letter country code, or 'global' for global rankings.
 * 
 * @param {string|number} brawlerId - The id of the brawler.
 * @returns {Promise<JSON>} JSON
 */

async function getRankingsBrawlers(countryCode, brawlerId) {
    if (typeof countryCode !== 'string') return { 'reason': 'notFound', 'message': 'countryCode must be a string' };
    if (typeof brawlerId !== 'string' && typeof brawlerId !== 'number') return { 'reason': 'notFound', 'message': 'brawlerId must be a string or a number' };
    const response = await fetch(`https://api.brawlstars.com/v1/rankings/${encodeURIComponent(countryCode)}/brawlers/${encodeURIComponent(brawlerId)}`, { headers: { 'Authorization': `Bearer ${context.getAuthToken()}` } });
    return await response.json();
}

module.exports = { getRankingsBrawlers };  