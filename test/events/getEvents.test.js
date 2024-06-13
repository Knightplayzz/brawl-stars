const fetch = require('node-fetch');
const { Response } = jest.requireActual('node-fetch');
const context = require('../../functions/auth/context');
const { getEvents } = require('../../functions/events/getEvents');

jest.mock('node-fetch');
jest.mock('../../functions/auth/context');

describe('getEvents function', () => {
    beforeEach(() => {
        fetch.mockClear();
        context.getAuthToken.mockClear();
    });

    test('should fetch events successfully', async () => {
        const mockResponse = [{ id: '1', name: 'Event 1' }, { id: '2', name: 'Event 2' }];
        fetch.mockResolvedValue(new Response(JSON.stringify(mockResponse), { status: 200 }));
        context.getAuthToken.mockReturnValue('SampleToken');

        const data = await getEvents();

        expect(fetch).toHaveBeenCalledWith('https://api.brawlstars.com/v1/events/rotation', {
            headers: { 'Authorization': 'Bearer SampleToken' },
        });
        expect(data).toEqual(mockResponse);
    });

    test('should handle fetch error and return error response', async () => {
        const errorResponse = { reason: 'error', message: 'Server error' };
        fetch.mockResolvedValue(new Response(JSON.stringify(errorResponse), { status: 500 }));
        context.getAuthToken.mockReturnValue('SampleToken');

        const result = await getEvents();

        expect(result).toEqual(errorResponse);
    });
});
