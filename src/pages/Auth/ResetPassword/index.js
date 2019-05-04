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

const ResetPassword = ({
    handleSubmit,
    errors,
    values,
    handleChange,
    auth
}) => (
    <Container>
        <SignForm onSubmit={handleSubmit}>
            <h1>Hermes</h1>

            <span>SENHA</span>
            <input
                type="password"
                name="password"
                id="showPassword"
                onChange={handleChange}
                values={values.password}
            />
            {!!errors.password && <Error>{errors.password}</Error>}

            <span>CONFIRMAÇÃO DE SENHA</span>
            <input
                type="password"
                name="password_confirmation"
                onChange={handleChange}
                values={values.password_confirmation}
            />
            {!!errors.password_confirmation && (
                <Error>{errors.password_confirmation}</Error>
            )}

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
            password: "",
            password_confirmation: ""
        }),

        validateOnChange: true,
        validateOnBlur: false,

        validationSchema: Yup.object().shape({
            password: Yup.string()
                .required("Campo obrigatório")
                .min(1, "Senha muito curta!")
                .max(20, "Senha muito longa!"),
            password_confirmation: Yup.string().oneOf(
                [Yup.ref("password"), null],
                "Senhas não conferem"
            )
        }),

        handleSubmit: (values, { props }) => {
            const { password, password_confirmation } = values;
            const token = window.location.search.substr(7);

            const { resetPasswordRequest } = props;
            resetPasswordRequest(token, password, password_confirmation);
        }
    })
)(ResetPassword);
