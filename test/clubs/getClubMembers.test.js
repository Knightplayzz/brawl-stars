const fetch = require('node-fetch');
const { Response } = jest.requireActual('node-fetch');
const context = require('../../functions/auth/context');
const { getClubMembers } = require('../../functions/clubs/getClubMembers');

jest.mock('node-fetch');
jest.mock('../../functions/auth/context');

describe('getClubMembers function', () => {
    beforeEach(() => {
        fetch.mockClear();
        context.getAuthToken.mockClear();
    });

    test('should return error message if clubTag is not a string', async () => {
        const invalidClubTag = 12345;
        const expectedResponse = { 'reason': 'notFound', 'message': 'playerTag must be a string' };

        const result = await getClubMembers(invalidClubTag);

        expect(result).toEqual(expectedResponse);
    });

    test('should return error message if clubTag does not start with #', async () => {
        const invalidClubTag = 'ABC123';
        const expectedResponse = { 'reason': 'NotFound', 'message': 'playerTag must start with #' };

        const result = await getClubMembers(invalidClubTag);

        expect(result).toEqual(expectedResponse);
    });

    test('should fetch club members successfully', async () => {
        const mockResponse = [{ id: '1', name: 'Player 1' }, { id: '2', name: 'Player 2' }];
        fetch.mockResolvedValue(new Response(JSON.stringify(mockResponse), { status: 200 }));
        context.getAuthToken.mockReturnValue('valid-token');

        const clubTag = '#ABC123';
        const data = await getClubMembers(clubTag);

        expect(fetch).toHaveBeenCalledWith(`https://api.brawlstars.com/v1/clubs/${encodeURIComponent(clubTag)}/members`, {
            headers: { 'Authorization': 'Bearer valid-token' },
        });
        expect(data).toEqual(mockResponse);
    });

    test('should handle fetch error and return error response', async () => {
        const errorResponse = { reason: 'error', message: 'Server error' };
        fetch.mockResolvedValue(new Response(JSON.stringify(errorResponse), { status: 500 }));
        context.getAuthToken.mockReturnValue('valid-token');

        const clubTag = '#ABC123';
        const result = await getClubMembers(clubTag);

        expect(result).toEqual(errorResponse);
    });
});
