import { call, put } from "redux-saga/effects";
import { push } from "connected-react-router";
import { actions as toastrActions } from "react-redux-toastr";
import api from "~/services/api";

import AuthActions from "../ducks/auth";

export function* signIn({ email, password, remember }) {
    try {
        const response = yield call(api.post, "sessions", { email, password });

        if (!!remember === true) {
            localStorage.setItem("@Token:email", email);
        }

        localStorage.setItem("@Token:token", response.data.token);

        yield put(AuthActions.signInSuccess(response.data.token));
        yield put(push("/"));
    } catch (err) {
        yield put(
            toastrActions.add({
                type: "error",
                title: "Falha no login",
                message: "Verifique seu e-mail ou senha"
            })
        );
        yield put(AuthActions.signInFailure());
    }
}

export function* signUp({ email, name, password }) {
    try {
        const response = yield call(api.post, "users", {
            email,
            name,
            password
        });

        console.log(response.data);

        localStorage.setItem("@Token:token", response.data.token);

        yield put(AuthActions.signInSuccess(response.data.token));
        yield put(push("/"));
    } catch (err) {
        yield put(
            toastrActions.add({
                type: "error",
                title: "Falha no login",
                message: "Você foi convidade para algum time?"
            })
        );
        console.log(err);
        yield put(AuthActions.signInFailure());
    }
}

export function* signOut() {
    localStorage.removeItem("@Token:token");
    localStorage.removeItem("@Token:team");

    yield put(push("/signin"));
    yield put(
        toastrActions.add({
            type: "success",
            title: "Sessão encerrada",
            message: "Esperamos você em breve :)"
        })
    );
}
