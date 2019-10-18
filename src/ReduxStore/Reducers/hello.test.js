import userReducer from './hello';

describe('User Reducer', () => {
    it('should return the initial state', () => {
        expect(userReducer(undefined, { type: 'SET_MESSAGE', message: 'Working' })).toEqual({
            message: 'Working',
            error: false,
        });
    });
});
