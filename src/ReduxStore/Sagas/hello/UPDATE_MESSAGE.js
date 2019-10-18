import { takeLatest, put } from 'redux-saga/effects';

/**
 * @memberof module:redux/hello/sagas
 * @function
 * @generator
 * @name setMessage
 * @param {Object} action - Action object.
 * @returns {Function} Yields redux-sage/effects/put with `SET_MESSAGE` action type
 */
function* setMessage() {
    yield put({
        type: 'SET_MESSAGE',
        message: 'Hello Sagas!',
    });
}

/**
 * @memberof module:redux/hello/sagas
 * @function
 * @generator
 * @name watchUPDATEMESSAGE
 * @param {Object} action - Action object.
 * @returns {Function} Yields redux-sage/effects/takeLatest on `UPDATE_MESSAGE` action type using setMessage function.
 */
export default function* watchUPDATEMESSAGE() {
    yield takeLatest('UPDATE_MESSAGE', setMessage);
}
