import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AuthActions from "~/store/ducks/auth";
import { withFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import Gif from "~/elips.svg";
import Button from "~/styles/components/Button";
import Error from "~/styles/components/Error";
import { Container, SignForm } from "../styles";

const RecoverPassword = ({
    handleSubmit,
    errors,
    values,
    handleChange,
    auth
}) => (
    <Container>
        <SignForm onSubmit={handleSubmit}>
            <h1>Hermes</h1>

            <span>E-MAIL</span>
            <input
                type="email"
                name="email"
                onChange={handleChange}
                value={values.email}
                autoFocus
            />

            {!!errors.email && <Error>{errors.email}</Error>}

            <Button
                size="big"
                type="submit"
                isLoading={auth === true ? "loading" : ""}
            >
                {auth ? (
                    <img src={Gif} alt="Carregando..." />
                ) : (
                    "RECUPERAR SENHA"
                )}
            </Button>

            <Link to="/signin"> Fazer login </Link>
        </SignForm>
    </Container>
);

const mapStateToProps = state => ({
    auth: state.auth.loading
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(AuthActions, dispatch);

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withFormik({
        mapPropsToValues: () => ({
            email: ""
        }),

        validateOnChange: true,
        validateOnBlur: false,

        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email("E-mail inválido")
                .required("Campo obrigatório")
        }),

        handleSubmit: (values, { props }) => {
            const { email } = values;
            const redirect_url = "http://" + window.location.host + "/reset";

            const { recoverPasswordRequest } = props;
            recoverPasswordRequest(email, redirect_url);
        }
    })
)(RecoverPassword);
