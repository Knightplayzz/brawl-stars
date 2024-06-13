const fetch = require('node-fetch');
const context = require('../auth/context');
/**
 * Retrieves club information by clubTag.
 * @param {string} clubTag - The tag of the club.
 * @returns {Promise<JSON>} JSON
 */

async function getClub(clubTag) {
    if (typeof clubTag !== 'string') return { 'reason': 'notFound', 'message': 'playerTag must be a string' };
    if (!clubTag.startsWith('#')) return { 'reason': 'NotFound', 'message': 'playerTag must start with #' };
    const response = await fetch(`https://api.brawlstars.com/v1/clubs/${encodeURIComponent(clubTag)}`, { headers: { 'Authorization': `Bearer ${context.getAuthToken()}` } });
    return await response.json();
}

module.exports = { getClub };  