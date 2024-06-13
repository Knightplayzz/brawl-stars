const fetch = require('node-fetch');
const { Response } = jest.requireActual('node-fetch');
const context = require('../../functions/auth/context');
const { getRankingsPowerplaySeasons } = require('../../functions/rankings/getRankingsPowerplaySeasons');

jest.mock('node-fetch');
jest.mock('../../functions/auth/context');

describe('getRankingsPowerplaySeasons function', () => {
    beforeEach(() => {
        fetch.mockClear();
        context.getAuthToken.mockClear();
    });

    test('should return error message if countryCode is not a string', async () => {
        const invalidCountryCode = 12345;
        const expectedResponse = { 'reason': 'notFound', 'message': 'countryCode must be a string' };

        const result = await getRankingsPowerplaySeasons(invalidCountryCode);

        expect(result).toEqual(expectedResponse);
    });

    test('should fetch powerplay seasons successfully', async () => {
        const mockResponse = [{ seasonId: '1', name: 'Season 1' }, { seasonId: '2', name: 'Season 2' }];
        fetch.mockResolvedValue(new Response(JSON.stringify(mockResponse), { status: 200 }));
        context.getAuthToken.mockReturnValue('SampleToken');

        const countryCode = 'US';
        const data = await getRankingsPowerplaySeasons(countryCode);

        expect(fetch).toHaveBeenCalledWith(`https://api.brawlstars.com/v1/rankings/${encodeURIComponent(countryCode)}/powerplay/seasons`, {
            headers: { 'Authorization': 'Bearer SampleToken' },
        });
        expect(data).toEqual(mockResponse);
    });

    test('should handle fetch error and return error response', async () => {
        const errorResponse = { reason: 'error', message: 'Server error' };
        fetch.mockResolvedValue(new Response(JSON.stringify(errorResponse), { status: 500 }));
        context.getAuthToken.mockReturnValue('SampleToken');

        const countryCode = 'US';
        const result = await getRankingsPowerplaySeasons(countryCode);

        expect(result).toEqual(errorResponse);
    });
});
