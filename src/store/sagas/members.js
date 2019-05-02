import { call, put } from "redux-saga/effects";
import api from "~/services/api";
import { actions as toastrActions } from "react-redux-toastr";
import MembersActions from "../ducks/members";

export function* getMembers() {
    const response = yield call(api.get, "members");

    yield put(MembersActions.getMembersSuccess(response.data));
}

export function* updateMember({ id, roles }) {
    try {
        yield call(api.put, `members/${id}`, {
            roles: roles.map(role => role.id)
        });

        yield put(
            toastrActions.add({
                type: "success",
                title: "Membro atualizado"
            })
        );
    } catch {
        yield put(
            toastrActions.add({
                type: "error",
                title: "Houve um problema"
            })
        );
    }
}

export function* inviteMember({ email }) {
    try {
        yield call(api.post, "invites", { invites: [email] });

        yield put(
            toastrActions.add({
                type: "success",
                title: "Convite enviado"
            })
        );
    } catch {
        yield put(
            toastrActions.add({
                type: "error",
                title: "Houve um problema"
            })
        );
    }
}
