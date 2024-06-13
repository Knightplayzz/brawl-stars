const fetch = require('node-fetch');
const { Response } = jest.requireActual('node-fetch');
const context = require('../../functions/auth/context');
const { getBattlelog } = require('../../functions/players/getBattlelog');

jest.mock('node-fetch');
jest.mock('../../functions/auth/context');

describe('getBattlelog function', () => {
    beforeEach(() => {
        fetch.mockClear();
        context.getAuthToken.mockClear();
    });

    test('should return error message if playerTag is not a string', async () => {
        const invalidPlayerTag = 12345;
        const expectedResponse = { 'reason': 'notFound', 'message': 'playerTag must be a string' };

        const result = await getBattlelog(invalidPlayerTag);

        expect(result).toEqual(expectedResponse);
    });

    test('should return error message if playerTag does not start with #', async () => {
        const invalidPlayerTag = 'ABC123';
        const expectedResponse = { 'reason': 'NotFound', 'message': 'playerTag must start with #' };

        const result = await getBattlelog(invalidPlayerTag);

        expect(result).toEqual(expectedResponse);
    });

    test('should fetch battle log successfully', async () => {
        const mockResponse = [{ battleId: '1', result: 'victory' }, { battleId: '2', result: 'defeat' }];
        fetch.mockResolvedValue(new Response(JSON.stringify(mockResponse), { status: 200 }));
        context.getAuthToken.mockReturnValue('SampleToken');

        const playerTag = '#ABC123';
        const data = await getBattlelog(playerTag);

        expect(fetch).toHaveBeenCalledWith(`https://api.brawlstars.com/v1/players/${encodeURIComponent(playerTag)}/battlelog`, {
            headers: { 'Authorization': 'Bearer SampleToken' },
        });
        expect(data).toEqual(mockResponse);
    });

    test('should handle fetch error and return error response', async () => {
        const errorResponse = { reason: 'error', message: 'Server error' };
        fetch.mockResolvedValue(new Response(JSON.stringify(errorResponse), { status: 500 }));
        context.getAuthToken.mockReturnValue('SampleToken');

        const playerTag = '#ABC123';
        const result = await getBattlelog(playerTag);

        expect(result).toEqual(errorResponse);
    });
});
