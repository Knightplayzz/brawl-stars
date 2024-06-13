const fetch = require('node-fetch');
const { Response } = jest.requireActual('node-fetch');
const context = require('../../functions/auth/context');
const { getRankingsBrawlers } = require('../../functions/rankings/getRankingsBrawler');

jest.mock('node-fetch');
jest.mock('../../functions/auth/context');

describe('getRankingsBrawlers function', () => {
    beforeEach(() => {
        fetch.mockClear();
        context.getAuthToken.mockClear();
    });

    test('should return error message if countryCode is not a string', async () => {
        const invalidCountryCode = 12345;
        const brawlerId = '123';

        const expectedResponse = { 'reason': 'notFound', 'message': 'countryCode must be a string' };

        const result = await getRankingsBrawlers(invalidCountryCode, brawlerId);

        expect(result).toEqual(expectedResponse);
    });

    test('should return error message if brawlerId is not a string or number', async () => {
        const countryCode = 'US';
        const invalidBrawlerId = {};

        const expectedResponse = { 'reason': 'notFound', 'message': 'brawlerId must be a string or a number' };

        const result = await getRankingsBrawlers(countryCode, invalidBrawlerId);

        expect(result).toEqual(expectedResponse);
    });

    test('should fetch brawler rankings successfully', async () => {
        const countryCode = 'US';
        const brawlerId = '123';
        const mockResponse = [{ playerId: '1', name: 'Player 1' }, { playerId: '2', name: 'Player 2' }];
        fetch.mockResolvedValue(new Response(JSON.stringify(mockResponse), { status: 200 }));
        context.getAuthToken.mockReturnValue('valid-token');

        const data = await getRankingsBrawlers(countryCode, brawlerId);

        expect(fetch).toHaveBeenCalledWith(`https://api.brawlstars.com/v1/rankings/${encodeURIComponent(countryCode)}/brawlers/${encodeURIComponent(brawlerId)}`, {
            headers: { 'Authorization': 'Bearer valid-token' },
        });
        expect(data).toEqual(mockResponse);
    });

    test('should handle fetch error and return error response', async () => {
        const countryCode = 'US';
        const brawlerId = '123';
        const errorResponse = { reason: 'error', message: 'Server error' };
        fetch.mockResolvedValue(new Response(JSON.stringify(errorResponse), { status: 500 }));
        context.getAuthToken.mockReturnValue('valid-token');

        const result = await getRankingsBrawlers(countryCode, brawlerId);

        expect(result).toEqual(errorResponse);
    });
});
