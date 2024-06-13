const fetch = require('node-fetch');
const { Response } = jest.requireActual('node-fetch');
const context = require('../../functions/auth/context');
const { login } = require('../../functions/auth/login');

jest.mock('node-fetch');
jest.mock('../../functions/auth/context');

describe('login function', () => {
    beforeEach(() => {
        fetch.mockClear();
        context.getAuthToken.mockClear();
        context.setAuthToken.mockClear();
    });

    test('should throw an error if auth is not a string', async () => {
        await expect(login(123)).rejects.toThrow('Authentication token must be a string.');
    });

    test('should throw an error if fetch response is not ok', async () => {
        fetch.mockResolvedValue(new Response(null, { status: 401 }));
        context.getAuthToken.mockReturnValue('invalid-token');

        await expect(login('valid-token')).rejects.toThrow('Authentication token is wrong.');
    });

    test('should set auth token and log in successfully if fetch response is ok', async () => {
        fetch.mockResolvedValue(new Response(null, { status: 200 }));
        context.getAuthToken.mockReturnValue('valid-token');

        console.log = jest.fn(); // Mock console.log

        await login('valid-token');

        expect(context.setAuthToken).toHaveBeenCalledWith('valid-token');
        expect(console.log).toHaveBeenCalledWith('You succesfully logged in.');
    });
});
