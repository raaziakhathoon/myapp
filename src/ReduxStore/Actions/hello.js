/**
 * @module redux/hello/actions
 */

/**
 * @memberof module:redux/hello/actions
 * @function
 * @async
 * @name setMessage
 * @param {Object} data - Data object.
 * @returns {Function} Dispatch function with `SET_MESSAGE` type
 * @throws {Function} Dispatch function with `SET_ERROR` type
 */
export const setMessage = data => async (dispatch) => {
    try {
        dispatch({
            type: 'UPDATE_MESSAGE',
            message: data.message,
        });
    } catch (e) {
        dispatch({
            type: 'SET_ERROR',
            error: true,
        });
    }
};

/**
 * @memberof module:redux/hello/actions
 * @function
 * @async
 * @name deleteMessage
 * @returns {Function} Dispatch function with `SET_MESSAGE` type
 * @throws {Function} Dispatch function with `SET_ERROR` type
 */
export const deleteMessage = () => async (dispatch) => {
    try {
        dispatch({
            type: 'SET_MESSAGE',
            message: null,
        });
    } catch (e) {
        dispatch({
            type: 'SET_ERROR',
            error: true,
        });
    }
};
