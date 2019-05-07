import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* Types & Action Creators */

const { Types, Creators } = createActions({
    payRequest: [
        "Cardnumber",
        "card_holder_name",
        "card_expiration_date",
        "card_cvv"
    ]
});

export const PayTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
    loading: false
});

/* Reducers */

export const request = state => {
    return state.merge({ loading: true });
};

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.PAY_REQUEST]: request
});
