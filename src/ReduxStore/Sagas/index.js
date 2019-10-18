import { all, fork } from 'redux-saga/effects';

import hello from './hello';

const sagas = [
    ...hello,
];

/**
 * @function
 * @generator
 * @name RootSaga
 * @returns {Function} Yields redux-sage/effects/all using sagas.
 */
export default function* rootSaga() {
    yield all(sagas.map(saga => fork(saga)));
}
