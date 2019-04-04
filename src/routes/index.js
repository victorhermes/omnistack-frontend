import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Switch } from "react-router-dom";

import history from "./history";

import Private from "./private";
import Guest from "./guest";
import Main from "~/pages/Main";
import SignUp from "~/pages/Auth/SignUp";
import SignIn from "~/pages/Auth/SignIn";

// Antes era o BrowserRouter do react-router-dom que encapsulava as rotas
// Como queremos as rotas conectadas com o redux para fazer o controle de rotas, usamos o ConnectedRouter do connected-react-router

const Routes = () => (
    <ConnectedRouter history={history}>
        <Switch>
            <Guest path="/signin" component={SignIn} />
            <Guest path="/signup" component={SignUp} />
            <Private path="/" exact component={Main} />
        </Switch>
    </ConnectedRouter>
);

export default Routes;
