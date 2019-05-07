import { call, put } from "redux-saga/effects";
//import { push } from "connected-react-router";
import { actions as toastrActions } from "react-redux-toastr";
import api from "~/services/api";

//import PayActions from "../ducks/auth";

export function* createPay({
    Cardnumber,
    card_holder_name,
    card_expiration_date,
    card_cvv
}) {
    try {
        yield call(api.post, "pay", {
            Cardnumber,
            card_holder_name,
            card_expiration_date,
            card_cvv
        });
    } catch (err) {
        yield put(
            toastrActions.add({
                type: "error",
                title: "Falha no pagamento",
                message: "Tente novamente"
            })
        );
    }
}
