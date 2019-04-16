import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AuthActions from "~/store/ducks/auth";
import { withFormik } from "formik";
import * as Yup from "yup";

import Button from "~/styles/components/Button";
import { Container, SignForm } from "../styles";

const SignIn = ({
    handleSubmit,
    errors,
    values,
    handleChange,
    setFieldValue,
    auth
}) => (
    <Container>
        <SignForm onSubmit={handleSubmit}>
            <h1>Boas vindas</h1>

            <span>E-MAIL</span>
            <input
                type="email"
                name="email"
                onChange={handleChange}
                value={values.email}
            />

            {!!errors.email && <span>{errors.email}</span>}

            <span>SENHA</span>
            <input
                type="password"
                name="password"
                id="showPassword"
                onChange={handleChange}
                values={values.password}
            />
            {!!errors.password && <span>{errors.password}</span>}
            <Button
                size="big"
                type="submit"
                /*disabled={!values.email || !values.password}*/
            >
                {auth ? "CARREGANDO..." : "ENTRAR"}
            </Button>
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
            email: "",
            password: ""
        }),

        validateOnChange: true,
        validateOnBlur: true,

        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email("E-mail inválido")
                .required("Campo obrigatório"),
            password: Yup.string().required("Campo obrigatório")
        }),

        handleSubmit: (values, { props }) => {
            const { email, password } = values;
            const { signInRequest } = props;

            signInRequest(email, password);
        }
    })
)(SignIn);
