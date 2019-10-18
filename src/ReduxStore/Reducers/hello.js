const defaultState = {
    message: 'Hello World!',
    error: false,
};

/**
 * @module redux/hello/reducers
 */

/**
 * @memberof module:redux/hello/reducers
 * @function
 * @name userReducer
 * @param {Object} state - State input
 * @param {Object} action - Action inut
 * @returns {Object} Returns object with an error or action message
 */
export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case 'SET_MESSAGE': {
            return {
                ...state,
                message: action.message,
            };
        }
        case 'SET_ERROR': {
            return {
                ...state,
                error: action.error,
            };
        }
        default: {
            return state;
        }
    }
}
