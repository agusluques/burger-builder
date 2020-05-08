import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../../shared/utility'

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/burgerbuilder' 
}

const authStart = (state) => {
    return updateObject(state, {loading: true, error: null})
}

const authSuccess = (state, action) => {
    console.log(action)
    return updateObject(state, {loading: false, token: action.authData.idToken, userId: action.authData.localId, error: null})
}

const authFail = (state, action) => {
    return updateObject(state, {loading: false, error: action.error})
}

const authLogOut = (state) => {
    return updateObject(state, {token: null, userId: null});
}

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {authRedirectPath: action.path})
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state)
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action)
        case actionTypes.AUTH_FAIL: return authFail(state, action)
        case actionTypes.AUTH_LOGOUT: return authLogOut(state)
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action)
        default: return state;
    }
};

export default reducer;