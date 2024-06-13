const fetch = require('node-fetch');
const { Response } = jest.requireActual('node-fetch');
const context = require('../../functions/auth/context');
const { getClub } = require('../../functions/clubs/getClub');

jest.mock('node-fetch');
jest.mock('../../functions/auth/context');

describe('getClub function', () => {
    beforeEach(() => {
        fetch.mockClear();
        context.getAuthToken.mockClear();
    });

    test('should return error message if clubTag is not a string', async () => {
        const invalidClubTag = 12345;
        const expectedResponse = { 'reason': 'notFound', 'message': 'playerTag must be a string' };

        const result = await getClub(invalidClubTag);

        expect(result).toEqual(expectedResponse);
    });

    test('should return error message if clubTag does not start with #', async () => {
        const invalidClubTag = 'ABC123';
        const expectedResponse = { 'reason': 'NotFound', 'message': 'playerTag must start with #' };

        const result = await getClub(invalidClubTag);

        expect(result).toEqual(expectedResponse);
    });

    test('should fetch club information successfully', async () => {
        const mockResponse = { id: '123', name: 'Awesome Club' };
        fetch.mockResolvedValue(new Response(JSON.stringify(mockResponse), { status: 200 }));
        context.getAuthToken.mockReturnValue('valid-token');

        const clubTag = '#ABC123';
        const data = await getClub(clubTag);

        expect(fetch).toHaveBeenCalledWith(`https://api.brawlstars.com/v1/clubs/${encodeURIComponent(clubTag)}`, {
            headers: { 'Authorization': 'Bearer valid-token' },
        });
        expect(data).toEqual(mockResponse);
    });

    test('should handle fetch error and return error response', async () => {
        const errorResponse = { reason: 'error', message: 'Server error' };
        fetch.mockResolvedValue(new Response(JSON.stringify(errorResponse), { status: 500 }));
        context.getAuthToken.mockReturnValue('valid-token');

        const clubTag = '#ABC123';
        const result = await getClub(clubTag);

        expect(result).toEqual(errorResponse);
    });
});
