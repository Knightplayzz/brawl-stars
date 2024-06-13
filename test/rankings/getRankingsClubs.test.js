const fetch = require('node-fetch');
const { Response } = jest.requireActual('node-fetch');
const context = require('../../functions/auth/context');
const { getRankingsClubs } = require('../../functions/rankings/getRankingsClubs');

jest.mock('node-fetch');
jest.mock('../../functions/auth/context');

describe('getRankingsClubs function', () => {
    beforeEach(() => {
        fetch.mockClear();
        context.getAuthToken.mockClear();
    });

    test('should return error message if countryCode is not a string', async () => {
        const invalidCountryCode = 12345;
        const expectedResponse = { 'reason': 'notFound', 'message': 'countryCode must be a string' };

        const result = await getRankingsClubs(invalidCountryCode);

        expect(result).toEqual(expectedResponse);
    });

    test('should fetch club rankings successfully', async () => {
        const countryCode = 'US';
        const mockResponse = [{ clubId: '1', name: 'Club 1' }, { clubId: '2', name: 'Club 2' }];
        fetch.mockResolvedValue(new Response(JSON.stringify(mockResponse), { status: 200 }));
        context.getAuthToken.mockReturnValue('SampleToken');

        const data = await getRankingsClubs(countryCode);

        expect(fetch).toHaveBeenCalledWith(`https://api.brawlstars.com/v1/rankings/${encodeURIComponent(countryCode)}/clubs`, {
            headers: { 'Authorization': 'Bearer SampleToken' },
        });
        expect(data).toEqual(mockResponse);
    });

    test('should handle fetch error and return error response', async () => {
        const countryCode = 'US';
        const errorResponse = { reason: 'error', message: 'Server error' };
        fetch.mockResolvedValue(new Response(JSON.stringify(errorResponse), { status: 500 }));
        context.getAuthToken.mockReturnValue('SampleToken');

        const result = await getRankingsClubs(countryCode);

        expect(result).toEqual(errorResponse);
    });
});
