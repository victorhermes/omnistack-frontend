import { call, put } from "redux-saga/effects";
//import { push } from "connected-react-router";
import { actions as toastrActions } from "react-redux-toastr";
import api from "~/services/api";

//import PayActions from "../ducks/auth";

export function* createPay({
    CardNumber,
    cardHolderName,
    cardExpirationDate,
    cardCvv,
    installments
}) {
    try {
        yield call(api.post, "pay", {
            CardNumber,
            cardHolderName,
            cardExpirationDate,
            cardCvv,
            installments
        });

        yield put(
            toastrActions.add({
                type: "success",
                title: "Pagamento efetuado",
                message: "Pago com sucesso"
            })
        );
    } catch (err) {
        console.tron.log(err);
        const error = err.response.data.error.message;
        yield put(
            toastrActions.add({
                type: "error",
                title: "Falha no pagamento",
                message: error
            })
        );
    }
}
