import React, { Fragment } from "react";
import { Provider } from "react-redux";
import ReduxToastr from "react-redux-toastr";
import Routes from "./routes";
import store from "./store";

import GlobalStyle from "./styles/global";

const App = () => (
    <Provider store={store}>
        <Fragment>
            <GlobalStyle />
            <ReduxToastr
                timeOut={4000}
                newestOnTop={false}
                preventDuplicates
                position="top-right"
                transitionIn="fadeIn"
                transitionOut="fadeOut"
                progressBar
                closeOnToastrClick
            />
            <Routes />
        </Fragment>
    </Provider>
);

export default App;
