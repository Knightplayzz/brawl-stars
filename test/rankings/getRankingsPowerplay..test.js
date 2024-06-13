const fetch = require('node-fetch');
const { Response } = jest.requireActual('node-fetch');
const context = require('../../functions/auth/context');
const { getRankingsPowerplay } = require('../../functions/rankings/getRankingsPowerplay');

jest.mock('node-fetch');
jest.mock('../../functions/auth/context');

describe('getRankingsPowerplay function', () => {
    beforeEach(() => {
        fetch.mockClear();
        context.getAuthToken.mockClear();
    });

    test('should return error message if countryCode is not a string', async () => {
        const invalidCountryCode = 12345;
        const seasonId = '2023';

        const expectedResponse = { 'reason': 'notFound', 'message': 'countryCode must be a string' };

        const result = await getRankingsPowerplay(invalidCountryCode, seasonId);

        expect(result).toEqual(expectedResponse);
    });

    test('should return error message if seasonId is not a string or number', async () => {
        const countryCode = 'US';
        const invalidSeasonId = {};

        const expectedResponse = { 'reason': 'notFound', 'message': 'seasonId must be a string or a number' };

        const result = await getRankingsPowerplay(countryCode, invalidSeasonId);

        expect(result).toEqual(expectedResponse);
    });

    test('should fetch powerplay rankings successfully', async () => {
        const countryCode = 'US';
        const seasonId = '2023';
        const mockResponse = [{ playerId: '1', name: 'Player 1' }, { playerId: '2', name: 'Player 2' }];
        fetch.mockResolvedValue(new Response(JSON.stringify(mockResponse), { status: 200 }));
        context.getAuthToken.mockReturnValue('SampleToken');

        const data = await getRankingsPowerplay(countryCode, seasonId);

        expect(fetch).toHaveBeenCalledWith(`https://api.brawlstars.com/v1/rankings/${encodeURIComponent(countryCode)}/players`, {
            headers: { 'Authorization': 'Bearer SampleToken' },
        });
        expect(data).toEqual(mockResponse);
    });

    test('should handle fetch error and return error response', async () => {
        const countryCode = 'US';
        const seasonId = '2023';
        const errorResponse = { reason: 'error', message: 'Server error' };
        fetch.mockResolvedValue(new Response(JSON.stringify(errorResponse), { status: 500 }));
        context.getAuthToken.mockReturnValue('SampleToken');

        const result = await getRankingsPowerplay(countryCode, seasonId);

        expect(result).toEqual(errorResponse);
    });
});
