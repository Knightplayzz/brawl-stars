const fetch = require('node-fetch');
const { Response } = jest.requireActual('node-fetch');
const context = require('../../functions/auth/context');
const { getPlayer } = require('../../functions/players/getPlayer');

jest.mock('node-fetch');
jest.mock('../../functions/auth/context');

describe('getPlayer function', () => {
    beforeEach(() => {
        fetch.mockClear();
        context.getAuthToken.mockClear();
    });

    test('should return error message if playerTag is not a string', async () => {
        const invalidPlayerTag = 12345;
        const expectedResponse = { 'reason': 'notFound', 'message': 'playerTag must be a string' };

        const result = await getPlayer(invalidPlayerTag);

        expect(result).toEqual(expectedResponse);
    });

    test('should return error message if playerTag does not start with #', async () => {
        const invalidPlayerTag = 'ABC123';
        const expectedResponse = { 'reason': 'NotFound', 'message': 'playerTag must start with #' };

        const result = await getPlayer(invalidPlayerTag);

        expect(result).toEqual(expectedResponse);
    });

    test('should fetch player information successfully', async () => {
        const mockResponse = { playerId: '123', name: 'PlayerName' };
        fetch.mockResolvedValue(new Response(JSON.stringify(mockResponse), { status: 200 }));
        context.getAuthToken.mockReturnValue('SampleToken');

        const playerTag = '#ABC123';
        const data = await getPlayer(playerTag);

        expect(fetch).toHaveBeenCalledWith(`https://api.brawlstars.com/v1/players/${encodeURIComponent(playerTag)}`, {
            headers: { 'Authorization': 'Bearer SampleToken' },
        });
        expect(data).toEqual(mockResponse);
    });

    test('should handle fetch error and return error response', async () => {
        const errorResponse = { reason: 'error', message: 'Server error' };
        fetch.mockResolvedValue(new Response(JSON.stringify(errorResponse), { status: 500 }));
        context.getAuthToken.mockReturnValue('SampleToken');

        const playerTag = '#ABC123';
        const result = await getPlayer(playerTag);

        expect(result).toEqual(errorResponse);
    });
});
