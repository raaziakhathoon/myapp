import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import reducer from './Reducers';
import sagas from './Sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(thunk, sagaMiddleware));

sagaMiddleware.run(sagas);

export default store;
