const fetch = require('node-fetch');
const { Response } = jest.requireActual('node-fetch');
const context = require('../../functions/auth/context');
const { getBrawler } = require('../../functions/brawlers/getBrawler');

jest.mock('node-fetch');
jest.mock('../../functions/auth/context');

describe('getBrawler function', () => {
    beforeEach(() => {
        fetch.mockClear();
        context.getAuthToken.mockClear();
    });

    test('should return error message if brawlerId is not a string or number', async () => {
        const invalidBrawlerId = {};
        const expectedResponse = { 'reason': 'notFound', 'message': 'brawlerId must be a string or number' };

        const result = await getBrawler(invalidBrawlerId);

        expect(result).toEqual(expectedResponse);
    });

    test('should fetch brawler information successfully', async () => {
        const brawlerId = '123';
        const mockResponse = { id: '123', name: 'Shelly' };
        fetch.mockResolvedValue(new Response(JSON.stringify(mockResponse), { status: 200 }));
        context.getAuthToken.mockReturnValue('SampleToken');

        const data = await getBrawler(brawlerId);

        expect(fetch).toHaveBeenCalledWith(`https://api.brawlstars.com/v1/brawlers/${encodeURIComponent(brawlerId)}`, {
            headers: { 'Authorization': 'Bearer SampleToken' },
        });
        expect(data).toEqual(mockResponse);
    });

    test('should handle fetch error', async () => {
        const brawlerId = '123';
        fetch.mockRejectedValue(new Error('Failed to fetch'));
        context.getAuthToken.mockReturnValue('SampleToken');

        await expect(getBrawler(brawlerId)).rejects.toThrow();
    });
});
