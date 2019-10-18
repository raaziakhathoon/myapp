import { setMessage, deleteMessage } from './hello';

describe('Hello Actions', () => {
    it('Should create an action set message', async () => {
        const dispatch = jest.fn();
        const getState = jest.fn();
        await setMessage({ message: 'hello world' })(dispatch, getState);
        expect(dispatch).toBeCalledWith({ type: 'UPDATE_MESSAGE', message: 'hello world' });
    });
    it('Should create an action delete message', async () => {
        const dispatch = jest.fn();
        const getState = jest.fn();
        await deleteMessage()(dispatch, getState);
        expect(dispatch).toBeCalledWith({ type: 'SET_MESSAGE', message: null });
    });
});
