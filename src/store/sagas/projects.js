import { call, put } from "redux-saga/effects";
import api from "~/services/api";
import { actions as toastrActions } from "react-redux-toastr";
import ProjectsActions from "../ducks/projects";

export function* getProjects() {
    const response = yield call(api.get, "projects");

    yield put(ProjectsActions.getProjectSuccess(response.data));
}

export function* createProjects({ title }) {
    try {
        const response = yield call(api.post, "projects", { title });

        yield put(ProjectsActions.createProjectSuccess(response.data));
        yield put(ProjectsActions.closeProjectModal());
    } catch (err) {
        yield put(
            toastrActions.add({
                type: "error",
                title: "Houve um problema!"
            })
        );
    }
}

export function* deleteProject({ id }) {
    try {
        yield call(api.delete, `projects/${id}`);

        yield put(ProjectsActions.deleteProjectSuccess(id));

        yield put(
            toastrActions.add({
                type: "success",
                title: "Projeto deletado com sucesso"
            })
        );
    } catch (err) {
        yield put(
            toastrActions.add({
                type: "error",
                title: "Houve um problema!"
            })
        );
    }
}
