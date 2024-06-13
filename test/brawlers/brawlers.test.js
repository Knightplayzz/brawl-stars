const fetch = require('node-fetch');
const { Response } = jest.requireActual('node-fetch');
const context = require('../../functions/auth/context');
const { brawlers } = require('../../functions/brawlers/brawlers');

jest.mock('node-fetch');
jest.mock('../../functions/auth/context');

describe('brawlers function', () => {
    beforeEach(() => {
        fetch.mockClear();
        context.getAuthToken.mockClear();
    });

    test('should fetch brawlers information successfully', async () => {
        const mockResponse = { items: [{ name: 'Shelly' }, { name: 'Colt' }] };
        fetch.mockResolvedValue(new Response(JSON.stringify(mockResponse), { status: 200 }));
        context.getAuthToken.mockReturnValue('valid-token');

        const data = await brawlers();

        expect(fetch).toHaveBeenCalledWith('https://api.brawlstars.com/v1/brawlers', {
            headers: { 'Authorization': 'Bearer valid-token' },
        });
        expect(data).toEqual(mockResponse);
    });

    test('should handle fetch error', async () => {
        fetch.mockResolvedValue(new Response(null, { status: 500 }));
        context.getAuthToken.mockReturnValue('valid-token');

        await expect(brawlers()).rejects.toThrow();
    });
});
