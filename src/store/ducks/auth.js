import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* Types & Action Creators */

const { Types, Creators } = createActions({
    signInRequest: ["email", "password", "remember"],
    signInSuccess: ["token", "email"],
    signInFailure: null,
    signOut: null,
    signUpRequest: ["email", "name", "password"],
    recoverPasswordRequest: ["email", "redirect_url"],
    resetPasswordRequest: ["token", "password", "password_confirmation"]
});

export const AuthTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
    signedIn: !!localStorage.getItem("@Token:token"),
    token: localStorage.getItem("@Token:token") || null,
    loading: false,
    email: localStorage.getItem("@Token:email") || null,
    remember: null
});

/* Reducers */

export const request = state => {
    return state.merge({ loading: true });
};

export const success = (state, { token }) => {
    return state.merge({ signedIn: true, loading: false, token });
};

export const failure = state => {
    return state.merge({ loading: false });
};

export const logout = state => state.merge({ signedIn: false, token: null });

export const recoverRequest = state => {
    return state.merge({ loading: true });
};

export const resetRequest = state => {
    return state.merge({ loading: true });
};

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.SIGN_IN_REQUEST]: request,
    [Types.SIGN_IN_SUCCESS]: success,
    [Types.SIGN_IN_FAILURE]: failure,
    [Types.SIGN_OUT]: logout,
    [Types.RECOVER_PASSWORD_REQUEST]: recoverRequest,
    [Types.RESET_PASSWORD_REQUEST]: resetRequest
});
