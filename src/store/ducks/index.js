import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { reducer as toastr } from "react-redux-toastr";
import { reducer as auth } from "./auth";
import { reducer as teams } from "./teams";
import { reducer as projects } from "./projects";
import { reducer as members } from "./members";
import { reducer as pay } from "./pay";

export default history =>
    combineReducers({
        toastr,
        auth,
        teams,
        projects,
        members,
        pay,
        router: connectRouter(history)
    });
