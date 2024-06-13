//auth
const { login } = require('./functions/auth/login');

//brawlers
const { brawlers } = require('./functions/brawlers/brawlers');
const { getBrawler } = require('./functions/brawlers/getBrawler');

//club
const { getClub } = require('./functions/clubs/getClub');
const { getClubMembers } = require('./functions/clubs/getClubMembers');

//events
const { getEvents } = require('./functions/events/getEvents');

//player
const { getPlayer } = require('./functions/players/getPlayer');
const { getBattlelog } = require('./functions/players/getBattlelog');

//ranking
const { getRankingsBrawlers } = require('./functions/rankings/getRankingsBrawler');
const { getRankingsClubs } = require('./functions/rankings/getRankingsClubs');
const { getRankingsPlayers } = require('./functions/rankings/getRankingsPlayers');
const { getRankingsPowerplay } = require('./functions/rankings/getRankingsPowerplay');
const { getRankingsPowerplaySeasons } = require('./functions/rankings/getRankingsPowerplaySeasons');

//players
module.exports = { login, getPlayer, getBattlelog, getClub, getClubMembers, brawlers, getBrawler, getEvents, getRankingsBrawlers, getRankingsClubs, getRankingsPlayers, getRankingsPowerplay, getRankingsPowerplaySeasons };