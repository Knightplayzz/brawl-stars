const fetch = require('node-fetch');
const context = require('../auth/context');
/**
 * Retrieves user battlelog information by playerTag.
 * @param {string} playerTag - The tag of the user.
 *
 * @returns {Promise<JSON>} JSON
 */

async function getBattlelog(playerTag) {
    if (typeof playerTag !== 'string') return { 'reason': 'notFound', 'message': 'playerTag must be a string' };
    if (!playerTag.startsWith('#')) return { 'reason': 'NotFound', 'message': 'playerTag must start with #' };
    const response = await fetch(`https://api.brawlstars.com/v1/players/${encodeURIComponent(playerTag)}/battlelog`, { headers: { 'Authorization': `Bearer ${context.getAuthToken()}` } });
    return await response.json();
}

module.exports = { getBattlelog }; 