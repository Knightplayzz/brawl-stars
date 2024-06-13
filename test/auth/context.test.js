const { setAuthToken, getAuthToken } = require('../../functions/auth/context');

describe('Auth Token Functions', () => {
    test('should set and get authToken correctly', () => {
        const token = 'my-secret-token';
        setAuthToken(token);
        expect(getAuthToken()).toBe(token);
    });

    test('should return undefined if authToken is not set', () => {
        setAuthToken(undefined); // Resetting authToken for this test case
        expect(getAuthToken()).toBeUndefined();
    });

    test('should update authToken correctly', () => {
        const initialToken = 'initial-token';
        const newToken = 'new-token';
        setAuthToken(initialToken);
        expect(getAuthToken()).toBe(initialToken);
        setAuthToken(newToken);
        expect(getAuthToken()).toBe(newToken);
    });
});
