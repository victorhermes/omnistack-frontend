import { all, takeLatest } from "redux-saga/effects";

import { signIn, signOut, signUp } from "./auth";
import { AuthTypes } from "../ducks/auth";

import { getTeams, createTeam } from "./teams";
import { TeamsTypes } from "../ducks/teams";

import { getProjects, createProjects, deleteProject } from "./projects";
import { ProjectsTypes } from "../ducks/projects";

import { getMembers, updateMember, inviteMember } from "./members";
import { MembersTypes } from "../ducks/members";

export default function* rootSaga() {
    return yield all([
        takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn),
        takeLatest(AuthTypes.SIGN_OUT, signOut),
        takeLatest(AuthTypes.SIGN_UP_REQUEST, signUp),

        takeLatest(TeamsTypes.GET_TEAMS_REQUEST, getTeams),
        takeLatest(TeamsTypes.CREATE_TEAM_REQUEST, createTeam),

        takeLatest(TeamsTypes.SELECT_TEAM, getProjects),
        takeLatest(ProjectsTypes.GET_PROJECT_REQUEST, getProjects),

        takeLatest(ProjectsTypes.CREATE_PROJECT_SUCCESS, getProjects),
        takeLatest(ProjectsTypes.CREATE_PROJECT_REQUEST, createProjects),

        takeLatest(ProjectsTypes.DELETE_PROJECT_REQUEST, deleteProject),

        takeLatest(MembersTypes.GET_MEMBERS_REQUEST, getMembers),
        takeLatest(MembersTypes.UPDATE_MEMBER_REQUEST, updateMember),

        takeLatest(MembersTypes.INVITE_MEMBER_REQUEST, inviteMember)
    ]);
}
