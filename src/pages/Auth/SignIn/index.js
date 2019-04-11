import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AuthActions from "~/store/ducks/auth";

import Button from "~/styles/components/Button";
import { Container, SignForm } from "../styles";

class SignIn extends Component {
    state = {
        email: "",
        password: ""
    };

    handleSubmit = e => {
        e.preventDefault();

        const { email, password } = this.state;
        const { signInRequest } = this.props;

        signInRequest(email, password);
    };

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        const { email, password } = this.state;
        const { auth } = this.props;

        return (
            <Container>
                <SignForm onSubmit={this.handleSubmit}>
                    <h1>Boas vindas</h1>

                    <span>E-MAIL</span>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={this.handleInputChange}
                    />

                    <span>SENHA</span>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        id="showPassword"
                        onChange={this.handleInputChange}
                    />

                    <Button
                        size="big"
                        type="submit"
                        disabled={!this.state.email || !this.state.password}
                    >
                        {auth.loading ? "CARREGANDO..." : "ENTRAR"}
                    </Button>
                </SignForm>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(AuthActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn);
